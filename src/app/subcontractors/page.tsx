import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ValueProp from '@/components/sections/ValueProp'
import ContactCTA from '@/components/sections/ContactCTA'

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

      <ValueProp
        title="Weekly Payment"
        description="Paid weekly, not monthly. We understand the importance of regular cash flow for self-employed professionals. Straightforward payment schedule you can rely on."
        className="bg-white"
      />

      <ValueProp
        title="Competitive Rates"
        description="Fair, competitive rates for quality tree planting work. Transparent pricing structure discussed upfront. We value skilled planters and compensate accordingly."
        className="bg-light"
      />

      <ValueProp
        title="Accommodation Available"
        description="Caravan accommodation available for those who need it. We understand traveling for work requires proper accommodation arrangements. Options discussed based on project location and duration."
        className="bg-white"
      />

      <ValueProp
        title="Good Ground Conditions"
        description="We select and prepare sites with care. Quality ground preparation means better planting conditions and more productive days. Silvicultural approach creates better working conditions for planters."
        className="bg-light"
      />

      <ContactCTA />
    </>
  )
}
