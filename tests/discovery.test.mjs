import test from 'node:test';
import assert from 'node:assert/strict';
import { relatedPosts } from '../src/lib/recommendations.mjs';
import { mediaProvider, findMedia, episodeInfo } from '../src/lib/media.mjs';
import { indexablePath, breadcrumbSchema, structuredJSON } from '../src/lib/seo.mjs';
import { renderMarkdown } from '../src/lib/markdown.mjs';
import { assertPublishedBodies } from '../src/lib/content-rules.mjs';
const now = new Date('2026-10-24T12:00:00Z');
const entry = (id, overrides = {}) => ({
  id,
  body: 'Article text.',
  data: {
    title: id,
    draft: false,
    pubDate: '2025-01-01',
    language: 'es',
    category: 'Community',
    kind: 'article',
    tags: [],
    legacyPath: `/2025/01/01/${id}/`,
    ...overrides,
  },
});

test('recommendations rank shared specific topics, exclude current, draft and future entries', () => {
  const current = entry('current', { tags: ['ética', 'IA'] });
  const meaningful = entry('relevant', { tags: ['etica'], category: 'AI for good' });
  const newer = entry('recent', { pubDate: '2026-01-01', tags: ['IA'] });
  const draft = entry('draft', { draft: true, tags: ['ética'] });
  const future = entry('future', { pubDate: '2099-01-01', tags: ['ética'] });
  assert.deepEqual(
    relatedPosts(current, [current, newer, draft, future, meaningful], 3, now).map((x) => x.id),
    ['relevant', 'recent'],
  );
});

test('podcast recommendations stay in the podcast and break ties by date', () => {
  const current = entry('current', { category: 'Podcast' });
  assert.deepEqual(
    relatedPosts(
      current,
      [
        entry('news'),
        entry('old', { category: 'Podcast' }),
        entry('new', { category: 'Podcast', pubDate: '2026-01-01' }),
      ],
      3,
      now,
    ).map((x) => x.id),
    ['new', 'old'],
  );
});

test('media embeds allow only approved HTTPS player endpoints', () => {
  for (const url of [
    'javascript:alert(1)',
    'http://embed.acast.com/example',
    'https://embed.acast.com.evil.test/player',
    'https://embed.acast.com:8443/player',
    'https://user:pass@embed.acast.com/player',
    'https://www.youtube.com/watch?v=123',
  ])
    assert.equal(mediaProvider(url), null);
  assert.equal(
    mediaProvider('https://www.youtube.com/embed/abc-123').src,
    'https://www.youtube-nocookie.com/embed/abc-123',
  );
  assert.equal(findMedia('[Listen](https://embed.acast.com/show/episode)').name, 'Acast');
  assert.equal(findMedia('No player in this article.'), null);
});

test('legacy episode title formats yield stable season and episode labels', () => {
  for (const [title, season, episode] of [
    ['Podcast 1×01: Guest', 1, 1],
    ['T1/E02: Guest', 1, 2],
    ['Podcast T04-E03', 4, 3],
    ['T4/E1', 4, 1],
    ['Podcast T5-E01', 5, 1],
  ])
    assert.deepEqual(episodeInfo(title), { season, episode });
  assert.equal(episodeInfo('An ordinary story'), null);
});

test('SEO excludes utility and date archive URLs at either hosting prefix', () => {
  for (const base of ['/', '/saturdaysai-web/']) {
    const prefix = base.replace(/\/$/, '');
    for (const route of ['/admin/', '/404/', '/terms/', '/privacy-policy/', '/2025/', '/2025/01/'])
      assert.equal(indexablePath(prefix + route, base), false);
    for (const route of [
      '/',
      '/podcast/',
      '/2025/01/20/story/',
      '/category/podcast/',
      '/privacy-policy-2/',
    ])
      assert.equal(indexablePath(prefix + route, base), true);
  }
  const data = breadcrumbSchema([
    { name: 'Home', url: 'https://example.com/' },
    { name: 'A </script> title', url: 'https://example.com/article/' },
  ]);
  assert.equal(data.itemListElement[1].position, 2);
  assert.doesNotMatch(structuredJSON(data), /<\/script>/);
  assert.deepEqual(JSON.parse(structuredJSON(data)), data);
});

test('duplicate cover removal preserves linked images, captions and other pictures', async () => {
  const options = {
    leadImage: '/media/cover.webp',
    rewrite: (value) => (value.startsWith('/') ? `/preview${value}` : value),
  };
  const duplicate = await renderMarkdown(
    '![Cover](/media/cover.webp)\n\nEpisode description.',
    options,
  );
  assert.doesNotMatch(duplicate.html, /<img/);
  for (const body of [
    '[![Cover](/media/cover.webp)](https://example.com/)',
    '![Cover](/media/cover.webp)\nCaption.',
    '![Other](/media/other.webp)',
  ])
    assert.match((await renderMarkdown(body, options)).html, /<img/);
});

test('published update dates must reflect an actual update after publication', () => {
  for (const updatedDate of ['invalid', '2024-01-01', '2099-01-01'])
    assert.throws(
      () => assertPublishedBodies([entry('story', { updatedDate })], now),
      /Invalid update date/,
    );
  assert.doesNotThrow(() =>
    assertPublishedBodies([entry('story', { updatedDate: '2026-10-23' })], now),
  );
  assert.doesNotThrow(() =>
    assertPublishedBodies([entry('draft', { draft: true, updatedDate: '2099-01-01' })], now),
  );
});
