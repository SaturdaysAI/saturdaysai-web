import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import YAML from 'yaml';
import { isPublished } from '../src/lib/content-rules.mjs';

// Real raster text, using the bundled brand font. SVG foreignObject is not
// supported by social crawlers or by Sharp's SVG renderer.
const output = 'public/social';
const fontfile = 'scripts/assets/Montserrat.ttf';
const logoFile = await fs.readFile('public/brand/logo-orange.webp');
const logo = await sharp(logoFile).resize({ width: 440 }).png().toBuffer();
const site = JSON.parse(await fs.readFile('src/data/site.json', 'utf8'));
const template = await fs.readFile(new URL(import.meta.url));
await fs.mkdir(output, { recursive: true });
const escape = (text) =>
  String(text).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
async function type(text, size, color, maxHeight, weight = 'Bold', width = 1010) {
  for (let fontSize = size; fontSize >= 14; fontSize -= 2) {
    const { data, info } = await sharp({
      text: {
        text: `<span foreground="${color}">${escape(text)}</span>`,
        font: `Montserrat ${weight} ${fontSize}`,
        fontfile,
        width,
        align: 'centre',
        rgba: true,
        spacing: 8,
      },
    })
      .png()
      .toBuffer({ resolveWithObject: true });
    if (info.height <= maxHeight)
      return { input: data, left: Math.round((1200 - info.width) / 2), height: info.height };
  }
  throw new Error('Social card title exceeds the layout budget');
}
async function card(data, general = false) {
  let photo = site.communityImage;
  if (typeof data.image === 'string' && /^\/media\/[\w.-]+\.(webp|png|jpe?g)$/i.test(data.image))
    photo = data.image;
  const photoBytes = await fs.readFile(path.join('public', photo));
  const title = general ? 'Aprende IA.\nCrea impacto real.' : data.title;
  const description = general
    ? 'Una comunidad global. Proyectos para el bien común.'
    : 'Aprende, construye y comparte con nuestra comunidad.';
  const digest = crypto
    .createHash('sha256')
    .update(template)
    .update(logoFile)
    .update(photoBytes)
    .update(JSON.stringify({ title, description, category: data.category }))
    .digest('hex')
    .slice(0, 16);
  const target = `${output}/${digest}.jpg`;
  try {
    await fs.access(target);
    return target.replace(/^public/, '');
  } catch {}
  const titleLayer = await type(title, general ? 66 : 52, '#ffffff', 190);
  const descriptionLayer = await type(description, 25, '#e4f0f7', 60, 'Medium');
  const labelLayer = await type(
    general ? 'AI4ALL IS AI4GOOD' : (data.category || 'Saturdays.AI').toLocaleUpperCase(),
    22,
    '#FF9D5A',
    42,
    'Bold',
  );
  const footerLayer = await type(
    general ? 'APRENDE. CONSTRUYE. COMPARTE.' : 'INTELIGENCIA ARTIFICIAL CON IMPACTO SOCIAL',
    20,
    '#FF9D5A',
    38,
    'Bold',
  );
  const background = await sharp(photoBytes)
    .resize(1200, 630, { fit: 'cover' })
    .blur(1.5)
    .toBuffer();
  const overlay = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 21, g: 30, b: 63, alpha: 0.91 },
    },
  })
    .png()
    .toBuffer();
  await sharp(background)
    .composite([
      { input: overlay },
      { input: logo, left: 380, top: 38 },
      { input: labelLayer.input, left: labelLayer.left, top: 221 },
      {
        input: titleLayer.input,
        left: titleLayer.left,
        top: Math.round(355 - titleLayer.height / 2),
      },
      { input: descriptionLayer.input, left: descriptionLayer.left, top: 484 },
      { input: footerLayer.input, left: footerLayer.left, top: 565 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(target);
  return target.replace(/^public/, '');
}
const manifest = { default: await card({}, true) };
for (const collection of ['posts', 'pages']) {
  for (const file of await fs.readdir(`src/content/${collection}`)) {
    if (!file.endsWith('.md')) continue;
    const text = await fs.readFile(`src/content/${collection}/${file}`, 'utf8');
    const data = YAML.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '');
    if (!data || data.draft || (collection === 'posts' && !isPublished(data))) continue;
    if (data.legacyPath && data.title) manifest[data.legacyPath] = await card(data);
  }
}
await fs.writeFile(`${output}/manifest.json`, JSON.stringify(manifest));
console.log(`Branded social cards: ${Object.keys(manifest).length}, 1200 x 630 JPEG.`);
