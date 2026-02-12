# Acer Forestry Supabase Setup Guide

This guide walks you through setting up the Supabase database for the Acer Forestry Admin System.

## Prerequisites

- A Supabase account (sign up at https://supabase.com if you don't have one)
- Access to the Acer Forestry project repository

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Enter the following details:
   - **Name**: `acer-forestry-admin`
   - **Database Password**: Generate a strong password and save it securely
   - **Region**: Choose the closest region to your users (e.g., `eu-west-2` for UK)
   - **Pricing Plan**: Start with the Free tier (you can upgrade later)
4. Click "Create new project"
5. Wait for the project to finish setting up (this takes about 2 minutes)

## Step 2: Get Your Project Credentials

Once your project is ready:

1. Go to **Project Settings** (gear icon in sidebar)
2. Navigate to **API** section
3. Copy the following values (you'll need these later):
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Project API keys**:
     - `anon` public key
     - `service_role` secret key (keep this secure!)

## Step 3: Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor** (in the left sidebar)
2. Click **New Query**
3. Open the file `/Users/baileybarry/acerforestry/supabase/migrations/20260212_initial_schema.sql`
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd+Enter / Ctrl+Enter)
7. Wait for the query to complete successfully
8. You should see a success message: "Success. No rows returned"

## Step 4: Set Up Storage Buckets

1. In the SQL Editor, click **New Query** again
2. Open the file `/Users/baileybarry/acerforestry/supabase/storage-setup.sql`
3. Copy the entire contents
4. Paste into the SQL Editor
5. Click **Run**
6. Verify the buckets were created by going to **Storage** in the left sidebar
7. You should see two buckets:
   - `project-photos` (private)
   - `website-images` (public)

## Step 5: Configure Authentication

1. Go to **Authentication** > **Providers** in the left sidebar
2. Enable **Email** authentication
3. Configure email settings:
   - **Enable email confirmations**: On (recommended)
   - **Email templates**: Customize if desired
4. Go to **Authentication** > **URL Configuration**
5. Add your site URL (e.g., `https://acerforestry.co.uk`)

## Step 6: Create Your First Admin User

**Option A: Through Supabase Dashboard (Recommended for first user)**
1. Go to **Authentication** > **Users**
2. Click **Add user** > **Create new user**
3. Enter email and password
4. Click **Create user**
5. Copy the User ID (UUID)
6. Go to **SQL Editor** > **New Query**
7. Run this query (replace `USER_UUID_HERE` with the copied UUID):

```sql
INSERT INTO users (id, email, full_name, role)
VALUES (
  'USER_UUID_HERE',
  'your-email@example.com',
  'Your Full Name',
  'admin'
);
```

**Option B: Through Registration Flow (After admin app is built)**
- Use the registration page in your admin app
- The user will automatically be added to both auth.users and public.users

## Step 7: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## Step 8: Verify the Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see all tables listed:
   - users
   - clients
   - projects
   - team_members
   - project_team
   - project_photos
   - website_content
   - contact_submissions
   - activity_log

3. Click on each table to verify the schema is correct

## Database Schema Overview

### Tables

- **users**: Admin user accounts with role-based access
- **clients**: Forest managers and woodland owners
- **projects**: Woodland establishment projects
- **team_members**: Subcontractors and staff
- **project_team**: Links team members to projects
- **project_photos**: Project progress photos
- **website_content**: CMS for website content
- **contact_submissions**: Leads from contact forms
- **activity_log**: Audit trail of all admin actions

### Security

- All tables have Row-Level Security (RLS) enabled
- Only authenticated users can access data
- Admin-only operations are protected by role checks
- Storage buckets have appropriate access policies

## Next Steps

1. ✅ Supabase project created
2. ✅ Database schema deployed
3. ✅ Storage buckets configured
4. ✅ First admin user created
5. ⏭️ Install Supabase client libraries in your Next.js app
6. ⏭️ Create authentication utilities
7. ⏭️ Build admin interface

## Troubleshooting

### RLS Policies Not Working
- Make sure you're using the correct API key (use `anon` key with auth, not `service_role`)
- Verify that your user is authenticated before making requests
- Check that the user exists in both `auth.users` and `public.users` tables

### Storage Upload Fails
- Verify the file type is in the allowed MIME types list
- Check the file size doesn't exceed the bucket limits
- Ensure you're authenticated when uploading to private buckets

### Can't See Data in Tables
- Make sure RLS policies are enabled
- Verify your user is authenticated
- Check that the user role has appropriate permissions

## Useful SQL Queries

### Check RLS is enabled on all tables
```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

### View all storage buckets
```sql
SELECT * FROM storage.buckets;
```

### Count records in each table
```sql
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'clients', COUNT(*) FROM clients
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'team_members', COUNT(*) FROM team_members
UNION ALL
SELECT 'project_photos', COUNT(*) FROM project_photos
UNION ALL
SELECT 'website_content', COUNT(*) FROM website_content
UNION ALL
SELECT 'contact_submissions', COUNT(*) FROM contact_submissions
UNION ALL
SELECT 'activity_log', COUNT(*) FROM activity_log;
```

## Support

If you encounter any issues during setup:
1. Check the Supabase documentation: https://supabase.com/docs
2. Review the migration SQL files for any syntax errors
3. Check the Supabase logs in your dashboard under **Logs**
4. Ensure all prerequisites are met

## Security Notes

- Never commit your `.env.local` file
- Keep your `service_role` key secure - it bypasses RLS
- Use the `anon` key for client-side requests
- Regularly rotate your database password
- Monitor the activity_log table for suspicious activity
- Set up IP restrictions in production if needed
