"use client"

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'

export interface ValuePropProps {
  icon?: ReactNode
  title: string
  description: string
  className?: string
}

/**
 * Reusable value proposition section component
 * Displays a centered content block with optional icon, title, and description
 */
export default function ValueProp({
  icon,
  title,
  description,
  className,
}: ValuePropProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <Container size="md">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {icon && <div className="mb-6 flex justify-center">{icon}</div>}
          <Heading as="h2" size="lg" className="mb-6">
            {title}
          </Heading>
          <p className="text-lg text-charcoal leading-relaxed">{description}</p>
        </motion.div>
      </Container>
    </section>
  )
}
