import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const cards = JSON.parse(await fs.readFile('public/social/manifest.json', 'utf8'));
for (const source of new Set(Object.values(cards))) {
  const buffer = await fs.readFile(`dist${source}`);
  const meta = await sharp(buffer).metadata();
  assert.equal(meta.width, 1200, source);
  assert.equal(meta.height, 630, source);
  assert.equal(meta.format, 'jpeg', source);
  assert.ok(buffer.length < 300_000, `${source}: oversized sharing image`);
  // Catch the original regression: a valid image that contains no rendered
  // brand or text. The dark photo background cannot satisfy these checks.
  const { data, info } = await sharp(buffer).raw().toBuffer({ resolveWithObject: true });
  let logoPixels = 0,
    textPixels = 0;
  for (let y = 38; y < 455; y++) {
    for (let x = 95; x < 1105; x++) {
      const i = (y * info.width + x) * info.channels;
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      if (y < 204 && x >= 380 && x < 820 && r > 200 && g > 100 && g < 210 && b < 155) logoPixels++;
      if (y > 250 && r > 220 && g > 220 && b > 220) textPixels++;
    }
  }
  assert.ok(logoPixels > 1500, `${source}: missing visible brand`);
  assert.ok(textPixels > 1500, `${source}: missing visible title`);
}
console.log(
  `Social card raster verification passed: ${Object.keys(cards).length} cards, visible brand and title.`,
);
