import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import YAML from 'yaml';
import { isPublished } from '../src/lib/content-rules.mjs';
import { contentImageSources } from './lib/content-images.mjs';

// Build-only derivatives: originals stay intact and CMS uploads need no manual processing.
const output = 'public/media/responsive';
await fs.mkdir(output, { recursive: true });
const sources = new Set();
const owners = new Map();
sources.add('/brand/logo-orange.webp');
for (const collection of ['posts', 'pages']) {
  for (const name of await fs.readdir(`src/content/${collection}`)) {
    if (!name.endsWith('.md')) continue;
    const text = await fs.readFile(`src/content/${collection}/${name}`, 'utf8');
    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const data = YAML.parse(frontmatter?.[1] || '');
    if (collection === 'posts' && !isPublished(data)) continue;
    for (const src of contentImageSources(text.slice(frontmatter?.[0].length || 0), data?.image)) {
      sources.add(src);
      owners.set(src, [...(owners.get(src) || []), `src/content/${collection}/${name}`]);
    }
  }
}
const site = JSON.parse(await fs.readFile('src/data/site.json', 'utf8'));
sources.add(site.heroImage);
sources.add(site.communityImage);
const cities = JSON.parse(await fs.readFile('src/data/cities.json', 'utf8'));
cities.cities.forEach((city) => {
  if (city.image) sources.add(city.image);
});
const manifest = {};
const publicRoot = path.resolve('public');
const queue = [...sources].filter(
  (src) =>
    typeof src === 'string' &&
    /^\/(media|brand)\/.+\.(webp|png|jpe?g)$/i.test(src) &&
    path.resolve('public', src.slice(1)).startsWith(publicRoot + path.sep),
);
let cursor = 0,
  generated = 0;
const missing = [];
for (const src of queue) {
  try {
    await fs.access(path.join('public', src));
  } catch {
    missing.push(`${src}\n  Used by: ${(owners.get(src) || ['site configuration']).join(', ')}`);
  }
}
if (missing.length)
  throw new Error(`Missing published images. Upload them in Pages CMS or fix their article links:\n${missing.join('\n')}`);
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (cursor < queue.length) {
      const src = queue[cursor++];
      const buffer = await fs.readFile(path.join('public', src));
      const meta = await sharp(buffer).metadata();
      if (!meta.width || !meta.height) continue;
      const rotated = (meta.orientation || 1) >= 5;
      const dimensions = {
        width: rotated ? meta.height : meta.width,
        height: rotated ? meta.width : meta.height,
      };
      const hash = crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 16);
      const variants = [];
      for (const width of src.startsWith('/brand/') ? [200, 400] : [480, 720, 960]) {
        if (width >= dimensions.width) continue;
        const target = `${output}/${hash}-${width}.webp`;
        try {
          await fs.access(target);
        } catch {
          await sharp(buffer)
            .rotate()
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 78, effort: 4 })
            .toFile(target);
          generated++;
        }
        const bytes = (await fs.stat(target)).size;
        if (bytes < buffer.length)
          variants.push({ src: target.replace(/^public/, ''), width, bytes });
      }
      manifest[src] = { ...dimensions, bytes: buffer.length, variants };
    }
  }),
);
await fs.writeFile(`${output}/manifest.json`, JSON.stringify(manifest));
console.log(
  `Responsive images: ${queue.length} originals indexed, ${generated} derivatives generated.`,
);
