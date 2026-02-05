'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface SlideUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

/**
 * SlideUp animation wrapper component
 * Animates children with opacity 0→1 and y: 20→0
 */
export default function SlideUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
