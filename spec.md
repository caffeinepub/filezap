# BoltTools.app — Major Expansion (Beat iLovePDF)

## Current State
- 6 PDF tools: Compress, Merge, Split, PDF→Word, PDF→JPG, Add Watermark
- 5 Image tools: Compress, Resize, Convert, JPG→PDF, PNG→PDF
- Admin dashboard at /admin
- Cyber-minimalist dark theme, emerald accents
- System Health Panel on merge tool
- AdSense slots, affiliate links, referral system
- Privacy Policy + Contact pages
- Homepage with hero, tool grid, comparison table

## Requested Changes (Diff)

### Add
- **New PDF Tools (10):**
  - Rotate PDF — rotate pages 90/180/270°, select individual pages or all
  - Protect PDF — add password protection via pdf-lib
  - Unlock PDF — remove password from PDF (client-side attempt)
  - Remove Pages — select and delete specific pages
  - Reorder Pages — drag-and-drop page reordering with thumbnails
  - Add Page Numbers — stamp page numbers (position, font size, style)
  - Sign PDF — draw or type a signature, place it on the page
  - Word to PDF — convert .docx/.doc to PDF using client-side processing
  - Excel to PDF — convert .xlsx to PDF (table rendering)
  - PDF to PNG — convert PDF pages to PNG format
- **New Image Tools (1):**
  - Image to PDF — batch multiple images into one PDF
- **New SEO Pages:**
  - /rotate-pdf, /protect-pdf, /unlock-pdf, /remove-pdf-pages
  - /reorder-pdf-pages, /add-page-numbers, /sign-pdf
  - /word-to-pdf, /excel-to-pdf, /pdf-to-png, /image-to-pdf
  - /bolttools-vs-ilovepdf — dedicated comparison page targeting "BoltTools vs iLovePDF" search
- **Homepage upgrades:**
  - Display all new tools in the tool grids
  - Add a "vs iLovePDF" banner/link in hero area
  - Mobile-first tool cards with better spacing
  - "20+ Tools" badge in hero

### Modify
- App.tsx — add routes for all new pages
- HomePage.tsx — add new tools to pdfTools and imageTools arrays, update hero badge
- Footer.tsx — add new tool links in sitemap section

### Remove
- Nothing removed

## Implementation Plan
1. Create new page components for each new tool (all client-side, same pattern as existing tools)
2. For tools requiring pdf-lib: Rotate, Protect, Remove Pages, Add Page Numbers — use pdf-lib directly
3. For Sign PDF: canvas-based signature pad, place on PDF via pdf-lib
4. For Word/Excel to PDF: best-effort client-side conversion with clear messaging about limitations
5. For PDF to PNG: use pdfjs-dist canvas rendering, download as PNG
6. For Image to PDF: batch images → pdf-lib PDFDocument
7. For all new tools: include System Health Panel, progress bar, result screen, SEO content block, related tools section
8. Add /bolttools-vs-ilovepdf page with detailed comparison, privacy focus, and SEO content
9. Update App.tsx routes
10. Update HomePage with new tool cards
11. Validate and deploy
