"use client"

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'

export default function ServicesGrid() {
  return (
    <>
      {/* Service Cards - First Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* Photo placeholders ready for high-quality service images - replace bg divs with Next.js Image components when available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
        >
          <Card>
            {/* TODO: Replace with <Image src="/photos/tree-planting.jpg" alt="Professional tree planting in Scottish Highlands" width={800} height={450} />
                 Use OptimizedImage component from @/components/ui/Image for automatic optimization */}
            <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
              Photo coming soon
            </div>
            <Heading as="h2" size="lg" className="mb-4">
              Tree Planting
            </Heading>
            <p className="text-charcoal leading-relaxed">
              Professional tree planting using silvicultural best practices. Every tree planted with precision to ensure establishment success and long-term forest health. 26 years experience across diverse Scottish terrain and species.
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
            {/* TODO: Replace with <Image src="/photos/ground-preparation.jpg" alt="Manual ground preparation for tree planting" width={800} height={450} />
                 Use OptimizedImage component from @/components/ui/Image for automatic optimization */}
            <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
              Photo coming soon
            </div>
            <Heading as="h2" size="lg" className="mb-4">
              Manual Ground Preparation
            </Heading>
            <p className="text-charcoal leading-relaxed">
              Expert manual ground preparation optimizing site conditions for planting. Careful terrain assessment and preparation techniques that respect site ecology while ensuring optimal tree establishment.
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
            {/* TODO: Replace with <Image src="/photos/fertilising.jpg" alt="Targeted fertilising for young forest growth" width={800} height={450} />
                 Use OptimizedImage component from @/components/ui/Image for automatic optimization */}
            <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
              Photo coming soon
            </div>
            <Heading as="h2" size="lg" className="mb-4">
              Fertilising
            </Heading>
            <p className="text-charcoal leading-relaxed">
              Targeted fertilising programs supporting young tree growth and forest health. Application methods adapted to site conditions and species requirements, promoting strong early growth and long-term vitality.
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
            {/* TODO: Replace with <Image src="/photos/herbicide-application.jpg" alt="Professional herbicide application with HSE compliance" width={800} height={450} />
                 Use OptimizedImage component from @/components/ui/Image for automatic optimization */}
            <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
              Photo coming soon
            </div>
            <Heading as="h2" size="lg" className="mb-4">
              Herbicide/Pesticide Application
            </Heading>
            <p className="text-charcoal leading-relaxed">
              Professional herbicide and pesticide application protecting young forests from competition and pests. All applications follow stringent HSE protocols with certified operators ensuring environmental compliance and forest protection.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Additional Services - Second Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
        >
          <Card>
            {/* TODO: Replace with <Image src="/photos/tree-removal.jpg" alt="Safe professional tree removal service" width={800} height={450} />
                 Use OptimizedImage component from @/components/ui/Image for automatic optimization */}
            <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
              Photo coming soon
            </div>
            <Heading as="h2" size="lg" className="mb-4">
              Tree Removal
            </Heading>
            <p className="text-charcoal leading-relaxed">
              Safe, professional tree removal when required for site management or forest health. Experienced team handling removals of all sizes with attention to site impact and safety protocols.
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
            {/* TODO: Replace with <Image src="/photos/invasive-species-control.jpg" alt="Invasive species control for woodland establishment" width={800} height={450} />
                 Use OptimizedImage component from @/components/ui/Image for automatic optimization */}
            <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
              Photo coming soon
            </div>
            <Heading as="h2" size="lg" className="mb-4">
              Invasive Species Control
            </Heading>
            <p className="text-charcoal leading-relaxed">
              Strategic control of invasive plant species threatening native forest establishment. Evidence-based approaches protecting young trees and promoting healthy woodland ecosystems across Scottish landscapes.
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
            {/* TODO: Replace with <Image src="/photos/forest-maintenance.jpg" alt="Comprehensive forest maintenance services" width={800} height={450} />
                 Use OptimizedImage component from @/components/ui/Image for automatic optimization */}
            <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
              Photo coming soon
            </div>
            <Heading as="h2" size="lg" className="mb-4">
              Forest Maintenance
            </Heading>
            <p className="text-charcoal leading-relaxed">
              Comprehensive forest maintenance throughout the critical 5-year establishment period. Regular monitoring, weed control, and protection measures ensuring your investment reaches independence and long-term success.
            </p>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
