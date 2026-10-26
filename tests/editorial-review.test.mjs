import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import {
  editorialDigest,
  hasCurrentEditorialReview,
  applyEditorialNotice,
} from '../scripts/lib/editorial-review.mjs';

function page() {
  return load(
    '<html lang="es"><head><title>Proyecto</title><meta name="description" content="Descripción"></head><body><main><article><h1>Proyecto</h1><div class="reading-body"><div class="prose"><p>Aprender con IA.</p><img src="/photo.webp" alt="Equipo"><a href="/cursos/">Cursos</a><code>score = 0.9</code></div></div></article><section class="related-section">Otra historia</section></main></body></html>',
  );
}
function review($) {
  return {
    version: 1,
    pages: { '/proyecto/': { es: { digest: editorialDigest($), reviewedAt: '2026-10-26' } } },
  };
}
test('only the reviewed version and language lose the automatic translation notice', () => {
  const $ = page();
  assert.equal(applyEditorialNotice($, {}, '/proyecto/', 'es'), 'pending');
  assert.equal($('.translation-notice').length, 1);
  const reviews = review($);
  assert.equal(applyEditorialNotice($, reviews, '/proyecto/', 'es'), 'reviewed');
  assert.equal($('.translation-notice').length, 0);
  assert.equal(hasCurrentEditorialReview($, reviews, '/proyecto/', 'en'), false);
  assert.equal(hasCurrentEditorialReview($, reviews, '/otra/', 'es'), false);
});
test('changes to copy, metadata, code, image descriptions or destinations invalidate review', () => {
  for (const change of [
    ($) => $('p').text('Una afirmación nueva.'),
    ($) => $('h1').text('Otro título'),
    ($) => $('meta[name="description"]').attr('content', 'Otra descripción'),
    ($) => $('img').attr('alt', 'Otro equipo'),
    ($) => $('a').attr('href', '/otro/'),
    ($) => $('code').text('score = 0.99'),
  ]) {
    const $ = page();
    const reviews = review($);
    change($);
    assert.equal(applyEditorialNotice($, reviews, '/proyecto/', 'es'), 'pending');
  }
});
test('layout, whitespace, related stories and the notice itself do not invalidate review', () => {
  const $ = page();
  const reviews = review($);
  $('p').text('Aprender   con IA.');
  $('article').attr('class', 'new-layout');
  $('.related-section').text('Una nueva historia');
  $('.prose').before('<p class="translation-notice">Aviso anterior</p>');
  assert.equal(hasCurrentEditorialReview($, reviews, '/proyecto/', 'es'), true);
});
test('reviewed podcasts retain an accurate recording-language note', () => {
  const $ = page();
  $('article').prepend('<div class="episode-intro"></div>');
  assert.equal(applyEditorialNotice($, review($), '/proyecto/', 'es'), 'reviewed');
  assert.equal($('.translation-notice').length, 0);
  assert.equal(
    $('.original-media-notice').text(),
    'El audio y el vídeo conservan su idioma original.',
  );
});
