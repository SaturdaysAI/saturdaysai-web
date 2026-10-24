import type { APIRoute } from 'astro';
import { publishedPosts, url } from '../lib/content';
const xml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!,
  );
export const GET: APIRoute = async ({ site }) => {
  const posts = await publishedPosts();
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Saturdays.AI stories</title><link>${site}</link><description>Ideas and projects from the Saturdays.AI community.</description>${posts.map((p) => `<item><title>${xml(p.data.title)}</title><link>${new URL(url(p.data.legacyPath), site)}</link><guid>${new URL(url(p.data.legacyPath), site)}</guid><description>${xml(p.data.description)}</description><pubDate>${p.data.pubDate.toUTCString()}</pubDate></item>`).join('')}</channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
