'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

/**
 * FadeIn animation wrapper component
 * Animates children with opacity 0→1
 */
export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
