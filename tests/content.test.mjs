import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import YAML from 'yaml';
import { isPublished, assertUniquePaths, withBase, isSafePath } from '../src/lib/content-rules.mjs';
const now = new Date('2026-10-24T12:00:00Z');
test('drafts, missing approval and future articles stay unpublished', () => {
  assert.equal(isPublished({ draft: true, pubDate: '2025-01-01' }, now), false);
  assert.equal(isPublished({ pubDate: '2025-01-01' }, now), false);
  assert.equal(isPublished({ draft: false, pubDate: '2099-01-01' }, now), false);
  assert.equal(isPublished({ draft: false, pubDate: '2026-10-01' }, now), true);
});
test('legacy paths cannot collide, escape directories or replace index pages', () => {
  assert.throws(() =>
    assertUniquePaths([{ legacyPath: '/2026/01/01/test/' }, { legacyPath: '/2026/01/01/test/' }]),
  );
  for (const path of ['/../admin/', '//outside/', '/online/', '/blog-y-noticias/'])
    assert.throws(() => assertUniquePaths([{ legacyPath: path }]));
  assert.equal(isSafePath('/2026/06/09/pycamp-spain-2026/'), true);
});
test('URLs work at both the production root and a GitHub project prefix', () => {
  assert.equal(
    withBase('/media/photo.webp', '/saturdaysai-web/'),
    '/saturdaysai-web/media/photo.webp',
  );
  assert.equal(withBase('/2026/06/09/pycamp-spain-2026/', '/'), '/2026/06/09/pycamp-spain-2026/');
  assert.equal(withBase('https://cursos.saturdays.ai', '/preview'), 'https://cursos.saturdays.ai');
});
test('pilot manifest and imported articles agree, with spam excluded', async () => {
  const manifest = JSON.parse(await readFile('imports/manifest.json', 'utf8'));
  assert.equal(manifest.warnings.length, 0);
  assert.equal(manifest.posts.length, 8);
  for (const entry of manifest.posts) {
    const md = await readFile(entry.file, 'utf8');
    const meta = YAML.parse(md.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
    assert.equal(meta.legacyPath, entry.path);
    assert.equal(new URL(meta.sourceUrl).pathname, entry.path);
    assert.equal(meta.sourceId, entry.id);
    assert.notEqual(meta.sourceId, 12005);
    assert.ok(md.length > 1200, 'Complete article body expected');
    assert.ok(!md.includes('Ver imagen original'), 'No unresolved image placeholders');
  }
});
test('economic information is removed from general site data and preserved in articles', async () => {
  const data = await Promise.all(
    ['cities', 'courses', 'site'].map((x) => readFile(`src/data/${x}.json`, 'utf8')),
  );
  for (const text of data)
    assert.doesNotMatch(
      text,
      /[€$£]|\b(price|pricing|discount|donat\w*|fees?|earlybird|financial aid|cost|gratis|precio|descuento)\b/i,
    );
  const original = await readFile(
    'src/content/posts/hapyness-analisis-de-sentimientos-en-la-poblacion-de-aragon.md',
    'utf8',
  );
  assert.match(original, /crisis económica/);
});
test('CMS fields cover every editable article property and default new content to draft', async () => {
  const config = YAML.parse(await readFile('.pages.yml', 'utf8'));
  const articles = config.content.find((x) => x.name === 'articles');
  assert.equal(articles.fields.find((x) => x.name === 'draft').default, true);
  assert.equal(config.settings.content.merge, true);
  const sample = await readFile('src/content/posts/pycamp-spain-2026.md', 'utf8');
  const fields = Object.keys(YAML.parse(sample.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]));
  for (const field of fields)
    assert.ok(
      articles.fields.some((x) => x.name === field),
      `CMS missing ${field}`,
    );
});
