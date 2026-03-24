# BoltTools.app — Revenue & Engagement Boost

## Current State
The app has 9 working tools (PDF + Image), AdSense placeholder zones (1 on homepage, 2 on tool pages), a share popup, live ticker, and admin dashboard. All core features are complete.

## Requested Changes (Diff)

### Add
- **More ad slots**: A horizontal banner ad slot at the top of the homepage (below the hero drag-drop area, before tools grid), and a second leaderboard ad between the PDF and Image tool sections.
- **Related Tools section** on every tool page (after the result/download area, before the FAQ): show 3–4 other tools with icons and links. This drives more pageviews per session = more ad impressions.
- **Affiliate links section** in the Footer: "Premium Tools We Recommend" with 3–4 links to Adobe Acrobat, Canva, Smallpdf, ilovepdf with a small "Partner" badge. These earn affiliate commissions when users click through.
- **Social proof numbers** on homepage: a stats bar showing "Over 10,000 files processed" and "Trusted by users in 50+ countries" to increase trust and reduce bounce rate.
- **"Bookmark" nudge banner**: A dismissible banner after a user downloads a file in ToolPageLayout, suggesting they bookmark the site for next time.

### Modify
- Homepage: add 2 more AdSense banner slots (between hero and PDF tools, and between PDF tools and Image tools).
- ToolPageLayout: add RelatedTools component below result section, add bookmark nudge after download.
- Footer: add affiliate links column.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `RelatedTools.tsx` component — takes current toolId, shows 3 other tools from the full tools list with icon, name, description and link.
2. Update `ToolPageLayout.tsx` — render `<RelatedTools toolId={toolId} />` after the result section, add bookmark nudge toast/banner after download.
3. Update `HomePage.tsx` — add 2 more `.adsense-placeholder` banner divs in strategic positions, add social proof stats bar.
4. Update `Footer.tsx` — add an "Affiliate Tools" section with 4 partner links.
