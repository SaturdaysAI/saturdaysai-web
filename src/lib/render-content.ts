import { getCollection } from 'astro:content';
import sharp from 'sharp';
import path from 'node:path';
import { url } from './content';
import { isPublished } from './content-rules.mjs';
import { renderMarkdown } from './markdown.mjs';
import taxonomies from '../data/taxonomies.json';
import manifest from '../../imports/manifest.json';
const sizes = new Map<string, Promise<{ width: number; height: number } | null>>();
const imageInfo = (src: string) => {
  if (!sizes.has(src))
    sizes.set(
      src,
      (async () => {
        const prefix = import.meta.env.BASE_URL.replace(/\/$/, '');
        let local = src.startsWith(prefix + '/media/') ? src.slice(prefix.length) : src;
        if (!local.startsWith('/media/')) return null;
        try {
          local = decodeURIComponent(local.split(/[?#]/)[0]);
          const root = path.resolve('public/media');
          const file = path.resolve('public', local.slice(1));
          if (!file.startsWith(root + path.sep)) return null;
          const { width, height } = await sharp(file).metadata();
          return width && height ? { width, height } : null;
        } catch {
          return null;
        }
      })(),
    );
  return sizes.get(src)!;
};
export async function renderContent(body = '', galleries = false, leadImage = '') {
  const posts = await getCollection('posts');
  const pages = await getCollection('pages');
  const paths = new Set([
    '/',
    '/explore/',
    '/podcast/',
    ...posts.filter((p) => isPublished(p.data)).map((p) => p.data.legacyPath),
    ...pages.filter((p) => !p.data.draft).map((p) => p.data.legacyPath),
    ...taxonomies.map((t) => t.path),
  ]);
  const bySource = new Map(
    posts.filter((p) => isPublished(p.data)).map((p) => [p.data.sourceId, p.data.legacyPath]),
  );
  const media = new Map(manifest.assets.map((a) => [a.original, a.path]));
  const rewrite = (href: string) => {
    if (href.startsWith('#')) return href;
    if (href.startsWith('/media/') || href.startsWith('/brand/')) return url(href);
    if (media.has(href)) return url(media.get(href)!);
    try {
      const parsed = new URL(href, 'https://saturdays.ai');
      const normalized = parsed.pathname.endsWith('/') ? parsed.pathname : parsed.pathname + '/';
      if (['saturdays.ai', 'www.saturdays.ai'].includes(parsed.hostname)) {
        if (parsed.pathname === '/wp-admin/post.php') {
          const target = bySource.get(Number(parsed.searchParams.get('post')));
          return target ? url(target) : url('/blog-y-noticias/');
        }
        if (paths.has(normalized)) return url(normalized) + parsed.search + parsed.hash;
      }
    } catch {}
    return href;
  };
  return renderMarkdown(body, { rewrite, imageInfo, galleries, leadImage });
}
