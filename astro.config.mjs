import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { indexablePath } from './src/lib/seo.mjs';

export default defineConfig({
  site: process.env.SITE_URL || 'https://saturdays.ai',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => indexablePath(new URL(page).pathname, process.env.BASE_PATH || '/'),
    }),
  ],
  build: { format: 'directory' },
});
