import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import { renderMarkdown } from '../src/lib/markdown.mjs';
import { matchesSearch, readFilterState, writeFilterState } from '../src/lib/filter-state.mjs';
import { assertSafeLink, assertPublishedBodies, withBase } from '../src/lib/content-rules.mjs';

test('search tolerates accents and matches multiple words in any order', () => {
  assert.ok(matchesSearch('México: una comunidad de inteligencia artificial', 'ARTIFICIAL mexico'));
  assert.equal(
    matchesSearch('México: una comunidad de inteligencia artificial', 'mexico robotics'),
    false,
  );
  assert.ok(matchesSearch('Any story', '  '));
});

test('shared filter URLs restore topic, year and pagination, preserving unrelated parameters', () => {
  const state = { query: ' visión ', category: 'Projects', year: '2024', limit: 24 };
  const query = writeFilterState('?utm_source=community', state);
  assert.deepEqual(readFilterState(query, ['Projects'], ['2024'], 12, 162), {
    ...state,
    query: 'visión',
  });
  assert.equal(new URLSearchParams(query).get('utm_source'), 'community');
  assert.equal(
    writeFilterState(query, { query: '', category: 'all', year: '', limit: 12 }),
    'utm_source=community',
  );
});

test('unknown filters and malformed page limits cannot hide the archive', () => {
  for (const shown of ['-1', 'NaN', 'Infinity', '1.5', '0']) {
    assert.deepEqual(
      readFilterState(`?topic=missing&year=2099&shown=${shown}`, ['Projects'], ['2024']),
      { query: '', category: 'all', year: '', limit: 12 },
    );
  }
  assert.equal(readFilterState('?shown=99999', [], [], 12, 162).limit, 162);
});

test('renderer preserves section destinations and images while removing empty navigation headings', async () => {
  const { html, toc } = await renderMarkdown(
    '<h2> </h2>\n<h1>Start here</h1>\n<h3><img src="/media/logo.webp" alt="City logo"></h3>\n<h2>Next step</h2>',
    { imageInfo: async () => ({ width: 320, height: 120 }) },
  );
  const $ = load(html);
  assert.equal($('h1').length, 0);
  assert.equal($('h2,h3').length, 2);
  assert.deepEqual(toc, [
    { id: 'section-2', text: 'Start here' },
    { id: 'section-4', text: 'Next step' },
  ]);
  for (const id of ['section-1', 'section-2', 'section-3', 'section-4'])
    assert.equal($(`#${id}`).length, 1);
  assert.equal($('img').attr('width'), '320');
  assert.equal($('img').attr('height'), '120');
  assert.equal($('img').attr('loading'), 'lazy');
});

test('renderer strips active markup but preserves escaped tutorial code and accessible tables', async () => {
  const { html } = await renderMarkdown(
    '<script>alert(1)</script><iframe src="https://example.com"></iframe><img src="/media/a.webp" onerror="alert(1)"><a href="javascript:alert(1)">Bad link</a>\n\n```html\n<script>example()</script>\n```\n\n| Name | Value |\n| --- | --- |\n| AI | 1 |',
  );
  const $ = load(html);
  assert.equal($('script,iframe,[onerror],a[href^="javascript:"]').length, 0);
  assert.match($('pre').text(), /<script>example\(\)<\/script>/);
  assert.equal($('pre').attr('tabindex'), '0');
  assert.equal($('.table-scroll[tabindex="0"] table').length, 1);
});

test('empty links are removed and linked images receive an accessible name', async () => {
  const { html } = await renderMarkdown(
    '<a href="/lost/"> </a><a href="/city/"><img src="/media/city.webp" alt="Madrid community"></a>',
  );
  const $ = load(html);
  assert.equal($('a').length, 1);
  assert.equal($('a').attr('aria-label'), 'Madrid community');
});

test('approved articles require a body while unfinished drafts remain editable', () => {
  const now = new Date('2026-10-24');
  const make = (draft, body) => ({
    data: { draft, pubDate: '2026-01-01', legacyPath: '/2026/01/01/story/' },
    body,
  });
  assert.throws(() => assertPublishedBodies([make(false, ' \n')], now), /Keep Draft enabled/);
  assert.doesNotThrow(() =>
    assertPublishedBodies([make(true, ''), make(false, 'A complete story.')], now),
  );
});

test('editable destinations reject executable URLs, traversal and disguised external paths', () => {
  for (const link of [
    'javascript:alert(1)',
    'data:text/html,hello',
    'http://insecure.example',
    '//outside.example/',
    '/%2foutside.example/',
    '/../admin/',
    '/%2e%2e/admin/',
    '/foo%5cbar',
    'https://user:secret@example.com/',
    '/bad%0aurl',
    'mailto:',
  ])
    assert.throws(() => assertSafeLink(link), link);
  for (const link of [
    '/curso-ia-generativa/',
    'https://cursos.saturdays.ai/',
    'mailto:info@saturdays.ai',
    'tel:+34123456789',
  ])
    assert.doesNotThrow(() => assertSafeLink(link));
  assert.equal(withBase('tel:+34123456789', '/preview'), 'tel:+34123456789');
});
