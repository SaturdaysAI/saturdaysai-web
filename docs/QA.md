# Pilot validation

Checked on 24 October 2026.

## Automated

- Astro types: zero errors, warnings or hints.
- Six tests cover draft and future publication, URL collisions, project subpaths, import provenance, CMS field coverage and the economic-content rule.
- Generated output checked at the domain root and GitHub Pages subpath: expected article routes, local links/media, SEO metadata, noindex, RSS, sitemap, draft exclusion and unsafe article embeds.
- 23 HTML pages in the pilot. Eight imported article/project paths and eight city profiles. 171 local raster images; approximately 10.2 MB for the complete site.
- Dependency audit after updating the image processor: no reported vulnerabilities.

## Browser checks

- Desktop breakpoint at 1440 pixels and phone breakpoint at 390 pixels, plus the browser's intermediate default size.
- Homepage interest selector changes its description and destination.
- Blog search finds PyCamp; combined topic filtering produces a useful empty state; reset restores all six stories.
- City search matches Asunción without its accent; region filtering and reset work.
- Learning-level filter shows three advanced paths; text search narrows to reinforcement learning.
- Mobile menu opens, closes with Escape and allows navigation to the article index.
- Imported PyCamp article renders its full body at its original path; copy-link reports success.
- Home, article and Barcelona layouts checked for horizontal overflow. No overflow detected in those checks.
- Browser console inspected during these flows: no warnings or errors recorded.

## Boundaries

- These are targeted functional and visual checks, not a formal WCAG certification or an exhaustive audit of every historical article and external link.
- The full WordPress archive, private content, comments, search rankings, course platform and current city programme details are outside this pilot.
- Pages CMS configuration is present and tested against the content fields; its actual GitHub authorization and a hosted editor save must be verified after the owner connects the app.
- No production DNS, WordPress or custom-domain settings were changed.
