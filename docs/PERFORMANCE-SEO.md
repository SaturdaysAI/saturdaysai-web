# Performance, discovery and SEO review

Reviewed 24 October 2026. This pass extends the design review in REVIEW.md.

## Visitor experience

- Podcast episodes show compact artwork and the available player beside the introduction. At 390px, the latest episode's play button is within the first screen. The eight episodes with an approved embedded player promote it here; the remaining episodes retain their original listening-platform links and a jump to episode notes. No episode URL was invented.
- The podcast directory filters all 41 episodes by five seasons. Search and season filters combine, persist in the address and survive reload. Empty results can be reset. Pagination moves keyboard focus to the newly revealed stories.
- Episode cards show season and episode numbers instead of mistaking a short description's reading time for audio duration.
- Related stories rank shared specific topics, category, language and content type, with a stable recency fallback. Podcast recommendations remain podcast episodes. Drafts, future posts and the current article are excluded.
- Topic links open an existing filtered journal view. Localized next-step panels link to learning, community, more episodes and the existing RSS feed.
- A repeated first body image is omitted only when it exactly duplicates the cover and is an unlinked image without a caption. Original Markdown, captions, linked images and other photographs remain intact.
- Embedded media is loaded only after activation, with a direct provider link available. The Acast widget was visibly loaded in the browser; playback duration and audio completion were not tested.

## Measured asset sizes

`npm run assets` prepares responsive WebP versions before development, type checks and builds. Original media is retained. New CMS cover uploads therefore use the same pipeline on deployment without manual image work.

| Measurement | Original bytes | Responsive bytes | Reduction |
| --- | ---: | ---: | ---: |
| 188 eligible images, aggregate 480px versions | 12,560,522 | 3,209,610 | 74.4% |
| Homepage photograph, 960px version selected in desktop review | 68,614 | 32,584 | 52.5% |
| Latest podcast artwork, 480px version selected in phone review | 25,224 | 8,646 | 65.7% |
| Latest PyCamp card image, 480px version | 162,496 | 20,046 | 87.7% |

203 originals are indexed, with 319 smaller derivatives at 480px and/or 960px. The browser selects a candidate for the display size and pixel density; the 74.4% figure is an asset comparison, not a claim that every visit transfers 74.4% less data. Local output grows from about 84.1 MB to 94.6 MB because original and derived files coexist.

Compressed CSS is about 10.7 KB. Sample compressed HTML is about 10.6 KB for home, 42.0 KB for the journal, 14.0 KB for the podcast directory and 7.8 KB for the latest episode. Responsive-image attributes, metadata and useful navigation add some HTML; original cover images are no longer required in small cards. Only the primary Latin font is preloaded. Below-fold images remain lazy-loaded; the main hero is prioritized.

`scripts/verify-performance.mjs` enforces 60 KB compressed HTML per representative page and 25 KB compressed CSS, checks derivative sizes and requires click-to-load media. `scripts/verify-build.mjs` also resolves every responsive-image candidate. These are static build checks, not Core Web Vitals or Lighthouse measurements. No conversion or engagement uplift is claimed.

## Search and sharing

- Every page has canonical, description, social image description and dimensions, Twitter metadata, and an Organization / WebSite / WebPage graph.
- Articles and podcasts have their own appropriate structured type. Articles, city pages and imported content pages include breadcrumb structured data reflecting their navigation.
- Editors can supply a meaningful update date in Pages CMS. A published update cannot precede publication or be in the future. Rendering never fabricates a fresh date for an old story.
- The sitemap contains 414 URLs. Utility pages, empty legal placeholders and duplicate year/month listings remain reachable but are excluded from the sitemap and receive noindex in production.
- The entire GitHub preview remains noindex and disallowed by robots.txt. Production indexing requires the separately approved production switch. Structured data is not a guarantee of a rich result.

The implementation follows [Google's breadcrumb guidance](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) and [web.dev's responsive-image guidance](https://web.dev/learn/design/responsive-images).

## Validation

- 24 unit tests passed; Astro reported zero errors, warnings or hints.
- 457 HTML pages, all 162 original posts and 63 original pages retained.
- 26,624 local references, 2,097 fragment links and 1,930 prose-image occurrences checked. The prose-image count decreased because duplicate covers are displayed once.
- Both CMS draft markers and spam remain excluded from HTML, feed and sitemap.
- Production dependency audit reported zero vulnerabilities.
- Browser review covered desktop 1440px and phones at 390px and 320px, responsive image selection, podcast player activation, season/search/reset/reload/pagination, topic links, community links and mobile menu Escape/focus behavior. No overflow in the reviewed layouts or console errors in the reviewed flow.
- All pricing/economic-copy rules and the official brand remain in force. WordPress, production DNS and mail settings are unchanged.

Screenshots and machine-readable measurements are stored locally under `artifacts/pass-two/`. These checks are targeted QA, not a formal accessibility certification or a manual review of every external historical link.

## Maintenance

Use `npm run verify` before publishing. Responsive files under `public/media/responsive/` are generated and ignored by Git; CI recreates them. Do not edit them through the CMS. Keep uploading originals under `/media/` and preserve existing permanent paths. Build preparation supports local WebP, JPEG and PNG covers. Other formats retain their original URL.

Layout and interactions remain reusable Astro components with small browser scripts. The additions use the existing image-processing dependency and introduce no analytics service, subscription system or application framework.
