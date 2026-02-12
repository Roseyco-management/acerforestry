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
  highlightedWord?: string
  subtitle: string
  ctaText: string
  ctaHref: string
  children?: ReactNode
  className?: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

/**
 * Large hero section for page tops with premium gradient background
 * Centered content with large heading, subtitle, and prominent CTA button
 */
export default function Hero({
  title,
  highlightedWord,
  subtitle,
  ctaText,
  ctaHref,
  children,
  className,
}: HeroProps) {
  // Split title at highlighted word if provided
  let beforeHighlight = title
  let afterHighlight = ''

  if (highlightedWord && title.includes(highlightedWord)) {
    const parts = title.split(highlightedWord)
    beforeHighlight = parts[0]
    afterHighlight = parts.slice(1).join(highlightedWord)
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden min-h-[90vh] flex items-center pt-28 pb-20',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/Acer3.jpg)',
          }}
        />
        {/* Darker, more dramatic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/70 via-forest-800/60 to-forest-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
      </div>

      {/* Decorative background elements for premium feel */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent-400 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-8 sm:mb-12">
            <span className="inline-block px-4 py-2 bg-accent-400/20 text-accent-300 rounded-full text-sm md:text-base font-bold tracking-[0.3em] uppercase drop-shadow-lg">
              26 Years of Expertise
            </span>
          </motion.div>

          {/* Main Title - Massive and Bold */}
          <motion.h1
            variants={fadeInUp}
            className="mb-6 text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] text-white/90 drop-shadow-2xl"
            style={{
              letterSpacing: '-0.02em',
              textShadow: '0 4px 12px rgb(0 0 0 / 40%)',
            }}
          >
            {highlightedWord ? (
              <>
                <span className="block text-accent-300 uppercase mb-3 italic"
                  style={{
                    textShadow: '-1px -1px 0 #1e3a2a, 1px -1px 0 #1e3a2a, -1px 1px 0 #1e3a2a, 1px 1px 0 #1e3a2a, 0 4px 16px rgb(0 0 0 / 60%)',
                  }}
                >
                  {highlightedWord}
                </span>
                <span className="block">{afterHighlight}</span>
              </>
            ) : (
              title
            )}
          </motion.h1>

          {/* Subtitle - Large and Elegant */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl lg:text-4xl mb-12 sm:mb-14 italic font-light text-white max-w-5xl mx-auto leading-relaxed drop-shadow-2xl"
            style={{
              textShadow: '0 4px 16px rgb(0 0 0 / 50%)',
            }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Button - Large and Impactful */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href={ctaHref}>
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center justify-center px-10 py-5 rounded-lg font-bold text-lg bg-accent-400 hover:bg-accent-500 text-forest-900 shadow-2xl hover:shadow-accent-400/50 transition-all duration-300"
              >
                {ctaText}
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-white text-sm font-semibold"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">✓</span>
              <span>HSE Compliant</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">📈</span>
              <span>High Survival Rates</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">🏆</span>
              <span>26 Years Experience</span>
            </motion.div>
          </motion.div>

          {children && <div className="mt-12">{children}</div>}
        </motion.div>
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
