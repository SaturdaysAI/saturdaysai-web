# English, Spanish and appearance

Spanish uses the original URLs. English uses the same path below `/en/`. The two pre-existing English WordPress paths remain at their original URLs and gain matching Spanish pages. Each page has a self-referencing canonical and reciprocal `hreflang` alternatives, including the sitemap. There are also separate RSS feeds and English sharing cards.

On an unprefixed first visit, the earliest supported language in `navigator.languages` chooses Spanish or English. Unsupported languages fall back to English. This is a language preference, not a geographic lookup: the website does not request location access or contact an IP lookup service. A manually selected language takes priority and is saved locally. Direct English links remain English. `?lang=es` or `?lang=en` explicitly selects a language, including when sharing a link. The selector preserves filters and anchors.

The first theme follows the operating system. The small sun/moon button saves an explicit choice in local storage. The early head script applies the theme before rendering; storage failures do not prevent access. Both controls work with a keyboard. Language links also work without JavaScript.

## Editing and publishing

Original source files stay in their existing Pages CMS collections. The additional **English & Spanish translations** collection contains editable text segments grouped by the page where each text first appears. A segment is reused everywhere the identical original text occurs, including cards, navigation and article headings. Source fields are read-only; edit `Español` and `English`, then mark the segment reviewed. Brand copy overrides live in `src/i18n/overrides.json`.

The archive includes automatic translations approved for the pilot, initially imported with Google Translate and local Argos Translate models. Local model runtimes are import tools only and are not deployed. The notice on archive pages explains that translations are automatic. Code, URLs, anchors, authors, brand marks and the motto are preserved. Audio, video and text embedded inside images retain their original language. Translation review is still editorial work: do not treat automatic legal, technical or medical translations as professionally reviewed.

When a new article or source wording is ready for translation:

1. Keep the article as a draft while writing. Publish its source only when ready for the complete build.
2. Run `npm run translations:collect` to compile source pages and collect new text.
3. Run `npm run translations:translate` to fill missing translations. This optional editorial helper sends only the site's public rendered text to Google's translation service. It saves each batch, respects rate-limit responses and can resume. It never runs in a visitor's browser or in deployment CI.
4. Review important wording in Pages CMS or the JSON catalogs. Run `npm run verify` with the deployment environment variables.
5. Commit the article and completed translations together. The build deliberately fails on missing translations, preventing a partially bilingual release. If source changes are saved through CMS first, the previous successful deployment remains online until the translation update passes.

The catalogs are versioned, so normal builds need no translation credentials, network service or ongoing translation subscription. The optional import helper uses a public service whose availability may change; a maintainer can fill the same JSON fields manually or replace the helper with an authenticated provider without changing the website.

## Local preview

Use `npm run build` followed by `npm run preview` to inspect both final static languages. `astro dev` remains a source/design preview; localization runs after Astro's build. Use the same `SITE_URL`, `BASE_PATH` and `PUBLIC_SITE_MODE` environment variables as GitHub Actions when testing the GitHub Pages base path.

The live domain, DNS and WordPress are outside this change.
