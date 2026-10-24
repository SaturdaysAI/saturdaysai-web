import type { APIRoute } from 'astro';
import { url } from '../lib/content';
export const GET: APIRoute = ({ site }) =>
  new Response(
    import.meta.env.PUBLIC_SITE_MODE === 'production'
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL(url('/sitemap-index.xml'), site)}\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
