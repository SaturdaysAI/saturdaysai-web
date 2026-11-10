import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectPublication } from '../scripts/lib/publication-validation.mjs';
const now = new Date('2026-11-01T12:00:00Z');
const entry = (data = {}, body = '![](/media/deleted.png)', collection = 'posts') => ({
  file: 'src/content/' + collection + '/example.md',
  collection,
  body,
  data: { draft: false, pubDate: '2026-10-30', legacyPath: '/example/', ...data },
});

test('deleted images in drafts and future articles do not block a release', async () => {
  let reads = 0;
  const report = await inspectPublication(
    [entry({ draft: true }), entry({ pubDate: '2026-11-03' }), entry({ draft: true }, '', 'pages')],
    async () => {
      reads++;
      return false;
    },
    now,
  );
  assert.equal(reads, 0);
  assert.equal(report.excluded.length, 3);
  assert.deepEqual(report.errors, []);
});

test('a published missing image reports its source file and prevents publication', async () => {
  const report = await inspectPublication([entry()], async () => false, now);
  assert.equal(report.errors.length, 1);
  assert.equal(report.errors[0].file, 'src/content/posts/example.md');
  assert.match(report.errors[0].message, /\/media\/deleted.png/);
});

test('a stale revision date warns for drafts and published articles without blocking them', async () => {
  const date = { updatedDate: '2026-10-29' };
  const report = await inspectPublication(
    [entry(date), entry({ ...date, draft: true })],
    async () => true,
    now,
  );
  assert.equal(report.errors.length, 0);
  assert.equal(report.warnings.length, 2);
  const empty = await inspectPublication([entry({}, '')], async () => true, now);
  assert.match(empty.errors[0].message, /needs content/);
  const invalid = await inspectPublication([entry({ pubDate: 'invalid' })], async () => true, now);
  assert.equal(invalid.errors.length, 1);
  assert.equal(invalid.excluded.length, 0);
});
