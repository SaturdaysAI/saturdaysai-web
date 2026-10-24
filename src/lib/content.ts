import { getCollection } from 'astro:content';
import { assertUniquePaths, isPublished, withBase } from './content-rules.mjs';
export const url = (path: string) => withBase(path, import.meta.env.BASE_URL);
export async function publishedPosts() {
  const all = await getCollection('posts');
  assertUniquePaths(all);
  return all
    .filter((p) => isPublished(p.data))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
export const dateLabel = (d: Date, language = 'en') =>
  new Intl.DateTimeFormat(language, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
export const readingTime = (body = '') =>
  Math.max(1, Math.ceil(body.replace(/<[^>]+>/g, '').split(/\s+/).length / 220));
