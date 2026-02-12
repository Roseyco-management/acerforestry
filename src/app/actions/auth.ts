/**
 * Authentication Server Actions
 *
 * These actions can be used in Server Components and Client Components
 * to handle authentication operations.
 */

'use server'

import { createClient, getUser } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * Sign in with email and password
 */
export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Check if user has a profile and is active
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('id, email, full_name, role, is_active')
    .eq('id', data.user.id)
    .single()

  if (profileError || !profile) {
    await supabase.auth.signOut()
    return { error: 'User profile not found. Please contact an administrator.' }
  }

  if (!profile.is_active) {
    await supabase.auth.signOut()
    return {
      error: 'Your account has been deactivated. Please contact an administrator.',
    }
  }

  // Log the login activity
  await supabase.from('activity_log').insert({
    user_id: data.user.id,
    action: 'login',
    entity_type: 'auth',
    entity_id: data.user.id,
    description: `User ${profile.email} logged in`,
  })

  revalidatePath('/', 'layout')
  redirect('/admin')
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient()
  const user = await getUser()

  if (user) {
    // Log the logout activity
    await supabase.from('activity_log').insert({
      user_id: user.id,
      action: 'logout',
      entity_type: 'auth',
      entity_id: user.id,
      description: `User logged out`,
    })
  }

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/admin/login')
}

/**
 * Get the current authenticated user's profile
 */
export async function getCurrentUserProfile() {
  const supabase = await createClient()
  const user = await getUser()

  if (!user) {
    return null
  }

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
