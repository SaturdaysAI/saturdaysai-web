import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import { htmlFiles } from './lib/localization.mjs';
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const origin = (process.env.SITE_URL || 'https://saturdays.ai').replace(/\/$/, '');
const files = await htmlFiles('dist');
const known = new Set(files.map((file) => path.relative('dist', file).replaceAll('\\', '/')));
let pages = 0;
for (const file of files) {
  const $ = load(await fs.readFile(file, 'utf8'));
  const relative = path.relative('dist', file).replaceAll('\\', '/');
  const language = relative.startsWith('en/') ? 'en' : 'es';
  assert.equal($('html').attr('lang'), language, file);
  assert.equal($('[data-current-language]').text(), language.toUpperCase(), file);
  assert.equal($('[data-language][aria-current]').attr('data-language'), language, file);
  assert.equal($('html').attr('data-localized'), 'true', file);
  for (const lang of ['es', 'en']) {
    const link = $(`link[rel="alternate"][hreflang="${lang}"]`).attr('href');
    assert.ok(link?.startsWith(origin + base + '/'), `${file}: missing language alternate`);
    const destination = new URL(link).pathname.slice(base.length + 1) + 'index.html';
    assert.ok(known.has(destination), `${file}: missing alternate ${link}`);
    const peer = load(await fs.readFile(path.join('dist', destination), 'utf8'));
    assert.equal(
      peer(`link[rel="alternate"][hreflang="${language}"]`).attr('href'),
      $('link[rel="canonical"]').attr('href'),
      `${file}: non-reciprocal alternate`,
    );
  }
  $('#site-nav a').each((_, el) => {
    const href = $(el).attr('href');
    assert.ok(
      href.startsWith(base + (language === 'en' ? '/en/' : '/')),
      `${file}: navigation leaves the selected language`,
    );
    if (language === 'es') assert.ok(!href.startsWith(base + '/en/'), file);
  });
  assert.equal($('[data-language]').length, 2, file);
  assert.equal($('.theme-toggle').length, 1, file);
  assert.doesNotMatch($('body').text(), /ZXQ\d{4}|SATURDAYS_BRAND/, file);
  pages++;
}
let feedCount;
for (const language of ['es', 'en']) {
  const feed = load(
    await fs.readFile(language === 'en' ? 'dist/en/feed.xml' : 'dist/feed.xml', 'utf8'),
    { xmlMode: true },
  );
  assert.equal(feed('channel > language').text(), language);
  assert.ok(feed('item').length > 0);
  if (feedCount === undefined) feedCount = feed('item').length;
  else assert.equal(feed('item').length, feedCount);
}
const coverage = JSON.parse(await fs.readFile('artifacts/bilingual-theme/coverage.json', 'utf8'));
assert.deepEqual(coverage.missing, [], 'Every visible text must have both translations');
console.log(
  JSON.stringify({
    localizedPages: pages,
    alternateLinks: pages * 2,
    missingTranslations: 0,
    result: 'PASS',
  }),
);
