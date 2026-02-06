'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'

export default function ProcessTimeline() {
  const steps = [
    {
      title: 'Initial Consultation',
      description:
        'Meet to understand your woodland goals, site conditions, and requirements.',
      icon: '📋',
    },
    {
      title: 'Site Assessment',
      description:
        'Professional analysis of soil, drainage, climate, and optimal species selection.',
      icon: '🔍',
    },
    {
      title: 'Ground Preparation',
      description:
        'Site conditioning and preparation for optimal tree establishment.',
      icon: '🔧',
    },
    {
      title: 'Tree Planting',
      description:
        'Expert planting using quality stock with professional techniques for maximum survival.',
      icon: '🌱',
    },
    {
      title: 'Protection & Care',
      description:
        '5-year protection program including guards, fencing, and weed control.',
      icon: '🛡️',
    },
    {
      title: 'Monitoring',
      description:
        'Ongoing monitoring, maintenance, and reporting on forest establishment progress.',
      icon: '📈',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Heading as="h2" size="3xl" className="mb-4">
            Our Proven Process
          </Heading>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From initial planning to thriving forest—a systematic approach to
            woodland success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step number badge */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-forest text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md z-10">
                {index + 1}
              </div>

              {/* Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow duration-300 h-full pt-8">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold text-forest-600 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
