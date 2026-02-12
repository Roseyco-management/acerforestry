'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the return URL from query params, default to /admin
  const returnTo = searchParams.get('returnTo') || '/admin'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 🔓 DEV MODE BYPASS - Remove this in production!
      // Demo credentials for testing without Supabase
      const isDev = process.env.NODE_ENV === 'development'
      const demoEmail = 'admin@acerforestry.co.uk'
      const demoPassword = 'AcerForestry2024!'

      if (isDev && email === demoEmail && password === demoPassword) {
        console.log('🔓 DEV MODE: Using demo login bypass')
        // Create a fake session in localStorage for dev mode
        localStorage.setItem('demo-session', JSON.stringify({
          user: { email: demoEmail, name: 'Demo Admin' },
          timestamp: Date.now()
        }))
        router.push(returnTo)
        router.refresh()
        return
      }

      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Successful login - redirect to return URL
      router.push(returnTo)
      router.refresh()
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-forest">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md">
          <div className="mb-8">
            <div className="text-white text-2xl font-bold mb-6">
              ACER FORESTRY
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Woodland Establishment
            <br />
            Management System
          </h1>
          <p className="text-lg text-forest-100">
            Manage your forestry projects, clients, and team members all in one
            place.
          </p>
          <div className="mt-12 space-y-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-accent-400 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Project Management</h3>
                <p className="text-sm text-forest-200">
                  Track woodland creation projects from planning to completion
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-accent-400 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Client Portal</h3>
                <p className="text-sm text-forest-200">
                  Manage forest managers and woodland owners efficiently
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-accent-400 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Team Coordination</h3>
                <p className="text-sm text-forest-200">
                  Organize subcontractors and staff across multiple sites
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-forest-xl p-8 md:p-10">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="text-forest-600 text-xl font-bold mb-4">
                ACER FORESTRY
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-600">
                Sign in to access your admin dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="your.email@acerforestry.co.uk"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20 outline-none transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20 outline-none transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-forest text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 focus:ring-4 focus:ring-forest-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                Need help accessing your account?{' '}
                <a
                  href="mailto:admin@acerforestry.co.uk"
                  className="text-forest-600 hover:text-forest-700 font-medium"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <p className="text-center text-sm text-white/80 mt-6">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-forest">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
