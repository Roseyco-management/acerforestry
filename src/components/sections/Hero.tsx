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
 * Large hero section for page tops with premium gradient background
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
        'relative overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-forest-600 via-forest-700 to-slate-800',
        className
      )}
    >
      {/* Decorative background elements for premium feel */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent-400 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-5xl mx-auto py-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-accent-400/20 text-accent-300 rounded-full text-sm font-semibold">
              26 Years of Expertise
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <Heading
              as="h1"
              size="xl"
              className="mb-6 text-white drop-shadow-lg"
            >
              {title}
            </Heading>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl mb-10 text-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-md"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href={ctaHref}>
              <Button
                variant="primary"
                size="lg"
                className="bg-accent-400 hover:bg-accent-500 text-forest-900 font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {ctaText}
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-white text-sm font-semibold"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>HSE Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📈</span>
              <span>High Survival Rates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span>26 Years Experience</span>
            </div>
          </motion.div>

          {children && <div className="mt-12">{children}</div>}
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  )
}
