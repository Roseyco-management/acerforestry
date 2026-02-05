---
phase: 09-seo-performance
plan: 01
subsystem: seo
tags: [metadata, opengraph, json-ld, seo, structured-data]

# Dependency graph
requires:
  - phase: 08-animations-polish
    provides: Client component extraction pattern preserving metadata exports
provides:
  - Complete SEO metadata system with page-specific titles/descriptions
  - OpenGraph and Twitter Card configuration for social sharing
  - JSON-LD structured data for LocalBusiness schema
  - Favicon suite and robots.txt for search engine indexing
affects: [10-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [Next.js App Router Metadata API, JSON-LD structured data, title template system]

key-files:
  created:
    - public/robots.txt
    - public/og-image.jpg
    - public/favicon-16x16.png
    - public/favicon-32x32.png
    - public/apple-touch-icon.png
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/app/design-system/page.tsx

key-decisions:
  - "Used title template '%s | Acer Forestry' for consistent branding across pages"
  - "Set metadataBase to https://acerforestry.co.uk for absolute URLs"
  - "Implemented LocalBusiness schema for Scottish forestry contractor context"
  - "Generated favicons from existing logo.svg using ImageMagick"

patterns-established:
  - "Title template system: default + template for child pages"
  - "Metadata export pattern: page-specific titles and descriptions"
  - "JSON-LD structured data in root layout for site-wide business info"

issues-created: []

# Metrics
duration: 3min
completed: 2026-02-05
---

# Phase 09 Plan 01: SEO Metadata & Structured Data Summary

**Complete SEO foundation with metadata, OpenGraph, JSON-LD LocalBusiness schema, and favicon suite for search engine discoverability**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-05T23:07:47Z
- **Completed:** 2026-02-05T23:10:48Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments

- Added comprehensive page metadata to all 6 pages with keyword-optimized titles and descriptions targeting Forest Manager searches
- Configured OpenGraph and Twitter Card metadata for professional social media sharing with 1200x630 hero image
- Implemented JSON-LD LocalBusiness structured data with contact info, service areas (Highlands, Perthshire, Morayshire), and service types
- Created complete favicon suite (16x16, 32x32, 180x180) generated from logo.svg
- Established title template system ('%s | Acer Forestry') for consistent branding across all pages

## Task Commits

Each task was committed atomically:

1. **Task 1: Add comprehensive page metadata to all pages** - `8c7da22` (feat)
2. **Task 2: Add OpenGraph and Twitter metadata to root layout** - `e3e6d62` (feat)
3. **Task 3: Add JSON-LD structured data and create favicon/robots files** - `e0b0525` (feat)

**Plan metadata:** (will be added in metadata commit)

## Files Created/Modified

**Created:**
- `public/robots.txt` - Search engine crawling directives with sitemap reference
- `public/og-image.jpg` - 1200x630 OpenGraph preview image (placeholder with branding)
- `public/favicon-16x16.png` - 16x16 favicon for browser tabs
- `public/favicon-32x32.png` - 32x32 favicon for high-DPI displays
- `public/apple-touch-icon.png` - 180x180 Apple touch icon for iOS

**Modified:**
- `src/app/layout.tsx` - Added comprehensive metadata (OpenGraph, Twitter, keywords, icons, JSON-LD)
- `src/app/page.tsx` - Added home page metadata with woodland establishment keywords
- `src/app/design-system/page.tsx` - Added design system page metadata

**Unchanged (already had metadata):**
- `src/app/forest-managers/page.tsx` - Already had metadata from Phase 4
- `src/app/services/page.tsx` - Already had metadata from Phase 5
- `src/app/subcontractors/page.tsx` - Already had metadata from Phase 6
- `src/app/training/page.tsx` - Already had metadata from Phase 7

## Decisions Made

- **Title template system:** Used `'%s | Acer Forestry'` pattern for consistent branding. Default title for home page is full description, child pages inherit template.
- **Metadata base URL:** Set to `https://acerforestry.co.uk` for absolute URLs in OpenGraph tags (can be updated when final domain confirmed)
- **LocalBusiness schema:** Chosen over Organization schema because Acer Forestry is location-specific (Scotland) and service-area focused
- **Favicon generation:** Used ImageMagick to convert logo.svg to PNG at required sizes with transparent backgrounds
- **Keywords array:** Focused on Scottish forestry search terms (woodland establishment, HSE compliant, regional areas)

## Deviations from Plan

None - plan executed exactly as written. All metadata, structured data, and assets created as specified.

## Issues Encountered

None. Build passed on all attempts. ImageMagick was available for favicon generation. All metadata warnings resolved.

## Next Phase Readiness

**Ready for 09-02-PLAN.md** (Image optimization and Core Web Vitals)

SEO foundation complete:
- ✓ All pages have unique, keyword-optimized metadata
- ✓ Social media previews configured (OpenGraph/Twitter)
- ✓ Search engines can discover and index site (robots.txt)
- ✓ Structured data helps search engines understand business context
- ✓ Favicons display correctly in browser tabs

Next plan can focus on performance optimization (images, Core Web Vitals) knowing that SEO metadata infrastructure is complete.

---
*Phase: 09-seo-performance*
*Completed: 2026-02-05*
