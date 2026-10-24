import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import * as cheerio from 'cheerio';
import YAML from 'yaml';
const manifest = JSON.parse(await readFile('imports/manifest.json', 'utf8'));
const approvedHosts = ['saturdays.ai', 'www.saturdays.ai', 'miro.medium.com'];
async function image(url) {
  const existing = manifest.assets.find((a) => a.original === url);
  if (existing) return existing.path;
  const u = new URL(url);
  if (u.protocol !== 'https:' || !approvedHosts.includes(u.hostname))
    throw Error(`Unapproved host: ${u.hostname}`);
  let last;
  for (let attempt = 0; attempt < 3; attempt++)
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw Error(`HTTP ${r.status}`);
      const bytes = Buffer.from(await r.arrayBuffer());
      if (bytes.length > 15 * 1024 * 1024) throw Error('Oversized media');
      const metadata = await sharp(bytes, { limitInputPixels: 50000000 }).metadata();
      if (!['jpeg', 'png', 'webp', 'gif'].includes(metadata.format))
        throw Error(`Not a permitted raster: ${metadata.format}`);
      const output = await sharp(bytes)
        .rotate()
        .resize({ width: 1440, withoutEnlargement: true })
        .webp({ quality: 83 })
        .toBuffer();
      const name = createHash('sha256').update(url).digest('hex').slice(0, 16) + '.webp';
      const path = `/media/${name}`;
      await writeFile(`public${path}`, output);
      manifest.assets.push({
        original: url,
        path,
        bytes: output.length,
        sha256: createHash('sha256').update(output).digest('hex'),
      });
      return path;
    } catch (e) {
      last = e;
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  throw last;
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const remaining = [];
for (const warning of manifest.warnings.filter((w) => w.post)) {
  try {
    if (!warning.source) throw Error('Manual review needed');
    const path = await image(warning.source);
    const record = manifest.posts.find((p) => p.id === warning.post);
    let md = await readFile(record.file, 'utf8');
    md = md.replace(
      new RegExp(`\\[([^\\n]*?)\\]\\(${esc(warning.source)}\\)`, 'g'),
      (_, alt) => `![${alt === 'Ver imagen original' ? '' : alt}](${path})`,
    );
    await writeFile(record.file, md);
  } catch (e) {
    remaining.push({ ...warning, reason: e.message });
  }
}
const cityData = JSON.parse(await readFile('src/data/cities.json', 'utf8'));
const cities = Array.isArray(cityData) ? cityData : cityData.cities;
for (const city of cities)
  try {
    const r = await fetch(`https://saturdays.ai/wp-json/wp/v2/pages?slug=${city.slug}`);
    if (!r.ok) throw Error(`HTTP ${r.status}`);
    const pages = await r.json();
    const $ = cheerio.load(pages[0].content.rendered);
    const sources = $('img')
      .toArray()
      .map((el) => $(el).attr('src'))
      .filter(
        (src) =>
          src &&
          approvedHosts.includes(new URL(src).hostname) &&
          /\.(jpe?g|png|webp)$/i.test(new URL(src).pathname),
      );
    if (sources.length) city.image = await image(sources[0]);
  } catch (e) {
    remaining.push({ city: city.slug, reason: e.message });
  }
await writeFile('src/data/cities.json', JSON.stringify({ cities }, null, 2));
for (const record of manifest.posts) {
  let md = await readFile(record.file, 'utf8');
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const meta = YAML.parse(match[1]);
  if (!meta.image) {
    const first = md.slice(match[0].length).match(/!\[[^\]]*\]\((\/media\/[^)]+)\)/);
    if (first) {
      meta.image = first[1];
      meta.imageAlt = meta.title;
      md = `---\n${YAML.stringify(meta)}---\n` + md.slice(match[0].length);
      await writeFile(record.file, md);
    }
  }
}
manifest.warnings = remaining;
manifest.reviewedMediaHosts = approvedHosts;
await writeFile('imports/manifest.json', JSON.stringify(manifest, null, 2));
console.log(
  JSON.stringify({ localImages: manifest.assets.length, remainingWarnings: remaining }, null, 2),
);
