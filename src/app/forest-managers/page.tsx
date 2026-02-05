import Hero from '@/components/sections/Hero'
import ValueProp from '@/components/sections/ValueProp'

export default function ForestManagersPage() {
  return (
    <>
      <Hero
        title="For Forest Managers"
        subtitle="Professional woodland establishment backed by 26 years combined experience, stringent HSE compliance, and ethical standards aligned with the Institute of Chartered Foresters. Your projects deserve the credible, professional choice."
        ctaText="Call 07756 513 670"
        ctaHref="tel:07756513670"
      />

      <ValueProp
        title="HSE Compliance"
        description="We prioritize safety as a non-negotiable aspect of our operations. Stringent HSE measures are consistently observed to guarantee the well-being of our team members and all involved stakeholders. All sites are managed with a safety-first approach aligned with industry standards."
        className="bg-light"
      />

      <ValueProp
        title="High Tree Survival Rates"
        description="High tree survival rates from proper planting technique and 5-year protection protocols. Every tree planted with silvicultural precision to ensure establishment success and long-term forest health."
        className="bg-white"
      />

      <ValueProp
        title="Silvicultural Expertise"
        description="26 years combined forestry experience with deep understanding of tree species selection, site conditions, and Scottish woodland establishment. We understand the science behind successful forests."
        className="bg-light"
      />
    </>
  )
}
