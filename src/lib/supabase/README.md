# Supabase Client Utilities

This directory contains all Supabase client utilities for the Acer Forestry Admin system.

## Files

### `client.ts` - Browser Client
Used in Client Components and client-side code.

```tsx
'use client'
import { createClient } from '@/lib/supabase/client'

export function MyComponent() {
  const supabase = createClient()

  async function fetchData() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')

    if (error) console.error(error)
    return data
  }

  return <div>...</div>
}
```

### `server.ts` - Server Client
Used in Server Components, Server Actions, and Route Handlers.

```tsx
// In a Server Component
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase.from('clients').select('*')

  return <div>{/* render data */}</div>
}

// In a Server Action
'use server'
import { createClient, getUser, getUserProfile } from '@/lib/supabase/server'

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const user = await getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { data, error } = await supabase
    .from('projects')
    .insert({ /* ... */ })

  return { data, error }
}
```

### `middleware.ts` - Middleware Helpers
Used in the Next.js middleware for route protection.

```ts
import { requireAuth, getMiddlewareSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { session } = await getMiddlewareSession(request)

  if (!session) {
    // Redirect to login
  }

  // Or use helper:
  return await requireAuth(request)
}
```

### `types.ts` - TypeScript Types
Database type definitions for type-safe queries.

```ts
import type { Client, Project, User } from '@/lib/supabase/types'

// Use in your components/functions
function displayClient(client: Client) {
  console.log(client.contact_name)
}
```

## Authentication Helpers

### Server-side

```ts
import {
  getUser,
  getSession,
  getUserProfile,
  hasRole,
  hasAnyRole
} from '@/lib/supabase/server'

// Get current user
const user = await getUser()

// Get session
const session = await getSession()

// Get user profile (includes role, full_name, etc.)
const profile = await getUserProfile()

// Check if user has specific role
const isAdmin = await hasRole('admin')

// Check if user has any of multiple roles
const canEdit = await hasAnyRole(['admin', 'manager'])
```

## Route Protection

The middleware automatically protects all `/admin/*` routes except `/admin/login`.

### How it works:

1. **Public Routes**: `/admin/login`, `/admin/signup`
   - Accessible without authentication
   - Redirects to `/admin` if already authenticated

2. **Protected Routes**: All other `/admin/*` routes
   - Requires authentication
   - Redirects to `/admin/login?returnTo=<path>` if not authenticated
   - After login, user is redirected back to original path

3. **Public Website**: All other routes (`/`, `/services`, etc.)
   - No authentication required

### Middleware Flow:

```
Request to /admin/dashboard
  ↓
Middleware checks session
  ↓
No session? → Redirect to /admin/login?returnTo=/admin/dashboard
  ↓
Has session? → Continue to /admin/dashboard
```

## Database Queries

### Basic CRUD Operations

```ts
// CREATE
const { data, error } = await supabase
  .from('clients')
  .insert({
    contact_name: 'John Smith',
    email: 'john@example.com',
    status: 'active'
  })
  .select()
  .single()

// READ
const { data, error } = await supabase
  .from('clients')
  .select('*')
  .eq('status', 'active')
  .order('created_at', { ascending: false })

// UPDATE
const { data, error } = await supabase
  .from('clients')
  .update({ status: 'inactive' })
  .eq('id', clientId)
  .select()
  .single()

// DELETE
const { error } = await supabase
  .from('clients')
  .delete()
  .eq('id', clientId)
```

### Joins and Relationships

```ts
// Get projects with client information
const { data, error } = await supabase
  .from('projects')
  .select(`
    *,
    client:clients (
      contact_name,
      company_name,
      email
    )
  `)
  .eq('status', 'in_progress')

// Get project with team members
const { data, error } = await supabase
  .from('projects')
  .select(`
    *,
    project_team (
      role_on_project,
      team_member:team_members (
        name,
        role,
        phone
      )
    )
  `)
  .eq('id', projectId)
  .single()
```

### Filtering

```ts
// Multiple conditions
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('status', 'planning')
  .gte('area_hectares', 10)
  .lte('area_hectares', 50)
  .order('created_at', { ascending: false })

// Text search
const { data } = await supabase
  .from('clients')
  .select('*')
  .ilike('contact_name', '%smith%')

// Array contains
const { data } = await supabase
  .from('projects')
  .select('*')
  .contains('tree_species', ['Oak'])
```

## Storage Operations

### Uploading Files

```ts
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// Upload a file
const file = event.target.files[0]
const fileName = `${Date.now()}-${file.name}`
const filePath = `project-photos/${projectId}/${fileName}`

const { data, error } = await supabase.storage
  .from('project-photos')
  .upload(filePath, file, {
    cacheControl: '3600',
    upsert: false
  })

// Get public URL (for public buckets only)
const { data: { publicUrl } } = supabase.storage
  .from('website-images')
  .getPublicUrl(filePath)

// Get signed URL (for private buckets)
const { data, error } = await supabase.storage
  .from('project-photos')
  .createSignedUrl(filePath, 60 * 60) // 1 hour expiry
```

### Deleting Files

```ts
const { error } = await supabase.storage
  .from('project-photos')
  .remove([filePath])
```

## Real-time Subscriptions

```ts
'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function RealtimeProjects() {
  const [projects, setProjects] = useState([])
  const supabase = createClient()

  useEffect(() => {
    // Subscribe to changes
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // or 'INSERT', 'UPDATE', 'DELETE'
          schema: 'public',
          table: 'projects'
        },
        (payload) => {
          console.log('Change received!', payload)
          // Update local state
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return <div>...</div>
}
```

## Error Handling

```ts
const { data, error } = await supabase
  .from('clients')
  .select('*')

if (error) {
  // Handle specific error codes
  if (error.code === 'PGRST116') {
    // No rows returned
  } else if (error.code === '23505') {
    // Unique constraint violation
  }

  console.error('Database error:', error.message)
  return { error: error.message }
}

// Success
return { data }
```

## Activity Logging

Always log important actions in the activity_log table:

```ts
import { createClient, getUser } from '@/lib/supabase/server'

export async function updateClient(clientId: string, updates: ClientUpdate) {
  const supabase = await createClient()
  const user = await getUser()

  // Perform the update
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', clientId)
    .select()
    .single()

  if (!error && data) {
    // Log the activity
    await supabase.from('activity_log').insert({
      user_id: user?.id,
      action: 'update',
      entity_type: 'client',
      entity_id: clientId,
      description: `Updated client: ${data.contact_name}`,
      changes: updates
    })
  }

  return { data, error }
}
```

## Best Practices

1. **Use the correct client**:
   - Browser client for Client Components
   - Server client for Server Components, Actions, and Route Handlers
   - Middleware client only in middleware

2. **Always handle errors**:
   ```ts
   const { data, error } = await supabase.from('table').select()
   if (error) {
     // Handle error
   }
   ```

3. **Use TypeScript types**:
   ```ts
   import type { Client } from '@/lib/supabase/types'
   const client: Client = data
   ```

4. **Log important actions**:
   - Always log create, update, delete operations
   - Store before/after values in the changes field

5. **Check permissions**:
   ```ts
   const canEdit = await hasAnyRole(['admin', 'manager'])
   if (!canEdit) {
     return { error: 'Unauthorized' }
   }
   ```

6. **Use transactions for related operations**:
   ```ts
   // Use RPC functions for complex operations
   const { data, error } = await supabase.rpc('create_project_with_team', {
     project_data: {...},
     team_member_ids: [...]
   })
   ```

7. **Optimize queries**:
   - Only select the columns you need
   - Use indexes (already set up in schema)
   - Paginate large result sets

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and has the correct values
- Restart your dev server after adding environment variables

### "Row-level security policy violation"
- Check that the user is authenticated
- Verify the RLS policies in Supabase dashboard
- Ensure the user has the required role

### "Failed to fetch" errors
- Check your Supabase project is active
- Verify the API URL and keys are correct
- Check network connectivity

### Session not persisting
- Make sure middleware is properly set up
- Check that cookies are enabled in the browser
- Verify the cookie configuration in the client
