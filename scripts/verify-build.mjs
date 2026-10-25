import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as cheerio from 'cheerio';
import { indexablePath } from '../src/lib/seo.mjs';
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const siteOrigin = process.env.SITE_URL || 'https://saturdays.ai';
const root = path.resolve('dist');
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
const files = await walk(root);
const htmlFiles = files.filter((x) => x.endsWith('.html'));
const known = new Set(files.map((p) => path.relative(root, p).split(path.sep).join('/')));
const errors = [];
let checked = 0;
let imageDimensionsChecked = 0;
const documentIds = new Map();
const fragmentLinks = [];
const manifest = JSON.parse(await readFile('imports/manifest.json', 'utf8'));
const socialCards = JSON.parse(await readFile('public/social/manifest.json', 'utf8'));
for (const post of manifest.posts)
  assert.ok(known.has(`${post.path.slice(1)}index.html`), `Missing legacy route: ${post.path}`);
for (const city of manifest.cities)
  assert.ok(
    known.has(`${city.path.slice(1)}index.html`),
    `Missing legacy city route: ${city.path}`,
  );
for (const page of manifest.pages || [])
  assert.ok(
    known.has(`${page.path.slice(1)}index.html`),
    `Missing legacy page route: ${page.path}`,
  );
for (const file of htmlFiles) {
  const text = await readFile(file, 'utf8');
  const $ = cheerio.load(text);
  const rel = path.relative(root, file).split(path.sep).join('/');
  const ids = new Set();
  $('[id]').each((_, el) => {
    const id = $(el).attr('id');
    if (ids.has(id)) errors.push(`${rel}: duplicate ID ${id}`);
    ids.add(id);
  });
  documentIds.set(rel, ids);
  $('h1,h2,h3,h4,h5,h6').each((_, el) => {
    if (!$(el).text().trim()) errors.push(`${rel}: empty heading`);
  });
  $('a[href]').each((_, el) => {
    const link = $(el);
    const href = link.attr('href');
    if (!link.text().trim() && !link.attr('aria-label') && !link.find('img[alt],svg').length)
      errors.push(`${rel}: link without an accessible name ${href}`);
    if (/\/wp-admin\//.test(href)) errors.push(`${rel}: WordPress editor link`);
    const current = new URL(base + '/' + rel.replace(/index\.html$/, ''), siteOrigin);
    try {
      const target = new URL(href, current);
      if (target.origin !== current.origin || !target.hash || target.hash.startsWith('#:~:text='))
        return;
      let file = decodeURIComponent(target.pathname).slice(base.length).replace(/^\//, '');
      if (file === '' || file.endsWith('/')) file += 'index.html';
      fragmentLinks.push({ from: rel, file, id: decodeURIComponent(target.hash.slice(1)) });
    } catch {
      errors.push(`${rel}: invalid link ${href}`);
    }
  });
  if ($('h1').length !== 1) errors.push(`${rel}: expected one h1`);
  $('script[type="application/ld+json"]').each((_, script) => {
    try {
      JSON.parse($(script).text());
    } catch {
      errors.push(`${rel}: invalid structured data`);
    }
  });
  $('img[srcset]').each((_, image) => {
    for (const candidate of ($(image).attr('srcset') || '').split(',')) {
      const source = candidate.trim().split(/\s+/)[0];
      if (
        !source.startsWith(base + '/') ||
        !known.has(decodeURIComponent(source.slice(base.length + 1)))
      )
        errors.push(`${rel}: missing responsive image ${source}`);
      checked++;
    }
  });
  if (!$('title').text() || !$('meta[name=description]').attr('content'))
    errors.push(`${rel}: missing SEO metadata`);
  const social = $('meta[property="og:image"]');
  const socialURL = social.attr('content');
  if (
    rel === 'index.html' &&
    socialURL !== siteOrigin.replace(/\/$/, '') + base + socialCards.default
  )
    errors.push(`${rel}: homepage must use the community brand card`);
  if (
    social.length !== 1 ||
    !socialURL ||
    !socialURL.startsWith(siteOrigin.replace(/\/$/, '') + base + '/social/')
  )
    errors.push(`${rel}: missing branded social card`);
  else {
    const asset = new URL(socialURL).pathname.slice(base.length + 1);
    if (!known.has(asset)) errors.push(`${rel}: social card file missing`);
  }
  if (
    $('meta[property="og:image:width"]').attr('content') !== '1200' ||
    $('meta[property="og:image:height"]').attr('content') !== '630'
  )
    errors.push(`${rel}: incorrect social card dimensions`);
  if ($('meta[name="twitter:image"]').attr('content') !== socialURL)
    errors.push(`${rel}: inconsistent social preview`);
  const route =
    rel === 'index.html'
      ? '/'
      : rel === '404.html'
        ? '/404/'
        : '/' + rel.replace(/index\.html$/, '').replace(/404\.html$/, '404/');
  if ($('link[rel=canonical]').attr('href') !== siteOrigin.replace(/\/$/, '') + base + route)
    errors.push(`${rel}: incorrect canonical URL`);
  if (
    process.env.PUBLIC_SITE_MODE !== 'production' &&
    !$('meta[name=robots]').attr('content')?.includes('noindex')
  )
    errors.push(`${rel}: preview must be noindex`);
  if (
    /PILOT_DRAFT_MUST_NOT_BE_PUBLISHED|CMS_DRAFT_MUST_NOT_BE_PUBLISHED|cms-connection-test|comprar-tramadol|Comprar-Zolpidem/i.test(
      text,
    )
  )
    errors.push(`${rel}: excluded content leaked`);
  if (text.includes('\u00b7')) errors.push(`${rel}: forbidden formatting character`);
  if (
    !/^(20\d\d\/|blog-y-noticias\/|podcast\/|proyectos\/|category\/|tag\/)/.test(
      rel.replace(/^en\//, ''),
    )
  ) {
    const visibleBody = $('body').clone();
    visibleBody.find('script,style').remove();
    const body = visibleBody.text();
    if (
      /[€$£]|\b(pricing|prices?|discounts?|donat\w*|fees?|earlybird|financial aid|precio|descuento|dto\.|free of charge)\b/i.test(
        body,
      )
    )
      errors.push(`${rel}: economic copy outside an article`);
  }
  $('a[href],img[src],script[src],link[href]').each((_, el) => {
    const attr = el.name === 'img' || el.name === 'script' ? 'src' : 'href';
    const value = $(el).attr(attr) || '';
    if (/^(https?:|mailto:|tel:|data:|#)/.test(value) || !value) return;
    if (!value.startsWith('/')) return;
    if (base && !(value === base || value.startsWith(base + '/'))) {
      errors.push(`${rel}: missing base prefix ${value}`);
      return;
    }
    let target = decodeURIComponent(value.split(/[?#]/)[0]).slice(base.length).replace(/^\//, '');
    if (target === '' || target.endsWith('/')) target += 'index.html';
    if (!known.has(target)) errors.push(`${rel}: missing local asset or route ${value}`);
    checked++;
  });
  $('.prose img').each((_, img) => {
    if (!($(img).attr('src') || '').startsWith(base + '/media/'))
      errors.push(`${rel}: remote article image`);
    if (!(Number($(img).attr('width')) > 0 && Number($(img).attr('height')) > 0))
      errors.push(`${rel}: image without layout dimensions ${$(img).attr('src')}`);
    imageDimensionsChecked++;
  });
  $('.prose script,.prose iframe,.prose form').each(() =>
    errors.push(`${rel}: unsafe embedded element`),
  );
}
for (const link of fragmentLinks) {
  if (documentIds.has(link.file) && !documentIds.get(link.file).has(link.id))
    errors.push(`${link.from}: missing section ${link.file}#${link.id}`);
}
const feed = await readFile(path.join(root, 'feed.xml'), 'utf8');
const rss = cheerio.load(feed, { xmlMode: true });
assert.equal(rss('channel > link').text(), siteOrigin.replace(/\/$/, '') + base + '/');
for (const post of manifest.posts)
  assert.ok(feed.includes(base + post.path), `Missing RSS article ${post.path}`);
for (const name of ['feed.xml', 'sitemap-0.xml'])
  assert.doesNotMatch(
    await readFile(path.join(root, name), 'utf8'),
    /editor-demo-draft|PILOT_DRAFT_MUST_NOT_BE_PUBLISHED|cms-connection-test/,
  );
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
const sitemap = cheerio.load(await readFile(path.join(root, 'sitemap-0.xml'), 'utf8'), {
  xmlMode: true,
});
sitemap('loc').each((_, loc) =>
  assert.ok(
    indexablePath(new URL(sitemap(loc).text()).pathname, base),
    `Non-indexable URL in sitemap: ${sitemap(loc).text()}`,
  ),
);
if (process.env.PUBLIC_SITE_MODE !== 'production') assert.match(robots, /Disallow: \//);
const sizes = await Promise.all(files.map((p) => stat(p)));
const bytes = sizes.reduce((n, s) => n + s.size, 0);
assert.ok(bytes < 1024 ** 3, 'GitHub Pages size limit');
assert.equal(errors.length, 0, errors.join('\n'));
console.log(
  JSON.stringify(
    {
      htmlPages: htmlFiles.length,
      legacyArticles: manifest.posts.length,
      localReferencesChecked: checked,
      fragmentLinksChecked: fragmentLinks.length,
      imageDimensionsChecked,
      siteMB: +(bytes / 1024 ** 2).toFixed(2),
      base: base || '/',
      result: 'PASS',
    },
    null,
    2,
  ),
);
