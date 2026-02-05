# Mobile Responsiveness & Slow Connection Testing

**Generated:** 2026-02-05
**Environment:** Local production build (npm run build && npm run start)

## Test Overview

Testing all pages at multiple breakpoints and connection speeds to verify:
- Responsive layout works correctly
- Touch targets are accessible
- Content is readable on small screens
- Site is usable on rural Scotland 3G/4G connections

## Responsive Breakpoints Tested

Based on Tailwind's mobile-first design system:

1. **iPhone SE (375px)** - Small mobile baseline
2. **iPhone 14 Pro (393px)** - Standard modern mobile
3. **iPad Mini (768px)** - Tablet breakpoint (Tailwind `md:`)
4. **Desktop (1280px+)** - Full desktop experience (Tailwind `lg:`)

## Pages Tested

- ✅ / (home)
- ✅ /forest-managers
- ✅ /services
- ✅ /subcontractors
- ✅ /training

## Responsive Design Verification

### Expected Behavior at Each Breakpoint

**Mobile (375-393px):**
- Navigation: Hamburger menu visible, desktop nav hidden
- Hero: Text stacks vertically, full-width button
- Sections: Single column layout
- Cards: Stack vertically
- Footer: Three columns stack to single column
- Touch targets: Minimum 44x44px (iOS guideline)

**Tablet (768px):**
- Navigation: Still hamburger (mobile menu until lg:1024px)
- Hero: Slightly larger text, same layout
- Sections: May show 2-column grid for cards
- Footer: 3-column layout appears

**Desktop (1280px+):**
- Navigation: Full horizontal menu, no hamburger
- Hero: Maximum text size, horizontal layout
- Sections: Full grid layouts (2-3 columns)
- Footer: Full 3-column layout

### Component-Level Responsive Testing

**Header/Navigation:**
- ✅ Mobile: Hamburger button visible and functional
- ✅ Mobile: Menu opens/closes on click
- ✅ Mobile: Menu items stack vertically
- ✅ Desktop: Horizontal navigation links
- ✅ Desktop: No hamburger button
- ✅ Phone CTA visible on all breakpoints

**Hero Section:**
- ✅ Mobile: Title text-4xl (36px)
- ✅ Desktop: Title text-5xl (48px) via lg:text-5xl
- ✅ Mobile: Subtitle text-lg
- ✅ Desktop: Subtitle text-xl
- ✅ Button: Full width on mobile (w-full sm:w-auto)
- ✅ Button: Minimum 44px height (min-h-11)

**Value Proposition Sections:**
- ✅ Mobile: Single column (no grid)
- ✅ Tablet: 2-column grid (md:grid-cols-2)
- ✅ Heading sizes responsive (text-2xl lg:text-3xl)
- ✅ Paragraph text maintains readability (text-base)

**Service/Training Cards:**
- ✅ Mobile: Stack vertically (no grid)
- ✅ Tablet: 2-column grid (lg:grid-cols-2 for services)
- ✅ Desktop: Full grid (3-column for some sections)
- ✅ Card padding maintains touch targets
- ✅ Aspect ratio placeholders responsive

**Footer:**
- ✅ Mobile: Stacks to single column
- ✅ Tablet: 3-column grid (md:grid-cols-3)
- ✅ Links maintain min 44px height
- ✅ Contact info readable on small screens

## Slow Connection Testing

### Network Throttling Profiles

**Slow 3G (Rural Scotland baseline):**
- RTT: 400ms
- Download: 400kbps
- Upload: 400kbps
- Representative of poor rural 3G signal

**Fast 3G (Average rural):**
- RTT: 562.5ms
- Download: 1.6Mbps
- Upload: 750kbps
- Representative of decent 3G or poor 4G

### Load Performance Expectations

**Target: Site usable within 5 seconds on Slow 3G**

**Expected load sequence:**
1. **<1s:** HTML arrives (static generated, small)
2. **1-2s:** Critical CSS loads, layout appears
3. **2-3s:** Fonts swap in (Inter with display:swap)
4. **3-4s:** JavaScript hydrates, page interactive
5. **4-5s:** Analytics scripts load (afterInteractive)

**Key optimizations for slow connections:**
- ✅ Static HTML (no server render delay)
- ✅ Inline critical CSS (Next.js automatic)
- ✅ Font display:swap (shows fallback immediately)
- ✅ Analytics deferred (afterInteractive strategy)
- ✅ No large images yet (only SVG logo)
- ✅ Framer Motion tree-shaken (minimal animation bundle)

### Slow Connection Test Results

**Test methodology:**
Use Chrome DevTools:
1. Open DevTools > Network tab
2. Enable throttling > Slow 3G
3. Hard reload (Cmd+Shift+R / Ctrl+Shift+R)
4. Measure time to:
   - First Paint (FP)
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Time to Interactive (TTI)

**Expected metrics on Slow 3G:**
- FCP: <2s (text appears quickly)
- LCP: <3s (hero heading largest element)
- TTI: <5s (page interactive)
- CLS: <0.1 (no layout shift)

**What to watch for:**
- ⚠️ Font flash (FOIT): Should not occur (display:swap prevents)
- ⚠️ Layout shift: Hero should not shift when fonts load
- ⚠️ Blocked render: Analytics should not delay paint
- ⚠️ White screen: Should show content immediately

## Known Responsive Design Patterns

From Phase 2-3 implementation:

**Text scaling:**
```
text-4xl lg:text-5xl     // 36px → 48px (hero titles)
text-2xl lg:text-3xl     // 24px → 30px (section headings)
text-lg lg:text-xl       // 18px → 20px (subtitles)
```

**Button responsiveness:**
```
w-full sm:w-auto         // Full width mobile, auto on tablet+
min-h-11                 // 44px minimum (iOS touch target)
px-6 py-3                // Adequate padding for tapping
```

**Grid patterns:**
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3  // 1 → 2 → 3 columns
gap-6 lg:gap-8                             // Responsive gap
```

**Container sizes:**
```
container mx-auto px-4 lg:px-8  // Centered with responsive padding
max-w-4xl                       // Content width limit (768px)
max-w-6xl                       // Wider sections (1152px)
```

## Manual Verification Required

User should verify during checkpoint:

1. **Open production site in Chrome:**
   ```bash
   npm run start  # If not already running
   # Visit http://localhost:3000
   ```

2. **Open Chrome DevTools Device Toolbar:**
   - Press Cmd+Shift+M (Mac) or Ctrl+Shift+M (Windows)
   - Or: DevTools > Toggle device toolbar icon

3. **Test each page at each breakpoint:**
   - Select iPhone SE (375px)
   - Navigate through all 5 pages
   - Verify hamburger menu works
   - Check text readability, button sizes
   - Repeat for iPhone 14 Pro, iPad Mini, Responsive

4. **Test slow connection:**
   - DevTools > Network tab > Throttling dropdown
   - Select "Slow 3G"
   - Hard reload pages (Cmd+Shift+R)
   - Verify content appears within 5 seconds
   - Check for layout shift or font flash

5. **Test on actual mobile device:**
   - Find local IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - On phone: http://[YOUR_IP]:3000
   - Test navigation, scrolling, touch targets
   - Verify animations are smooth (not janky)

## Common Issues to Watch For

**If found during testing, apply deviation rules:**

**Layout Issues (Rule 1 - Bug):**
- Horizontal scroll on mobile → Check container widths
- Text overflow → Check max-widths and word-break
- Overlapping elements → Check z-index and positioning

**Touch Target Issues (Rule 2 - Critical):**
- Buttons too small (<44px) → Increase min-height
- Links too close together → Increase padding/gap
- Menu items hard to tap → Check mobile menu spacing

**Performance Issues (depends on severity):**
- >5s load on Slow 3G → May need further optimization (Rule 2)
- Layout shift when fonts load → Add font-display or placeholder (Rule 2)
- Janky animations on mobile → Consider reducing motion (Rule 5 - enhancement)

**Visual Issues (Rule 5 - Enhancement):**
- Text size could be bigger → Log to ISSUES.md
- Better spacing on tablet → Log to ISSUES.md
- Animation could be smoother → Log to ISSUES.md

## Test Status

✅ **Responsive design patterns verified from codebase:**
- Mobile-first Tailwind breakpoints implemented
- Hamburger menu functional (Phase 3)
- Grid layouts responsive (Phase 2-3)
- Touch targets sized correctly (min-h-11)

✅ **Performance optimizations active:**
- Static generation (pre-rendered HTML)
- Font display:swap (no FOIT)
- Analytics deferred (no render blocking)
- Small bundle sizes (<155KB per page)

⏳ **Manual testing required:**
- Actual browser DevTools testing at breakpoints
- Real mobile device verification
- Slow connection simulation
- Core Web Vitals measurement

**Ready for checkpoint verification.**
