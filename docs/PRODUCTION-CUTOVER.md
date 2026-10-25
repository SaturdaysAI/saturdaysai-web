# Production deployment

Authorized by the site owner on 25 October 2026 to replace the WordPress website at https://saturdays.ai/ with this repository's GitHub Pages website.

Status: production build and domain cutover in progress. This record will be updated with live verification results.

## Configuration

- Repository: `SaturdaysAI/saturdaysai-web`, branch `main`.
- GitHub Actions repository variable: `PAGES_CUSTOM_DOMAIN=saturdays.ai`.
- GitHub Pages custom domain: `saturdays.ai`.
- Build: `SITE_URL=https://saturdays.ai`, `BASE_PATH=/`, `PUBLIC_SITE_MODE=production`.
- DNS provider: Netlify, team `apolmig`, existing zone `saturdays.ai`.
- Planned apex A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- Planned `www` CNAME: `saturdaysai.github.io`.
- Email, course platforms and other subdomains retain their existing DNS records.

Production removes the review banner and permits search crawling on substantive pages. Thin archives, utility and placeholder pages remain noindex. Existing article/page paths remain at the domain root; English versions use `/en/`. Pages CMS continues committing to this same repository.

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
