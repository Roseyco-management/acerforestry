import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

export interface MainLayoutProps {
  children: ReactNode
  className?: string
}

/**
 * Main layout wrapper combining Header, content area, and Footer
 * Provides consistent site structure across all pages
 */
export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${className || ''}`}>{children}</main>
      <Footer />
    </div>
  )
}
