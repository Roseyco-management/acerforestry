import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ValueProp from '@/components/sections/ValueProp'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Acer Forestry - Woodland Establishment Specialists | Scotland',
  description:
    'Professional tree planting and forestry contractors in Scotland. 26 years experience serving Highlands, Perthshire, and Morayshire. HSE compliant woodland establishment with high survival rates.',
}

export default function Home() {
  return (
    <>
      <Hero
        title="Acer Forestry"
        subtitle="Professional woodland establishment contractors serving the Scottish Highlands, Perthshire, and Morayshire. 26 years combined experience delivering HSE-compliant forestry services with exceptional tree survival rates."
        ctaText="Call 07756 513 670"
        ctaHref="tel:07756513670"
      />

      <ValueProp
        title="HSE Compliance & Safety First"
        description="Every project managed with stringent health, safety, and environmental protocols. Our team operates to the highest industry standards, ensuring the well-being of all stakeholders and sustainable forestry practices."
        className="bg-light"
      />

      <ValueProp
        title="26 Years Combined Experience"
        description="Deep expertise in woodland establishment, tree planting, ground preparation, and forest maintenance. We understand Scottish forestry - from species selection to site conditions to long-term forest health."
        className="bg-white"
      />

      <ValueProp
        title="High Tree Survival Rates"
        description="Proper planting techniques combined with comprehensive 5-year protection protocols ensure exceptional establishment success. Every tree planted with silvicultural precision for long-term forest vitality."
        className="bg-light"
      />

      <ContactCTA />
    </>
  )
}
