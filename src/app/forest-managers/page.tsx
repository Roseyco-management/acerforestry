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
    </>
  )
}
