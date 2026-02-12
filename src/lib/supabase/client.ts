/**
 * Supabase Browser Client
 *
 * This client is used for client-side operations in React components.
 * It handles authentication state and maintains the session automatically.
 *
 * Usage:
 * import { createClient } from '@/lib/supabase/client'
 *
 * const supabase = createClient()
 * const { data, error } = await supabase.from('table').select()
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Get environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }

  // Create and return the browser client
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
