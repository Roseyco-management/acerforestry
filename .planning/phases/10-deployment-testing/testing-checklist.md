# Testing Checklist - Acer Forestry Production Site

**Production URL:** https://acerforestry.vercel.app

**Testing Date:** 2026-02-06

---

## Priority 1 - Critical Tests (Must Pass)

### 1. Mobile Safari iOS (Primary Audience Device)

**Target:** Forest Managers accessing from field

- [ ] **Home page** (`/`)
  - [ ] Page loads without errors
  - [ ] Hero section displays correctly
  - [ ] All sections visible and readable
  - [ ] Scroll animations play smoothly
  - [ ] Phone CTA (tel: link) - tap to call works
  - [ ] Email CTA (mailto: link) - opens mail app
  - [ ] No horizontal scroll
  - [ ] Footer displays correctly

- [ ] **Forest Managers page** (`/forest-managers`)
  - [ ] Page loads correctly
  - [ ] Value propositions readable
  - [ ] Contact CTAs functional
  - [ ] No layout issues

- [ ] **Services page** (`/services`)
  - [ ] Service cards display in grid
  - [ ] Images/placeholders load correctly
  - [ ] Text readable and formatted

- [ ] **Subcontractors page** (`/subcontractors`)
  - [ ] Page loads correctly
  - [ ] CTAs functional

- [ ] **Training page** (`/training`)
  - [ ] Video placeholders display correctly
  - [ ] Layout works on mobile

- [ ] **Mobile Menu**
  - [ ] Hamburger icon visible
  - [ ] Menu opens on tap
  - [ ] All links work
  - [ ] Menu closes after selection

- [ ] **Performance Check**
  - [ ] Time to Interactive: < 5 seconds
  - [ ] No blocking animations during load
  - [ ] Smooth scrolling (no jank)

### 2. Desktop Chrome (Most Common Browser)

**Resolution:** 1920x1080 or 1366x768

- [ ] **Home page** (`/`)
  - [ ] Page loads without errors
  - [ ] Hero animation plays correctly
  - [ ] Navigation hover effects work
  - [ ] Scroll animations trigger properly
  - [ ] All sections aligned correctly
  - [ ] Phone/email CTAs work
  - [ ] Footer displays correctly

- [ ] **Navigation**
  - [ ] All header links work
  - [ ] Hover effects smooth
  - [ ] Active page indicator works
  - [ ] Logo links to home

- [ ] **Cross-page testing**
  - [ ] Visit all 5 pages
  - [ ] Verify consistent header/footer
  - [ ] Check for console errors (F12)

- [ ] **Animations**
  - [ ] Hero entrance animations smooth
  - [ ] Scroll-triggered animations work
  - [ ] No animation jank or blocking
  - [ ] Hover effects on buttons/links

### 3. Slow Connection Performance

**Test with:** Chrome DevTools > Network > Slow 3G

- [ ] **Home page load test**
  - [ ] Page loads progressively
  - [ ] Time to Interactive: < 5 seconds
  - [ ] Font loads correctly (or shows fallback)
  - [ ] Images load progressively
  - [ ] No blocking content

- [ ] **Interaction test**
  - [ ] Navigation clickable during load
  - [ ] Animations don't block interaction
  - [ ] CTAs work immediately when visible

---

## Priority 2 - Important Tests (Should Pass)

### 4. Desktop Browsers

Test home page + one other page on each:

- [ ] **Safari (macOS)**
  - [ ] Home page renders correctly
  - [ ] Animations work
  - [ ] CTAs functional

- [ ] **Firefox**
  - [ ] Home page renders correctly
  - [ ] CSS Grid/Flexbox layouts work
  - [ ] Animations smooth

- [ ] **Edge**
  - [ ] Home page renders correctly
  - [ ] No rendering quirks

### 5. Android Chrome Mobile

- [ ] Home page loads
- [ ] Mobile menu works
- [ ] CTAs functional (tap to call, email)
- [ ] No horizontal scroll
- [ ] Smooth scrolling

### 6. Tablet Testing (iPad or Android)

**Resolution:** 768x1024 (iPad) or 800x1280 (Android)

- [ ] Responsive breakpoint works correctly
- [ ] Layout between mobile and desktop
- [ ] Navigation appropriate for tablet
- [ ] Touch targets large enough (44x44px)

---

## Priority 3 - Nice to Have

### 7. Lighthouse Audits (Production)

Run Lighthouse in Chrome DevTools for each page:

**Home page** (`/`)
- Performance: ___/100
- Accessibility: ___/100
- Best Practices: ___/100
- SEO: ___/100

**Forest Managers** (`/forest-managers`)
- Performance: ___/100
- Accessibility: ___/100
- Best Practices: ___/100
- SEO: ___/100

**Services** (`/services`)
- Performance: ___/100
- Accessibility: ___/100
- Best Practices: ___/100
- SEO: ___/100

**Subcontractors** (`/subcontractors`)
- Performance: ___/100
- Accessibility: ___/100
- Best Practices: ___/100
- SEO: ___/100

**Training** (`/training`)
- Performance: ___/100
- Accessibility: ___/100
- Best Practices: ___/100
- SEO: ___/100

### 8. SEO & Social Media Verification

- [ ] **Facebook OG Preview**
  - Visit: https://developers.facebook.com/tools/debug/
  - Enter: https://acerforestry.vercel.app
  - Verify: OG image displays, title/description correct

- [ ] **LinkedIn Post Inspector**
  - Visit: https://www.linkedin.com/post-inspector/
  - Enter: https://acerforestry.vercel.app
  - Verify: Preview card displays correctly

- [ ] **Structured Data**
  - View page source
  - Search for `application/ld+json`
  - Verify: LocalBusiness schema present with correct data

- [ ] **Robots.txt**
  - Visit: https://acerforestry.vercel.app/robots.txt
  - Verify: File accessible, allows crawling

### 9. Accessibility Testing

- [ ] **Keyboard Navigation**
  - Tab through all interactive elements
  - All links/buttons reachable
  - Focus indicators visible
  - Logical tab order

- [ ] **Screen Reader** (if familiar with VoiceOver/NVDA)
  - Navigate home page with screen reader
  - All content announced correctly
  - Buttons/links labeled properly
  - Image alt text present

- [ ] **Color Contrast** (already verified in Phase 2, spot check)
  - Text readable against backgrounds
  - CTA buttons have sufficient contrast

### 10. Functional Edge Cases

- [ ] **Deep linking**
  - Visit: https://acerforestry.vercel.app/forest-managers directly
  - Page loads correctly (not just home)
  - Navigation reflects current page

- [ ] **Browser back button**
  - Navigate between pages
  - Use back button
  - Pages render correctly on return

- [ ] **Favicon display**
  - Check browser tab
  - Favicon visible (tree icon)
  - Multiple sizes for different contexts

---

## Common Issues to Watch For

**Layout Issues:**
- ❌ Horizontal scroll on mobile (viewport too wide)
- ❌ Content overflowing containers
- ❌ Text unreadable (too small, poor contrast)
- ❌ Images not loading or broken

**Performance Issues:**
- ❌ Layout shift during load (CLS issue)
- ❌ Animations blocking interaction
- ❌ Long load times (>5s on slow connection)
- ❌ Fonts not loading (FOUT/FOIT)

**Functional Issues:**
- ❌ CTAs not clickable or not working
- ❌ Navigation broken
- ❌ Mobile menu not opening
- ❌ Links going to wrong pages

**Browser Issues:**
- ❌ Console errors (check F12 developer tools)
- ❌ CSS not rendering correctly
- ❌ JavaScript errors breaking functionality

---

## Testing Notes

**Date tested:** _______________
**Tested by:** _______________

**Priority 1 Results:**
- Mobile Safari iOS: _______________
- Desktop Chrome: _______________
- Slow 3G: _______________

**Issues Found:**

(Document any bugs, rendering issues, or functional problems here)

---

**Approval Status:**

- [ ] All Priority 1 tests passed - Ready for launch
- [ ] Priority 1 tests passed with minor issues - Launch with known limitations
- [ ] Priority 1 tests failed - Fix required before launch

**Next Steps:**

(Document any fixes needed or proceed to launch verification)
