# Supabase Quick Start Guide

Quick reference for using Supabase in different contexts.

## Client Component (Browser)

```tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { Client } from '@/lib/supabase/types'

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadClients() {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading clients:', error)
      } else {
        setClients(data || [])
      }
      setLoading(false)
    }

    loadClients()
  }, [supabase])

  if (loading) return <div>Loading...</div>

  return (
    <ul>
      {clients.map((client) => (
        <li key={client.id}>{client.contact_name}</li>
      ))}
    </ul>
  )
}
```

## Server Component (SSR)

```tsx
import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/lib/supabase/types'

export default async function ClientsPage() {
  const supabase = await createClient()

  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map((client: Client) => (
          <li key={client.id}>{client.contact_name}</li>
        ))}
      </ul>
    </div>
  )
}
```

## Server Action

```tsx
'use server'

import { createClient, getUser } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ClientInsert } from '@/lib/supabase/types'

export async function createClient(formData: FormData) {
  const supabase = await createClient()
  const user = await getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const clientData: ClientInsert = {
    contact_name: formData.get('contact_name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    status: 'prospect',
  }

  const { data, error } = await supabase
    .from('clients')
    .insert(clientData)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Log the action
  await supabase.from('activity_log').insert({
    user_id: user.id,
    action: 'create',
    entity_type: 'client',
    entity_id: data.id,
    description: `Created client: ${data.contact_name}`,
  })

  // Revalidate the clients page
  revalidatePath('/admin/clients')

  return { data }
}
```

## Route Handler (API Route)

```tsx
// app/api/clients/route.ts
import { createClient, getUser } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('status', 'active')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const { data, error } = await supabase
    .from('clients')
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
```

## Protected Page with Role Check

```tsx
import { createClient, getUserProfile, hasRole } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminSettingsPage() {
  const profile = await getUserProfile()

  // Check if user is authenticated
  if (!profile) {
    redirect('/admin/login')
  }

  // Check if user has admin role
  const isAdmin = await hasRole('admin')
  if (!isAdmin) {
    redirect('/admin') // Redirect to dashboard if not admin
  }

  return (
    <div>
      <h1>Admin Settings</h1>
      <p>Welcome, {profile.full_name}</p>
      {/* Admin-only content */}
    </div>
  )
}
```

## Form with Server Action

```tsx
'use client'

import { createClient as createClientAction } from '@/app/actions/clients'
import { useState } from 'react'

export function CreateClientForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    const result = await createClientAction(formData)

    if (result.error) {
      setMessage(`Error: ${result.error}`)
    } else {
      setMessage('Client created successfully!')
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="contact_name" placeholder="Contact Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone" />
      <button type="submit">Create Client</button>
      {message && <p>{message}</p>}
    </form>
  )
}
```

## Real-time Updates

```tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { Project } from '@/lib/supabase/types'

export function LiveProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const supabase = createClient()

  useEffect(() => {
    // Load initial data
    supabase
      .from('projects')
      .select('*')
      .then(({ data }) => setProjects(data || []))

    // Subscribe to changes
    const channel = supabase
      .channel('projects-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setProjects((prev) => [...prev, payload.new as Project])
          } else if (payload.eventType === 'UPDATE') {
            setProjects((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? (payload.new as Project) : p
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setProjects((prev) => prev.filter((p) => p.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>{project.project_name}</div>
      ))}
    </div>
  )
}
```

## File Upload

```tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export function PhotoUpload({ projectId }: { projectId: string }) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const fileName = `${Date.now()}-${file.name}`
      const filePath = `project-photos/${projectId}/${fileName}`

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('project-photos')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Create database record
      const { error: dbError } = await supabase.from('project_photos').insert({
        project_id: projectId,
        storage_path: filePath,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        photo_type: 'progress',
      })

      if (dbError) throw dbError

      alert('Photo uploaded successfully!')
    } catch (error) {
      console.error('Error uploading:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  )
}
```

## Authentication

```tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
```

## Common Patterns

### Pagination

```tsx
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .range(0, 9) // First 10 items (0-9)

// Next page
.range(10, 19) // Next 10 items (10-19)
```

### Counting

```tsx
const { count, error } = await supabase
  .from('projects')
  .select('*', { count: 'exact', head: true })
```

### Full-text Search

```tsx
const { data, error } = await supabase
  .from('clients')
  .select('*')
  .textSearch('contact_name', 'john')
```

### Upsert

```tsx
const { data, error } = await supabase
  .from('website_content')
  .upsert(
    { content_key: 'hero_title', content_value: 'New Title' },
    { onConflict: 'content_key' }
  )
```

### Transactions (via RPC)

```sql
-- First create a stored procedure in Supabase
CREATE OR REPLACE FUNCTION create_project_with_team(
  project_data json,
  team_member_ids uuid[]
) RETURNS json AS $$
BEGIN
  -- Insert project
  -- Insert team assignments
  -- Return result
END;
$$ LANGUAGE plpgsql;
```

```tsx
const { data, error } = await supabase.rpc('create_project_with_team', {
  project_data: { /* ... */ },
  team_member_ids: ['uuid1', 'uuid2']
})
```

## Tips

1. Always handle errors
2. Use TypeScript types for type safety
3. Log important actions in activity_log
4. Check permissions before mutations
5. Revalidate paths after mutations
6. Use real-time subscriptions sparingly (performance)
7. Paginate large result sets
8. Index frequently queried columns (already done in schema)
