import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import TeamSection from '@/components/sections/TeamSection'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ContactForm from '@/components/forms/ContactForm'

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
            '@type': 'LocalBusiness',
            name: 'Acer Forestry',
            description:
              'Professional tree planting and forestry contractors in Scotland. 26 years experience serving Highlands, Perthshire, and Morayshire.',
            url: 'https://acerforestry.co.uk',
            telephone: '+447756513670',
            email: 'dillan.hill@acerforestry.co.uk',
            areaServed: ['Highlands', 'Perthshire', 'Morayshire', 'Scotland'],
          }),
        }}
      />

      {/* ── 1. Home ─────────────────────────────────────────── */}
      <div id="home">
        <Hero
          title="Professional Woodland Establishment for the Scottish Highlands"
          highlightedWord="Professional Woodland Establishment"
          subtitle="Expert tree planting, ground preparation, and forest maintenance with exceptional survival rates"
          ctaText="Call 07756 513 670"
          ctaHref="tel:07756513670"
        />
      </div>

      {/* ── 2. Proper Planting ──────────────────────────────── */}
      <section id="proper-planting" className="scroll-mt-24 py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">
            Proper Planting, Exceptional Results
          </h2>
          <p className="text-lg text-slate-900 leading-relaxed mb-8">
            Every tree is planted with silvicultural precision. Our comprehensive 5-year
            protection protocols ensure exceptional establishment success and long-term
            forest vitality.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-12">
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-accent-400">
              <h3 className="font-bold text-charcoal mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Site Analysis & Species Selection
              </h3>
              <p className="text-slate-900">
                Comprehensive assessment and optimal species selection for your site conditions
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-accent-400">
              <h3 className="font-bold text-charcoal mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Professional Planting Techniques
              </h3>
              <p className="text-slate-900">
                Expert ground preparation and planting for maximum survival rates
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-accent-400">
              <h3 className="font-bold text-charcoal mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                5-Year Protection Protocols
              </h3>
              <p className="text-slate-900">
                Comprehensive protection, weed control, and maintenance programs
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg border-l-4 border-accent-400">
              <h3 className="font-bold text-charcoal mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Regular Monitoring & Reporting
              </h3>
              <p className="text-slate-900">
                Ongoing monitoring and transparent reporting on forest progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Why Forest Managers Choose Us ───────────────── */}
      <section id="why-forest-managers" className="scroll-mt-24 py-20 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-forest-600 mb-4">
              Why Forest Managers Choose Acer Forestry
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Trusted by land owners and forest managers across the Highlands, Perthshire, and Morayshire.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="mb-4">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">HSE Compliance</h3>
              <p className="text-slate-900 leading-relaxed">
                Stringent health, safety, and environmental measures on every project.
                Safety-first approach aligned with industry standards.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="mb-4">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">High Tree Survival Rates</h3>
              <p className="text-slate-900 leading-relaxed">
                Proper planting technique and 5-year protection protocols.
                Silvicultural precision for long-term forest health.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">Silvicultural Expertise</h3>
              <p className="text-slate-900 leading-relaxed">
                26 years combined experience. Deep understanding of species selection,
                site conditions, and Scottish woodland establishment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">Communication & Flexibility</h3>
              <p className="text-slate-900 leading-relaxed">
                Regular updates throughout project lifecycle. Flexible approach adapting
                to site conditions. Responsive when you need us.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="mb-4">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">Transparent Invoicing</h3>
              <p className="text-slate-900 leading-relaxed">
                Straightforward invoices matching agreed terms. No surprises, no hidden costs.
                Clear documentation and honest pricing.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">ICF Ethical Standards</h3>
              <p className="text-slate-900 leading-relaxed">
                Professional, ethical approach to woodland establishment.
                Environmental stewardship and sustainable forestry practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Services ─────────────────────────────────────── */}
      <section id="services" className="scroll-mt-24 py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Our Services
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Full-service woodland establishment from initial planning through long-term maintenance.
            </p>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* ── 5. Meet the Directors ────────────────────────────── */}
      <div id="meet-the-directors" className="scroll-mt-24">
        <TeamSection />
      </div>

      {/* ── 6. Contact ──────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-24 py-20 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Ready to establish your forest? Talk to Dillan or Rob about your woodland needs.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-charcoal mb-2">Call Us</h3>
                <a
                  href="tel:07756513670"
                  className="text-2xl font-bold text-forest-600 hover:text-accent-500 transition-colors"
                >
                  07756 513 670
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal mb-2">Email</h3>
                <a
                  href="mailto:dillan.hill@acerforestry.co.uk"
                  className="text-forest-600 hover:text-accent-500 transition-colors"
                >
                  dillan.hill@acerforestry.co.uk
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal mb-2">Area Covered</h3>
                <p className="text-slate-700">
                  Highlands, Perthshire, Morayshire, and throughout Scotland
                </p>
              </div>
            </div>
            {/* Contact form */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
