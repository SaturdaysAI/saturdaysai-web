import { marked } from 'marked';
import { load } from 'cheerio';

// CMS filenames may contain spaces, accents, subfolders or URL encoding.
// Parse the rendered Markdown instead of matching partial paths in source text.
export function contentImageSources(body, cover = '') {
  const $ = load(marked.parse(body, { async: false, gfm: true }));
  const sources = [cover, ...$('img[src]').map((_, el) => $(el).attr('src')).get()];
  const result = new Set();
  for (const source of sources) {
    if (!source?.startsWith('/media/')) continue;
    const value = decodeURIComponent(source.split(/[?#]/)[0]);
    if (value.includes('\\') || value.split('/').some((part) => part === '..'))
      throw new Error(`Unsafe media path: ${source}`);
    if (/\.(?:webp|png|jpe?g)$/i.test(value)) result.add(value);
  }
  return [...result];
}
