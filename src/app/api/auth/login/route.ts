/**
 * Login API Route
 *
 * Handles user authentication via email and password.
 * This route can be used for programmatic login or AJAX requests.
 *
 * POST /api/auth/login
 * Body: { email: string, password: string }
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

    // Get user profile to check if they exist in our users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, email, full_name, role, is_active')
      .eq('id', data.user.id)
      .single()

    if (profileError || !profile) {
      // User authenticated but doesn't have a profile
      // This shouldn't happen in normal flow, but we'll handle it
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: 'User profile not found. Please contact an administrator.' },
        { status: 403 }
      )
    }

    // Check if user is active
    if (!profile.is_active) {
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: 'Your account has been deactivated. Please contact an administrator.' },
        { status: 403 }
      )
    }

    // Log the login activity
    await supabase.from('activity_log').insert({
      user_id: data.user.id,
      action: 'login',
      entity_type: 'auth',
      entity_id: data.user.id,
      description: `User ${profile.email} logged in`,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
    })

    // Return success with user info
    return NextResponse.json({
      success: true,
      user: {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Disable GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
