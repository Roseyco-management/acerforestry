# Admin Dashboard Setup Guide

## 🚀 Quick Start (Development Mode)

**For immediate testing without Supabase:**

Use these demo credentials at http://localhost:5173/admin/login:

```
Email: admin@acerforestry.co.uk
Password: AcerForestry2024!
```

This bypasses authentication in development mode only.

---

## 🔐 Production Setup (Real Supabase Auth)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Project name: `acer-forestry-admin`
4. Database password: **(Save this!)**
5. Region: Choose closest to UK (Europe West)
6. Click "Create new project"

### Step 2: Run Database Migrations

In Supabase dashboard:

1. Go to **SQL Editor**
2. Run each migration file in order:

```sql
-- File 1: /supabase/migrations/20260212_initial_schema.sql
-- Copy and paste the contents, then click "Run"

-- File 2: /supabase/migrations/20260212_add_team_certifications_hourly_rate.sql
-- Copy and paste, then click "Run"

-- File 3: /supabase/migrations/20260212_update_project_photos.sql
-- Copy and paste, then click "Run"

-- File 4: /supabase/migrations/20260212_add_content_sections.sql
-- Copy and paste, then click "Run"

-- File 5: /supabase/storage-setup.sql
-- Copy and paste, then click "Run"
```

### Step 3: Get API Credentials

In Supabase dashboard:

1. Go to **Settings** → **API**
2. Copy these values:

   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`) - **KEEP SECRET!**

### Step 4: Update Environment Variables

Edit `.env.local`:

```bash
# Replace with YOUR actual values from Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-real-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-real-service-key
```

### Step 5: Create Admin User

**Use the SAME credentials from demo mode for production:**

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click "Add user"
3. Create the admin account:

```
Email: admin@acerforestry.co.uk
Password: AcerForestry2024!
✓ Auto Confirm User
```

4. Go to **SQL Editor** and add the user to the `users` table:

```sql
-- Insert admin user into the users table
INSERT INTO users (email, full_name, role, is_active)
VALUES ('admin@acerforestry.co.uk', 'Admin User', 'admin', true);
```

**That's it!** Both Rob and Dillon can use this single account.

### Step 6: Test Login

1. Restart your dev server: `npm run dev`
2. Go to http://localhost:5173
3. Double-click the logo
4. Log in with the admin credentials:

```
Email: admin@acerforestry.co.uk
Password: AcerForestry2024!
```

**Same credentials as demo mode - easy to remember!** 🎉

---

## 📋 Production Admin Credentials

**Single Shared Account for Rob & Dillon:**
```
Email: admin@acerforestry.co.uk
Password: AcerForestry2024!
Role: admin
```

✅ **Same as demo mode - works everywhere!**
- Development: ✅ Works
- Production: ✅ Works (after Supabase setup)
- Easy to remember for both Rob & Dillon

---

## 🔒 Security Checklist

- [ ] Supabase service_role key kept secret (never commit to git)
- [ ] Strong passwords chosen for admin accounts
- [ ] .env.local added to .gitignore (already done ✅)
- [ ] Admin credentials stored securely (password manager)
- [ ] Two-factor auth enabled on Supabase account

---

## 🚨 Troubleshooting

### "Invalid login credentials"
- Check email/password are correct
- Verify user exists in Supabase Auth
- Ensure `users` table has matching record
- Check console for detailed errors

### "Missing Supabase environment variables"
- Verify .env.local has all three variables
- Restart dev server after changing .env.local
- Check values don't have extra spaces

### Can't access /admin pages
- Verify you're logged in
- Check browser console for session errors
- Clear cookies and try logging in again

---

## 📞 Need Help?

Contact Dillon: dillan.hill@acerforestry.co.uk
