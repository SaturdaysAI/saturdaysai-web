import test from 'node:test';
import assert from 'node:assert/strict';
import { key, localizedText } from '../scripts/lib/localization.mjs';

test('reviewed Pages CMS edits take precedence over the initial fixed copy', () => {
  const source = 'Build a project';
  const overrides = { [source]: { es: 'Crea un proyecto', en: 'Build a project' } };
  const segment = {
    source,
    es: 'Construye algo con tu comunidad',
    en: 'Build with your community',
    reviewed: true,
  };
  const catalog = new Map([[key(source), segment]]);
  assert.equal(localizedText(catalog, overrides, source, 'es'), segment.es);
  assert.equal(localizedText(catalog, overrides, source, 'en'), segment.en);
  segment.es = 'Aprende creando en equipo';
  assert.equal(localizedText(catalog, overrides, source, 'es'), segment.es);
});

test('unreviewed or missing segments use the editorial fallback, then the translation', () => {
  const source = 'An introduction';
  const catalog = new Map([
    [key(source), { source, es: 'Una introducción', en: '', reviewed: false }],
  ]);
  assert.equal(localizedText(catalog, {}, source, 'es'), 'Una introducción');
  assert.equal(localizedText(catalog, {}, source, 'en'), undefined);
  assert.equal(
    localizedText(catalog, { [source]: { es: 'Empieza aquí' } }, source, 'es'),
    'Empieza aquí',
  );
  assert.equal(localizedText(catalog, {}, 'Unknown', 'es'), undefined);
});

test('an explicitly reviewed empty segment remains empty', () => {
  const source = 'Obsolete label';
  const catalog = new Map([[key(source), { source, es: '', reviewed: true }]]);
  assert.equal(localizedText(catalog, { [source]: { es: 'Texto anterior' } }, source, 'es'), '');
});
