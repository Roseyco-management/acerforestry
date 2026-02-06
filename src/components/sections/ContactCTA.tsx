'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'

/**
 * Contact CTA section with phone and email buttons
 * Reusable component for conversion points throughout the site
 */
export default function ContactCTA() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-r from-forest-600 to-slate-800 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-400 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent-400 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Heading as="h2" size="3xl" className="mb-4 text-white">
            Ready to Establish Your Forest?
          </Heading>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get in touch with Dillan or Rob to discuss your woodland
            establishment needs. With 26 years of combined experience, we're
            ready to help your forest thrive.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 flex-wrap">
            <a href="tel:07756513670">
              <Button
                variant="primary"
                size="lg"
                className="bg-accent-400 hover:bg-accent-500 text-forest-900 font-bold shadow-lg hover:shadow-xl"
              >
                📞 Call 07756 513 670
              </Button>
            </a>
            <a href="mailto:dillan.hill@acerforestry.co.uk">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white"
              >
                ✉️ Send Email
              </Button>
            </a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-white/70 text-sm"
          >
            Serving the Highlands, Perthshire, Morayshire, and throughout
            Scotland
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}
