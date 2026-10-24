import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { getCollection } from 'astro:content';
import { url } from './content';
import taxonomies from '../data/taxonomies.json';
import manifest from '../../imports/manifest.json';
export async function renderContent(body = '', galleries = false) {
  const posts = await getCollection('posts');
  const pages = await getCollection('pages');
  const paths = new Set([
    '/',
    '/explore/',
    '/podcast/',
    ...posts.filter((p) => !p.data.draft).map((p) => p.data.legacyPath),
    ...pages.filter((p) => !p.data.draft).map((p) => p.data.legacyPath),
    ...taxonomies.map((t) => t.path),
  ]);
  const media = new Map(manifest.assets.map((a) => [a.original, a.path]));
  const rewrite = (href: string) => {
    if (href.startsWith('#')) return href;
    if (href.startsWith('/media/') || href.startsWith('/brand/')) return url(href);
    if (media.has(href)) return url(media.get(href)!);
    try {
      const parsed = new URL(href, 'https://saturdays.ai');
      const normalized = parsed.pathname.endsWith('/') ? parsed.pathname : parsed.pathname + '/';
      if (['saturdays.ai', 'www.saturdays.ai'].includes(parsed.hostname) && paths.has(normalized))
        return url(normalized) + parsed.search + parsed.hash;
    } catch {}
    return href;
  };
  let html = sanitizeHtml(await marked.parse(body, { gfm: true }), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'figure',
      'figcaption',
      'h1',
      'details',
      'summary',
    ]),
    allowedAttributes: {
      a: ['href', 'title', 'rel'],
      img: ['src', 'alt', 'loading', 'decoding'],
      code: ['class'],
      th: ['colspan'],
      td: ['colspan'],
    },
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
    transformTags: {
      a: (_, attrs) => ({
        tagName: 'a',
        attribs: { ...attrs, href: rewrite(attrs.href || ''), rel: 'noopener noreferrer' },
      }),
      img: (_, attrs) => ({
        tagName: 'img',
        attribs: {
          src: rewrite(attrs.src || ''),
          alt: attrs.alt || '',
          loading: 'lazy',
          decoding: 'async',
        },
      }),
    },
  });
  const toc: { id: string; text: string }[] = [];
  html = html.replace(/<h([1-4])>([\s\S]*?)<\/h\1>/g, (_, level, content) => {
    const text = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });
    const id = `section-${toc.length + 1}`;
    toc.push({ id, text });
    const tag = level === '1' ? 'h2' : `h${level}`;
    return `<${tag} id="${id}">${content}</${tag}>`;
  });
  html = html.replace(
    /<a href="([^"]+)"([^>]*)>\s*(<img[^>]*alt=""[^>]*\/?>)\s*<\/a>/g,
    (_, href, rest, img) =>
      `<a href="${href}"${rest} aria-label="View linked image or resource">${img}</a>`,
  );
  if (galleries)
    html = html.replace(
      /(?:<p>\s*(?:<a[^>]*>)?<img\b[^>]*>(?:<\/a>)?\s*<\/p>\s*){2,}/g,
      (group) => `<div class="content-gallery">${group}</div>`,
    );
  return { html, toc };
}
