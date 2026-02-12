# Admin Panel Testing Checklist

This checklist covers all manual testing that needs to be performed after setting up Supabase with real data.

## Prerequisites

- [ ] Supabase project is set up
- [ ] Environment variables are configured in `.env.local`
- [ ] Database schema is created (run migrations)
- [ ] At least one admin user is created
- [ ] Development server is running (`npm run dev`)

---

## 1. Authentication & Access Control

### Login Flow
- [ ] Navigate to homepage
- [ ] Double-click the logo to trigger admin portal
- [ ] Redirects to `/admin/login`
- [ ] Login with valid credentials - success
- [ ] Login with invalid credentials - shows error
- [ ] After login, redirects to `/admin` dashboard
- [ ] Test "Contact Support" link works

### Session Management
- [ ] Refresh page while logged in - stays logged in
- [ ] Click logout button - redirects to login
- [ ] Try accessing `/admin` without login - redirects to login
- [ ] After logout, browser back button doesn't access protected pages

---

## 2. Dashboard (`/admin`)

### Layout & Navigation
- [ ] Sidebar visible on desktop (xl breakpoint)
- [ ] Sidebar collapses to icons on smaller screens
- [ ] Mobile: hamburger menu opens/closes sidebar
- [ ] Header shows user info
- [ ] All navigation links work correctly
- [ ] Active page is highlighted in sidebar

### Statistics Cards
- [ ] Total Clients count is accurate
- [ ] Active Projects count is accurate
- [ ] Team Members count is accurate
- [ ] Pending Contacts count is accurate
- [ ] Cards are responsive on mobile

### Recent Activity
- [ ] Shows recent projects (if any)
- [ ] Shows correct status badges
- [ ] "View All Projects" link works

---

## 3. Client Management (`/admin/clients`)

### List View
- [ ] Clients table loads successfully
- [ ] Search bar filters clients correctly
- [ ] Status filter works (active/inactive/prospect)
- [ ] Table pagination works
- [ ] Sorting works on sortable columns
- [ ] Click on row navigates to client detail page
- [ ] "Add New Client" button works
- [ ] Mobile: table scrolls horizontally
- [ ] Mobile: all controls are touch-friendly

### Create New Client (`/admin/clients/new`)
- [ ] Form loads correctly
- [ ] All fields are present (name, email, phone, company, etc.)
- [ ] Required field validation works
- [ ] Email format validation works
- [ ] Phone format validation works
- [ ] Submit with valid data - creates client successfully
- [ ] Shows success message/toast
- [ ] Redirects to client detail page or list
- [ ] Cancel button returns to clients list
- [ ] Mobile: form is fully usable

### Client Detail Page (`/admin/clients/[id]`)
- [ ] Client info displays correctly
- [ ] Edit mode works
- [ ] Can update client information
- [ ] Changes save successfully
- [ ] Associated projects list shows (if any)
- [ ] "Add Project" button works
- [ ] Delete client button works (with confirmation)
- [ ] Back button returns to clients list
- [ ] Mobile: all sections are readable and usable

---

## 4. Project Management (`/admin/projects`)

### List View
- [ ] Projects table loads successfully
- [ ] Search works across project names/descriptions
- [ ] Status filter works (planning/active/completed/on-hold)
- [ ] Sorting works on sortable columns
- [ ] Table pagination works
- [ ] Status badges display correctly with colors
- [ ] Click on row navigates to project detail
- [ ] "Add New Project" button works
- [ ] Mobile: table scrolls horizontally

### Create New Project (`/admin/projects/new`)
- [ ] Form loads correctly
- [ ] Client dropdown populates with clients
- [ ] All fields are present (name, description, location, etc.)
- [ ] Date picker works for start/end dates
- [ ] Budget field accepts numbers only
- [ ] Status dropdown works
- [ ] Required field validation works
- [ ] Submit creates project successfully
- [ ] Shows success message
- [ ] Redirects to project detail or list
- [ ] Cancel button works
- [ ] Mobile: form is fully usable

### Project Detail Page (`/admin/projects/[id]`)
- [ ] Project info displays correctly
- [ ] Associated client info shows
- [ ] Edit mode works
- [ ] Can update project information
- [ ] Changes save successfully
- [ ] Project timeline/dates display correctly
- [ ] Status can be changed
- [ ] Delete project button works (with confirmation)
- [ ] Back button returns to projects list
- [ ] Mobile: all sections are readable

---

## 5. Team Management (`/admin/team`)

### List View
- [ ] Team members table loads successfully
- [ ] Search filters team members
- [ ] Role filter works (if implemented)
- [ ] Table pagination works
- [ ] Role badges display correctly with colors
- [ ] Click on row navigates to team member detail
- [ ] "Add Team Member" button works
- [ ] Mobile: table scrolls horizontally

### Add Team Member (`/admin/team/new`)
- [ ] Form loads correctly
- [ ] All fields present (name, email, phone, role, etc.)
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Role dropdown works
- [ ] Specialization/skills fields work
- [ ] Submit creates team member successfully
- [ ] Shows success message
- [ ] Redirects appropriately
- [ ] Cancel button works
- [ ] Mobile: form is fully usable

### Team Member Detail (`/admin/team/[id]`)
- [ ] Member info displays correctly
- [ ] Edit mode works
- [ ] Can update member information
- [ ] Changes save successfully
- [ ] Associated projects show (if tracking)
- [ ] Delete member button works (with confirmation)
- [ ] Back button returns to team list
- [ ] Mobile: all sections are readable

---

## 6. Photo Library (`/admin/photos`)

### Gallery View
- [ ] Photos load and display in grid
- [ ] Grid is responsive (adjusts columns on mobile)
- [ ] Click on photo shows detail/preview
- [ ] Upload button is visible and accessible
- [ ] Search/filter works (if implemented)
- [ ] Pagination works for large photo sets
- [ ] Mobile: grid displays correctly

### Upload Photos (`/admin/photos/upload`)
- [ ] Drag & drop area works
- [ ] Click to select files works
- [ ] Multiple file selection works
- [ ] Shows preview of selected files
- [ ] Upload progress indicator shows
- [ ] Upload completes successfully
- [ ] Shows success message
- [ ] Can add descriptions/tags to photos
- [ ] Cancel upload works
- [ ] Redirects back to gallery after upload
- [ ] Mobile: upload interface is usable
- [ ] Mobile: file picker opens correctly

### Photo Management
- [ ] Can delete photos (with confirmation)
- [ ] Can edit photo metadata
- [ ] Can associate photos with projects
- [ ] Download photo works
- [ ] Mobile: all actions are accessible

---

## 7. Content Management (`/admin/content`)

### Content Pages List
- [ ] Shows all available pages (home, services, training, etc.)
- [ ] Click on page navigates to editor
- [ ] Page status indicators work
- [ ] Mobile: list is accessible

### Content Editor (`/admin/content/[page]`)
- [ ] Editor loads with existing content
- [ ] Can edit text content
- [ ] Rich text formatting works (if implemented)
- [ ] Can add/edit images
- [ ] Image upload works
- [ ] Image preview shows correctly
- [ ] Save button saves changes
- [ ] Shows success message after save
- [ ] Preview button shows live preview
- [ ] Changes reflect on public website
- [ ] Cancel discards changes
- [ ] Mobile: editor is usable (may need horizontal scroll)

---

## 8. Contact Submissions (`/admin/contacts`)

### Submissions List
- [ ] Contact submissions load successfully
- [ ] Search filters submissions
- [ ] Date filter works (if implemented)
- [ ] Status filter works (new/read/responded)
- [ ] Table pagination works
- [ ] Click on submission shows detail
- [ ] Export button works (if implemented)
- [ ] Mobile: table scrolls horizontally

### Submission Detail (`/admin/contacts/[id]`)
- [ ] Full submission details display
- [ ] Contact information is readable
- [ ] Message/inquiry shows correctly
- [ ] Can mark as read/responded
- [ ] Can add notes (if implemented)
- [ ] Email link opens mail client
- [ ] Phone link works on mobile
- [ ] Delete submission works (with confirmation)
- [ ] Back button returns to list
- [ ] Mobile: all content is readable

---

## 9. Settings (`/admin/settings`)

### User Profile Tab
- [ ] Current user info displays
- [ ] Can edit display name
- [ ] Can edit email
- [ ] Email validation works
- [ ] Save profile changes works
- [ ] Shows success message
- [ ] Role is displayed correctly

### Change Password
- [ ] New password field works
- [ ] Confirm password field works
- [ ] Password visibility toggle works
- [ ] Minimum length validation (8 chars)
- [ ] Passwords must match validation
- [ ] Submit changes password successfully
- [ ] Shows success message
- [ ] Password fields clear after success

### System Settings Tab
- [ ] Company information fields load
- [ ] Can edit all company fields
- [ ] Currency dropdown works
- [ ] Date format dropdown works
- [ ] Timezone dropdown works
- [ ] Email notifications toggle works
- [ ] Save settings works
- [ ] Shows success message

### Admin Users Tab
- [ ] Shows list of all admin users
- [ ] Displays names, emails, roles
- [ ] Shows status (active/inactive)
- [ ] Shows created dates
- [ ] Table is responsive
- [ ] Mobile: table scrolls horizontally

### Theme Tab
- [ ] Light mode option shows
- [ ] Dark mode option shows
- [ ] Click on theme changes appearance
- [ ] Theme preference persists across sessions
- [ ] Shows success message on change
- [ ] Theme applies globally across admin panel

---

## 10. Mobile Responsiveness Testing

Test on these viewport sizes:
- [ ] 375px (iPhone SE / small mobile)
- [ ] 768px (iPad / tablet)
- [ ] 1024px (small laptop / large tablet)
- [ ] 1440px+ (desktop)

### Mobile-Specific Tests
- [ ] Sidebar collapses to hamburger menu
- [ ] Hamburger menu opens/closes correctly
- [ ] Backdrop closes sidebar when tapped
- [ ] All buttons are large enough to tap (44px min)
- [ ] Forms don't have horizontal scroll issues
- [ ] Tables scroll horizontally with visible scrollbar
- [ ] Cards stack vertically on mobile
- [ ] Text is readable without zooming
- [ ] No content is cut off
- [ ] Date pickers work on mobile
- [ ] Dropdowns work on mobile
- [ ] File upload works on mobile

---

## 11. Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Browser-Specific Checks
- [ ] Layout renders correctly
- [ ] Forms submit correctly
- [ ] File upload works
- [ ] Date pickers work
- [ ] Dropdowns work
- [ ] No console errors
- [ ] Performance is acceptable

---

## 12. Error Handling & Edge Cases

### Form Validation
- [ ] Required fields show error when empty
- [ ] Invalid email formats are rejected
- [ ] Invalid phone formats are rejected
- [ ] Invalid URLs are rejected (if applicable)
- [ ] Future dates are validated where appropriate
- [ ] Numeric fields reject non-numeric input
- [ ] Max length validation works

### Network Errors
- [ ] Graceful handling of failed API calls
- [ ] Shows user-friendly error messages
- [ ] Retry mechanisms work (if implemented)
- [ ] Timeout handling works
- [ ] Offline state is handled

### Empty States
- [ ] Empty tables show appropriate message
- [ ] No clients: shows empty state
- [ ] No projects: shows empty state
- [ ] No team members: shows empty state
- [ ] No photos: shows empty state
- [ ] No contacts: shows empty state

### Loading States
- [ ] Loading spinners show during data fetch
- [ ] Skeleton screens show (if implemented)
- [ ] Buttons show loading state during submit
- [ ] Upload shows progress indicator
- [ ] No flash of empty content before data loads

### Permission & Access
- [ ] Non-admin users can't access admin panel
- [ ] Role-based access control works (if implemented)
- [ ] Unauthorized actions show appropriate errors

---

## 13. Data Integrity

### CRUD Operations
- [ ] Create: Data persists after creation
- [ ] Read: Data displays accurately
- [ ] Update: Changes persist correctly
- [ ] Delete: Records are removed (or soft deleted)

### Relationships
- [ ] Client-Project relationships work correctly
- [ ] Team-Project assignments work (if implemented)
- [ ] Photo-Project associations work (if implemented)
- [ ] Deleting parent records handles children appropriately

### Data Validation
- [ ] No duplicate emails in clients
- [ ] No duplicate emails in team
- [ ] Referential integrity is maintained
- [ ] Cascade deletes work correctly (or prevented appropriately)

---

## 14. Performance Testing

### Page Load Times
- [ ] Dashboard loads in < 2 seconds
- [ ] Client list loads in < 2 seconds
- [ ] Project list loads in < 2 seconds
- [ ] Team list loads in < 2 seconds
- [ ] Photo gallery loads in < 3 seconds
- [ ] Detail pages load in < 1.5 seconds

### Large Data Sets
- [ ] Test with 100+ clients
- [ ] Test with 100+ projects
- [ ] Test with 100+ photos
- [ ] Pagination handles large sets well
- [ ] Search is responsive with large data
- [ ] Filtering is fast

### Image Performance
- [ ] Images are optimized/compressed
- [ ] Thumbnails are generated for large images
- [ ] Gallery loads progressively
- [ ] Large uploads don't freeze UI

---

## 15. Security Testing

### Authentication
- [ ] Cannot access admin routes without login
- [ ] Session timeout works (if implemented)
- [ ] Logout clears session completely
- [ ] Cannot bypass auth with direct URL access

### Input Sanitization
- [ ] XSS attempts in text fields are blocked
- [ ] SQL injection attempts are blocked
- [ ] Script tags in content editor are sanitized
- [ ] HTML injection is prevented

### File Upload Security
- [ ] Only allowed file types are accepted
- [ ] File size limits are enforced
- [ ] Malicious files are rejected
- [ ] Uploaded files are scanned (if implemented)

---

## 16. Accessibility (WCAG)

### Keyboard Navigation
- [ ] Can tab through all forms
- [ ] Can activate buttons with Enter/Space
- [ ] Focus indicators are visible
- [ ] Skip to content link works (if implemented)

### Screen Reader
- [ ] Form labels are associated correctly
- [ ] Error messages are announced
- [ ] Status messages are announced
- [ ] Images have alt text

### Visual
- [ ] Color contrast meets WCAG AA standards
- [ ] Text is resizable without breaking layout
- [ ] Focus indicators are visible
- [ ] No information conveyed by color alone

---

## 17. User Experience Polish

### Feedback
- [ ] Success messages show for all actions
- [ ] Error messages are clear and helpful
- [ ] Loading states are visible
- [ ] Progress indicators for long operations

### Navigation
- [ ] Breadcrumbs show (if implemented)
- [ ] Back buttons work consistently
- [ ] Cancel buttons always work
- [ ] Unsaved changes warning (if implemented)

### Consistency
- [ ] Button styles are consistent
- [ ] Form layouts are consistent
- [ ] Color scheme is consistent
- [ ] Typography is consistent
- [ ] Spacing is consistent

---

## 18. Final Checks

### Documentation
- [ ] README has setup instructions
- [ ] Environment variables documented
- [ ] Database schema documented
- [ ] API endpoints documented (if applicable)

### Code Quality
- [ ] No console errors in production
- [ ] No console warnings that matter
- [ ] Build completes successfully
- [ ] TypeScript errors are resolved
- [ ] ESLint errors are resolved

### Deployment Ready
- [ ] Environment variables are set
- [ ] Database migrations are run
- [ ] Production build works
- [ ] Site works on production URL
- [ ] SSL certificate is valid
- [ ] Analytics are set up (if applicable)

---

## Bug Report Template

When you find a bug, please document it with:

```markdown
**Bug Title:** Brief description

**Priority:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
Add if applicable

**Environment:**
- Browser: Chrome 120
- Device: iPhone 14
- OS: iOS 17
- Screen size: 375px

**Console Errors:**
Copy any console errors
```

---

## Sign-Off

Once all items are checked and any bugs are fixed:

- [ ] All critical tests pass
- [ ] All high-priority tests pass
- [ ] Medium/low priority issues are documented
- [ ] Ready for production deployment

**Tested By:** _______________
**Date:** _______________
**Version:** _______________

---

## Notes

Use this space to document any additional findings, issues, or recommendations:

```
[Your notes here]
```
