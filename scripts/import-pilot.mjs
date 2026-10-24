import { mkdir, writeFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import YAML from 'yaml';
import sharp from 'sharp';
import sanitizeHtml from 'sanitize-html';

const root = new URL('../', import.meta.url);
const api = 'https://saturdays.ai/wp-json/wp/v2/';
const articleIds = [11874, 11833, 11768, 11719, 11664, 11657];
// Public bylines checked on /blog-y-noticias/; the user endpoint requires authentication.
const publicAuthors = {
  11874: 'Raul',
  11833: 'Raul',
  11768: 'Gerard',
  11719: 'Raul',
  11664: 'Adrian Algar',
  11657: 'Miguel Guerrero',
};
const projectSlugs = [
  'hapyness-analisis-de-sentimientos-en-la-poblacion-de-aragon',
  'prediccion-de-zonas-de-desertificacion-en-aragon-usando-ia',
];
const citySeeds = [
  [6044, 'Barcelona', 'Spain', 'Europe', 'barcelona'],
  [1156, 'Madrid', 'Spain', 'Europe', 'madrid'],
  [9954, 'Valencia', 'Spain', 'Europe', 'valencia'],
  [1229, 'Guadalajara', 'Mexico', 'Americas', 'guadalajara'],
  [1331, 'Quito', 'Ecuador', 'Americas', 'quito'],
  [1405, 'Guayaquil', 'Ecuador', 'Americas', 'guayaquil'],
  [9078, 'Monterrey', 'Mexico', 'Americas', 'monterrey-ai'],
  [10033, 'Asunción', 'Paraguay', 'Americas', 'asuncion'],
];
const cleanText = (s) =>
  cheerio
    .load(s || '')
    .text()
    .replaceAll('\u00b7', '-')
    .replace(/\s+/g, ' ')
    .trim();
const provenance = {
  capturedAt: new Date().toISOString(),
  source: 'WordPress public REST API',
  scope: 'Reviewed pilot allowlist only',
  excluded: [
    { type: 'page', id: 12005 },
    { type: 'media', id: 12008 },
  ],
  posts: [],
  cities: [],
  assets: [],
  warnings: [],
};
const images = new Map();
for (const path of ['imports/raw', 'public/media', 'src/content/posts', 'src/data'])
  await mkdir(new URL(path, root), { recursive: true });
async function get(url) {
  let error;
  for (let attempt = 0; attempt < 3; attempt++)
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(45000) });
      if (!res.ok) throw new Error(`${res.status}: ${url}`);
      return res;
    } catch (e) {
      error = e;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  throw error;
}
async function json(path) {
  return (await get(api + path)).json();
}
async function localImage(url) {
  if (!url) return '';
  if (images.has(url)) return images.get(url);
  const parsed = new URL(url);
  if (
    parsed.protocol !== 'https:' ||
    !['saturdays.ai', 'www.saturdays.ai', 'miro.medium.com'].includes(parsed.hostname)
  )
    throw new Error(`Unapproved asset source: ${url}`);
  if (parsed.hostname !== 'miro.medium.com' && !parsed.pathname.startsWith('/wp-content/uploads/'))
    throw new Error(`Unapproved asset path: ${url}`);
  if (!/\.(png|jpe?g|webp|gif)$/i.test(parsed.pathname))
    throw new Error(`Unapproved media format: ${url}`);
  const response = await get(url);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > 15 * 1024 * 1024) throw new Error(`Oversized asset: ${url}`);
  const metadata = await sharp(bytes, { limitInputPixels: 50000000 }).metadata();
  if (!['jpeg', 'png', 'webp', 'gif'].includes(metadata.format))
    throw new Error(`Not an allowed raster image: ${url}`);
  const name = createHash('sha256').update(url).digest('hex').slice(0, 16) + '.webp';
  const output = await sharp(bytes, { animated: false, limitInputPixels: 50000000 })
    .rotate()
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 83 })
    .toBuffer();
  const path = `/media/${name}`;
  await writeFile(new URL(`public${path}`, root), output);
  images.set(url, path);
  provenance.assets.push({
    original: url,
    path,
    bytes: output.length,
    sha256: createHash('sha256').update(output).digest('hex'),
  });
  return path;
}
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});
turndown.use(gfm);
const posts = await Promise.all(
  articleIds.map((id) => json(`posts/${id}?_embed=author,wp:featuredmedia,wp:term`)),
);
for (const slug of projectSlugs) {
  const matches = await json(`posts?slug=${slug}&_embed=author,wp:featuredmedia,wp:term`);
  if (matches.length !== 1) throw new Error(`Expected one project for ${slug}`);
  posts.push(matches[0]);
}
for (const post of posts) {
  if (post.status !== 'publish' || post.id === 12005) throw new Error('Unapproved record');
  const file = new URL(`src/content/posts/${post.slug}.md`, root);
  try {
    await access(file);
    throw new Error(
      `Refusing to overwrite ${post.slug}. Back up authored content before reimporting.`,
    );
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  await writeFile(new URL(`imports/raw/post-${post.id}.json`, root), JSON.stringify(post, null, 2));
  const $ = cheerio.load(post.content.rendered);
  $('script, style, form, input, button, object, embed').remove();
  $('iframe').each((_, el) => {
    const src = $(el).attr('src') || '';
    if (/^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//.test(src))
      $(el).replaceWith($('<p>').append($('<a>').attr('href', src).text('Ver vídeo')));
    else {
      provenance.warnings.push({ post: post.id, type: 'removed-embed', source: src });
      $(el).remove();
    }
  });
  for (const el of $('img').toArray()) {
    const src = $(el).attr('data-src') || $(el).attr('src');
    if (!src) {
      $(el).remove();
      continue;
    }
    try {
      $(el)
        .attr('src', await localImage(src))
        .removeAttr('srcset')
        .removeAttr('sizes');
    } catch (e) {
      provenance.warnings.push({
        post: post.id,
        type: 'image-needs-review',
        source: src,
        reason: e.message,
      });
      $(el).replaceWith(
        $('<a>')
          .attr('href', src)
          .text($(el).attr('alt') || 'Ver imagen original'),
      );
    }
  }
  const sanitized = sanitizeHtml($('body').html() || '', {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'figure',
      'figcaption',
      'h1',
      'h2',
    ]),
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['src', 'alt', 'title'],
      code: ['class'],
      th: ['colspan'],
      td: ['colspan'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
  });
  let markdown = turndown.turndown(sanitized).replaceAll('\u00b7', '-');
  if (/\[(?:caption|gallery|elementor|embed)\b/i.test(markdown))
    provenance.warnings.push({ post: post.id, type: 'shortcode-needs-review' });
  markdown = markdown.replace(/\[\/?caption[^\]]*\]/g, '');
  const featured = post._embedded?.['wp:featuredmedia']?.[0];
  const title = cleanText(post.title.rendered);
  const plain = cleanText(sanitized);
  const terms = post._embedded?.['wp:term']?.flat() || [];
  const kind = articleIds.includes(post.id) ? 'article' : 'project';
  const categories = {
    11874: 'Community',
    11833: 'AI for good',
    11768: 'Build with AI',
    11719: 'AI for good',
    11664: 'Build with AI',
    11657: 'Build with AI',
  };
  const meta = {
    title,
    description: cleanText(post.excerpt.rendered).slice(0, 260) || plain.slice(0, 230),
    pubDate: post.date.slice(0, 10),
    author:
      publicAuthors[post.id] || cleanText(post._embedded?.author?.[0]?.name || 'Saturdays.AI'),
    category: categories[post.id] || 'AI for good',
    kind,
    tags: terms
      .filter((x) => x.taxonomy === 'post_tag')
      .map((x) => cleanText(x.name))
      .slice(0, 8),
    image: featured?.source_url ? await localImage(featured.source_url) : '',
    imageAlt: cleanText(featured?.alt_text) || title,
    legacyPath: new URL(post.link).pathname,
    sourceUrl: post.link,
    sourceId: post.id,
    language: 'es',
    draft: false,
  };
  await writeFile(file, `---\n${YAML.stringify(meta)}---\n\n${markdown}\n`);
  provenance.posts.push({
    id: post.id,
    title,
    path: meta.legacyPath,
    file: `src/content/posts/${post.slug}.md`,
    words: plain.split(/\s+/).length,
  });
  console.log(`Imported ${post.id}: ${title}`);
}
const cities = [];
for (const [id, name, country, region, slug] of citySeeds) {
  const page = await json(`pages/${id}`);
  const $ = cheerio.load(page.content.rendered);
  const src = $('img')
    .toArray()
    .map((el) => $(el).attr('src'))
    .find(
      (src) =>
        src &&
        src.startsWith('https://saturdays.ai/wp-content/uploads/') &&
        /\.(jpe?g|png|webp)$/i.test(src),
    );
  let image = '';
  if (src) {
    try {
      image = await localImage(src);
    } catch (e) {
      provenance.warnings.push({ city: id, reason: e.message });
    }
  }
  const contact = $('a[href^="mailto:"]').first().attr('href') || 'mailto:info@saturdays.ai';
  cities.push({
    name,
    country,
    region,
    slug,
    image,
    contact,
    sourceUrl: page.link,
    description: `Learn artificial intelligence, meet your local community and build projects with social impact in ${name}.`,
    status: 'Contact the team for the next edition',
    draft: false,
  });
  provenance.cities.push({ id, path: new URL(page.link).pathname });
}
await writeFile(new URL('src/data/cities.json', root), JSON.stringify({ cities }, null, 2));
const community = await localImage(
  'https://saturdays.ai/wp-content/uploads/2021/09/DSC_0106-2-scaled.jpg',
);
await writeFile(
  new URL('src/data/site.json', root),
  JSON.stringify(
    {
      heroImage: community,
      communityImage: community,
      heroLine1: 'AI is better',
      heroLine2: 'when we build',
      heroEmphasis: 'together',
      description:
        'Learn artificial intelligence. Build projects that matter. Find your people. That’s Saturdays.AI.',
    },
    null,
    2,
  ),
);
await writeFile(new URL('imports/manifest.json', root), JSON.stringify(provenance, null, 2));
console.log(
  `Complete: ${posts.length} posts, ${cities.length} cities, ${images.size} local images. ${provenance.warnings.length} items need review.`,
);
