import { readFile, writeFile, mkdir } from 'node:fs/promises';
import * as cheerio from 'cheerio';
await mkdir('imports/raw/html', { recursive: true });
const all = [];
for (const type of ['posts', 'pages'])
  all.push(...JSON.parse(await readFile(`imports/raw/all-${type}.json`, 'utf8')));
const meta = { authors: {}, failures: [] };
let next = 0;
async function worker() {
  while (next < all.length) {
    const x = all[next++];
    if (x.id === 12005) continue;
    const file = `imports/raw/html/${x.type}-${x.id}.html`;
    let html;
    try {
      html = await readFile(file, 'utf8');
    } catch {}
    if (!html)
      for (let n = 0; n < 3; n++)
        try {
          const r = await fetch(x.link, { signal: AbortSignal.timeout(25000) });
          if (!r.ok) throw new Error(`${r.status}`);
          html = await r.text();
          await writeFile(file, html);
          break;
        } catch (e) {
          if (n === 2)
            meta.failures.push({ id: x.id, url: x.link, error: e.cause?.code || e.message });
        }
    if (html) {
      const $ = cheerio.load(html);
      const author =
        $('[rel=author]').first().text().trim() || $('meta[name=author]').attr('content');
      if (author) meta.authors[x.id] = author;
    }
    if (next % 25 === 0) console.log('Fetched', next, '/', all.length);
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
await writeFile('imports/raw/public-html-report.json', JSON.stringify(meta, null, 2));
console.log(
  'Complete',
  Object.keys(meta.authors).length,
  'bylines',
  meta.failures.length,
  'failed pages',
);
