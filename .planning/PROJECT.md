# Acer Forestry Website

## What This Is

A modern marketing website for Acer Forestry Ltd, a Scottish woodland establishment specialist operating across the Highlands, Perthshire, and Morayshire. The site serves three distinct audiences: Forest Managers seeking contractors, potential clients exploring services, and self-employed subcontractors looking for work opportunities.

## Core Value

Convert warm leads across all three audiences - Forest Managers into clients, service browsers into inquiries, and quality tree planters into subcontractors - while establishing Acer Forestry as the credible, professional, ethical choice in the Scottish forestry ecosystem.

## Requirements

### Validated

- ✓ **Forest Manager Funnel Page** — v1.0 (HSE compliance, tree survival rates, silvicultural expertise, communication, invoicing, ICF ethics messaging implemented)
- ✓ **Services Deep Dive Page** — v1.0 (All 7 services showcased with photo placeholders ready for future enhancement)
- ✓ **Subcontractor Funnel Page** — v1.0 (Weekly pay, organized sites, competitive rates, accommodation, application process)
- ✓ **Training Videos Page** — v1.0 (Educational content section with placeholder infrastructure for future video embedding)
- ✓ **Responsive Design** — v1.0 (Mobile-first approach tested across devices, field-optimized for forest managers)
- ✓ **Professional Branding** — v1.0 (Dark green #1B4332 AF monogram, cohesive color palette, Inter typography system)
- ✓ **Smooth Animations** — v1.0 (Framer Motion entrance and scroll animations with professional subtlety)
- ✓ **Fast Loading** — v1.0 (Optimized for rural Scotland connections, Core Web Vitals targets achieved)
- ✓ **SEO Optimization** — v1.0 (Complete metadata, LocalBusiness structured data, OpenGraph, keyword optimization)
- ✓ **Contact Integration** — v1.0 (Phone/email CTAs throughout, tel: and mailto: links functional)

### Active

- [ ] **Custom Domain Setup** - Configure acerforestry.co.uk DNS with Vercel for branded production URL
- [ ] **Client Testimonials** - Collect and integrate testimonials from satisfied Forest Managers
- [ ] **High-Quality Service Photos** - Capture and add professional photos of tree planting, ground prep, and other services
- [ ] **Training Video Content** - Record or source actual training videos to replace placeholder cards
- [ ] **Public Launch Strategy** - Plan timing and channels for public announcement after content enhancements

### Out of Scope

- **Client portal/login system** - No password-protected areas for clients to check project status. Contact remains direct via phone/email.
- **E-commerce/payments** - No online purchasing or payment processing. All contracts negotiated directly.
- **Customer reviews/testimonials** - Not currently available. Design allows for future addition when obtained.
- **Live quote calculator** - Forest management contracts too complex for automated pricing.
- **Multi-language support** - English only for Scottish market.

## Context

### Current State

**Shipped v1.0 MVP on 2026-02-08:**
- 3,331 lines of TypeScript/TSX/CSS
- Tech stack: Next.js 15, React 19, Tailwind CSS, Framer Motion
- Deployed to Vercel: https://acerforestry.vercel.app
- Soft launch strategy: Live but not actively promoted
- Analytics: GA4, Microsoft Clarity, Meta Pixel integrated
- 3-day development cycle (Feb 5-8, 2026)

**Current Status:**
- All 10 phases complete
- Website fully functional and tested
- Ready for content enhancements and custom domain setup
- Monitoring performance during soft launch period

### Business Background

- **Company**: Acer Forestry Ltd (SC670730)
- **Directors**: Rob and Dillan (26 years combined experience)
- **Specialty**: Woodland Establishment (planting + 5-year protection until independence)
- **Geography**: Highlands, Perthshire, Morayshire, Scotland
- **Forest Cycle**: 5-year protection period → 35 years growth → timber harvest → repeat

### Scottish Forestry Ecosystem

Forest Managers work for large estates and coordinate multiple specialist contractors:

- Timber Harvesting
- Timber Transport
- Saw Mills
- Fencing
- Deer Culling
- Surveyors
- Ground Preparation
- **Woodland Establishment (Acer Forestry's specialty)**

### Audience Pain Points

**Forest Managers Value:**

1. HSE compliance (health, safety, environment)
2. High tree survival rates
3. Silvicultural understanding (forestry science)
4. Flexibility in project execution
5. Good communication
6. Straightforward invoices matching agreements
7. Ethical values aligned with ICF (Institute of Chartered Foresters)

**Subcontractors Value:**

1. Well-organized work sites
2. Fast payment (weekly in our case)
3. Competitive rates
4. Caravan accommodation if needed
5. Good ground conditions

### Previous Website

- Was built on Wix platform (archived to `old-site-backup/`)
- Content scraped and available in `/content.txt`
- Basic structure but lacked modern polish and targeted messaging
- Training videos page concept retained in new site

### Visual Assets

- Logo: AF monogram with leaf (created with Grok AI)
- Needs: Darker green color refinement
- Current scraped site has 7 images (low quality)
- High-quality service photos needed for future enhancement

## Constraints

- **Tech Stack**: React with Next.js, Framer Motion, Tailwind CSS, TypeScript — Modern, SEO-friendly, performant
- **Hosting**: Vercel (free tier acceptable) — Low cost, excellent Next.js integration
- **Performance**: Must work well on slower rural internet connections
- **Mobile First**: Forest managers often access from phones in the field
- **Timeline**: Build it right over build it fast — Quality and professionalism are paramount

## Key Decisions

| Decision                               | Rationale                                                                                              | Outcome |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------- |
| Next.js over plain React               | SEO critical for discoverability, Vercel deployment simplicity, excellent Framer Motion support        | ✓ Good  |
| Three-funnel architecture              | Distinct audiences need tailored messaging (Forest Managers ≠ Subcontractors ≠ Service browsers)       | ✓ Good  |
| Design blending professional + natural | Must convey credibility (HSE compliance, ICF ethics) while reflecting connection to Scottish landscape | ✓ Good  |
| Include training videos in v1          | Demonstrates expertise and methods, valuable for both client confidence and subcontractor recruitment  | ✓ Good  |
| No reviews/testimonials initially      | Not currently available, but design allows future addition when obtained                               | ✓ Good  |
| Darker green logo refinement           | Better connection to forestry/nature theme, more professional than bright green (#1B4332 selected)     | ✓ Good  |
| Soft launch strategy                   | Allows monitoring, content enhancement, and custom domain setup without pressure                       | ✓ Good  |

---

_Last updated: February 8, 2026 after v1.0 milestone_
