// Run after a production build: node scripts/verify-live.mjs
// Uses normal DNS and strict certificate validation, without browser automation.
import fs from 'node:fs/promises';
import path from 'node:path';
import tls from 'node:tls';
import { load } from 'cheerio';
import { indexablePath } from '../src/lib/seo.mjs';

const origin = new URL(process.env.SITE_URL || 'https://saturdays.ai').origin;
if (!origin.startsWith('https://')) throw new Error('Live verification requires HTTPS.');
const outputPath = process.env.LIVE_REPORT || 'artifacts/live-verification.json';
const failures = [];
const results = [];
const certificates = [];
const startedAt = new Date().toISOString();
async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const file = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(file) : [file];
      }),
    )
  ).flat();
}
async function request(url, method = 'GET') {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        method,
        redirect: 'manual',
        signal: AbortSignal.timeout(20000),
      });
      if (response.status >= 500 && attempt < 2) {
        await response.body?.cancel();
        continue;
      }
      return response;
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
}
function fail(route, message) {
  failures.push({ route, message });
}
async function certificate(host) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      { host, port: 443, servername: host, rejectUnauthorized: true },
      () => {
        const cert = socket.getPeerCertificate();
        resolve({
          host,
          authorized: socket.authorized,
          issuer: cert.issuer,
          subject: cert.subject,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          names: cert.subjectaltname,
          protocol: socket.getProtocol(),
        });
        socket.end();
      },
    );
    socket.setTimeout(20000, () => socket.destroy(new Error('TLS timeout')));
    socket.on('error', reject);
  });
}

// Fail fast on TLS, before crawling a deployment that is not ready.
for (const host of [new URL(origin).hostname, 'www.' + new URL(origin).hostname]) {
  certificates.push(await certificate(host));
}
// A developer's image cache can retain superseded cards. A clean CI build only
// publishes cards from the current manifest. Never treat that local history as
// a missing production asset.
const socialManifest = JSON.parse(await fs.readFile('dist/social/manifest.json', 'utf8'));
const activeSocialCards = new Set([
  ...Object.values(socialManifest).filter((value) => typeof value === 'string'),
  ...Object.values(socialManifest.english || {}),
]);
const responsiveManifest = JSON.parse(
  await fs.readFile('dist/media/responsive/manifest.json', 'utf8'),
);
const activeResponsiveImages = new Set(
  Object.values(responsiveManifest).flatMap((entry) =>
    entry.variants.map((variant) => variant.src),
  ),
);
const allFiles = await walk('dist');
let excludedSupersededCards = 0;
let excludedUnusedResponsiveImages = 0;
const files = allFiles.filter((file) => {
  const route = '/' + path.relative('dist', file).replaceAll('\\', '/');
  if (/^\/social\/[a-f0-9]+\.jpg$/.test(route) && !activeSocialCards.has(route)) {
    excludedSupersededCards++;
    return false;
  }
  // Local derivative caches can outlive source edits. Only current manifest
  // variants are used by pages; also validate every HTML reference below.
  if (
    /^\/media\/responsive\/[a-f0-9]+-\d+\.webp$/.test(route) &&
    !activeResponsiveImages.has(route)
  ) {
    excludedUnusedResponsiveImages++;
    return false;
  }
  return true;
});
let next = 0;
let htmlCount = 0;
let checkedCount = 0;
const htmlRoutes = new Set();
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (next < files.length) {
      const file = files[next++];
      const relative = path.relative('dist', file).replaceAll('\\', '/');
      const isHTML = relative.endsWith('.html');
      const route =
        '/' +
        relative
          .replace(/index\.html$/, '')
          .split('/')
          .map(encodeURIComponent)
          .join('/');
      if (isHTML) htmlRoutes.add(origin + route);
      const start = performance.now();
      try {
        const response = await request(origin + route, isHTML ? 'GET' : 'HEAD');
        const status = response.status;
        results.push({ route, status, ms: Math.round(performance.now() - start) });
        if (status !== 200) {
          fail(route, `HTTP ${status}`);
          await response.body?.cancel();
          continue;
        }
        if (!isHTML) continue;
        htmlCount++;
        const $ = load(await response.text());
        const expected = load(await fs.readFile(file, 'utf8'));
        for (const [selector, attribute] of [
          ['html', 'lang'],
          ['html', 'data-localized'],
          ['link[rel=canonical]', 'href'],
          ['meta[name=description]', 'content'],
          ['meta[property="og:image"]', 'content'],
        ]) {
          if ($(selector).attr(attribute) !== expected(selector).attr(attribute))
            fail(route, `Deployed ${selector} differs from the production build`);
        }
        if ($('title').text() !== expected('title').text())
          fail(route, 'Deployed title differs from the production build');
        const socialImage = $('meta[property="og:image"]').attr('content');
        if (!socialImage || !activeSocialCards.has(new URL(socialImage, origin).pathname))
          fail(route, 'Page references a card outside the current social manifest');
        $('[src],[srcset]').each((_, element) => {
          for (const attribute of ['src', 'srcset']) {
            const value = $(element).attr(attribute) || '';
            for (const match of value.matchAll(/\/media\/responsive\/[a-f0-9]+-\d+\.webp/g)) {
              if (!activeResponsiveImages.has(match[0]))
                fail(
                  route,
                  `Page references an image outside the current responsive manifest: ${match[0]}`,
                );
            }
          }
        });
        if ($('h1').length !== 1) fail(route, 'Expected one page heading');
        if ($('.preview-banner').length) fail(route, 'Preview banner on production');
        const robots = $('meta[name=robots]').attr('content') || '';
        if (
          indexablePath(decodeURI(route))
            ? /noindex|nofollow/.test(robots)
            : !robots.includes('noindex')
        )
          fail(route, 'Incorrect production indexing directive');
        if ($('link[rel=alternate][hreflang]').length < 2)
          fail(route, 'Missing language alternatives');
        $('script[type="application/ld+json"]').each((_, element) => {
          try {
            JSON.parse($(element).text());
          } catch {
            fail(route, 'Invalid structured data');
          }
        });
        $(
          'img[src],source[src],video[src],audio[src],iframe[src],script[src],link[rel=stylesheet][href]',
        ).each((_, element) => {
          const url = $(element).attr('src') || $(element).attr('href');
          if (url?.startsWith('http:')) fail(route, `Insecure embedded resource: ${url}`);
        });
      } catch (error) {
        fail(route, error.cause?.code || error.message);
      } finally {
        checkedCount++;
        if (checkedCount % 500 === 0)
          console.log(`Checked ${checkedCount}/${files.length} public files`);
      }
    }
  }),
);

const redirects = [];
for (const url of [
  origin.replace('https:', 'http:') + '/',
  origin.replace('https:', 'http:') + '/blog-y-noticias/?q=IA',
  origin.replace('https://', 'https://www.') + '/blog-y-noticias/?q=IA',
  origin.replace('https://', 'http://www.') + '/blog-y-noticias/?q=IA',
  'https://saturdaysai.github.io/saturdaysai-web/blog-y-noticias/?q=IA',
]) {
  const expectedPath = new URL(url).pathname.replace(/^\/saturdaysai-web(?=\/)/, '');
  const expectedURL = origin + expectedPath + new URL(url).search;
  const hops = [];
  let current = url;
  for (let hop = 0; hop < 4; hop++) {
    const response = await request(current, 'HEAD');
    const location = response.headers.get('location');
    hops.push({ url: current, status: response.status, location });
    if (response.status === 200) break;
    if (![301, 308].includes(response.status) || !location) break;
    const destination = new URL(location, current).href;
    if (current.startsWith('https:') && !destination.startsWith('https:')) {
      fail(url, 'Redirect downgrades HTTPS');
      break;
    }
    if (
      ![new URL(origin).hostname, 'www.' + new URL(origin).hostname].includes(
        new URL(destination).hostname,
      )
    )
      break;
    current = destination;
  }
  redirects.push({ url, hops });
  if (hops.length < 2 || current !== expectedURL || hops.at(-1).status !== 200)
    fail(url, 'Redirect must preserve the path and query and use the HTTPS canonical domain');
}
const robots = await (await request(origin + '/robots.txt')).text();
if (
  !robots.includes('Allow: /') ||
  robots.includes('Disallow: /') ||
  !robots.includes(`Sitemap: ${origin}/sitemap-index.xml`)
)
  fail('/robots.txt', 'Incorrect production robots.txt');
const sitemap = load(await (await request(origin + '/sitemap-0.xml')).text(), { xmlMode: true });
const sitemapURLs = sitemap('loc')
  .map((_, el) => sitemap(el).text())
  .get();
if (!sitemapURLs.length || sitemapURLs.some((url) => !htmlRoutes.has(url)))
  fail('/sitemap-0.xml', 'Sitemap has missing or non-production routes');
const missing = await request(origin + '/deployment-verification-nonexistent-route/');
if (missing.status !== 404) fail('missing route', `Expected HTTP 404, got ${missing.status}`);
await missing.body?.cancel();
const report = {
  startedAt,
  completedAt: new Date().toISOString(),
  origin,
  normalDNS: true,
  strictTLS: true,
  certificates,
  checkedFiles: results.length,
  activeSocialCards: activeSocialCards.size,
  excludedSupersededCards,
  excludedUnusedResponsiveImages,
  htmlCount,
  sitemapURLs: sitemapURLs.length,
  redirects,
  failures,
  results,
};
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, results: undefined }, null, 2));
if (failures.length) process.exitCode = 1;
