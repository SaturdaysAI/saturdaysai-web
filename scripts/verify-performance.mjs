import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { load } from 'cheerio';

// Build-size budgets, not a substitute for real-user Core Web Vitals.
const manifest = JSON.parse(await fs.readFile('public/media/responsive/manifest.json', 'utf8'));
const optimized = Object.values(manifest).filter((image) =>
  image.variants.some((v) => v.width === 480),
);
const originalBytes = optimized.reduce((sum, image) => sum + image.bytes, 0);
const smallBytes = optimized.reduce(
  (sum, image) => sum + image.variants.find((v) => v.width === 480).bytes,
  0,
);
for (const image of Object.values(manifest))
  for (const candidate of image.variants) {
    assert.ok(candidate.bytes < image.bytes, 'A derivative must save bytes');
    assert.equal((await fs.stat(path.join('dist', candidate.src))).size, candidate.bytes);
  }
const originalPages = [
  '/',
  '/blog-y-noticias/',
  '/podcast/',
  '/2025/01/20/podcast-t5-e01-davidleirado-filosofia/',
];
const pages = [...originalPages, ...originalPages.map((route) => '/en' + route)];
const html = [];
for (const route of pages) {
  const text = await fs.readFile(`dist${route}index.html`, 'utf8');
  const bytes = gzipSync(text).length;
  assert.ok(bytes < 60_000, `${route}: compressed HTML exceeds 60 KB`);
  const $ = load(text);
  assert.equal(
    $('link[rel="preload"][as="font"]').length,
    1,
    'Preload only the primary Latin font',
  );
  assert.equal($('iframe').length, 0, 'Third-party players must wait for user activation');
  html.push({ route, gzipBytes: bytes });
}
const files = await fs.readdir('dist/_astro');
const cssBytes = (
  await Promise.all(
    files
      .filter((name) => name.endsWith('.css'))
      .map(async (name) => gzipSync(await fs.readFile(`dist/_astro/${name}`)).length),
  )
).reduce((a, b) => a + b, 0);
assert.ok(cssBytes < 25_000, 'Compressed styles exceed 25 KB');
const report = {
  responsiveOriginals: Object.keys(manifest).length,
  smallVariants: optimized.length,
  originalBytes,
  smallBytes,
  smallVariantSavingsPercent: +((1 - smallBytes / originalBytes) * 100).toFixed(1),
  cssGzipBytes: cssBytes,
  html,
  result: 'PASS',
};
console.log(JSON.stringify(report, null, 2));
