import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ValueProp from '@/components/sections/ValueProp'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'For Forest Managers | Acer Forestry',
  description:
    'Professional woodland establishment contractor in Scotland. HSE compliant, high survival rates, 26 years experience. Serving Highlands, Perthshire, Morayshire.',
}

export default function ForestManagersPage() {
  return (
    <>
      <Hero
        title="For Forest Managers"
        subtitle="Professional woodland establishment backed by 26 years combined experience, stringent HSE compliance, and ethical standards aligned with the Institute of Chartered Foresters. Your projects deserve the credible, professional choice."
        ctaText="Call 07756 513 670"
        ctaHref="tel:07756513670"
      />

      {/* Key Trust Signals */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-600 text-center mb-16">
            Why Forest Managers Choose Acer Forestry
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* HSE Compliance */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                HSE Compliance
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Stringent health, safety, and environmental measures on every
                project. Safety-first approach aligned with industry standards.
              </p>
            </div>

            {/* High Survival Rates */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                High Tree Survival Rates
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Proper planting technique and 5-year protection protocols.
                Silvicultural precision for long-term forest health.
              </p>
            </div>

            {/* Expertise */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Silvicultural Expertise
              </h3>
              <p className="text-slate-600 leading-relaxed">
                26 years combined experience. Deep understanding of species
                selection, site conditions, and Scottish woodland establishment.
              </p>
            </div>

            {/* Communication */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Communication & Flexibility
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Regular updates throughout project lifecycle. Flexible approach
                adapting to site conditions. Responsive when you need us.
              </p>
            </div>

            {/* Transparent Invoicing */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Transparent Invoicing
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Straightforward invoices matching agreed terms. No surprises, no
                hidden costs. Clear documentation and honest pricing.
              </p>
            </div>

            {/* ICF Standards */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                ICF Ethical Standards
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Professional, ethical approach to woodland establishment.
                Environmental stewardship and sustainable forestry practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder - Ready for content */}
      <section className="py-20 md:py-32 bg-gradient-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Forest Managers Say
          </h2>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
            <p className="text-lg italic mb-4">
              &quot;Testimonials coming soon from satisfied Forest Managers
              across the Highlands, Perthshire, and Morayshire.&quot;
            </p>
            <p className="text-sm text-white/70">
              We&apos;re gathering client testimonials to showcase here
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
