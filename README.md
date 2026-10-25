# Saturdays.AI website

Astro, GitHub Pages and Pages CMS, using the official Saturdays.AI identity and the public WordPress archive. See the [production deployment record](docs/PRODUCTION-CUTOVER.md) for the domain status and rollback procedure.

- [Website](https://saturdays.ai/)
- [Pages CMS editor](https://app.pagescms.org/saturdaysai/saturdaysai-web/main)
- [Migration inventory and limitations](docs/MIGRATION.md)
- [Brand sources and rules](docs/BRAND.md)
- [Validation record](docs/QA.md)
- [Design and usability review](docs/REVIEW.md)
- [Performance, SEO and engagement review](docs/PERFORMANCE-SEO.md)

## Run and maintain

Use Node 24 and npm.

```sh
npm ci
npm run dev
npm run verify
```

The development preview is http://127.0.0.1:4321/. Verification checks types, publication rules, content reconciliation, CMS fields, URL collisions, every generated local link and asset, and the built feed/sitemap. There is no runtime WordPress dependency.

Responsive cover images are generated automatically before development and builds. Verification also checks image variants, structured-data syntax and representative compressed HTML/CSS budgets. Podcast season filters, related-topic recommendations and article next steps use shared components. For a meaningful article revision, editors can optionally set **Last meaningful update**; leave it empty for unchanged archive content.

## Content and experience

The public snapshot contains 162 posts (including 41 podcast episodes), 63 legitimate pages and 23 city communities. All original post/page paths are preserved at the domain root. Category, tag and date archives provide additional routes.

The design uses the supplied logo, Montserrat and the official orange, navy, blue and white palette. Search and topic/year filters, progressive article lists, a city finder, resource directory, learning selector, reading progress, subtle motion and click-to-load media keep the site useful without a large application framework. Images and fonts are served locally. Basic reading and navigation work without JavaScript. Reduced-motion settings are respected.

Search URLs preserve filters and expanded results when shared or revisited. Reading contents collapse on phones. Shared rendering removes empty imported headings, preserves section destinations and reserves image proportions. Validation rejects empty published articles, broken local references and unsafe editor destinations before deployment.

Pricing, fees, discounts, donation requests and economic messaging are removed from general and city pages. Blog articles preserve their original economic content. Spam records and injected spam links are excluded. Older programme details are labelled as historical; local teams confirm current availability.

## Write with Pages CMS

The repository connection was tested on 24 October 2026 by creating and saving **CMS connection test - unpublished draft** through the hosted editor. Its GitHub commit deployed successfully, while the draft stayed out of the website, RSS and sitemap.

1. Open Pages CMS, select `saturdaysai/saturdaysai-web` and `main`.
2. Choose **Articles & projects**, then **Add an entry**. New entries default to **Draft**.
3. Fill in title, summary, author, date, topic, language and permanent URL path, for example `/2026/10/24/my-story/`.
4. Upload a cover image and write in the visual editor. Save while Draft is enabled to keep writing.
5. After review, disable Draft and save. GitHub Actions validates and publishes the site.

Keep existing permanent paths unchanged. Future dates are excluded until a build runs after that date; scheduled publishing is not enabled. Draft files are visible in the public GitHub repository, although excluded from the website. Keep confidential material elsewhere. This workflow does not enforce a second person's approval.

Other editable collections cover imported pages, the homepage, city profiles and learning paths. Imported city/section bodies are archived content; their presentation is controlled by shared templates. Use the existing city collection to update city profiles. Changing a page's `kind` can change whether its shared template renders it.

## Structure

| Location                                        | Purpose                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| `src/content/posts/`                            | Markdown articles, projects and podcast descriptions                    |
| `src/content/pages/`                            | Imported organizational pages and historical programme bodies           |
| `src/data/`                                     | Homepage, cities, course listings, archive mappings and public comments |
| `src/components/`, `src/layouts/`               | Reusable presentation and interactions                                  |
| `src/styles/global.css`, `src/styles/brand.css` | Layout, design tokens and official brand styling                        |
| `public/brand/`, `public/media/`                | Brand assets, optimized article images and referenced documents         |
| `imports/manifest.json`                         | Source IDs, paths, asset provenance, exclusions and source gaps         |
| `.pages.yml`                                    | Hosted visual editor configuration                                      |
| `.github/workflows/deploy.yml`                  | Validate and deploy the website                                         |

Imported HTML is sanitized before Markdown conversion and again at rendering. Original scripts and forms are not executed. Approved audio/video providers load only after the reader presses Play. External LMS accounts, enrolment, forms and media services remain with their providers.

## Languages and appearance

The website has static English and Spanish versions and a remembered light/dark preference. Spanish retains the original routes; English lives below `/en/`. The first visit uses the browser's preferred supported language. The brand motto remains unchanged.

Translations are editable in the Pages CMS **English & Spanish translations** collection. See [languages, themes and publishing](docs/LANGUAGES-AND-THEMES.md) before adding or changing copy. `npm run build` localizes the complete Astro output using committed catalogs. `npm run verify` checks translation coverage, reciprocal language links and both versions. Missing translations block a new deployment, while the previous successful site stays online.

Use `npm run build` and `npm run preview` for a complete bilingual local preview. `astro dev` is the source/design preview.

## Deployment and rollback

GitHub Pages uses GitHub Actions. The repository variable `PAGES_CUSTOM_DOMAIN=saturdays.ai` selects the production build:

```text
SITE_URL=https://saturdays.ai
BASE_PATH=/
PUBLIC_SITE_MODE=production
```

Without that variable, the workflow builds the noindex review site at `https://saturdaysai.github.io/saturdaysai-web/`. Setting the variable changes the build only; the GitHub Pages custom domain and DNS must be configured separately. Custom GitHub Actions publishing does not use a CNAME file. Production verification checks canonical URLs, indexing rules, sitemap, language alternatives and removal of the preview banner. Preserve course subdomains and email DNS records during domain changes. Follow the [cutover and rollback record](docs/PRODUCTION-CUTOVER.md).

After building with the production environment above and deploying, run `npm run verify:live`. It checks the published HTML and every built asset through normal DNS and strict HTTPS, verifies the apex and www certificates, redirects, metadata, indexing rules, sitemap and a missing route. The report is saved to `artifacts/live-verification.json`; set `LIVE_REPORT` to choose another local report path. This verifies delivery and deployment consistency, not real-device usability or field performance.

## Mobile reading and sharing assets

The shared article layout keeps reading tools in normal flow above the text below 1001px. Do not add unlayered rules for `.article-aside`: they override the brand layer and can place the text and controls in the same grid cell.

`npm run assets` generates responsive versions of cover and body images, plus 1200 x 630 branded JPEG sharing cards. New published CMS entries receive a card automatically; drafts and future articles are excluded. Image URLs include a content hash so updated cards get a new URL. Previously shared messages may retain the platform's cached preview.

Sharing cards use the original logo and a bundled Montserrat font from the Google Fonts repository (`ofl/montserrat`), licensed under the included SIL Open Font License in `scripts/assets/`. Text is rasterized directly; do not use SVG `foreignObject`, which produced blank text in the previous export. `verify-social-cards.mjs` verifies dimensions, file size and visible logo/title pixels.

The renderer suppresses standalone repeats of the featured image, including known WordPress resized variants from the migration manifest. Linked images, captions and unrelated images remain. Source Markdown is not deleted or rewritten.

To undo an edit, revert its Git commit and allow the validated deployment to run. Do not rerun migration scripts over editorial work. The scripts in `scripts/` record the one-time migration process and depend on ignored raw snapshots/brand originals; ordinary maintenance uses Markdown, Pages CMS and the shared components.

Content, photographs and brand assets were migrated at the organization's request. Public author bylines and team credits are retained. No new licence is asserted over third-party material.
