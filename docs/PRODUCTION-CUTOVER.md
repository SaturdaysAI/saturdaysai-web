# Production deployment

Authorized by the site owner on 25 October 2026 to replace the WordPress website at https://saturdays.ai/ with this repository's GitHub Pages website.

HTTPS was activated at 19:35 CET on 25 October 2026. GitHub reports an approved certificate for both `saturdays.ai` and `www.saturdays.ai`, with HTTPS enforcement enabled. Normal public DNS connections validate the Let's Encrypt certificate and negotiate TLS 1.3. The current certificate expires on 23 January 2027.

DNS caches initially retained the former WordPress address. After a single certificate-provisioning restart using GitHub's documented procedure, GitHub validated both names at 19:30 CET and approved the certificate at 19:35 CET. The temporary local certificate watcher has stopped; serving the website does not depend on this computer.

## Configuration

- Repository: `SaturdaysAI/saturdaysai-web`, branch `main`.
- GitHub Actions repository variable: `PAGES_CUSTOM_DOMAIN=saturdays.ai`.
- GitHub Pages custom domain: `saturdays.ai`.
- Build: `SITE_URL=https://saturdays.ai`, `BASE_PATH=/`, `PUBLIC_SITE_MODE=production`.
- DNS provider: Netlify, team `apolmig`, existing zone `saturdays.ai`.
- Configured apex A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (TTL 300).
- Configured `www` CNAME: `saturdaysai.github.io` (TTL 300).
- Email, course platforms and other subdomains retain their existing DNS records.

Production removes the review banner and permits search crawling on substantive pages. Thin archives, utility and placeholder pages remain noindex. Existing article/page paths remain at the domain root; English versions use `/en/`. Pages CMS continues committing to this same repository.

## Validation

- Final live verification passed through normal public DNS and strict HTTPS: 6,220 current files, including all 916 HTML pages and 445 current social cards, with zero failures. The verifier excludes 493 superseded cards retained only in the local development cache and checks that every published page references the current manifest. Report: `artifacts/cutover-2026-10-25/live-verification-current.json`.
- HTTP, www and the old GitHub Pages preview URL redirect permanently to the HTTPS canonical domain, preserving article paths and query strings. A nonexistent route returns HTTP 404. All published page metadata, language alternatives, structured data, indexing directives, robots.txt and sitemap passed the live checks; no insecure embedded HTTP resources were detected.
- Content commit verified during the cutover: `39ed042ed91fa455b60d36ddf032a1f1de5a308c`. Later editorial publication is recorded in the [editorial review](EDITORIAL-REVIEW-2026-10-25.md).
- [Successful production workflow](https://github.com/SaturdaysAI/saturdaysai-web/actions/runs/40221486945).
- Local production verification: 33 tests passed; Astro reported zero errors, warnings and hints.
- 916 generated HTML pages, 162 legacy articles, 72,572 local references, 4,130 section links, 3,754 image dimensions and 1,832 language alternatives checked.
- 445 branded social images verified; zero missing translations.
- Root-domain canonical URLs and production indexing rules checked across all generated pages.
- Public HTTPS browser checks: desktop at 1265 CSS px and mobile at 375 CSS px, no horizontal overflow or broken loaded images in the reviewed views. Mobile navigation and city filtering work, English/Spanish selection works, and the dark theme persists across reloads. The article reading tools end above the body text. The Copy link action reports success and WhatsApp links use the final HTTPS domain. No console errors were captured in the reviewed HTTPS session.
- Deployed GitHub origin returned the correct localized homepage and production canonical URL before DNS was changed.
- DNS readback: 37 records after the change, with all 32 records outside the apex A and www CNAME preserved exactly.
- All four authoritative nameservers return the four GitHub Pages addresses and new www CNAME. Recursive caches can temporarily return old answers.

## Performance on the final domain

[PageSpeed Insights report for the Spanish homepage](https://pagespeed.web.dev/analysis/https-saturdays-ai/iz42b3rn9d?form_factor=mobile), captured at 19:37 CET on 25 October 2026. The explicit `?lang=es` parameter avoids the automated test browser's English-language redirect.

| Device | Performance | FCP | LCP | TBT | CLS | Accessibility / Best practices / SEO |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Mobile, simulated slow 4G | 99 | 0.9 s | 1.4 s | 0 ms | 0 | 100 / 100 / 100 |
| Desktop | 100 | 0.3 s | 0.4 s | 0 ms | 0 | 100 / 100 / 100 |

These are homepage laboratory measurements, not measurements of every route or a WCAG certification. PageSpeed's separate rolling 28-day origin data still includes the former WordPress site: it reports LCP 2.8 s on mobile and 2.7 s on desktop and does not pass Core Web Vitals. Those historical observations cannot establish the field performance of a website deployed minutes earlier.

Spanish technical terms incorrectly translated by the automatic catalog were corrected: Next.js, React, lint, build and onboarding. This is a targeted correction, not a claim that the entire translation archive has received human editorial review.

## Before-change evidence and rollback

The previous apex A record was `147.182.168.70` (TTL 3600). The previous `www.saturdays.ai` CNAME was `saturdays.ai` (TTL 3600). WordPress remains on the original server; this operation does not delete or modify it.

An exact DNS/API snapshot and validation logs are saved locally in the ignored `artifacts/cutover-2026-10-25/` directory. The Netlify zone contained 34 explicit records before the change. MX records use Google Workspace; SPF, DKIM, DMARC and the `cursos`/`learn` CNAMEs are preserved.

For a content rollback, revert the relevant Git commit and let validation/deployment complete. For a hosting rollback, restore the apex A and `www` CNAME values above, remove only the replacement GitHub apex A records, and verify the WordPress host and certificate. DNS caches can retain previous answers until their TTL expires. Do not alter nameservers, email or course records.

To return this repository to its separate review URL, remove `PAGES_CUSTOM_DOMAIN`, remove the GitHub Pages custom domain, and rerun the deployment workflow. Do this only after restoring DNS to WordPress, to avoid pointing the domain at an unconfigured Pages site.

## Source limitations

The [Spanish audit](SPANISH-AUDIT-2026-10-25.md) records the original editorial and manual-device findings. The subsequent [Spanish and English editorial review](EDITORIAL-REVIEW-2026-10-25.md) updates the organisation's narrative and identity, legal information and translation quality, with explicit limits on archive review. Physical-device and field-performance limitations still apply. Private WordPress drafts, users, transactions and LMS data are outside the public-content migration.

## Provider references

- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages HTTPS and DNS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Netlify DNS API](https://open-api.netlify.com/#tag/DNS-zone)
