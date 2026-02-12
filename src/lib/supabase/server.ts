/**
 * Supabase Server Client
 *
 * This client is used for server-side operations including:
 * - Server Components
 * - Server Actions
 * - Route Handlers
 *
 * It properly handles cookies for SSR authentication.
 *
 * Usage in Server Component:
 * import { createClient } from '@/lib/supabase/server'
 * import { cookies } from 'next/headers'
 *
 * const supabase = await createClient()
 * const { data, error } = await supabase.from('table').select()
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  // Get environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }

  // Create and return the server client with cookie handling
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch (error) {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
          console.error('Error setting cookies:', error)
        }
      },
    },
  })
}

/**
 * Get the current user session
 *
 * Usage:
 * const session = await getSession()
 * if (!session) {
 *   redirect('/admin/login')
 * }
 */
export async function getSession() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Get the current authenticated user
 *
 * Usage:
 * const user = await getUser()
 * if (!user) {
 *   redirect('/admin/login')
 * }
 */
export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Get the current user's profile from the users table
 *
 * This includes additional information like role and full_name
 *
 * Usage:
 * const profile = await getUserProfile()
 * if (profile?.role !== 'admin') {
 *   // Handle unauthorized access
 * }
 */
export async function getUserProfile() {
  const user = await getUser()
  if (!user) return null

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

/**
 * Check if the current user has a specific role
 *
 * Usage:
 * const isAdmin = await hasRole('admin')
 * if (!isAdmin) {
 *   return { error: 'Unauthorized' }
 * }
 */
export async function hasRole(role: 'admin' | 'manager' | 'viewer') {
  const profile = await getUserProfile()
  return profile?.role === role
}

/**
 * Check if the current user has one of multiple roles
 *
 * Usage:
 * const canEdit = await hasAnyRole(['admin', 'manager'])
 */
export async function hasAnyRole(roles: ('admin' | 'manager' | 'viewer')[]) {
  const profile = await getUserProfile()
  return profile ? roles.includes(profile.role) : false
}
