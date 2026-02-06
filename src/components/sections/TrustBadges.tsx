'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

export default function TrustBadges() {
  const badges = [
    {
      icon: '✓',
      title: 'HSE Compliant',
      description:
        'Health, safety, and environmental standards met on every project',
    },
    {
      icon: '📈',
      title: 'High Survival Rates',
      description:
        'Exceptional tree establishment with comprehensive protection protocols',
    },
    {
      icon: '🏆',
      title: '26 Years Experience',
      description:
        'Deep expertise in Scottish woodland establishment and silviculture',
    },
    {
      icon: '🌲',
      title: 'Scottish Specialists',
      description:
        'Serving Highlands, Perthshire, Morayshire, and throughout Scotland',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow duration-300 border-t-4 border-accent-400"
            >
              <div className="text-4xl mb-4">{badge.icon}</div>
              <h3 className="text-lg font-bold text-forest-600 mb-2">
                {badge.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
