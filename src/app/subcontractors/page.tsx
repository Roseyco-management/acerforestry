import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ValueProp from '@/components/sections/ValueProp'
import ProjectGallery from '@/components/sections/ProjectGallery'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Work With Us | Acer Forestry',
  description:
    'Quality tree planting opportunities in Scottish forestry. Weekly pay, well-organized sites, competitive rates. Join our team of professional subcontractors.',
}

export default function SubcontractorsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Work With Us - Acer Forestry',
            description:
              'Quality tree planting opportunities in Scottish forestry. Weekly pay, well-organized sites, competitive rates.',
            url: 'https://acerforestry.co.uk/subcontractors',
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
                name: 'Work With Us',
                item: 'https://acerforestry.co.uk/subcontractors',
              },
            ],
          }),
        }}
      />

      <Hero
        title="Quality Tree Planting Opportunities in Scottish Forestry"
        highlightedWord="Quality Tree Planting Opportunities"
        subtitle="Join a professional team that pays weekly, values skilled work, and creates excellent site conditions"
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
              <div className="mb-4">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Well-Organized Work Sites
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Sites planned and coordinated for efficient workflow. Clear
                communication on expectations, proper site preparation, and
                organized logistics. We value your time and create conditions
                for productive work.
              </p>
            </div>

            {/* Weekly Payment */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="mb-4">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Weekly Payment
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Paid weekly, not monthly. We understand the importance of
                regular cash flow for self-employed professionals.
                Straightforward payment schedule you can rely on.
              </p>
            </div>

            {/* Competitive Rates */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="mb-4">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Competitive Rates
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Fair, competitive rates for quality tree planting work.
                Transparent pricing structure discussed upfront. We value
                skilled planters and compensate accordingly.
              </p>
            </div>

            {/* Accommodation */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="mb-4">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Accommodation Available
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Caravan accommodation available for those who need it. We
                understand traveling for work requires proper accommodation
                arrangements. Options discussed based on project location.
              </p>
            </div>

            {/* Good Ground Conditions */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400 md:col-span-2">
              <div className="mb-4">
                <svg className="w-10 h-10 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Good Ground Conditions
              </h3>
              <p className="text-slate-900 leading-relaxed">
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            What We&apos;re Looking For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-bold text-xl mb-3 text-white">
                <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg> Experience</h3>
              <p className="text-white/90">
                Skilled tree planters who understand proper planting technique
                and take pride in quality work.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-bold text-xl mb-3 text-white">
                <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg> Reliability</h3>
              <p className="text-white/90">
                Dependable professionals who show up on time and complete work
                to agreed standards.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-bold text-xl mb-3 text-white">
                <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg> Professionalism</h3>
              <p className="text-white/90">
                Team players who communicate well and represent Acer Forestry
                professionally on site.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <h3 className="font-bold text-xl mb-3 text-white">
                <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg> Quality Focus</h3>
              <p className="text-white/90">
                Commitment to high tree survival rates through proper planting
                technique and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Environment Gallery */}
      <ProjectGallery
        images={[
          { src: '/images/Acer4.jpg', alt: 'Professional planting team at work' },
          { src: '/images/Acer18.jpg', alt: 'Large scale planting operation' },
          { src: '/images/Acer5.jpg', alt: 'Well-prepared site conditions' },
          { src: '/images/AcerQuadBike.jpg', alt: 'Modern forestry equipment' },
          { src: '/images/Acer12.jpg', alt: 'Quality planting with protection' },
          { src: '/images/AcerLorry.jpg', alt: 'Professional logistics and transport' },
          { src: '/images/Acer25.jpg', alt: 'Results - established woodland' },
          { src: '/images/AcerDeer.jpg', alt: 'Deer fencing work' },
        ]}
        title="See the Work Environment"
        subtitle="Quality sites, professional organization, and the results that follow"
        className="bg-white"
      />

      <ContactCTA />
    </>
  )
}
