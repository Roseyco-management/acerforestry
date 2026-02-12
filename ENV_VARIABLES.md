# Environment Variables Documentation

This document describes all environment variables required for the Acer Forestry Admin Dashboard.

## Setup Instructions

1. Copy `.env.local.template` to `.env.local`:
   ```bash
   cp .env.local.template .env.local
   ```

2. Fill in the actual values from your Supabase project
3. Never commit `.env.local` to version control (already excluded in `.gitignore`)

## Required Environment Variables

### `NEXT_PUBLIC_SUPABASE_URL`
- **Required**: Yes
- **Type**: Public (safe to expose in browser)
- **Description**: Your Supabase project URL
- **Where to find**: Supabase Dashboard → Project Settings → API → Project URL
- **Example**: `https://abcdefghijklmnop.supabase.co`

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Required**: Yes
- **Type**: Public (safe to expose in browser)
- **Description**: Your Supabase anonymous/public API key
- **Where to find**: Supabase Dashboard → Project Settings → API → Project API keys → anon/public
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Note**: This key has Row Level Security (RLS) applied, making it safe for client-side use

### `SUPABASE_SERVICE_ROLE_KEY`
- **Required**: Yes (for admin operations)
- **Type**: Secret (NEVER expose in browser)
- **Description**: Your Supabase service role key with full database access
- **Where to find**: Supabase Dashboard → Project Settings → API → Project API keys → service_role
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Security Warning**: This key bypasses Row Level Security. Only use server-side in API routes or Server Components. Never send to client.

### `DATABASE_URL` (Optional)
- **Required**: No
- **Type**: Secret
- **Description**: Direct PostgreSQL connection string for database migrations or tools
- **Where to find**: Supabase Dashboard → Project Settings → Database → Connection string → URI
- **Example**: `postgresql://postgres:your-password@db.abcdefghijklmnop.supabase.co:5432/postgres`
- **Note**: Only needed if using direct database access tools

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use environment-specific values** - Different values for development, staging, and production
3. **Rotate keys regularly** - Especially if they may have been compromised
4. **Service role key** - Only use server-side, never expose to client
5. **Public keys** - While safe to expose, still use environment variables for flexibility

## Package Dependencies Installed

The following npm packages have been installed for the admin dashboard:

### Authentication & Database
- `@supabase/ssr@^0.8.0` - Supabase SSR utilities for Next.js
- `@supabase/supabase-js@^2.95.3` - Supabase JavaScript client

### Charts & Visualizations
- `apexcharts@^5.3.6` - Modern charting library
- `react-apexcharts@^1.9.0` - React wrapper for ApexCharts

### File Uploads
- `react-dropzone@^15.0.0` - Drag-and-drop file upload component

### Date Pickers
- `flatpickr@^4.6.13` - Lightweight date/time picker

### UI Components
- `@floating-ui/react@^0.27.17` - Tooltips, popovers, and floating UI elements

### Form Handling & Validation
- `react-hook-form@^7.71.1` - Performant form library
- `zod@^4.3.6` - TypeScript-first schema validation

## Troubleshooting

### Issue: "Invalid API key" error
- **Solution**: Double-check that you copied the correct key from Supabase Dashboard
- **Solution**: Ensure no extra spaces or line breaks in the `.env.local` file

### Issue: "Project not found" error
- **Solution**: Verify the `NEXT_PUBLIC_SUPABASE_URL` matches your project URL exactly
- **Solution**: Check that your Supabase project is not paused

### Issue: Changes to `.env.local` not taking effect
- **Solution**: Restart your Next.js dev server (`npm run dev`)
- **Solution**: Clear `.next` cache: `rm -rf .next`

### Issue: RLS policies blocking requests
- **Solution**: Verify your database has proper RLS policies configured
- **Solution**: For admin operations, use the service role key server-side
