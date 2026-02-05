# Phase 02: Design System - Discovery

**Date:** 2026-02-05
**Research Level:** Standard (15-30 min)
**Status:** Complete

## Research Questions

1. What color palette best conveys professional forestry credibility while maintaining natural warmth?
2. What typography system balances modern professionalism with accessibility?
3. What component patterns should we establish for the three conversion funnels?

## Color Psychology for Forestry/Environmental Brands

### Research Findings

**Natural Green Spectrum:**
- **Dark Forest Green (#1B4332, #2D6A4F)**: Conveys maturity, stability, expertise - ideal for professional forestry services
- **Medium Green (#40916C, #52B788)**: Balance of credibility and growth
- **Sage/Muted Green (#74C69D, #95D5B2)**: Softer, more approachable but less authoritative

**Professional Service Design Patterns:**
- Primary brand color should be darker, trustworthy (dark green)
- Secondary/accent colors can be lighter for UI elements
- Neutrals (grays, off-whites) provide professional structure
- Scottish landscape colors: deep greens, slate grays, heather purples (accent only)

### Color Palette Recommendation

**Primary Brand Colors:**
- **Primary Green**: `#1B4332` (Dark Forest Green) - Logo, headings, primary CTAs
- **Secondary Green**: `#2D6A4F` (Forest Green) - Section backgrounds, hover states
- **Accent Green**: `#52B788` (Growth Green) - Interactive elements, success states

**Neutrals:**
- **Charcoal**: `#2B2D42` - Body text
- **Slate Gray**: `#8D99AE` - Secondary text
- **Light Gray**: `#EDF2F4` - Backgrounds, dividers
- **Off-White**: `#FEFEFE` - Page backgrounds

**Accent (Scottish Landscape):**
- **Heather Purple**: `#7209B7` (sparingly for highlights)
- **Stone Gray**: `#6C757D` (tertiary elements)

**Rationale:**
- Dark greens establish forestry expertise and ICF professionalism
- Graduated green scale provides flexibility without diluting brand
- Neutral grays ensure readability and modern aesthetic
- Accent colors add Scottish character without overwhelming

## Typography System

### Research Findings

**Professional Service Typography Patterns:**
1. **Sans-serif for body**: Clean, modern, accessible, mobile-friendly
2. **Serif for headings (optional)**: Traditional, authoritative - BUT can feel dated
3. **Variable fonts**: Better performance for rural connections

**Next.js Font Recommendations:**
- **Inter**: Modern, highly readable, variable font, excellent for professional services
- **System fonts**: Best performance but less distinctive

### Typography Recommendation

**Font Stack:**
```typescript
// Headings: Inter (700, 600)
// Body: Inter (400, 500)
// Using next/font/google for optimal loading
```

**Type Scale (Tailwind):**
- `text-5xl` (3rem/48px): Page titles
- `text-4xl` (2.25rem/36px): Section headings
- `text-3xl` (1.875rem/30px): Subsection headings
- `text-2xl` (1.5rem/24px): Card titles
- `text-xl` (1.25rem/20px): Large body, CTAs
- `text-lg` (1.125rem/18px): Emphasized body
- `text-base` (1rem/16px): Body text
- `text-sm` (0.875rem/14px): Small text, captions

**Line Heights:**
- Headings: `leading-tight` (1.25)
- Body: `leading-relaxed` (1.625)

**Font Weights:**
- Bold (700): Primary headings, CTAs
- Semibold (600): Secondary headings
- Medium (500): Emphasized body
- Regular (400): Body text

**Rationale:**
- Inter is professional, highly readable, and performs well
- Single font family reduces complexity and load time
- Weight differentiation provides hierarchy without font switching
- Type scale follows 1.25 ratio for harmonious progression

## Component Architecture

### Research Findings

**Design System Patterns:**
1. **Atomic Design**: Atoms → Molecules → Organisms → Templates → Pages
2. **Compound Components**: Related components grouped together
3. **Slot Pattern**: Flexible composition with children props

**For This Project (3-funnel architecture):**
- **Core components**: Button, Card, Section, Container, Heading
- **Composition patterns**: Hero sections, value propositions, CTAs
- **Funnel-specific variants**: Forest Manager (credibility), Services (showcase), Subcontractor (benefits)

### Component Library Structure

**Recommended Structure:**
```
src/components/
├── ui/              # Core reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Heading.tsx
│   └── Section.tsx
├── layout/          # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── PageLayout.tsx
└── sections/        # Composite sections
    ├── Hero.tsx
    ├── ValueProps.tsx
    ├── CTASection.tsx
    └── ServiceCard.tsx
```

**Component Principles:**
1. **Variants over duplication**: Use props for styling variations
2. **Composition over configuration**: Flexible children over rigid structure
3. **Tailwind + className override**: Base styles + className prop for flexibility
4. **TypeScript interfaces**: Strong typing for props

**Rationale:**
- Three-folder structure separates concerns clearly
- ui/ components are building blocks
- layout/ components are structural
- sections/ components are composed patterns specific to our funnels
- This scales well as we add more pages

## Logo Refinement

### Current State
- AF monogram with leaf
- Created with Grok AI
- Current green likely too bright

### Recommendation
- Refine to Primary Green: `#1B4332`
- Ensure leaf detail is visible at small sizes
- Provide both light (original) and dark background versions
- Export as SVG for scalability

**Action:** Update logo SVG color value to `#1B4332` (handled in execution)

## Decision Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Primary Brand Color | #1B4332 (Dark Forest Green) | Professional forestry authority, ICF credibility |
| Color Palette | Graduated greens + neutrals | Flexibility without brand dilution |
| Typography | Inter (single family, multiple weights) | Modern, readable, performant |
| Type Scale | 1.25 ratio Tailwind defaults | Harmonious hierarchy |
| Component Structure | ui/ + layout/ + sections/ | Clear separation, scales well |
| Component Pattern | Variants + composition | Flexible, reusable, maintainable |

## Files to Create (Execution Phase)

### Plan 02-01: Colors & Logo
1. `tailwind.config.ts` - Extend theme with color palette
2. `src/app/globals.css` - CSS custom properties for colors
3. Logo refinement (update SVG file color)

### Plan 02-02: Typography
1. `src/app/layout.tsx` - Import Inter with next/font/google
2. `tailwind.config.ts` - Typography configuration

### Plan 02-03: Component Library
1. `src/components/ui/Button.tsx`
2. `src/components/ui/Card.tsx`
3. `src/components/ui/Container.tsx`
4. `src/components/ui/Heading.tsx`
5. `src/components/ui/Section.tsx`
6. `src/components/sections/Hero.tsx`
7. `src/components/sections/ValueProps.tsx`
8. `src/components/sections/CTASection.tsx`

## Risks & Mitigations

**Risk:** Color palette too dark for accessibility
**Mitigation:** Use WCAG AAA contrast checker, ensure text/background combos meet standards

**Risk:** Too many component variants causing maintenance burden
**Mitigation:** Start minimal (2-3 variants per component), add only when pattern emerges

**Risk:** Typography too large for mobile
**Mitigation:** Use Tailwind responsive utilities (text-3xl md:text-5xl pattern)

## Next Steps

Proceed to create execution plans (02-01, 02-02, 02-03) based on this discovery research.
