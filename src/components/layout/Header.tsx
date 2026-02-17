'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export interface HeaderProps {
  className?: string
}

/**
 * Sticky header with desktop/mobile navigation, phone CTA, and scroll progress bar.
 * Nav links jump to sections on the single-page layout.
 * Double-clicking the logo navigates to the admin login.
 */
export default function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const router = useRouter()
  const lastClickTime = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#why-forest-managers', label: 'Land Owner / Forest Manager' },
    { href: '/#services', label: 'Services' },
    { href: '/#contact', label: 'Contact' },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()

    const now = Date.now()
    const timeSinceLastClick = now - lastClickTime.current

    if (timeSinceLastClick < 300) {
      // Double-click detected - go to admin login
      router.push('/admin/login')
    } else {
      // Single click - go to home (after delay to check for double-click)
      setTimeout(() => {
        const timeSinceClick = Date.now() - lastClickTime.current
        if (timeSinceClick >= 300) {
          router.push('/')
        }
      }, 310)
    }

    lastClickTime.current = now
  }

  return (
    <header className={cn('bg-offwhite border-b border-primary/10 sticky top-0 z-50', className)}>
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={handleLogoClick}>
            <Image
              src="/images/AF Logo.png"
              alt="Acer Forestry"
              width={180}
              height={60}
              className="h-12 w-auto"
              style={{
                filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.3))',
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
              >
                <Link
                  href={link.href}
                  className="text-darkgray hover:text-primary transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
            >
              <Button variant="primary" size="md">
                <a href="tel:07756513670" className="text-offwhite no-underline">
                  07756 513670
                </a>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle mobile menu"
          >
            <span className="w-6 h-0.5 bg-primary transition-all duration-300" />
            <span className="w-6 h-0.5 bg-primary transition-all duration-300" />
            <span className="w-6 h-0.5 bg-primary transition-all duration-300" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="flex flex-col gap-4 py-6 border-t border-primary/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-darkgray hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="primary" size="md" className="mt-2">
              <a href="tel:07756513670" className="text-offwhite no-underline">
                07756 513670
              </a>
            </Button>
          </nav>
        </div>
      </Container>

      {/* Scroll progress bar */}
      <div className="h-0.5 bg-primary/10">
        <div
          className="h-full bg-accent-400 transition-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  )
}
