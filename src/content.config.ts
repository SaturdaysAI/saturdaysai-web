import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    pubDate: z.coerce.date(),
    author: z.string().min(1),
    category: z.enum(['Community', 'AI for good', 'Build with AI', 'Podcast']),
    kind: z.enum(['article', 'project']).default('article'),
    tags: z.array(z.string()).default([]),
    image: z.string().default(''),
    imageAlt: z.string().default(''),
    legacyPath: z.string().regex(/^\/[a-zA-Z0-9\-_/]+\/$/),
    sourceUrl: z.url().optional(),
    sourceId: z.number().optional(),
    language: z.enum(['en', 'es', 'pt']).default('es'),
    draft: z.boolean().default(true),
  }),
});
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    image: z.string().default(''),
    legacyPath: z.string().regex(/^\/(?:[a-zA-Z0-9\-_/]+\/)?$/),
    sourceUrl: z.url().optional(),
    sourceId: z.number().optional(),
    language: z.enum(['en', 'es', 'pt']).default('en'),
    draft: z.boolean().default(true),
    kind: z.enum(['page', 'city', 'section']).default('page'),
    aliasTarget: z.string().optional(),
  }),
});
export const collections = { posts, pages };
