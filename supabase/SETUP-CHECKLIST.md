# Supabase Setup Checklist

Follow this checklist to set up your Acer Forestry Admin database.

## Pre-Setup

- [ ] Have a Supabase account (sign up at https://supabase.com)
- [ ] Read through `README.md` for detailed instructions
- [ ] Have a secure password manager ready for storing credentials

## Step 1: Create Supabase Project

- [ ] Go to https://app.supabase.com
- [ ] Click "New Project"
- [ ] Set project name to: `acer-forestry-admin`
- [ ] Generate and save a strong database password (you'll need this!)
- [ ] Select region: `eu-west-2` (London - or closest to you)
- [ ] Select pricing plan: Free (to start)
- [ ] Click "Create new project"
- [ ] Wait for project setup to complete (~2 minutes)

## Step 2: Save Your Credentials

- [ ] Go to Project Settings (gear icon) → API
- [ ] Copy and save in secure location:
  - [ ] Project URL (e.g., `https://xxxxx.supabase.co`)
  - [ ] `anon` public key
  - [ ] `service_role` secret key (KEEP THIS SECURE!)
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Paste your credentials into `.env.local`

## Step 3: Run Database Migration

- [ ] In Supabase dashboard, go to SQL Editor
- [ ] Click "New Query"
- [ ] Open file: `supabase/migrations/20260212_initial_schema.sql`
- [ ] Copy all contents
- [ ] Paste into SQL Editor
- [ ] Click "Run" (or Cmd+Enter)
- [ ] Verify success message appears
- [ ] Go to Table Editor
- [ ] Confirm all 9 tables are visible:
  - [ ] users
  - [ ] clients
  - [ ] projects
  - [ ] team_members
  - [ ] project_team
  - [ ] project_photos
  - [ ] website_content
  - [ ] contact_submissions
  - [ ] activity_log

## Step 4: Set Up Storage Buckets

- [ ] In SQL Editor, click "New Query"
- [ ] Open file: `supabase/storage-setup.sql`
- [ ] Copy all contents
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Go to Storage in sidebar
- [ ] Confirm 2 buckets exist:
  - [ ] `project-photos` (private)
  - [ ] `website-images` (public)

## Step 5: Configure Authentication

- [ ] Go to Authentication → Providers
- [ ] Enable "Email" authentication
- [ ] Configure email settings:
  - [ ] Enable email confirmations: ON
  - [ ] Customize email templates (optional)
- [ ] Go to Authentication → URL Configuration
- [ ] Add your site URL: `https://acerforestry.co.uk`
- [ ] Add redirect URL: `https://acerforestry.co.uk/admin/*`

## Step 6: Create First Admin User

### Option A: Through Supabase Dashboard
- [ ] Go to Authentication → Users
- [ ] Click "Add user" → "Create new user"
- [ ] Enter your email and password
- [ ] Click "Create user"
- [ ] Copy the User ID (UUID)
- [ ] Go to SQL Editor → New Query
- [ ] Run this query (replace the values):
```sql
INSERT INTO users (id, email, full_name, role)
VALUES (
  'paste-user-uuid-here',
  'your-email@example.com',
  'Your Full Name',
  'admin'
);
```
- [ ] Verify the user appears in Table Editor → users

### Option B: Through Auth Link (Alternative)
- [ ] Get a magic link from Authentication → Users
- [ ] Use it to confirm the account
- [ ] Then add to users table as above

## Step 7: Verify Setup

- [ ] Go to Table Editor
- [ ] Click on each table and verify structure:
  - [ ] Check column names and types
  - [ ] Verify indexes are created
- [ ] Go to SQL Editor
- [ ] Run this verification query:
```sql
SELECT
  (SELECT COUNT(*) FROM users) as users_count,
  (SELECT COUNT(*) FROM website_content) as content_count;
```
- [ ] Should see: 1 user, 4 content items
- [ ] Go to Authentication → Policies
- [ ] Verify RLS policies are enabled on all tables

## Step 8: Test Database Connection

- [ ] In your project, create `.env.local` if not already done
- [ ] Verify all environment variables are set:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Run `npm install @supabase/supabase-js` (next step in project)

## Optional: Add Sample Data

- [ ] Go to SQL Editor
- [ ] Open `supabase/queries-reference.sql`
- [ ] Copy sample INSERT queries
- [ ] Run to add test data:
  - [ ] Sample client
  - [ ] Sample project
  - [ ] Sample team member
- [ ] Verify data appears in Table Editor

## Security Checklist

- [ ] `.env.local` is in `.gitignore` (it is by default)
- [ ] Never commit `.env.local` to git
- [ ] Service role key is saved securely
- [ ] Database password is saved securely
- [ ] RLS is enabled on all tables
- [ ] Storage bucket policies are configured
- [ ] Email confirmation is enabled for auth

## Troubleshooting

If you encounter issues:

### "Permission denied" errors
- [ ] Check that RLS policies were created successfully
- [ ] Verify you're using the `anon` key (not `service_role`) in client
- [ ] Ensure user is authenticated before making requests

### Can't upload files
- [ ] Verify storage buckets were created
- [ ] Check bucket policies were applied
- [ ] Confirm file type is in allowed MIME types
- [ ] Check file size doesn't exceed limits

### Tables not visible
- [ ] Ensure migration ran without errors
- [ ] Check SQL Editor history for error messages
- [ ] Try running migration again

### Authentication not working
- [ ] Verify email provider is enabled
- [ ] Check site URL is configured correctly
- [ ] Ensure redirect URLs are added

## Next Steps

Once setup is complete:
- [ ] Mark Task #1 as completed
- [ ] Move on to Task #2: Install dependencies
- [ ] Task #3: Create Supabase client utilities
- [ ] Task #5: Implement authentication flow

## Resources

- Supabase Documentation: https://supabase.com/docs
- Row-Level Security Guide: https://supabase.com/docs/guides/auth/row-level-security
- Storage Guide: https://supabase.com/docs/guides/storage
- SQL Reference: `queries-reference.sql`
- Schema Documentation: `SCHEMA.md`

## Support

If stuck:
1. Check `README.md` for detailed steps
2. Review `SCHEMA.md` for database structure
3. Consult `queries-reference.sql` for examples
4. Check Supabase docs
5. Review Supabase logs in dashboard

---

**Estimated Time**: 20-30 minutes for complete setup

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Completed
