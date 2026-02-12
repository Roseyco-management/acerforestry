'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import MainLayout from './MainLayout'

interface ConditionalLayoutProps {
  children: ReactNode
}

/**
 * Conditionally renders MainLayout based on the current route
 * Admin routes (/admin/*) don't get the public header/footer
 */
export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    // Admin routes: render children directly (no public header/footer)
    return <>{children}</>
  }

  // Public routes: wrap in MainLayout (includes header/footer)
  return <MainLayout>{children}</MainLayout>
}
