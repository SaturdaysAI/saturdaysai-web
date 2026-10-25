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
  assert.doesNotMatch($('body').text(), /ZXQ\d{4}|SATURDAYS_BRAND|QZXBRAND/, file);
  assert.doesNotMatch(
    $('body').text(),
    /THE HERRAMIENTS YOU USED|THE REAL FLUITS|WHAT I VALID BEFORE I DARL|Miga de pan|abrazar la cara|equiposs|Albertoo/i,
    `${file}: known editorial regression`,
  );
  if (!/^(?:en\/)?20\d{2}\//.test(relative)) {
    assert.doesNotMatch(
      $('meta[name="description"]').attr('content') || '',
      /\b\d[\d.,]*\s*(?:USD|EUR)\b|\b(?:USD|EUR)\s*\d/i,
      `${file}: economic information in a non-blog description`,
    );
    assert.doesNotMatch(
      $('body').text(),
      /¿A qué va destinado el dinero\?|What is the money used for\?|11:30\s*[–-]\s*13 AM/,
      `${file}: obsolete programme question or invalid time`,
    );
  }
  if (/^(?:en\/)?about\/index.html$/.test(relative)) {
    assert.match(
      $('.prose').text(),
      language === 'es' ? /30\.000 AI fellows/ : /30,000 AI fellows/,
    );
    const founder = $('.about-person').filter(
      (_, el) => $(el).find('h3').text() === 'Miguel Guerrero',
    );
    assert.equal(
      founder.find('.person-role').text(),
      language === 'es' ? 'Fundador y presidente' : 'Founder & President',
    );
  }
  if (/^(?:en\/)?(?:terms|privacy-policy-2)\/index.html$/.test(relative)) {
    assert.match($('.prose').text(), /AI SATURDAYS ASOCIACIÓN/);
    assert.match($('.prose').text(), /G67349076/);
    assert.match($('.prose').text(), /08005 Barcelona/);
    assert.doesNotMatch($('.prose').text(), /before the main domain|antes de trasladar el dominio/);
  }
  if (/^(?:en\/)?seguridad-ia\/index.html$/.test(relative)) {
    assert.equal(
      $('h1').text().trim(),
      language === 'es' ? 'Seguridad de la IA' : 'AI Safety / Security',
    );
    assert.ok(
      $('a[href="https://cursos.saturdays.ai/courses/introduction-to-ai-safety"]').length > 0,
    );
    assert.match(
      $('.prose').text(),
      language === 'es' ? /se imparte en español/ : /taught in Spanish/,
    );
    if (language === 'es') assert.doesNotMatch($('main').text(), /AI Safety|AI Security/);
  }
  if (/^(?:en\/)?(?:index.html|online\/index.html)$/.test(relative)) {
    assert.equal($('.safety-spotlight').length, 1);
    assert.match(
      $('.safety-spotlight').text(),
      language === 'es' ? /Protege lo que importa/ : /Protect what matters/,
    );
    assert.ok(
      $('.safety-spotlight a[href="https://cursos.saturdays.ai/courses/introduction-to-ai-safety"]')
        .length > 0,
    );
  }
  if (/inteligencia-artificial-campo-militar\/index.html$/.test(relative)) {
    assert.match(
      $('.prose').text(),
      language === 'es' ? /experimento mental hipotético/ : /hypothetical thought experiment/,
    );
    assert.match($('.prose').text(), /Royal Aeronautical Society/);
  }
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
