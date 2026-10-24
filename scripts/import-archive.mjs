import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import * as cheerio from 'cheerio';
import Turndown from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import YAML from 'yaml';
import sharp from 'sharp';
import sanitizeHtml from 'sanitize-html';
const readJSON = async (p) => JSON.parse(await readFile(p, 'utf8'));
const posts = await readJSON('imports/raw/all-posts.json'),
  pages = await readJSON('imports/raw/all-pages.json');
const categories = await readJSON('imports/raw/all-categories.json'),
  tags = await readJSON('imports/raw/all-tags.json');
const previous = await readJSON('imports/manifest.json');
const report = {
  capturedAt: new Date().toISOString(),
  source: 'Public WordPress REST API and rendered pages',
  scope: 'All 162 published posts and 63 legitimate published pages',
  excluded: [
    { type: 'page', id: 12005, reason: 'Unrelated pharmaceutical spam' },
    { type: 'media', id: 12008, reason: 'Unrelated pharmaceutical spam PDF' },
  ],
  removedInjections: [],
  posts: [],
  pages: [],
  cities: [],
  assets: previous.assets,
  warnings: [],
  redactions: [],
  embeds: [],
};
const assets = new Map(previous.assets.map((x) => [x.original, x.path]));
const spam = /comprar-tramadol|comprar-zolpidem|sin-receta|viagra|casino-online/i;
// Pricing and economic information are removed from pages only. Blog bodies are preserved.
const economic =
  /[€$£]|\b(?:prices?|pricing|fees?|discounts?|earlybird|financial aid|donat\w*|gratis|gratuit[ao]s?|cost[oes]?s?|precio[s]?|descuento[s]?|pag[oa]s?|becas?|financi\w*|econ[oó]mi\w*|rentab\w*|euros?|d[oó]lares?|cuotas?|reembols\w*|patrocin\w*|sponsor\w*)\b/i;
const imageHosts = new Set([
  'saturdays.ai',
  'www.saturdays.ai',
  'miro.medium.com',
  'cdn-images-1.medium.com',
  'media.licdn.com',
  'image.lexica.art',
  'www.caracteristicas.co',
  'www.technologyreview.es',
  'static1.abc.es',
  'pbs.twimg.com',
  'images.pexels.com',
  'live.staticflickr.com',
  'www.elisapolystar.com',
  'lh3.googleusercontent.com',
  'st3.idealista.com',
  'res.cloudinary.com',
  'www.jotform.com',
  's.w.org',
]);
const clean = (s) =>
  cheerio
    .load(s || '')
    .text()
    .replaceAll('\u00b7', '-')
    .replace(/\s+/g, ' ')
    .trim();
const td = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
td.use(gfm);
await mkdir('src/content/pages', { recursive: true });
await mkdir('public/media', { recursive: true });
async function get(url) {
  let error;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) throw new Error(`${r.status}`);
      return r;
    } catch (e) {
      error = e;
    }
  }
  throw error;
}
let media;
try {
  media = await readJSON('imports/raw/all-media.json');
} catch {
  media = [];
  let totalPages = 1;
  for (let i = 1; i <= totalPages; i++) {
    let r = await get(`https://saturdays.ai/wp-json/wp/v2/media?per_page=100&page=${i}`);
    totalPages = Number(r.headers.get('x-wp-totalpages'));
    media.push(...(await r.json()));
  }
  await writeFile('imports/raw/all-media.json', JSON.stringify(media));
}
const byId = new Map(media.map((x) => [x.id, x]));
const inFlight = new Map();
async function localAsset(source) {
  if (!source) return '';
  let u;
  try {
    u = new URL(source, 'https://saturdays.ai');
  } catch {
    return '';
  }
  if (spam.test(u.href)) return '';
  if (u.protocol === 'http:') u.protocol = 'https:';
  const key = u.href;
  if (assets.has(source)) return assets.get(source);
  if (assets.has(key)) return assets.get(key);
  if (!imageHosts.has(u.hostname)) throw new Error(`Unreviewed media host ${u.hostname}`);
  if (inFlight.has(key)) return inFlight.get(key);
  const task = (async () => {
    let bytes;
    try {
      const r = await get(key);
      bytes = Buffer.from(await r.arrayBuffer());
    } catch (e) {
      const stem = u.pathname
        .split('/')
        .pop()
        .replace(/-\d+x\d+(?=\.[^.]+$)/, '');
      const mirror = media.find(
        (x) => x.id !== 12008 && x.source_url?.split('/').pop() === stem && x.source_url !== key,
      );
      if (mirror) {
        const result = await localAsset(mirror.source_url);
        assets.set(key, result);
        return result;
      }
      throw e;
    }
    if (bytes.length > 30 * 1024 * 1024) throw new Error('Media exceeds 30 MB');
    const name = createHash('sha256').update(key).digest('hex').slice(0, 16);
    const isPdf = bytes.subarray(0, 5).toString() === '%PDF-';
    let output, extension;
    if (isPdf) {
      output = bytes;
      extension = 'pdf';
    } else {
      if (/<svg[\s>]/i.test(bytes.subarray(0, 3000).toString())) {
        const xml = cheerio.load(bytes.toString(), { xmlMode: true });
        xml('script,foreignObject,style,animate,set,image,use').remove();
        xml('*').each((_, e) => {
          for (const a of Object.keys(e.attribs || {}))
            if (/^on/i.test(a) || /href/i.test(a)) xml(e).removeAttr(a);
        });
        bytes = Buffer.from(xml.xml());
      }
      const image = sharp(bytes, { limitInputPixels: 80000000 });
      const m = await image.metadata();
      if (!['jpeg', 'png', 'webp', 'gif', 'svg', 'avif'].includes(m.format))
        throw new Error(`Unsupported media ${m.format}`);
      output = await image
        .rotate()
        .resize({ width: 1440, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      extension = 'webp';
    }
    const path = `/media/${name}.${extension}`;
    await writeFile(`public${path}`, output);
    assets.set(key, path);
    report.assets.push({
      original: key,
      path,
      bytes: output.length,
      sha256: createHash('sha256').update(output).digest('hex'),
    });
    return path;
  })();
  inFlight.set(key, task);
  return task;
}
const citySeeds = [
  [6044, 'Barcelona', 'Spain', 'Europe', 'barcelona'],
  [1156, 'Madrid', 'Spain', 'Europe', 'madrid'],
  [9954, 'Valencia', 'Spain', 'Europe', 'valencia'],
  [1229, 'Guadalajara', 'Mexico', 'Americas', 'guadalajara'],
  [1331, 'Quito', 'Ecuador', 'Americas', 'quito'],
  [1405, 'Guayaquil', 'Ecuador', 'Americas', 'guayaquil'],
  [9078, 'Monterrey', 'Mexico', 'Americas', 'monterrey-ai'],
  [10033, 'Asunción', 'Paraguay', 'Americas', 'asuncion'],
  [8523, 'Alicante', 'Spain', 'Europe', 'alicante'],
  [7999, 'Honduras', 'Honduras', 'Americas', 'honduras'],
  [5652, 'Copenhagen', 'Denmark', 'Europe', 'copenhagen'],
  [4409, 'Santiago de Compostela', 'Spain', 'Europe', 'santiago-de-compostela'],
  [2623, 'Zaragoza', 'Spain', 'Europe', 'zaragoza'],
  [2617, 'Castellón', 'Spain', 'Europe', 'castellon'],
  [2028, 'Cochabamba', 'Bolivia', 'Americas', 'cochabamba'],
  [1403, 'La Paz', 'Bolivia', 'Americas', 'la-paz'],
  [1401, 'Costa Rica', 'Costa Rica', 'Americas', 'costa-rica'],
  [1397, 'Mallorca', 'Spain', 'Europe', 'mallorca'],
  [1301, 'Asturias', 'Spain', 'Europe', 'asturias'],
  [1287, 'Murcia', 'Spain', 'Europe', 'murcia'],
  [1269, 'Tarragona', 'Spain', 'Europe', 'tarragona'],
  [1268, 'Donostia', 'Spain', 'Europe', 'donostia'],
  [1161, 'Bilbao', 'Spain', 'Europe', 'bilbao'],
];
const specialPaths = new Set([
  '/',
  '/cities/',
  '/online/',
  '/blog-y-noticias/',
  '/proyectos/',
  '/podcast/',
]);
const aliasTargets = {
  '/blog/': '/blog-y-noticias/',
  '/noticias/': '/blog-y-noticias/',
  '/services/': '/online/',
  '/en/learn-ai-build-projects-english/': '/',
  '/pt/learn-ai-build-projects-portugues/': '/',
};
let authors = {};
try {
  authors = (await readJSON('imports/raw/public-html-report.json')).authors;
} catch {}
const pageSources = [];
async function convert(x) {
  const isPost = x.type === 'post';
  const path = new URL(x.link).pathname;
  let source = x.content.rendered;
  let publicHtml = '';
  try {
    publicHtml = await readFile(`imports/raw/html/${x.type}-${x.id}.html`, 'utf8');
  } catch {}
  const visible = cheerio.load(publicHtml);
  if (!clean(source) && publicHtml) {
    const el = visible(`[data-elementor-id="${x.id}"]`).first();
    source = el.html() || visible('main .entry-content').html() || '';
  }
  const $ = cheerio.load(source);
  // Elementor code blocks use xmp. Preserve these as escaped code before sanitizing active HTML.
  $('xmp').each((_, e) => {
    const content = $(e).text();
    const parent = $(e).parent();
    if (parent.is('code')) parent.text(content);
    else $(e).replaceWith($('<pre>').append($('<code>').text(content)));
  });
  $('script,style,form,input,button,object,embed,noscript,svg').remove();
  $('a').each((_, e) => {
    if (spam.test($(e).attr('href') || '')) {
      report.removedInjections.push({ id: x.id, type: 'spam-link' });
      $(e).remove();
    }
  });
  if (!isPost) {
    // Remove old dynamic listing widgets; dedicated archive pages render the complete collection.
    $('.elementor-widget-posts,.elementor-widget-loop-grid,.elementor-widget-shortcode').remove();
    // Split line-separated facts before redaction so schedule and curriculum survive pricing removal.
    $('p,li').each((_, e) => {
      if ($(e).find('br').length)
        $(e).html(($(e).html() || '').replace(/<br\s*\/?\s*>/gi, '</p><p>'));
    });
    $('p,li,h1,h2,h3,h4,h5,h6,a,span,td,th,strong,b')
      .toArray()
      .reverse()
      .forEach((e) => {
        const t = clean($(e).text());
        if (t && economic.test(t)) {
          report.redactions.push({ id: x.id, text: t.slice(0, 280) });
          $(e).remove();
        }
      });
    // Catch isolated text nodes that Elementor placed directly in wrappers.
    $('*')
      .contents()
      .each((_, e) => {
        if (e.type === 'text' && economic.test(e.data || '')) {
          report.redactions.push({ id: x.id, text: clean(e.data).slice(0, 280) });
          $(e).remove();
        }
      });
    $('a[href]').each((_, e) => {
      if (/donat|checkout|stripe\.com|paypal|patreon|buy\./i.test($(e).attr('href') || ''))
        $(e).remove();
    });
  }
  $('iframe').each((_, e) => {
    let href = $(e).attr('src') || $(e).attr('data-src') || '';
    if (href.startsWith('//')) href = 'https:' + href;
    if (/^https?:/.test(href) && !spam.test(href)) {
      report.embeds.push({ id: x.id, url: href });
      $(e).replaceWith(
        $('<p>').append(
          $('<a>')
            .attr('href', href)
            .text(isPost ? 'Abrir vídeo o recurso' : 'Open media or resource'),
        ),
      );
    } else $(e).remove();
  });
  // Preserve supported media and document references locally, with a recorded fallback for unavailable sources.
  for (const e of $('img').toArray()) {
    const src = $(e).attr('data-src') || $(e).attr('src');
    if (!src || src.startsWith('data:')) {
      $(e).remove();
      continue;
    }
    if (/s\.w\.org\/images\/core\/emoji/.test(src)) {
      $(e).replaceWith($(e).attr('alt') || '');
      continue;
    }
    try {
      const local = await localAsset(src);
      if (local) $(e).attr('src', local);
      else $(e).remove();
    } catch (error) {
      report.warnings.push({
        id: x.id,
        type: 'unavailable-image',
        source: src,
        error: error.cause?.code || error.message,
      });
      $(e).replaceWith(
        $('<a>')
          .attr('href', src)
          .text($(e).attr('alt') || 'Original image'),
      );
    }
  }
  for (const e of $('a[href]').toArray()) {
    const href = $(e).attr('href') || '';
    if (/^https?:\/\/(www\.)?saturdays.ai\/wp-content\/uploads\//.test(href) && !spam.test(href)) {
      try {
        $(e).attr('href', await localAsset(href));
      } catch (error) {
        report.warnings.push({
          id: x.id,
          type: 'unavailable-attachment',
          source: href,
          error: error.cause?.code || error.message,
        });
      }
    }
  }
  const html = sanitizeHtml($('body').html() || '', {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'h1']),
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['src', 'alt', 'title'],
      code: ['class'],
      th: ['colspan'],
      td: ['colspan'],
    },
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
  });
  const markdown = td
    .turndown(html)
    .replaceAll('\u00b7', '-')
    .replace(/\[\/?(?:caption|embed)[^\]]*\]/g, '')
    .replace(/\[(?:elementor-template|contact-form-7|wpforms)[^\]]*\]/g, '')
    .replace(
      /!\[([^\]]+)\]\((https:\/\/medium.com\/saturdays-ai[^)]*|https:\/\/saturdays.ai\/20[^)]*)\)/g,
      '! [$1]($2)',
    )
    .replace(/\]\(\/@/g, '](https://medium.com/@')
    .trim();
  const title = clean(x.title.rendered)
    .replace(isPost ? /$^/ : /\s*(?:GRATIS|Premium)\s*/gi, ' ')
    .trim();
  const excerpt = clean(isPost ? x.excerpt.rendered : html)
    .replace(/\[&hellip;\]|\[\.\.\.\]/g, '')
    .trim();
  const description =
    (excerpt.length > 230 ? excerpt.slice(0, 227).replace(/\s+\S*$/, '') + '…' : excerpt) ||
    `${title}: explore the Saturdays.AI community, learning and resources.`;
  let image = '';
  const featured = byId.get(x.featured_media);
  if (featured?.source_url)
    try {
      image = await localAsset(featured.source_url);
    } catch (error) {
      report.warnings.push({
        id: x.id,
        type: 'unavailable-cover',
        source: featured.source_url,
        error: error.cause?.code || error.message,
      });
    }
  if (!image) image = $('img[src^="/media/"]').first().attr('src') || '';
  if (isPost) {
    const file = `src/content/posts/${x.slug}.md`;
    const category = x.categories.includes(55)
      ? 'Podcast'
      : x.categories.includes(86)
        ? 'Community'
        : 'AI for good';
    const kind = x.categories.some((id) =>
      [91, 54, 83, 330, 96, 90, 73, 64, 75, 53, 143].includes(id),
    )
      ? 'project'
      : 'article';
    const author = clean(authors[x.id] || visible('[rel=author]').first().text() || 'Saturdays.AI');
    const meta = {
      title,
      description,
      pubDate: x.date.slice(0, 10),
      author,
      category,
      kind,
      tags: x.tags.map((id) => clean(tags.find((t) => t.id === id)?.name)).filter(Boolean),
      image,
      imageAlt: clean(featured?.alt_text) || title,
      legacyPath: path,
      sourceUrl: x.link,
      sourceId: x.id,
      language: x.id === 5088 || x.id === 4637 ? 'en' : 'es',
      draft: false,
    };
    // Keep authored pilot and CMS files intact. New imports are repeatable without overwriting editorial changes.
    try {
      await access(file);
    } catch {
      await writeFile(file, `---\n${YAML.stringify(meta)}---\n\n${markdown}\n`);
    }
    report.posts.push({
      id: x.id,
      title,
      path,
      file,
      words: clean(html).split(/\s+/).length,
      sourceWords: clean(x.content.rendered).split(/\s+/).length,
    });
  } else {
    const city = citySeeds.find((c) => c[0] === x.id);
    const meta = {
      title,
      description,
      image,
      legacyPath: path,
      sourceUrl: x.link,
      sourceId: x.id,
      language: path.startsWith('/pt/') ? 'pt' : path.startsWith('/en/') ? 'en' : 'en',
      draft: false,
      kind: city ? 'city' : specialPaths.has(path) ? 'section' : 'page',
      ...(aliasTargets[path] ? { aliasTarget: aliasTargets[path] } : {}),
    };
    const file = `src/content/pages/${x.id}-${x.slug}.md`;
    try {
      await access(file);
    } catch {
      await writeFile(file, `---\n${YAML.stringify(meta)}---\n\n${markdown}\n`);
    }
    report.pages.push({
      id: x.id,
      title,
      path,
      file,
      words: clean(html).split(/\s+/).length,
      kind: meta.kind,
      ...(meta.aliasTarget ? { aliasTarget: meta.aliasTarget } : {}),
    });
    pageSources.push({ x, meta, markdown });
  }
  console.log(`${x.type} ${x.id}: ${title}`);
  await writeFile('imports/manifest.json', JSON.stringify(report, null, 2));
}
let queue = [...posts, ...pages.filter((x) => x.id !== 12005)],
  next = 0;
async function worker() {
  while (next < queue.length) await convert(queue[next++]);
}
await Promise.all([worker(), worker(), worker()]);
const oldCities = (await readJSON('src/data/cities.json')).cities;
const cities = citySeeds.map(([id, name, country, region, slug]) => {
  const source = pageSources.find((x) => x.x.id === id);
  const old = oldCities.find((x) => x.slug === slug);
  report.cities.push({ id, path: `/${slug}/` });
  return (
    old || {
      name,
      country,
      region,
      slug,
      image: source?.meta.image || '',
      contact:
        cheerio
          .load(source?.x.content.rendered || '')('a[href^="mailto:"]')
          .first()
          .attr('href') || 'mailto:info@saturdays.ai',
      sourceUrl: source?.x.link,
      description: `Learn artificial intelligence, meet your local community and build projects with social impact in ${name}.`,
      status: 'Contact the team for the next edition',
      draft: false,
    }
  );
});
await writeFile('src/data/cities.json', JSON.stringify({ cities }, null, 2));
const taxonomies = [
  ...categories.map((t) => ({ ...t, type: 'category' })),
  ...tags.map((t) => ({ ...t, type: 'tag' })),
]
  .filter((t) => t.count > 0)
  .map((t) => ({
    id: t.id,
    title: clean(t.name),
    path: new URL(t.link).pathname,
    type: t.type,
    postIds: posts
      .filter((p) => (t.type === 'tag' ? p.tags : p.categories).includes(t.id))
      .map((p) => p.id),
  }));
await writeFile('src/data/taxonomies.json', JSON.stringify(taxonomies, null, 2));
await writeFile('imports/manifest.json', JSON.stringify(report, null, 2));
console.log(
  JSON.stringify({
    posts: report.posts.length,
    pages: report.pages.length,
    cities: cities.length,
    assets: report.assets.length,
    warnings: report.warnings.length,
    redactions: report.redactions.length,
    removedInjections: report.removedInjections.length,
  }),
);
