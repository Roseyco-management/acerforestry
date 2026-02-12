# Admin Login System

This directory contains the admin authentication system for Acer Forestry.

## Files

### `page.tsx` - Login Page
The main login interface with:
- Email and password form
- Branded design matching Acer Forestry colors
- Loading states and error handling
- Responsive layout (split-screen on desktop, full-screen on mobile)
- Automatic redirect to return URL after login
- Integration with Supabase authentication

### `layout.tsx` - Login Layout
Simple layout that overrides the parent admin layout to exclude the sidebar and header.

## Features

### 🔐 Authentication Flow

1. User enters email and password
2. Form submits to Supabase `auth.signInWithPassword()`
3. On success:
   - User is authenticated
   - Session cookie is set
   - User is redirected to `/admin` (or `returnTo` URL if specified)
4. On error:
   - Error message is displayed
   - User can retry

### 🎨 Design

**Desktop View:**
- Left side: Branding and feature highlights
- Right side: Login form with clean white card

**Mobile View:**
- Full-screen login form
- Logo at top
- Optimized for small screens

**Colors:**
- Forest green gradient background (`gradient-forest`)
- White form card with shadow (`shadow-forest-xl`)
- Forest green accents for focus states
- Red for error messages

### 🔄 Return URL

The login page supports a `returnTo` query parameter:
- `/admin/login?returnTo=/admin/projects` - Redirects to projects page after login
- If no `returnTo` is specified, defaults to `/admin`

This is automatically handled by the middleware when protecting routes.

### ✅ Validation

- Email field: Required, type="email"
- Password field: Required, type="password"
- Error handling for:
  - Invalid credentials
  - Network errors
  - Inactive user accounts
  - Missing user profiles

## Usage

### Direct Navigation
Users can navigate directly to `/admin/login`

### Protected Route Redirect
When accessing a protected `/admin/*` route without authentication, middleware automatically redirects to:
```
/admin/login?returnTo=/admin/the-protected-route
```

### Logout
Users can log out from the admin interface, which redirects back to `/admin/login`

## API Routes

Authentication is handled by:
- **Login**: `/api/auth/login` (POST) - Alternative API endpoint
- **Logout**: `/api/auth/logout` (POST/GET) - Sign out endpoint

## Server Actions

For form-based authentication:
- `signIn(formData)` - Sign in with email/password
- `signOut()` - Sign out current user
- Located in `/app/actions/auth.ts`

## Security Features

1. **Activity Logging**: All login/logout events are logged to `activity_log` table
2. **User Status Check**: Inactive users cannot log in
3. **Profile Validation**: Users must have a profile in the `users` table
4. **Session Management**: Handled by Supabase Auth with secure cookies
5. **HTTPS Only**: Cookies are secure in production

## Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid login credentials" | Wrong email or password | Check credentials |
| "User profile not found" | No record in users table | Contact admin |
| "Your account has been deactivated" | `is_active = false` | Contact admin |
| "An unexpected error occurred" | Network or server error | Try again or contact support |

## Testing

### Test Account Setup

1. Create user in Supabase Auth:
```sql
-- Done through Supabase Dashboard > Authentication > Users
```

2. Create profile in users table:
```sql
INSERT INTO users (id, email, full_name, role, is_active)
VALUES (
  'user-uuid-from-auth',
  'admin@acerforestry.co.uk',
  'Admin User',
  'admin',
  true
);
```

### Manual Testing

1. Navigate to `http://localhost:3000/admin/login`
2. Enter test credentials
3. Click "Sign In"
4. Should redirect to `/admin` on success
5. Should show error message on failure

### Protected Route Testing

1. Navigate to `http://localhost:3000/admin/projects`
2. Should redirect to `/admin/login?returnTo=/admin/projects`
3. After login, should redirect back to `/admin/projects`

## Customization

### Change Branding
Edit the left-side content in `page.tsx`:
- Update feature list
- Change hero text
- Modify colors

### Add Social Login
Add social provider buttons in the form section:
```tsx
<button onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
  Sign in with Google
</button>
```

### Add "Remember Me"
Store preference in localStorage:
```tsx
const [rememberMe, setRememberMe] = useState(false)
// Implement persistent session logic
```

### Add "Forgot Password"
Link to password reset flow:
```tsx
<Link href="/admin/forgot-password">Forgot password?</Link>
```

## Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env.local` exists with correct values
- Restart dev server after adding env vars

### Redirect loop
- Check middleware configuration
- Ensure `/admin/login` is in public routes list

### Session not persisting
- Check cookie configuration
- Verify HTTPS in production
- Check browser cookie settings

### "User profile not found"
- User exists in Supabase Auth but not in `users` table
- Create user record manually or through signup flow

## Next Steps

After authentication is working:
1. Implement forgot password flow
2. Add user registration (if needed)
3. Set up email verification
4. Add 2FA (if required)
5. Implement session timeout
6. Add "remember this device" feature
