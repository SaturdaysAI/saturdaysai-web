import fs from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';
import { editorialDigest } from './lib/editorial-review.mjs';

// Run only after reading the complete rendered page in each selected language.
// An explicit route list avoids silently approving the rest of the archive.
const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const value = args[index + 1];
  args.splice(index, 2);
  return value;
};
const reviewer = option('--reviewer');
const language = option('--language') || 'both';
if (!reviewer || !['es', 'en', 'both'].includes(language) || !args.length)
  throw new Error(
    'After a full editorial review: node scripts/record-editorial-review.mjs --reviewer NAME --language es|en|both /reviewed-route/ [...]',
  );
const languages = language === 'both' ? ['es', 'en'] : [language];
const file = 'src/i18n/editorial-reviews.json';
const reviews = JSON.parse(await fs.readFile(file, 'utf8'));
let versions = 0;
for (const route of new Set(args)) {
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(route)) throw new Error(`Invalid route: ${route}`);
  const pending = {};
  for (const lang of languages) {
    const location = path.join('dist', lang === 'en' ? 'en' : '', route.slice(1), 'index.html');
    const $ = load(await fs.readFile(location, 'utf8'), { scriptingEnabled: false });
    if ($('html').attr('data-localized') !== 'true' || $('html').attr('lang') !== lang)
      throw new Error(`${location}: build the localized preview first`);
    if (!$('.reading-body .prose,.city-history .prose').length)
      throw new Error(`${location}: no editorial body to review`);
    pending[lang] = {
      digest: editorialDigest($),
      reviewedAt: new Date().toISOString(),
      reviewer,
      scope: 'Full rendered text, metadata, captions and links',
    };
    versions++;
  }
  reviews.pages[route] = { ...reviews.pages[route], ...pending };
}
reviews.pages = Object.fromEntries(
  Object.entries(reviews.pages).sort(([a], [b]) => a.localeCompare(b)),
);
await fs.writeFile(file, JSON.stringify(reviews, null, 2) + '\n');
console.log(JSON.stringify({ recordedVersions: versions, languages, rebuildRequired: true }));
