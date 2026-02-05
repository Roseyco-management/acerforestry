import Link from 'next/link'
import Container from '@/components/ui/Container'

export interface FooterProps {
  className?: string
}

/**
 * Site footer with company info, contact details, and quick links
 * Responsive layout with stacked sections on mobile, horizontal on desktop
 */
export default function Footer({ className }: FooterProps) {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/forest-managers', label: 'Forest Managers' },
    { href: '/services', label: 'Services' },
    { href: '/subcontractors', label: 'Subcontractors' },
    { href: '/training', label: 'Training' },
  ]

  return (
    <footer className={`bg-primary text-offwhite ${className || ''}`}>
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Acer Forestry Ltd</h3>
              <p className="text-offwhite/90 mb-2">Company No. SC670730</p>
              <p className="text-offwhite/90 mb-2">
                Rob and Dillan - 26 years combined experience
              </p>
              <p className="text-offwhite/90">
                Serving the Highlands, Perthshire, Morayshire, and throughout
                Scotland
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <p>
                  <a
                    href="tel:07756513670"
                    className="text-offwhite/90 hover:text-offwhite transition-colors duration-200"
                  >
                    📞 07756 513670
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:dillan.hill@acerforestry.co.uk"
                    className="text-offwhite/90 hover:text-offwhite transition-colors duration-200 break-all"
                  >
                    ✉️ dillan.hill@acerforestry.co.uk
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-offwhite/90 hover:text-offwhite transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-offwhite/20 text-center text-offwhite/80 text-sm">
            © 2026 Acer Forestry Ltd. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  )
}
