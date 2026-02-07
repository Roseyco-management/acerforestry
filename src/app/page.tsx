import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import TrustBadges from '@/components/sections/TrustBadges'
import ValueProp from '@/components/sections/ValueProp'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Acer Forestry - Woodland Establishment Specialists | Scotland',
  description:
    'Professional tree planting and forestry contractors in Scotland. 26 years experience serving Highlands, Perthshire, and Morayshire. HSE compliant woodland establishment with high survival rates.',
}

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Acer Forestry - Woodland Establishment Specialists',
            description:
              'Professional tree planting and forestry contractors in Scotland. 26 years experience serving Highlands, Perthshire, and Morayshire. HSE compliant woodland establishment with high survival rates.',
            url: 'https://acerforestry.co.uk',
          }),
        }}
      />

      <Hero
        title="Professional Woodland Establishment for the Scottish Highlands"
        subtitle="Expert tree planting, ground preparation, and forest maintenance. HSE-compliant forestry services with exceptional survival rates backed by 26 years of combined experience."
        ctaText="Call 07756 513 670"
        ctaHref="tel:07756513670"
      />

      <TrustBadges />

      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-600 mb-6">
            Proper Planting, Exceptional Results
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Every tree is planted with silvicultural precision. Our
            comprehensive 5-year protection protocols ensure exceptional
            establishment success and long-term forest vitality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-12">
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-accent-400">
              <h3 className="font-bold text-forest-600 mb-2">
                ✓ Site Analysis & Species Selection
              </h3>
              <p className="text-slate-600">
                Comprehensive assessment and optimal species selection for your
                site conditions
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-accent-400">
              <h3 className="font-bold text-forest-600 mb-2">
                ✓ Professional Planting Techniques
              </h3>
              <p className="text-slate-600">
                Expert ground preparation and planting for maximum survival
                rates
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-accent-400">
              <h3 className="font-bold text-forest-600 mb-2">
                ✓ 5-Year Protection Protocols
              </h3>
              <p className="text-slate-600">
                Comprehensive protection, weed control, and maintenance programs
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-accent-400">
              <h3 className="font-bold text-forest-600 mb-2">
                ✓ Regular Monitoring & Reporting
              </h3>
              <p className="text-slate-600">
                Ongoing monitoring and transparent reporting on forest progress
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Full-Service Woodland Establishment
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-12">
            From initial planning through established forest, we handle every
            aspect of woodland creation with professional expertise and
            attention to detail.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-bold text-xl mb-2">Planning & Assessment</h3>
              <p className="text-white/80">
                Site analysis, species selection, and forestry planning
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-bold text-xl mb-2">
                Planting & Establishment
              </h3>
              <p className="text-white/80">
                Ground preparation, tree planting, and initial care
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-bold text-xl mb-2">
                Protection & Maintenance
              </h3>
              <p className="text-white/80">
                Long-term protection, monitoring, and forest health
              </p>
            </div>
          </div>
        </div>
      </section>

      <ValueProp
        title="HSE Compliance & Safety Excellence"
        description="Health, safety, and environmental standards aren't optional—they're foundational. Every project is managed with stringent protocols ensuring the well-being of all stakeholders and sustainable forestry practices."
        className="bg-slate-50"
      />

      <ProcessTimeline />

      <ContactCTA />
    </>
  )
}
