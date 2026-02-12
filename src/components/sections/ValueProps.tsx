'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'

export interface ValueProp {
  title: string
  description: string
  icon?: string
}

export interface ValuePropsProps {
  values: ValueProp[]
  columns?: 2 | 3
  className?: string
}

/**
 * Grid of value proposition cards
 * Responsive layout: 1 column mobile, 2-3 columns desktop
 */
export default function ValueProps({
  values,
  columns = 3,
  className,
}: ValuePropsProps) {
  const gridCols = columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'

  return (
    <div className={cn('grid grid-cols-1 gap-6 md:gap-8', gridCols, className)}>
      {values.map((value, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        >
          <Card variant="gradient">
            {value.icon && (
              <motion.div
                className="text-4xl mb-4"
                role="img"
                aria-label={value.title}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {value.icon}
              </motion.div>
            )}
            <Heading as="h3" size="sm" className="mb-3">
              {value.title}
            </Heading>
            <p className="text-slate leading-relaxed">{value.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
