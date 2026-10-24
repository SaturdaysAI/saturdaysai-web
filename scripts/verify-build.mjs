import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as cheerio from 'cheerio';
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
const manifest = JSON.parse(await readFile('imports/manifest.json', 'utf8'));
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
  if ($('h1').length !== 1) errors.push(`${rel}: expected one h1`);
  if (!$('title').text() || !$('meta[name=description]').attr('content'))
    errors.push(`${rel}: missing SEO metadata`);
  const route =
    rel === 'index.html'
      ? '/'
      : rel === '404.html'
        ? '/404/'
        : '/' + rel.replace(/index\.html$/, '');
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
  if (!/^(20\d\d\/|blog-y-noticias\/|podcast\/|proyectos\/|category\/|tag\/)/.test(rel)) {
    const visibleBody = $('body').clone();
    visibleBody.find('script,style').remove();
    const body = visibleBody.text();
    if (
      /[€$£]|\b(pricing|prices?|discounts?|donat\w*|fees?|earlybird|financial aid|precio|descuento)\b/i.test(
        body,
      )
    )
      errors.push(`${rel}: economic copy outside an article`);
  }
  $('a[href],img[src],script[src],link[href]').each((_, el) => {
    const attr = el.name === 'img' || el.name === 'script' ? 'src' : 'href';
    const value = $(el).attr(attr) || '';
    if (/^(https?:|mailto:|data:|#)/.test(value) || !value) return;
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
  });
  $('.prose script,.prose iframe,.prose form').each(() =>
    errors.push(`${rel}: unsafe embedded element`),
  );
}
const feed = await readFile(path.join(root, 'feed.xml'), 'utf8');
for (const post of manifest.posts)
  assert.ok(feed.includes(base + post.path), `Missing RSS article ${post.path}`);
for (const name of ['feed.xml', 'sitemap-0.xml'])
  assert.doesNotMatch(
    await readFile(path.join(root, name), 'utf8'),
    /editor-demo-draft|PILOT_DRAFT_MUST_NOT_BE_PUBLISHED|cms-connection-test/,
  );
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
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
      siteMB: +(bytes / 1024 ** 2).toFixed(2),
      base: base || '/',
      result: 'PASS',
    },
    null,
    2,
  ),
);
