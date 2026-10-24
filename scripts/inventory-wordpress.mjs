import { mkdir, writeFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';
await mkdir('imports/raw', { recursive: true });
const base = 'https://saturdays.ai/wp-json/wp/v2/';
export async function get(url) {
  let error;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return r;
    } catch (e) {
      error = e;
    }
  }
  throw error;
}
const inventory = { capturedAt: new Date().toISOString(), collections: {} };
for (const type of ['posts', 'pages', 'categories', 'tags', 'comments']) {
  const first = await get(`${base}${type}?per_page=100&page=1`);
  const total = Number(first.headers.get('x-wp-total'));
  const pages = Number(first.headers.get('x-wp-totalpages'));
  const data = await first.json();
  for (let page = 2; page <= pages; page++)
    data.push(...(await (await get(`${base}${type}?per_page=100&page=${page}`)).json()));
  if (data.length !== total) throw new Error(`Incomplete ${type}`);
  await writeFile(`imports/raw/all-${type}.json`, JSON.stringify(data, null, 2));
  inventory.collections[type] = {
    total,
    pages,
    items: data.map((x) => ({
      id: x.id,
      path: x.link ? new URL(x.link).pathname : null,
      title: cheerio.load(x.title?.rendered || x.name || '').text(),
      date: x.date,
      author: x.author,
      categories: x.categories,
      words: cheerio
        .load(x.content?.rendered || '')
        .text()
        .split(/\s+/).length,
    })),
  };
  console.log(type, total);
}
await writeFile('imports/raw/inventory.json', JSON.stringify(inventory, null, 2));
