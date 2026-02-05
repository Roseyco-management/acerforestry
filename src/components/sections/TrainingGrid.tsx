"use client"

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'

export default function TrainingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
      >
        <Card>
          <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
            Video coming soon
          </div>
          <Heading as="h2" size="lg" className="mb-4">
            Tree Planting Techniques
          </Heading>
          <p className="text-charcoal leading-relaxed">
            Professional demonstration of proper tree planting methods,
            spacing, and depth techniques ensuring optimal establishment
            success across diverse Scottish terrain and species.
          </p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <Card>
          <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
            Video coming soon
          </div>
          <Heading as="h2" size="lg" className="mb-4">
            Ground Preparation Methods
          </Heading>
          <p className="text-charcoal leading-relaxed">
            Step-by-step guide to manual ground preparation techniques,
            including site assessment, terrain considerations, and
            preparation methods that optimize planting conditions.
          </p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Card>
          <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
            Video coming soon
          </div>
          <Heading as="h2" size="lg" className="mb-4">
            Safety Protocols
          </Heading>
          <p className="text-charcoal leading-relaxed">
            Essential safety procedures and equipment usage for forestry
            work. Demonstrating HSE compliance, risk assessment, and best
            practices developed through 26 years of professional experience.
          </p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <Card>
          <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
            Video coming soon
          </div>
          <Heading as="h2" size="lg" className="mb-4">
            Quality Standards
          </Heading>
          <p className="text-charcoal leading-relaxed">
            Our approach to maintaining high-quality forestry work,
            including inspection criteria, silvicultural best practices, and
            the attention to detail that ensures long-term forest health.
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
