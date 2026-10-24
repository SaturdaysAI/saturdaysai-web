# Scope and acceptance

Approved stack: Astro, GitHub Pages and Pages CMS. Approved destination: SaturdaysAI/saturdaysai-web. The owner requested the official identity, the full public archive, improved UX, original URL paths, spam exclusion and a CMS draft test. Production cutover remains separate.

## Contracts

- All public legitimate post/page records from the 24 October snapshot have local routes, with their original paths after the preview prefix.
- New articles default to draft. Drafts and future dates are excluded from built pages, RSS and sitemap. Routes cannot overwrite another article, page, city or fixed section.
- Articles preserve economic content. General and city pages omit pricing and related economic copy.
- Original scripts and forms are not executed. Supported external media is loaded on demand; external account/course services remain external.
- Brand assets preserve original proportions. Montserrat and website images are local. Shared templates separate editorial content from presentation.
- Preview stays noindex. No WordPress, DNS, mail or custom-domain changes are authorized by this build.

## Acceptance

- Source reconciliation, URL preservation, draft exclusion, local references, SEO metadata and editorial fields are checked by `npm run verify`.
- Actual desktop/mobile interactions and rendering are checked in a browser, including search, filters, archive disclosures and on-demand media.
- Pages CMS must demonstrate a real saved GitHub draft and a successful deployment with that draft absent from the public website. This passed on 24 October 2026.
- GitHub Actions must validate the commit before publishing the preview. Reverting a commit rolls back a change through the same workflow.

## Failure handling

Unrecoverable source images are recorded rather than silently replaced. Broken builds do not deploy. Source omissions and placeholder legal copy are documented in MIGRATION.md. No credentials, private source manuals or confidential drafts belong in this public repository. Runtime content does not depend on WordPress.
