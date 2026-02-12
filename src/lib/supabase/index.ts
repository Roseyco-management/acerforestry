/**
 * Supabase Utilities - Index
 *
 * Central export point for all Supabase utilities.
 *
 * Usage:
 * import { createClient } from '@/lib/supabase' // Browser client
 * import { createClient as createServerClient } from '@/lib/supabase/server'
 */

// Re-export browser client
export { createClient } from './client'

// Re-export types
export type * from './types'
