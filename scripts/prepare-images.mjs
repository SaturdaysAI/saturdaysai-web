import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import YAML from 'yaml';

// Build-only derivatives: originals stay intact and CMS uploads need no manual processing.
const output = 'public/media/responsive';
await fs.mkdir(output, { recursive: true });
const sources = new Set();
for (const collection of ['posts', 'pages']) {
  for (const name of await fs.readdir(`src/content/${collection}`)) {
    if (!name.endsWith('.md')) continue;
    const text = await fs.readFile(`src/content/${collection}/${name}`, 'utf8');
    const data = YAML.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '');
    if (data?.image) sources.add(data.image);
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
const mediaRoot = path.resolve('public/media');
const queue = [...sources].filter(
  (src) =>
    typeof src === 'string' &&
    /^\/media\/.+\.(webp|png|jpe?g)$/i.test(src) &&
    path.resolve('public', src.slice(1)).startsWith(mediaRoot + path.sep),
);
let cursor = 0,
  generated = 0;
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
      for (const width of [480, 960]) {
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
