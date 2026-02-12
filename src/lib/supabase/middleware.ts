/**
 * Supabase Middleware Helpers
 *
 * These utilities are used in the Next.js middleware to handle authentication
 * and session management for protected routes.
 *
 * This file provides helper functions for creating the Supabase client
 * in the middleware context with proper request/response handling.
 */

import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Create a Supabase client for use in middleware
 *
 * This client properly handles cookies in the middleware context,
 * which is different from Server Components and Route Handlers.
 *
 * @param request - The incoming Next.js request
 * @returns Object containing supabase client and response
 */
export function createMiddlewareClient(request: NextRequest) {
  // Create a response object that we can modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Get environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a null client if Supabase is not configured
    // This allows the site to work without Supabase (admin disabled)
    return { supabase: null, response }
  }

  // Create the Supabase client for middleware
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // Set cookies on the request (for subsequent middleware/route handlers)
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value)
        })

        // Update the response to set cookies for the client
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })

        // Set cookies on the response
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  return { supabase, response }
}

/**
 * Check if the user is authenticated
 *
 * This is a convenience function to check authentication status in middleware.
 *
 * @param request - The incoming Next.js request
 * @returns Object with user, session, and response
 */
export async function getMiddlewareSession(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)

  // If Supabase is not configured, return no session
  if (!supabase) {
    return {
      session: null,
      user: null,
      error: null,
      response,
      supabase: null,
    }
  }

  // Get the current session
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  return {
    session,
    user: session?.user ?? null,
    error,
    response,
    supabase,
  }
}

/**
 * Redirect to login if not authenticated
 *
 * Use this in middleware to protect routes.
 *
 * @param request - The incoming Next.js request
 * @param redirectUrl - URL to redirect to after login (default: current path)
 * @returns Response object (either next() or redirect to login)
 */
export async function requireAuth(
  request: NextRequest,
  redirectUrl?: string
): Promise<NextResponse> {
  const { session, response } = await getMiddlewareSession(request)

  // If no session, redirect to login with return URL
  if (!session) {
    const returnTo = redirectUrl || request.nextUrl.pathname
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('returnTo', returnTo)
    return NextResponse.redirect(loginUrl)
  }

  // User is authenticated, continue
  return response
}

/**
 * Redirect authenticated users away from auth pages
 *
 * Use this for login/signup pages to redirect already authenticated users.
 *
 * @param request - The incoming Next.js request
 * @param redirectTo - Where to redirect authenticated users (default: /admin)
 * @returns Response object (either next() or redirect to dashboard)
 */
export async function redirectIfAuthenticated(
  request: NextRequest,
  redirectTo: string = '/admin'
): Promise<NextResponse> {
  const { session, response } = await getMiddlewareSession(request)

  // If user is authenticated, redirect them away from auth pages
  if (session) {
    return NextResponse.redirect(new URL(redirectTo, request.url))
  }

  // User is not authenticated, continue to auth page
  return response
}

/**
 * Check if user has required role
 *
 * Use this to protect routes that require specific permissions.
 *
 * @param request - The incoming Next.js request
 * @param allowedRoles - Array of roles that can access this route
 * @param redirectUrl - Where to redirect unauthorized users
 * @returns Response object (either next(), redirect, or 403)
 */
export async function requireRole(
  request: NextRequest,
  allowedRoles: string[],
  redirectUrl: string = '/admin'
): Promise<NextResponse> {
  const { session, supabase, response } = await getMiddlewareSession(request)

  // First check if user is authenticated
  if (!session) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('returnTo', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  // Check if user has required role
  if (!profile || !allowedRoles.includes(profile.role)) {
    // User doesn't have required role, redirect to dashboard
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // User has required role, continue
  return response
}
