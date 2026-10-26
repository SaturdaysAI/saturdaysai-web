import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

export const normalize = (value) => value.replace(/\s+/g, ' ').trim();
export const key = (text) =>
  createHash('sha256').update(normalize(text)).digest('hex').slice(0, 20);

// A reviewed CMS entry is the editable source of truth. Overrides supply initial
// editorial/brand copy until a segment has been collected and reviewed.
export function localizedText(catalog, overrides, source, language) {
  const segment = catalog.get(key(source));
  if (segment?.reviewed && typeof segment[language] === 'string') return segment[language];
  return overrides[source]?.[language] ?? (segment?.[language] || undefined);
}
const excluded =
  'script,style,svg,code,pre,[translate="no"],[data-language],.brand,.art-sticker,.art-code,.post-author,.author-name,.post-byline > span,.city-card h2,.city-tags a:not(:last-child),.article-author strong,.author-avatar,.archived-comments footer';
const preserve =
  /^(?:[\d\s\p{P}\p{S}]+|AI4ALL(?: IS AI4GOOD)?|AI4GOOD|Saturdays\.?AI|https?:\/\/\S+|\S+@\S+\.\S+)$/iu;
// Some imported WordPress examples are plain paragraphs rather than <code>.
const codeExample =
  /^(?:from\s+\w[\w.]*\s+import\s|import\s+[\w.]+(?:\s+as\s+\w+)?$|(?:def|class)\s+\w+\s*\(|[\w.]+\s*=\s*(?:[\[{]|[\w.]+\())/;
export const attributes = [
  'alt',
  'title',
  'aria-label',
  'placeholder',
  'data-detail',
  'data-cta',
  'data-name',
  'data-description',
  'data-success',
  'data-error',
];

// Translate text only. URLs, attributes that drive filtering, code, IDs and media stay intact.
export function visitStrings($, visit) {
  function walk(node) {
    if (node.type === 'text') {
      const source = normalize(node.data);
      if (
        !source ||
        preserve.test(source) ||
        codeExample.test(source) ||
        /^[A-Za-z]\w*[a-z][A-Z]\w*$/.test(source)
      )
        return;
      visit(source, (translated) => {
        node.data = node.data.replace(/\S[\s\S]*\S|\S/, () => translated);
      });
    } else {
      if (node.type !== 'root' && $(node).is(excluded)) return;
      if (node.attribs)
        for (const attr of attributes) {
          const source = normalize(node.attribs[attr] || '');
          if (source && !preserve.test(source))
            visit(source, (translated) => $(node).attr(attr, translated));
        }
      for (const child of node.children || []) walk(child);
    }
  }
  walk($('body')[0]);
  $('title').each((_, el) => {
    const source = normalize($(el).text()).replace(/ \| Saturdays\.AI$/, '');
    visit(source, (translated) => $(el).text(translated + ' | Saturdays.AI'));
  });
  $(
    'meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]',
  ).each((_, el) => {
    const title = /^(?:og:title|twitter:title)$/.test(
      $(el).attr('property') || $(el).attr('name') || '',
    );
    const source = normalize($(el).attr('content') || '').replace(
      title ? / \| Saturdays\.AI$/ : /$^/,
      '',
    );
    if (source)
      visit(source, (translated) =>
        $(el).attr('content', translated + (title ? ' | Saturdays.AI' : '')),
      );
  });
  $('script[type="application/ld+json"]').each((_, el) => {
    const data = JSON.parse($(el).text());
    const walkJSON = (object) => {
      if (!object || typeof object !== 'object') return;
      for (const [field, value] of Object.entries(object)) {
        if (
          typeof value === 'string' &&
          ['headline', 'description', 'name'].includes(field) &&
          object['@type'] !== 'Person' &&
          object['@type'] !== 'Organization' &&
          !preserve.test(value)
        )
          visit(normalize(value), (translated) => {
            object[field] = translated;
          });
        else if (typeof value === 'object') walkJSON(value);
      }
    };
    walkJSON(data);
    $(el).text(JSON.stringify(data).replace(/</g, '\\u003c'));
  });
}

export async function htmlFiles(root) {
  const output = [];
  for (const entry of await fs.readdir(root, { withFileTypes: true })) {
    if (entry.isDirectory() && !['_astro', 'media', 'brand', 'social'].includes(entry.name))
      output.push(...(await htmlFiles(path.join(root, entry.name))));
    else if (entry.isFile() && entry.name.endsWith('.html'))
      output.push(path.join(root, entry.name));
  }
  return output;
}

export async function readCatalog() {
  const catalog = new Map();
  await fs.mkdir('src/translations', { recursive: true });
  for (const name of await fs.readdir('src/translations')) {
    if (!name.endsWith('.json')) continue;
    const doc = JSON.parse(await fs.readFile(`src/translations/${name}`, 'utf8'));
    for (const segment of doc.segments) {
      const id = key(segment.source);
      if (catalog.has(id)) throw new Error(`Duplicate translation: ${segment.source.slice(0, 80)}`);
      catalog.set(id, { ...segment, file: name });
    }
  }
  return catalog;
}

export async function collectTranslations() {
  const catalog = await readCatalog();
  const files = await htmlFiles('dist');
  files.sort((a, b) =>
    a === path.join('dist', 'index.html')
      ? -1
      : b === path.join('dist', 'index.html')
        ? 1
        : a.localeCompare(b),
  );
  let added = 0;
  for (const file of files) {
    const $ = load(await fs.readFile(file, 'utf8'), { scriptingEnabled: false });
    if ($('html').attr('data-localized'))
      throw new Error('Collect from a fresh Astro build, before localization.');
    const route =
      '/' +
      path
        .relative('dist', file)
        .replaceAll('\\', '/')
        .replace(/index\.html$/, '');
    const name = `${key(route)}.json`;
    let doc;
    try {
      doc = JSON.parse(await fs.readFile(`src/translations/${name}`, 'utf8'));
    } catch {
      doc = { title: $('title').text().replace(' | Saturdays.AI', ''), route, segments: [] };
    }
    const before = doc.segments.length;
    visitStrings($, (source) => {
      const id = key(source);
      if (!catalog.has(id)) {
        const segment = { source, en: '', es: '', reviewed: false };
        doc.segments.push(segment);
        catalog.set(id, segment);
        added++;
      }
    });
    if (doc.segments.length > before)
      await fs.writeFile(`src/translations/${name}`, JSON.stringify(doc, null, 2) + '\n');
  }
  return { pages: files.length, segments: catalog.size, added };
}
