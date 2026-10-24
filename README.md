# Saturdays.AI website pilot

An Astro website with GitHub Pages hosting and a Pages CMS editorial configuration. This is a separate design and migration preview. **It does not replace saturdays.ai.**

Pilot URL: https://saturdaysai.github.io/saturdaysai-web/

## Run locally

Requires Node 24 (or Node >=22.23.4) and npm.

```sh
npm ci
npm run dev
npm run verify
```

The local preview is http://127.0.0.1:4321/. `npm run verify` checks types, publishing rules, CMS field coverage, builds the site and checks every generated local link and asset. There is no runtime dependency on WordPress.

## What is included

- Redesigned homepage, learning paths, story index, project index and city finder.
- Eight complete imported articles/projects and eight city profiles with their original URL paths.
- Local images and self-hosted fonts, small client scripts, responsive layouts, keyboard controls and reduced-motion support.
- Article/topic search, accent-insensitive city search, course filters, reading progress and link sharing.
- Draft exclusion, future-date exclusion, RSS, sitemap, canonical URLs and social metadata.
- No pricing, fee, discount, donation or economic messaging on general site pages. Original article bodies retain economic information.
- No production DNS changes, CNAME file or WordPress modifications. Preview pages have `noindex, nofollow`; robots.txt disallows crawling.

This is an editorial and visual pilot, not a full WordPress migration. Unmigrated organizational/legal pages link to the current site. Course delivery and registration remain external. City dates and programme availability require confirmation by the local teams.

## Editorial setup with Pages CMS

The `.pages.yml` file configures Articles & projects, Homepage, City communities and Learning paths. The repository owner must install/authorize the official Pages CMS GitHub App for **only SaturdaysAI/saturdaysai-web** and sign in at https://app.pagescms.org/ before the hosted editor can save changes. Configuration alone is not an authenticated connection.

1. Open Pages CMS and select this repository and the `main` branch.
2. Create an article, fill all required fields and leave **Draft** enabled while writing.
3. Use an explicit permanent path, e.g. `/2026/10/24/my-story/`. Do not change an existing path after publication.
4. Add a cover image and image description. Write the article in the visual editor.
5. Review the content, then disable **Draft**. Saving triggers GitHub Actions; the preview changes only after validation and deployment succeed.

The included draft is an obviously public example to test that drafts never reach the built website. **A draft flag does not make files private in a public GitHub repository.** Keep confidential material elsewhere. This simple pilot has no enforced multi-person approval gate; review is an editorial step. Add protected branches and a review workflow before delegating publishing to a larger team.

Future-dated content is filtered at build time. It needs a manual or separately configured scheduled rebuild after its publication date. No scheduling automation is enabled by this pilot.

## Structure

| Location | Purpose |
| --- | --- |
| `src/content/posts/` | Articles and project stories, Markdown with YAML metadata |
| `src/data/` | Editable homepage, cities and course listings |
| `src/components/` | Reusable UI components |
| `src/layouts/Layout.astro` | Metadata, navigation, footer and shared behaviour |
| `src/styles/global.css` | Named design tokens and responsive styles |
| `imports/manifest.json` | Public source IDs, original paths and asset provenance |
| `scripts/import-pilot.mjs` | Explicit allowlist importer; refuses to overwrite articles |
| `scripts/verify-build.mjs` | Generated route, asset and content-policy checks |
| `.github/workflows/deploy.yml` | Validate, build and deploy to the separate GitHub Pages preview |

The imported source HTML is sanitized before Markdown conversion; rendered article HTML is sanitized again. Original scripts, forms and arbitrary embeds are not carried across. Supported video embeds become explicit links. Raster media is checked and optimised locally. No PDFs or unknown executable uploads were imported.

## Deployment

GitHub Pages must use **GitHub Actions** as its build source. The workflow uses:

```text
SITE_URL=https://saturdaysai.github.io
BASE_PATH=/saturdaysai-web
PUBLIC_SITE_MODE=preview
```

Both `/` and the GitHub project subpath are supported. WordPress URL paths are preserved after the preview prefix. Moving to the real domain later requires a separate, reviewed cutover: full migration, content review, root base path, production indexing, domain verification, DNS and HTTPS checks. Preserve course subdomains and mail records.

To undo an editorial or design change, revert its commit and let the same validation/deployment workflow run. Do not re-run the importer over edited content; make future migration changes through a reviewed import manifest.

## Source and ownership

Content and photographs come from the publicly accessible Saturdays.AI website and its embedded article images, migrated at the organization's request. Original article bylines are retained where visible in the public blog; older project stories retain their credited teams in their bodies. No new licence is asserted over third-party content. Known suspicious WordPress records are excluded by allowlist.
