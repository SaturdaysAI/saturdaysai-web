import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import * as cheerio from 'cheerio';
import sanitizeHtml from 'sanitize-html';
import Turndown from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import YAML from 'yaml';
import sharp from 'sharp';
const manifest = JSON.parse(await readFile('imports/manifest.json', 'utf8'));
const raw = JSON.parse(await readFile('imports/raw/all-posts.json', 'utf8'));
const assets = new Map(manifest.assets.map((x) => [x.original, x.path]));
const td = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
td.use(gfm);
for (const original of raw.filter((x) => /<xmp/.test(x.content.rendered))) {
  const file = manifest.posts.find((p) => p.id === original.id).file;
  const old = await readFile(file, 'utf8');
  const header = old.match(/^---[\s\S]*?\n---/)[0];
  const $ = cheerio.load(original.content.rendered);
  $('xmp').each((_, e) => $(e).parent('code').text($(e).text()));
  $('script,style,form,input,button,object,embed').remove();
  $('iframe').each((_, e) =>
    $(e).replaceWith($('<p>').append($('<a>').attr('href', $(e).attr('src')).text('Ver vídeo'))),
  );
  $('img').each((_, e) => {
    const src = $(e).attr('data-src') || $(e).attr('src');
    if (assets.has(src)) $(e).attr('src', assets.get(src));
    else throw new Error(`Missing code-article image ${src}`);
  });
  const html = sanitizeHtml($('body').html(), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'h1']),
    allowedAttributes: { a: ['href', 'title'], img: ['src', 'alt'], code: ['class'] },
    allowedSchemes: ['https', 'http', 'mailto'],
  });
  await writeFile(file, header + '\n\n' + td.turndown(html).replaceAll('\u00b7', '-') + '\n');
}
for (const entry of [...manifest.posts, ...manifest.pages]) {
  let text = await readFile(entry.file, 'utf8');
  text = text
    .replace(
      /!\[([^\]]+)\]\((https:\/\/medium.com\/saturdays-ai[^)]*|https:\/\/saturdays.ai\/20[^)]*)\)/g,
      '! [$1]($2)',
    )
    .replace(/\]\(\/@/g, '](https://medium.com/@');
  // Empty links are legacy builder controls with no useful label.
  text = text.replace(/(?<!!)\[\]\([^\n)]*\)/g, '');
  await writeFile(entry.file, text);
}
// Preserve date archive routes referenced by the old website as well as category/tag archives.
let taxonomies = JSON.parse(await readFile('src/data/taxonomies.json', 'utf8')).filter(
  (t) => t.type !== 'date',
);
const dates = new Map();
for (const post of raw) {
  for (const path of [
    post.link.match(/saturdays.ai(\/\d{4}\/)/)?.[1],
    post.link.match(/saturdays.ai(\/\d{4}\/\d{2}\/)/)?.[1],
  ]) {
    if (path) {
      if (!dates.has(path)) dates.set(path, []);
      dates.get(path).push(post.id);
    }
  }
}
for (const [path, postIds] of dates)
  taxonomies.push({
    id: 0,
    title: path.split('/').filter(Boolean).join(' / '),
    path,
    type: 'date',
    postIds,
  });
await writeFile('src/data/taxonomies.json', JSON.stringify(taxonomies, null, 2));
await mkdir('public/brand/cities', { recursive: true });
const cityData = JSON.parse(await readFile('src/data/cities.json', 'utf8'));
for (const f of await readdir('artifacts/brand/cities')) {
  const slug = f.replace(/\.png$/, '');
  try {
    await sharp(`artifacts/brand/cities/${f}`)
      .trim()
      .resize({ width: 400, height: 260, fit: 'inside' })
      .webp({ lossless: true })
      .toFile(`public/brand/cities/${slug}.webp`);
    const city = cityData.cities.find((c) => c.slug === slug);
    if (city) city.logo = `/brand/cities/${slug}.webp`;
  } catch (e) {
    console.log('Logo unavailable', slug, e.message);
  }
}
for (const city of cityData.cities) city.logo ||= '';
await writeFile('src/data/cities.json', JSON.stringify(cityData, null, 2));
const comments = JSON.parse(await readFile('imports/raw/all-comments.json', 'utf8')).map((c) => ({
  id: c.id,
  postId: c.post,
  author: c.author_name,
  date: c.date,
  body: cheerio.load(c.content.rendered).text().trim(),
}));
await writeFile('src/data/comments.json', JSON.stringify(comments, null, 2));
manifest.comments = comments.map((c) => ({ id: c.id, postId: c.postId }));
manifest.reviewedLimitations = [
  'Six original image URLs unavailable (see warnings). Links/captions preserved.',
  'LMS accounts, course enrolment, external forms and external media remain on their providers.',
  'Two translated homepage records are empty at source; retained as language entry pages.',
  'Original /terms/ and /privacy-policy/ contain placeholder copy; preserved, with the substantive policy available at /privacy-policy-2/.',
];
await writeFile('imports/manifest.json', JSON.stringify(manifest, null, 2));
console.log('Code blocks, links, date archives, comments, and city branding refined.');
