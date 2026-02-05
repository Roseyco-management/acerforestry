import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ValueProp from '@/components/sections/ValueProp'

export const metadata: Metadata = {
  title: 'Work With Us | Acer Forestry',
  description:
    'Quality tree planting opportunities in Scottish forestry. Weekly pay, well-organized sites, competitive rates. Join our team of professional subcontractors.',
}

export default function SubcontractorsPage() {
  return (
    <>
      <Hero
        title="Work With Us"
        subtitle="Quality tree planting opportunities in Scottish forestry. We're looking for skilled, reliable subcontractors who take pride in their work. Join a team that values professionalism, pays weekly, and creates the conditions for productive work."
        ctaText="Call About Opportunities"
        ctaHref="tel:07756513670"
      />

      <ValueProp
        title="Well-Organized Work Sites"
        description="Sites planned and coordinated for efficient workflow. Clear communication on expectations, proper site preparation, and organized logistics. We value your time and create conditions for productive work."
        className="bg-light"
      />
    </>
  )
}
