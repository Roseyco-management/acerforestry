import { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'

export const metadata: Metadata = {
  title: 'Our Services | Acer Forestry',
  description:
    'Professional forestry services in Scotland: tree planting, manual ground preparation, fertilising, herbicide/pesticide application, tree removal, invasive species control, and forest maintenance. 26 years experience.',
}

export default function Services() {
  return (
    <>
      {/* Hero Section */}
      <Section background="primary" className="min-h-[60vh] flex items-center">
        <div className="text-center max-w-4xl mx-auto">
          <Heading as="h1" size="xl" className="mb-6 text-offwhite">
            Our Services
          </Heading>
          <p className="text-lg md:text-xl text-light leading-relaxed">
            26 years combined experience delivering professional woodland establishment and maintenance services across the Highlands, Perthshire, and Morayshire. From initial planting to long-term forest health, we provide comprehensive forestry solutions.
          </p>
        </div>
      </Section>
    </>
  )
}
