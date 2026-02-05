import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'

export interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  children?: ReactNode
  className?: string
}

/**
 * Large hero section for page tops with dark background and light text
 * Centered content with large heading, subtitle, and prominent CTA button
 */
export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  children,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        'bg-primary text-offwhite min-h-[60vh] flex items-center',
        className
      )}
    >
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <Heading as="h1" size="xl" className="mb-6 text-offwhite">
            {title}
          </Heading>
          <p className="text-lg md:text-xl mb-8 text-light leading-relaxed">
            {subtitle}
          </p>
          <Link href={ctaHref}>
            <Button variant="secondary" size="lg">
              {ctaText}
            </Button>
          </Link>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  )
}
