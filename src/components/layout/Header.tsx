'use client'

import { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export interface HeaderProps {
  className?: string
}

/**
 * Responsive header with desktop navigation and mobile menu
 * Includes brand logo, navigation links, and phone CTA
 */
export default function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/forest-managers', label: 'Forest Managers' },
    { href: '/services', label: 'Services' },
    { href: '/subcontractors', label: 'Subcontractors' },
    { href: '/training', label: 'Training' },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={cn('bg-offwhite border-b border-primary/10', className)}>
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">
              Acer Forestry
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-darkgray hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="primary" size="md">
              <a href="tel:07756513670" className="text-offwhite no-underline">
                07756 513670
              </a>
            </Button>
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
    </header>
  )
}
