# Site review and improvements

Reviewed on 24 October 2026. Scope: the GitHub Pages migration preview, its shared templates, public archive and editing workflow. The original WordPress site and domain settings remain unchanged.

## Visitor journey

1. **Arrive and choose a direction — healthy after fixes.** The official logo, palette and Montserrat typography remain consistent. Explore is now in primary navigation. Navigation works at 320, 390, 900 and 1440 pixels; the smallest screen no longer scrolls sideways. The interest selector changes its explanation and destination. Mobile Escape closes the navigation.
2. **Choose learning — healthy after fixes.** The six learning paths share searchable, restorable filters. Course links have distinct accessible names. Generative AI opens the migrated programme page. External course links still lead to the existing learning platform.
3. **Find a community — healthy after fixes.** Sixteen supplied city logos appear uncropped in directory cards. Accent-insensitive search finds Asunción when typing `asuncion`. Region and text filters combine, and their state can be shared in the URL. Starting a community opens the migrated local page.
4. **Find a story — healthy after fixes.** Search and topic/year filters precede the featured story. The feature becomes compact on phones and disappears while filtering. URLs preserve search, topic, year and expanded results through reloads and returning from an article. Clear filters and an empty-state recovery are available. Show more moves keyboard focus to the next story title. A missing-page search opens filtered archive results.
5. **Read and navigate — healthy in sampled flows.** Native collapsible contents controls work on mobile; desktop contents remain beside the article. Selecting a section closes the phone menu, focuses the heading and leaves it below the sticky header. Article tools and dates follow English, Spanish or Portuguese content. Empty builder headings are removed without changing existing section numbers or losing embedded images. Images reserve their intrinsic proportions; code and tables are keyboard-scrollable. Linked logos receive a usable name. Four broken section/citation destinations were corrected, plus an obsolete WordPress editor link.
6. **Write and maintain — healthy for the tested draft workflow.** The Pages CMS button is visible before instructions on mobile. The existing CMS-created test article remains a draft and is excluded from the website, RSS and sitemap. Articles require a body before publication; editable destinations and city identifiers are validated. Common filters, reading navigation and Markdown cleanup are shared components, reducing future maintenance.

## Verification

- Astro: zero errors, warnings or hints.
- 17 automated tests passed, covering publication rules, complete archive reconciliation, economic-copy boundaries, URL filters, safe rendering, image dimensions and editable destinations.
- 457 generated HTML pages; all 162 original posts and 63 legitimate page paths retained.
- 20,415 local references, 2,064 fragment links and 1,998 article-image occurrences checked successfully.
- No empty headings, unnamed links, broken section links, duplicate IDs or images without dimensions in the generated-content scan.
- Preview canonical URLs, robots/noindex, RSS project prefix, spam exclusion and unpublished test drafts checked.
- Browser checks used real rendered pages and controls, including 320-pixel phones, 390-pixel phones and desktop. Search reload/back behavior, pagination focus, combined filters, section navigation, menu recovery, 404 recovery and editor access were exercised.
- Local screenshots and before/after measurements are in ignored `artifacts/review/`; `report.md` provides the visual comparison. Build logs are retained there as well.

## Boundaries and remaining source limitations

This is a targeted design, functional and static-content review, not a formal WCAG certification or a manual fact check of every historical article and external destination. Existing historical wording was preserved. Six original image URLs were unavailable during migration; they remain documented in `MIGRATION.md`. Original placeholder legal copy needs owner-supplied wording before a production launch. The footer now links directly to the substantive existing privacy policy. External LMS, accounts and email remain separate services. No new CMS draft or production change was needed for this review.
