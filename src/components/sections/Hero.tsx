'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Heading as="h1" size="xl" className="mb-6 text-offwhite">
              {title}
            </Heading>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="text-lg md:text-xl mb-8 text-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <Link href={ctaHref}>
              <Button variant="secondary" size="lg">
                {ctaText}
              </Button>
            </Link>
          </motion.div>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  )
}
