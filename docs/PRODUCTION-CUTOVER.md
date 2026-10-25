# Production deployment

Authorized by the site owner on 25 October 2026 to replace the WordPress website at https://saturdays.ai/ with this repository's GitHub Pages website.

Status at 18:57 CET, 25 October 2026: production deployed and DNS records changed. HTTPS certificate issuance and final public verification are still pending. GitHub's DNS check still reports the previous non-GitHub destination, despite current authoritative and public DNS queries returning the new records.

A bounded, one-time completion process is running locally in the background. It retries transient API failures, waits for an approved certificate, validates TLS for both the apex and www, enables HTTPS enforcement, and checks all production routes and metadata. Its log is `artifacts/cutover-2026-10-25/finish-https-background.log`; successful completion creates `completed.json` alongside the public verification report. The computer must remain running for this local process to finish. This is not a permanent monitoring service. Certificate issuance has not yet been confirmed, so the migration must not yet be reported as fully verified.

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

- Production code commit: `93c3d56504b605fc68d7d12eded7d55321d4a882`.
- [Successful production workflow](https://github.com/SaturdaysAI/saturdaysai-web/actions/runs/40216649308).
- Local production verification: 33 tests passed; Astro reported zero errors, warnings and hints.
- 916 generated HTML pages, 162 legacy articles, 72,572 local references, 4,130 section links, 3,754 image dimensions and 1,832 language alternatives checked.
- 445 branded social images verified; zero missing translations.
- Root-domain canonical URLs and production indexing rules checked across all generated pages.
- Local browser check: mobile navigation, Spanish/English switching and light/dark theme work without the preview banner or horizontal overflow.
- Deployed GitHub origin returned the correct localized homepage and production canonical URL before DNS was changed.
- DNS readback: 37 records after the change, with all 32 records outside the apex A and www CNAME preserved exactly.
- All four authoritative nameservers return the four GitHub Pages addresses and new www CNAME. Recursive caches can temporarily return old answers.

## Before-change evidence and rollback

The previous apex A record was `147.182.168.70` (TTL 3600). The previous `www.saturdays.ai` CNAME was `saturdays.ai` (TTL 3600). WordPress remains on the original server; this operation does not delete or modify it.

An exact DNS/API snapshot and validation logs are saved locally in the ignored `artifacts/cutover-2026-10-25/` directory. The Netlify zone contained 34 explicit records before the change. MX records use Google Workspace; SPF, DKIM, DMARC and the `cursos`/`learn` CNAMEs are preserved.

For a content rollback, revert the relevant Git commit and let validation/deployment complete. For a hosting rollback, restore the apex A and `www` CNAME values above, remove only the replacement GitHub apex A records, and verify the WordPress host and certificate. DNS caches can retain previous answers until their TTL expires. Do not alter nameservers, email or course records.

To return this repository to its separate review URL, remove `PAGES_CUSTOM_DOMAIN`, remove the GitHub Pages custom domain, and rerun the deployment workflow. Do this only after restoring DNS to WordPress, to avoid pointing the domain at an unconfigured Pages site.

## Source limitations

The [Spanish audit](SPANISH-AUDIT-2026-10-25.md) records remaining editorial and manual-device checks. Production publication does not imply that those issues have been closed. Private WordPress drafts, users, transactions and LMS data are outside the public-content migration.

## Provider references

- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages HTTPS and DNS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Netlify DNS API](https://open-api.netlify.com/#tag/DNS-zone)
