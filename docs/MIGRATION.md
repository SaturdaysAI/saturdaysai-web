# Public migration record

Snapshot: 24 October 2026. Source: https://saturdays.ai/. The original WordPress installation was read only.

## Reconciliation

| Public content                 |                 Source |              Imported |
| ------------------------------ | ---------------------: | --------------------: |
| Posts                          |                    162 |                   162 |
| Pages                          |                     64 | 63 legitimate records |
| City communities               | 23 identified in pages |                    23 |
| Podcast episodes               | 41 identified in posts |                    41 |
| Approved public comments       |                      1 |                     1 |
| Nonempty category/tag archives |                    191 |            191 routes |
| Year/month archives            |                     38 |             38 routes |

The generated site has 457 HTML pages. There are 1,767 localized asset mappings, including optimized images and referenced documents. Mappings can include different source versions of an image; this is not a count of unique WordPress media-library records. The source media inventory contained 1,808 records, including unused files and one excluded spam upload. The compiled site is approximately 84 MB.

All 225 legitimate source post/page paths are represented locally. The GitHub preview adds `/saturdaysai-web` before these paths. Original production paths will match at a future root-domain deployment. Internal links are rewritten to the corresponding local routes. Image/document references use local optimized paths; legacy WordPress upload paths are not mirrored as separate endpoints.

Articles retain complete bodies, dates, public bylines, links, captions and project-team credits. Public RSS supplied author names where the REST endpoint or page did not expose them. Legacy XMP code blocks in two tutorials are preserved as escaped code. One incorrect podcast summary was corrected against its own article body; the English TorchFakes article has the correct language metadata.

General pages retain their public content with economic messaging removed. City and main-section source details are available in clearly labelled expandable archives. Navigation, duplicate builder widgets, shopping fragments and executable WordPress code were replaced by shared static templates. The old particle-only learning page now has an accessible learning-topic explorer. Empty translated home records remain useful language entry pages.

## Exclusions and unavailable sources

- Excluded pharmaceutical spam page 12005 and spam PDF media 12008.
- Removed two injected spam anchors from legitimate article 6765 while retaining the article.
- Removed pricing, fee, discount, donation and related economic copy on general/city pages. Original blog economic content remains.
- Six original image URLs could not be retrieved. Their links/captions remain where supplied; no replacement image has been invented.

| Article ID | Unavailable source                        | Observed result |
| ---------- | ----------------------------------------- | --------------- |
| 10919      | Two expiring LinkedIn CDN images          | 403             |
| 7418       | Technology Review employment illustration | 404             |
| 6856       | Elisa Polystar meeting image              | 404             |
| 6851       | Googleusercontent image                   | 404             |
| 6025       | Medium image                              | 500             |

Exact source URLs, source IDs, redactions and asset mappings are in `imports/manifest.json`. Raw snapshots are ignored working files.

## Services and source limitations

This migration covers publicly accessible website content, not WordPress administration, private drafts, user accounts, transactions or an LMS database. External course delivery, enrolment, forms, hosted videos and audio remain with their original providers. Supported embedded media uses explicit reader-initiated loading; other external resources remain links.

The original `/terms/` and `/privacy-policy/` pages contain placeholder copy. Their paths are preserved; the latter links to the substantive original policy at `/privacy-policy-2/`. City archive dates are historical, not promises of current enrolment. These source-content issues need an editorial decision before production cutover.

## Maintenance contract

`inventory-wordpress.mjs` captures public records. `import-archive.mjs` converts and localizes reviewed records. `fetch-public-archive.mjs` and `refine-archive.mjs` record follow-up source and fidelity checks. `apply-brand.mjs` records the initial one-time brand conversion. These are migration utilities, not deployment steps. They require local raw/brand inputs and must not be used to overwrite subsequent CMS edits. CI builds solely from committed content and local assets.
