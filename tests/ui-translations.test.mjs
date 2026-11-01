import test from 'node:test';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
import { localizedText, visitStrings } from '../scripts/lib/localization.mjs';
import { uiTranslation } from '../scripts/lib/ui-translations.mjs';

test('publishing and withdrawing articles changes counts without new translation entries', () => {
  for (const n of [0, 1, 163, 164, 9999]) {
    for (const kind of [
      'stories',
      'community projects',
      'resources',
      'learning paths',
      'communities',
      'episodes',
      'stories, projects and conversations',
    ]) {
      for (const language of ['es', 'en']) {
        assert.ok(localizedText(new Map(), {}, `${n} ${kind} to explore.`, language));
      }
    }
  }
  assert.equal(uiTranslation('163 stories to explore.', 'es'), '163 historias por descubrir.');
  assert.equal(uiTranslation('1 stories to explore.', 'en'), '1 story to explore.');
});

test('new publication dates and reading times use deterministic bilingual formatting', () => {
  assert.equal(uiTranslation('123 min read', 'es'), '123 min de lectura');
  assert.equal(uiTranslation('Season 9 / Episode 32', 'es'), 'Temporada 9 / Episodio 32');
  assert.equal(
    uiTranslation(
      'Una historia de la comunidad Saturdays.AI. Publicada originalmente el 3 nov 2026.',
      'en',
    ),
    'A story from the Saturdays.AI community. Originally published on Nov 3, 2026.',
  );
  assert.equal(
    uiTranslation(
      'A story from the Saturdays.AI community. Originally published on Jan 5, 2027.',
      'es',
    ),
    'Una historia de la comunidad Saturdays.AI. Publicada originalmente el 5 ene 2027.',
  );
  const strings = [];
  visitStrings(
    load(
      '<body><time datetime="2026-11-03">Nov 3, 2026</time><span data-reading-minutes="123">123 min read</span></body>',
    ),
    (source) => strings.push(source),
  );
  assert.deepEqual(
    strings,
    [],
    'values formatted from attributes do not enter the translation catalog',
  );
});

test('unknown editorial text is still rejected by translation coverage', () => {
  assert.equal(localizedText(new Map(), {}, 'An entirely new article paragraph.', 'es'), undefined);
  assert.equal(uiTranslation('99 arbitrary things to explore.', 'es'), undefined);
  assert.equal(uiTranslation('99 constructor to explore.', 'es'), undefined);
  assert.equal(
    uiTranslation(
      'Una historia de la comunidad Saturdays.AI. Publicada originalmente el 31 feb 2027.',
      'en',
    ),
    undefined,
  );
});
