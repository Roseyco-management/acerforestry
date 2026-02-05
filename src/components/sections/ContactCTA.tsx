"use client"

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
    <section className="py-16 md:py-24 bg-charcoal">
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading as="h2" size="lg" className="mb-4 text-offwhite">
            Ready to discuss your project?
          </Heading>
          <p className="text-lg text-offwhite/80 mb-8 max-w-2xl mx-auto">
            Get in touch with Dillan to discuss your woodland establishment needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:07756513670">
              <Button variant="primary">Call 07756 513 670</Button>
            </a>
            <a href="mailto:dillan.hill@acerforestry.co.uk">
              <Button variant="secondary">Send Email</Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
