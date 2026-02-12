/**
 * Next.js Middleware
 *
 * This middleware runs on every request and handles:
 * - Authentication checks for /admin/* routes
 * - Session refresh
 * - Redirects for protected routes
 *
 * Routes:
 * - /admin/login - Public, redirects authenticated users to dashboard
 * - /admin/* - Protected, requires authentication
 * - /* - Public routes (main website)
 */

import { type NextRequest, NextResponse } from 'next/server'
import { getMiddlewareSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get session and create response with updated cookies
  const { session, response } = await getMiddlewareSession(request)

  // Public routes - no authentication required
  const publicAdminRoutes = ['/admin/login', '/admin/signup']
  const isPublicAdminRoute = publicAdminRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Check if this is an admin route
  const isAdminRoute = pathname.startsWith('/admin')

  // Handle authentication for admin routes
  if (isAdminRoute) {
    // If accessing a public admin route (login/signup)
    if (isPublicAdminRoute) {
      // If user is already authenticated, redirect to dashboard
      if (session) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      // Not authenticated, allow access to login/signup
      return response
    }

    // Protected admin route - require authentication
    if (!session) {
      // Store the original URL to redirect back after login
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // User is authenticated, allow access to protected admin route
    return response
  }

  // Not an admin route, allow access to public website
  return response
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - API routes that don't need auth
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
