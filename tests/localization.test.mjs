import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { load } from 'cheerio';
import { preferredLanguage, languagePath } from '../src/lib/preferences.mjs';
import { visitStrings } from '../scripts/lib/localization.mjs';
import { indexablePath } from '../src/lib/seo.mjs';

test('language preference respects the visitor choice and browser language priority', () => {
  assert.equal(preferredLanguage('es', ['en-US']), 'es');
  assert.equal(preferredLanguage(null, ['es-MX', 'en']), 'es');
  assert.equal(preferredLanguage(null, ['fr-FR', 'en-GB', 'es']), 'en');
  assert.equal(preferredLanguage('invalid', ['ca-ES', 'es-ES']), 'es');
  assert.equal(preferredLanguage(null, ['ja']), 'en');
  assert.equal(
    languagePath('/saturdaysai-web/en/proyectos/', 'es', '/saturdaysai-web'),
    '/saturdaysai-web/proyectos/',
  );
  assert.equal(
    languagePath('/saturdaysai-web/en/proyectos/', 'en', '/saturdaysai-web'),
    '/saturdaysai-web/en/proyectos/',
  );
});

test('text localization preserves links, code, names, anchors, and literal dollar values', () => {
  const $ = load(
    '<html><head><title>Original</title></head><body><h1 id="intro">Original</h1><p> Before <strong>bold</strong> after. </p><a href="/original/?q=test#intro">Original</a><code>Original</code><span translate="no">AI4ALL IS AI4GOOD</span><span class="author-name">Original</span><input placeholder="Original" data-category="Original"></body></html>',
  );
  visitStrings($, (source, replace) => replace(source === 'Original' ? '$& translated' : source));
  assert.equal($('h1').text(), '$& translated');
  assert.equal($('h1').attr('id'), 'intro');
  assert.equal($('a').attr('href'), '/original/?q=test#intro');
  assert.equal($('code').text(), 'Original');
  assert.equal($('.author-name').text(), 'Original');
  assert.equal($('input').attr('data-category'), 'Original');
  assert.equal($('input').attr('placeholder'), '$& translated');
  assert.equal($('p').text(), ' Before bold after. ');
  const example = load(
    '<body><p>inputs = [doc for doc in examples]</p><p>CountVectorizer</p></body>',
  );
  visitStrings(example, (_, replace) => replace('translated'));
  assert.equal(example('p').eq(0).text(), 'inputs = [doc for doc in examples]');
  assert.equal(example('p').eq(1).text(), 'CountVectorizer');
});

const layout = await fs.readFile('src/layouts/Layout.astro', 'utf8');
const preferenceScript = layout.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
function firstVisit({
  href,
  stored = {},
  languages = ['en-US'],
  dark = false,
  blockedStorage = false,
  userAgent = 'Browser',
}) {
  const current = new URL(href);
  let redirected;
  const html = { dataset: { localized: 'true', base: '/saturdaysai-web' } };
  const storage = { ...stored };
  vm.runInNewContext(preferenceScript, {
    document: { documentElement: html },
    location: {
      pathname: current.pathname,
      search: current.search,
      href: current.href,
      replace: (url) => {
        redirected = url;
      },
    },
    navigator: { languages, userAgent },
    URL,
    URLSearchParams,
    matchMedia: () => ({ matches: dark }),
    localStorage: {
      getItem: (key) => {
        if (blockedStorage) throw new Error('blocked');
        return storage[key];
      },
      setItem: (key, value) => {
        storage[key] = value;
      },
    },
  });
  return { redirected, theme: html.dataset.theme, storage };
}
test('early preference script avoids redirect loops and keeps query and fragment', () => {
  const base = 'https://saturdaysai.github.io/saturdaysai-web';
  assert.equal(firstVisit({ href: base + '/', userAgent: 'Googlebot' }).redirected, undefined);
  assert.equal(
    firstVisit({ href: base + '/proyectos/?q=health#results' }).redirected,
    base + '/en/proyectos/?q=health#results',
  );
  assert.equal(
    firstVisit({ href: base + '/en/proyectos/', stored: { 'saturdays-language': 'es' } })
      .redirected,
    undefined,
  );
  assert.equal(firstVisit({ href: base + '/', languages: ['es-AR'] }).redirected, undefined);
  assert.equal(
    firstVisit({ href: base + '/', stored: { 'saturdays-language': 'es' } }).redirected,
    undefined,
  );
  assert.equal(
    firstVisit({ href: base + '/en/proyectos/?lang=es&q=health#results' }).redirected,
    base + '/proyectos/?q=health#results',
  );
  assert.equal(firstVisit({ href: base + '/', dark: true, blockedStorage: true }).theme, 'dark');
  assert.equal(
    firstVisit({ href: base + '/?lang=es', blockedStorage: true }).redirected,
    undefined,
  );
  assert.equal(
    firstVisit({ href: base + '/', dark: true, stored: { 'saturdays-theme': 'light' } }).theme,
    'light',
  );
});

test('English technical and legal placeholder pages remain excluded from search indexing', () => {
  for (const path of ['/en/admin/', '/en/404/', '/en/terms/', '/en/2025/01/'])
    assert.equal(indexablePath(path), false);
  assert.equal(indexablePath('/saturdaysai-web/en/proyectos/', '/saturdaysai-web'), true);
});
