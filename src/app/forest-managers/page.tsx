import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ValueProp from '@/components/sections/ValueProp'
import ProjectGallery from '@/components/sections/ProjectGallery'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'For Forest Managers | Acer Forestry',
  description:
    'Professional woodland establishment contractor in Scotland. HSE compliant, high survival rates, 26 years experience. Serving Highlands, Perthshire, Morayshire.',
}

export default function ForestManagersPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'For Forest Managers - Acer Forestry',
            description:
              'Professional woodland establishment contractor in Scotland. HSE compliant, high survival rates, 26 years experience.',
            url: 'https://acerforestry.co.uk/forest-managers',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://acerforestry.co.uk',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'For Forest Managers',
                item: 'https://acerforestry.co.uk/forest-managers',
              },
            ],
          }),
        }}
      />

      <Hero
        title="HSE-Compliant Woodland Establishment You Can Trust"
        highlightedWord="HSE-Compliant Woodland Establishment"
        subtitle="26 years of expertise, exceptional survival rates, and ethical standards aligned with the Institute of Chartered Foresters"
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
              <p className="text-slate-900 leading-relaxed">
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
              <p className="text-slate-900 leading-relaxed">
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
              <p className="text-slate-900 leading-relaxed">
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
              <p className="text-slate-900 leading-relaxed">
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
              <p className="text-slate-900 leading-relaxed">
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
              <p className="text-slate-900 leading-relaxed">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
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

      {/* Project Portfolio Preview */}
      <ProjectGallery
        images={[
          { src: '/images/Acer1.jpg', alt: 'Highland estate woodland establishment' },
          { src: '/images/Acer18.jpg', alt: 'Large scale professional planting' },
          { src: '/images/Acer5.jpg', alt: 'Professional site preparation' },
          { src: '/images/Acer12.jpg', alt: 'Quality protection protocols' },
          { src: '/images/AcerDeer.jpg', alt: 'Deer fencing installation' },
          { src: '/images/Acer25.jpg', alt: 'Established woodland success' },
          { src: '/images/AcerQuadBike.jpg', alt: 'Modern equipment and access' },
          { src: '/images/Acer9.jpg', alt: 'Tree protection measures' },
        ]}
        title="Professional Results Across Scotland"
        subtitle="HSE-compliant woodland establishment with exceptional survival rates"
        className="bg-white"
      />

      <ContactCTA />
    </>
  )
}
