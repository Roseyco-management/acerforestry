# Authentication Testing Guide

Quick guide to test the admin authentication system.

## Prerequisites

1. ✅ Supabase project created
2. ✅ Database schema deployed
3. ✅ Environment variables set in `.env.local`
4. ✅ First admin user created

## Create Test User

### Step 1: Create User in Supabase Auth

1. Go to Supabase Dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add user** > **Create new user**
4. Enter:
   - Email: `admin@acerforestry.co.uk`
   - Password: `YourSecurePassword123!`
5. Click **Create user**
6. **Copy the User ID (UUID)** - you'll need this!

### Step 2: Add User to Users Table

1. Go to **SQL Editor**
2. Run this query (replace `USER_UUID_HERE` with the UUID you copied):

```sql
INSERT INTO users (id, email, full_name, role, is_active)
VALUES (
  'USER_UUID_HERE',
  'admin@acerforestry.co.uk',
  'Test Admin',
  'admin',
  true
);
```

3. Verify by going to **Table Editor** > **users**

## Test Login Flow

### Test 1: Successful Login

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Enter:
   - Email: `admin@acerforestry.co.uk`
   - Password: `YourSecurePassword123!`
4. Click **Sign In**

**Expected Result:**
- Loading spinner appears
- Redirects to `/admin` dashboard
- No errors shown

### Test 2: Invalid Credentials

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter:
   - Email: `wrong@example.com`
   - Password: `wrongpassword`
3. Click **Sign In**

**Expected Result:**
- Error message: "Invalid login credentials"
- Stays on login page
- No redirect

### Test 3: Protected Route Redirect

1. While logged out, navigate to: `http://localhost:3000/admin/projects`

**Expected Result:**
- Redirects to `/admin/login?returnTo=/admin/projects`
- After successful login, redirects back to `/admin/projects`

### Test 4: Already Authenticated

1. While logged in, navigate to: `http://localhost:3000/admin/login`

**Expected Result:**
- Immediately redirects to `/admin` dashboard
- Does not show login form

### Test 5: Inactive User

1. In Supabase, go to **Table Editor** > **users**
2. Update your test user: set `is_active = false`
3. Log out if logged in
4. Try to log in with test credentials

**Expected Result:**
- Error message: "Your account has been deactivated"
- Cannot log in
- Set `is_active = true` to restore access

### Test 6: Missing User Profile

1. Create a user in Supabase Auth but **don't** add to users table
2. Try to log in with that user

**Expected Result:**
- Error message: "User profile not found"
- Cannot proceed
- Must add user to users table

### Test 7: Logout

1. While logged in, click logout button (or navigate to `/api/auth/logout`)

**Expected Result:**
- Redirects to `/admin/login`
- Session cleared
- Cannot access protected routes

## Check Activity Logs

After testing, verify activity logging:

1. Go to Supabase Dashboard
2. Navigate to **Table Editor** > **activity_log**
3. You should see entries for:
   - `action: 'login'` - When you logged in
   - `action: 'logout'` - When you logged out

```sql
-- View recent activity
SELECT
  al.*,
  u.email,
  u.full_name
FROM activity_log al
LEFT JOIN users u ON al.user_id = u.id
ORDER BY al.created_at DESC
LIMIT 10;
```

## Mobile Testing

1. Open dev tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (e.g., iPhone 12)
4. Test login flow on mobile view

**Expected Result:**
- Single column layout
- Logo at top
- Full-width form
- No horizontal scroll
- Readable text
- Easy to tap buttons

## Browser Compatibility

Test in multiple browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari

## Network Testing

### Slow Network

1. Open dev tools > Network tab
2. Throttle to "Slow 3G"
3. Test login

**Expected Result:**
- Loading spinner shows while waiting
- Form is disabled during submission
- Eventually succeeds or times out with error

### Offline

1. Open dev tools > Network tab
2. Set to "Offline"
3. Test login

**Expected Result:**
- Shows error message
- Handles gracefully (no crash)

## Common Issues

### Issue: "Missing Supabase environment variables"
**Solution:**
- Check `.env.local` exists
- Verify all three variables are set
- Restart dev server

### Issue: Redirect loop
**Solution:**
- Check middleware.ts configuration
- Ensure `/admin/login` is in publicAdminRoutes
- Clear browser cookies

### Issue: Session not persisting
**Solution:**
- Check cookies are enabled in browser
- Verify cookie settings in Supabase client
- Check HTTPS in production

### Issue: Can't see admin dashboard after login
**Solution:**
- Check middleware is protecting routes correctly
- Verify user session with: `const session = await supabase.auth.getSession()`
- Check browser console for errors

## Success Criteria

All tests should pass:
- ✅ Can log in with valid credentials
- ✅ Cannot log in with invalid credentials
- ✅ Protected routes redirect to login
- ✅ Already authenticated users redirected from login
- ✅ Inactive users cannot log in
- ✅ Users without profiles cannot log in
- ✅ Can log out successfully
- ✅ Activity is logged
- ✅ Mobile view works correctly
- ✅ Works in multiple browsers

## Next Steps

Once authentication is working:
1. Test with multiple user roles (admin, manager, viewer)
2. Add forgot password flow
3. Implement session timeout
4. Add 2FA (if required)
5. Set up email verification

## Troubleshooting Commands

```bash
# Check Supabase connection
curl http://localhost:3000/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@acerforestry.co.uk","password":"YourSecurePassword123!"}'

# View environment variables (do not commit this output!)
cat .env.local

# Check if middleware is running
# Add console.log in middleware.ts and watch terminal

# Clear all cookies
# Browser > Dev Tools > Application > Cookies > Clear
```

## Security Checklist

Before going to production:
- [ ] Change default test passwords
- [ ] Enable email verification
- [ ] Set up HTTPS
- [ ] Configure CORS properly
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add CAPTCHA if needed
- [ ] Review RLS policies
- [ ] Enable Supabase auth confirmations
- [ ] Set up monitoring/alerts
