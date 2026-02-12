/**
 * Logout API Route
 *
 * Handles user sign out and session cleanup.
 *
 * POST /api/auth/logout
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user before logging out (for activity log)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Log the logout activity
      await supabase.from('activity_log').insert({
        user_id: user.id,
        action: 'logout',
        entity_type: 'auth',
        entity_id: user.id,
        description: `User logged out`,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        user_agent: request.headers.get('user-agent'),
      })
    }

    // Sign out the user
    const { error } = await supabase.auth.signOut()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Also support GET for simple logout links
export async function GET(request: Request) {
  try {
    const supabase = await createClient()

    // Get current user before logging out
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Log the logout activity
      await supabase.from('activity_log').insert({
        user_id: user.id,
        action: 'logout',
        entity_type: 'auth',
        entity_id: user.id,
        description: `User logged out`,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        user_agent: request.headers.get('user-agent'),
      })
    }

    // Sign out the user
    await supabase.auth.signOut()

    // Redirect to login page
    return NextResponse.redirect(new URL('/admin/login', request.url))
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
}
