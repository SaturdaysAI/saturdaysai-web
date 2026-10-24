# Validation record

Checked on 24 October 2026.

## Automated

- Astro type checking: zero errors, warnings or hints.
- Nine tests cover drafts/future dates, safe and unique paths, cross-collection collisions, project subpaths, full source reconciliation, tutorial-code preservation, CMS field coverage and economic-content rules.
- Final GitHub Pages build: 457 HTML pages, 162 original article routes, 19,955 local link/asset references checked, approximately 83.6 MB. Result: PASS.
- Domain-root build was also checked during migration; final deployment build uses `/saturdaysai-web` and the GitHub Pages origin.
- All 162 posts and 63 legitimate source page paths exist. Spam, injected links, both test drafts and unsafe article embeds are absent from the generated site.
- Canonical URLs, metadata, preview noindex, robots policy, complete RSS and draft-free sitemap checked.
- All rendered article/page images use local assets. Six unavailable source URLs are recorded in MIGRATION.md and the manifest.
- Dependency audit: no reported vulnerabilities after the final dependency changes.

## Browser checks

- Desktop at 1440 pixels, phone at 390 pixels and the browser's intermediate size.
- Homepage layout, official logo, mobile navigation, interest selector and community imagery checked.
- Blog: 162 entries, 12 initially displayed. Podcast topic yields 41; Show more expands to 24. Year and text filters combine; empty state and reset restore the expected results.
- Madrid: original city logo, images and expanded historical content load; no economic copy or horizontal overflow in the phone check.
- Partners page and migrated article layouts checked on mobile.
- Podcast article: no iframe initially; pressing Play creates the correct Acast player, with the original external link retained. No console errors recorded in the checked flow.
- Previous pilot checks also covered accent-insensitive city search, course filters, Escape menu handling and article link copying; these shared controls remain in place.
- Targeted checks do not constitute a formal WCAG certification or a manual audit of every external link and historical article.

## Pages CMS end-to-end test

- Created `CMS connection test - unpublished draft` in the authenticated hosted Pages CMS editor, not by writing a local fixture.
- Saved to `src/content/posts/2026-10-24-cms-connection-test-unpublished-draft.md` with `draft: true` and marker `CMS_DRAFT_MUST_NOT_BE_PUBLISHED`.
- GitHub commit: `4c9653a474935853b27b8d8d90930fa836a00816`.
- [Deployment run 40110966436](https://github.com/SaturdaysAI/saturdaysai-web/actions/runs/40110966436) succeeded.
- Hosted draft path returned HTTP 404; blog, RSS and sitemap returned HTTP 200 and contained no draft.
- Reopened the CMS collection and verified the saved title and Draft=True. Local screenshot: `artifacts/cms-draft-created.png`.

## Production boundary

No production DNS, WordPress, mail or custom-domain settings were changed. The preview remains noindex. External LMS/account services were not migrated. Original missing images and placeholder legal copy are documented rather than silently invented.
