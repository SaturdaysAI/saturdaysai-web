import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { load } from 'cheerio';
import { renderMarkdown } from '../src/lib/markdown.mjs';
import { teamLayout } from '../src/lib/editorial-layout.mjs';
import { indexablePath } from '../src/lib/seo.mjs';

test('deep imported headings do not skip levels or renumber existing section links', async () => {
  const { html, toc } = await renderMarkdown(
    '## Programme\n\n##### Team\n\n###### Mentor\n\n## Next',
  );
  const $ = load(html);
  assert.equal($('#section-1')[0].tagName, 'h2');
  assert.equal($('#subsection-1')[0].tagName, 'h3');
  assert.equal($('#subsection-2')[0].tagName, 'h4');
  assert.equal($('#section-2').text(), 'Next');
  assert.deepEqual(
    toc.map((x) => x.id),
    ['section-1', 'section-2'],
  );
});

test('team cards preserve every biography, person, section anchor and profile link', async () => {
  const source = (await fs.readFile('src/content/pages/161-about.md', 'utf8'))
    .split('---')
    .slice(2)
    .join('---');
  const { html } = await renderMarkdown(source);
  const before = load(html);
  const after = load(teamLayout(html));
  assert.equal(after('.about-person').length, 9);
  assert.equal(after('.about-person details').length, 9);
  assert.equal(after('.about-person h3[translate="no"]').length, 9);
  for (const el of before('[id]').toArray())
    assert.equal(after(`[id="${before(el).attr('id')}"]`).length, 1);
  assert.deepEqual(
    after('a')
      .map((_, e) => after(e).attr('href'))
      .get(),
    before('a')
      .map((_, e) => before(e).attr('href'))
      .get(),
  );
  for (const person of after('.about-person').toArray())
    assert.ok(after(person).find('details').text().length > 100);
});

test('thin and duplicate taxonomy archives remain readable but excluded from production indexing', () => {
  for (const route of ['/tag/pycamp/', '/category/2022/', '/en/tag/pycamp/', '/2022/'])
    assert.equal(indexablePath(route), false);
  assert.equal(indexablePath('/tag/codex/'), true);
  assert.equal(indexablePath('/proyectos/'), true);
});
