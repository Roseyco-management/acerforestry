import { Metadata } from 'next'
import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Training Videos | Acer Forestry',
  description:
    'Educational forestry training videos demonstrating professional tree planting techniques, ground preparation methods, and safety protocols. Learn from 26 years of Scottish forestry experience.',
}

export default function Training() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Training Videos - Acer Forestry',
            description:
              'Educational forestry training videos demonstrating professional tree planting techniques, ground preparation methods, and safety protocols.',
            url: 'https://acerforestry.co.uk/training',
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
                name: 'Training Videos',
                item: 'https://acerforestry.co.uk/training',
              },
            ],
          }),
        }}
      />

      <Hero
        title="Professional Forestry Training and Techniques"
        highlightedWord="Professional Forestry Training"
        subtitle="Showcasing expert methods and safety practices from 26 years of Scottish woodland experience"
        ctaText="Call 07756 513 670"
        ctaHref="tel:07756513670"
      />

      {/* Video Placeholders - Ready for actual content */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-600 text-center mb-16">
            Professional Forestry Training
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tree Planting Techniques */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-forest-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg mb-4 relative overflow-hidden">
                <Image
                  src="/images/Acer4.jpg"
                  alt="Professional tree planting team at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-2">
                Tree Planting Techniques
              </h3>
              <p className="text-slate-900">
                Proper planting methods for maximum survival rates. Spacing,
                depth, and soil contact demonstrated.
              </p>
            </div>

            {/* Ground Preparation */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-forest-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg mb-4 relative overflow-hidden">
                <Image
                  src="/images/Acer5.jpg"
                  alt="Site ground preparation for planting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-2">
                Ground Preparation
              </h3>
              <p className="text-slate-900">
                Site conditioning methods including mounding, scarification, and
                turf removal for optimal tree establishment.
              </p>
            </div>

            {/* Safety Protocols */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-forest-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg mb-4 relative overflow-hidden">
                <Image
                  src="/images/AcerQuadBike.jpg"
                  alt="Forestry quad bike for safe site access"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-2">
                Safety Protocols
              </h3>
              <p className="text-slate-900">
                HSE-compliant safety practices and procedures for forestry work.
                Equipment usage and hazard awareness.
              </p>
            </div>

            {/* Quality Standards */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-forest-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg mb-4 relative overflow-hidden">
                <Image
                  src="/images/Acer12.jpg"
                  alt="Saplings with protective guards demonstrating quality care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-2">
                Quality Standards
              </h3>
              <p className="text-slate-900">
                Silvicultural precision and quality control measures ensuring
                exceptional tree survival and forest health.
              </p>
            </div>
          </div>

          {/* Note about videos */}
          <div className="mt-12 text-center">
            <p className="text-slate-900 italic">
              Training videos are being prepared. Once available, they will be
              embedded here with detailed demonstrations of our professional
              forestry techniques.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
