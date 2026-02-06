# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-05)

**Core value:** Convert warm leads across all three audiences - Forest Managers into clients, service browsers into inquiries, and quality tree planters into subcontractors - while establishing Acer Forestry as the credible, professional, ethical choice in the Scottish forestry ecosystem.

**Current focus:** Phase 4 — Forest Manager Funnel

## Current Position

Phase: 10 of 10 (Deployment & Testing)
Plan: 1 of 2 in current phase
Status: In progress
Last activity: 2026-02-06 — Completed 10-01-PLAN.md

Progress: ███████████████████ 95%

## Performance Metrics

**Velocity:**

- Total plans completed: 21
- Average duration: 4.2 min
- Total execution time: 1.47 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
| ----- | ----- | ----- | -------- |
| 01    | 2     | 8.4m  | 4.2m     |
| 02    | 3     | 9.0m  | 3.0m     |
| 03    | 2     | 2.0m  | 1.0m     |
| 04    | 2     | 13.0m | 6.5m     |
| 05    | 2     | 5.0m  | 2.5m     |
| 06    | 2     | 4.0m  | 2.0m     |
| 07    | 2     | 10.0m | 5.0m     |
| 08    | 2     | 6.0m  | 3.0m     |
| 09    | 3     | 14.0m | 4.7m     |
| 10    | 1     | 19.0m | 19.0m    |

**Recent Trend:**

- Last 5 plans: 7.2m avg
- Trend: Deployment work took longer (expected)

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

| Phase | Decision | Rationale |
|-------|----------|-----------|
| 01 | Manual Next.js setup instead of create-next-app | Existing directory contents prevented create-next-app; moved to old-site-backup/ |
| 01 | Next.js 15.5.12 instead of 14.x | Latest stable version provides better features and performance |
| 01 | React 19 | Latest features and improvements |
| 01 | Framer Motion 12.33.0 | Industry-standard animation library with excellent Next.js 15+ support |
| 01 | Organized folder structure (components/lib/types) | Follows Next.js best practices, prepares for Phase 2 component library |
| 02 | Extended Tailwind colors (not replaced) | Preserves default utilities while adding brand colors |
| 02 | CSS custom properties for brand colors | Enables usage outside Tailwind context |
| 02 | Inter font weights 400, 500, 600, 700 | Provides range from regular to bold while keeping font size manageable |
| 02 | CSS custom properties for typography | Enables typography usage in non-Tailwind contexts |
| 02 | display: swap for font loading | Shows fallback immediately for better rural connection experience |
| 02 | Type scale 1.25 ratio | Uses Tailwind defaults for ecosystem consistency |
| 02 | Three-folder component structure | ui/ for primitives, sections/ for patterns, layout/ for navigation - clarifies hierarchy |
| 02 | clsx for className merging | Enables Tailwind override pattern while maintaining base styling |
| 02 | Variant-based styling over duplication | Reduces code duplication, cleaner component API |
| 02 | Semantic vs visual heading decoupling | Critical for SEO - allows h2 to visually match h1 when needed |
| 03 | Single component for desktop and mobile navigation | Centralizes navigation logic using useState for mobile menu toggle |
| 03 | Hamburger icon using CSS borders | Reduces dependencies, provides full styling control |
| 03 | Phone CTA as Button with anchor inside | Maintains Button styling while allowing tel: href functionality |
| 03 | Three-column footer layout | Responsive grid layout that stacks on mobile, provides clear organization |
| 03 | MainLayout wrapper pattern | Centralizes Header/Footer structure for consistent site-wide layout |
| 03 | Root layout integration | Automatic Header/Footer on all pages via Next.js layout system |
| 04 | Alternating backgrounds for value props | Creates visual rhythm between sections (bg-light/white pattern) |
| 04 | Container size="md" for value props | Maintains readable line length for focused messaging |
| 04 | Direct phone CTA in hero | Reduces friction for Forest Manager audience by providing immediate contact option |
| 04 | Anchor tags wrap Button components for CTAs | Maintains proper clickability for tel: and mailto: links, Button stays pure presentational |
| 04 | Dark section bookends (Hero and ContactCTA) | Creates visual flow with dark → light alternating → dark pattern |
| 04 | Dual CTA approach (phone primary, email secondary) | Provides conversion flexibility for different communication preferences |
| 05 | Hero without CTA for informational pages | Services page is informational, not conversion-focused - custom hero without button |
| 05 | 2-column responsive grid for service cards | Stacks to single column on mobile, Container size lg for broader display |
| 05 | Service card structure (Heading + paragraph) | Maintains visual consistency with established design system |
| 05 | 3-column grid for second section | Only 3 cards in section, so lg:grid-cols-3 instead of 2-column layout |
| 05 | bg-offwhite for second section | Section component limitation - only supports offwhite/light/primary |
| 05 | 16:9 aspect ratio photo placeholders | Standard video aspect ratio, neutral-200 gray with centered text |
| 06 | Hero subtitle emphasis on quality opportunities | Highlighted professionalism, weekly pay, productive conditions to appeal to skilled subcontractors |
| 06 | Value prop ordering for subcontractors | Well-Organized Sites first (workflow), Weekly Payment second (cash flow), Competitive Rates third (compensation) |
| 06 | CTA text "Call About Opportunities" | More specific than generic "Call Us", clarifies action and outcome |
| 07 | Placeholder cards instead of actual videos | Videos not available yet, created placeholder infrastructure matching established design system pattern |
| 07 | 4 training topics selected | Tree Planting, Ground Prep, Safety, Quality Standards - relevant to Acer Forestry expertise areas |
| 07 | Matched services page pattern | Used same Card/Heading/aspect-video structure for visual consistency |
| 07 | afterInteractive strategy for all analytics | GA4, Clarity, Meta Pixel load after page interactive to avoid blocking render |
| 07 | Lazy loading pattern for videos | Documented loading="lazy" optimization for when actual video URLs are available |
| 08 | Inline motion.div in Hero for custom stagger timing | Hero has specific directional movements (title up, subtitle down, button scale) that benefit from inline customization |
| 08 | Desktop-only navigation animations | Mobile menu instant on click for better UX - animations only on desktop nav |
| 08 | Subtle animations for professional aesthetic | 0.4-0.6s duration, small movements maintain professional forestry brand tone |
| 08 | viewport once:true for all scroll animations | Prevents re-animation on scroll, better performance |
| 08 | Viewport thresholds optimized per component | 0.3 for ValueProp (large sections), 0.2 for cards, 0.5 for CTA (emphasis) |
| 08 | Scale animation for ContactCTA | Emphasis effect different from fade/slide pattern creates conversion focus |
| 08 | Client component extraction for pages with metadata | Preserves App Router metadata exports while enabling animations |
| 09 | Title template '%s \| Acer Forestry' | Consistent branding across pages, default for home page, template for children |
| 09 | metadataBase https://acerforestry.co.uk | Absolute URLs for OpenGraph - can be updated when final domain confirmed |
| 09 | LocalBusiness schema over Organization | Location-specific Scottish contractor with defined service areas |
| 09 | Favicon generation from logo.svg | ImageMagick conversion to PNG at 16x16, 32x32, 180x180 with transparent backgrounds |
| 09 | Framer Motion tree-shaking via optimizePackageImports | Reduces bundle size by importing only used Framer Motion components |
| 09 | AVIF and WebP image formats | Modern formats with better compression for future images |
| 09 | Web Vitals sent to Google Analytics | Centralized monitoring rather than separate service |
| 09 | OptimizedImage wrapper component | Standardizes blur placeholder, lazy loading, and quality settings for future images |
| 09 | Manual Lighthouse testing over CLI | Browser-based Lighthouse audits provide real-world results, CLI unavailable in environment |
| 09 | Production build validated all pages | All 5 pages confirmed HTTP 200, bundle sizes 102-155KB per page |
| 09 | Core Web Vitals targets for rural Scotland | LCP <2.5s, FID <100ms, CLS <0.1 optimized for 3G/4G connections |
| 10 | Analytics IDs hardcoded in source | GA4, Clarity, and Meta Pixel IDs in layout.tsx - no Vercel env vars needed |
| 10 | Custom domain deferred to manual setup | User owns acerforestry.co.uk, will configure DNS via Vercel dashboard when ready |

### Deferred Issues

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-02-06T00:11:32Z
Stopped at: Completed 10-01-PLAN.md — Vercel Deployment Setup
Resume file: None
Next plan: 10-02 (Final Testing & Launch Verification)
