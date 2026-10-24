# Saturdays.AI migration pilot

Approved scope: Astro, GitHub Pages, Pages CMS, reviewed public content, preserved URL paths, redesigned UX. Show the pilot before changing production. No production DNS or WordPress mutations.

Editorial update: remove prices, fees, discounts, donation calls and other economic information from city pages and general site pages. Preserve original article bodies, including economic information in the blog.

## Architecture and contracts

- Astro builds static HTML. No React runtime, application server, visitor account database or runtime WordPress dependency.
- Posts use Markdown with structured metadata and an explicit, immutable legacy URL path. Imported HTML is sanitized before conversion and again at rendering.
- Import by a reviewed allowlist of WordPress IDs, never blindly crawl or publish the whole database. Suspicious page ID 12005 and media ID 12008 are excluded. No PDFs or executable uploads are imported.
- Content types: articles, projects (article category), cities, course listings, homepage settings. A boolean draft field defaults to true for new articles. Future publication dates remain excluded until a rebuild after the date.
- Pages CMS writes the same files used by the build. Content edits must not change existing legacy paths. No secret or unpublished confidential content belongs in a public repository.
- Internal URLs and local media must work at both / and a GitHub project subpath. Existing URL paths are preserved relative to the pilot prefix and unchanged when the production domain is eventually connected.
- Preview is noindex. Production indexing requires an explicit configuration change. No CNAME file or automatic domain cutover.
- Courses, payments, registrations and donations continue to use reviewed external links. Historical city dates and fees are not represented as current offers.
- Dependencies are pinned by the lockfile. Editorial content and visual components are separate. Images and fonts are local.

## Acceptance criteria

1. Homepage, article index, several complete articles, project index, city finder, representative city pages, and course listing render.
2. All imported article paths exactly match their WordPress paths. No duplicate paths, draft leaks, spam records or unsafe embedded markup.
3. Article search/filter, city search/filter, course selector, menu and reading controls work by keyboard and pointer. No-JavaScript visitors can read the content and follow links.
4. Responsive layouts, visible focus, accessible labels, reasonable contrast, no horizontal overflow and reduced-motion support.
5. Static build checks cover routes, metadata, links, image dependencies, draft exclusion and subpath deployment. Browser checks cover actual interactions and layout.
6. GitHub Actions validates before deployment. The pilot remains separate from saturdays.ai and is clearly labelled as a preview.

## Failure cases

- Import fails closed on a missing allowlisted record, an unsafe media type or unexpected content; existing authored files are never overwritten by default.
- WordPress data is source material only. Unknown shortcodes/embeds are recorded for review; no scripts from WordPress are executed.
- Broken builds do not deploy. Editorial mistakes can be reverted in GitHub.
- GitHub account selection and Pages CMS installation may require the owner. Local preview remains usable while those integrations are pending.
