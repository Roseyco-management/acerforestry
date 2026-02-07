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

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-600 text-center mb-16">
            Why Work With Acer Forestry?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Well-Organized Sites */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Well-Organized Work Sites
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Sites planned and coordinated for efficient workflow. Clear
                communication on expectations, proper site preparation, and
                organized logistics. We value your time and create conditions
                for productive work.
              </p>
            </div>

            {/* Weekly Payment */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Weekly Payment
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Paid weekly, not monthly. We understand the importance of
                regular cash flow for self-employed professionals.
                Straightforward payment schedule you can rely on.
              </p>
            </div>

            {/* Competitive Rates */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Competitive Rates
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Fair, competitive rates for quality tree planting work.
                Transparent pricing structure discussed upfront. We value
                skilled planters and compensate accordingly.
              </p>
            </div>

            {/* Accommodation */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Accommodation Available
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Caravan accommodation available for those who need it. We
                understand traveling for work requires proper accommodation
                arrangements. Options discussed based on project location.
              </p>
            </div>

            {/* Good Ground Conditions */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400 md:col-span-2">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Good Ground Conditions
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We select and prepare sites with care. Quality ground
                preparation means better planting conditions and more productive
                days. Silvicultural approach creates better working conditions
                for planters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-20 md:py-32 bg-gradient-forest text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What We&apos;re Looking For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-bold text-xl mb-3">✓ Experience</h3>
              <p className="text-white/90">
                Skilled tree planters who understand proper planting technique
                and take pride in quality work.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-bold text-xl mb-3">✓ Reliability</h3>
              <p className="text-white/90">
                Dependable professionals who show up on time and complete work
                to agreed standards.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-bold text-xl mb-3">✓ Professionalism</h3>
              <p className="text-white/90">
                Team players who communicate well and represent Acer Forestry
                professionally on site.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-bold text-xl mb-3">✓ Quality Focus</h3>
              <p className="text-white/90">
                Commitment to high tree survival rates through proper planting
                technique and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
