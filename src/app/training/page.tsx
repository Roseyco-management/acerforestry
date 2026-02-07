import { Metadata } from 'next'
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
        title="Training Videos"
        subtitle="Demonstrating professional forestry techniques and safety practices developed over 26 years of Scottish woodland work. These videos showcase our commitment to quality and expertise in tree planting, ground preparation, and forest establishment."
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
              <div className="aspect-video bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">▶️</div>
                  <p className="text-sm">Tree Planting Video</p>
                  <p className="text-xs text-white/70 mt-1">
                    Coming Soon
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-2">
                Tree Planting Techniques
              </h3>
              <p className="text-slate-600">
                Proper planting methods for maximum survival rates. Spacing,
                depth, and soil contact demonstrated.
              </p>
            </div>

            {/* Ground Preparation */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-forest-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">▶️</div>
                  <p className="text-sm">Ground Prep Video</p>
                  <p className="text-xs text-white/70 mt-1">
                    Coming Soon
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-2">
                Ground Preparation
              </h3>
              <p className="text-slate-600">
                Site conditioning methods including mounding, scarification, and
                turf removal for optimal tree establishment.
              </p>
            </div>

            {/* Safety Protocols */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-forest-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">▶️</div>
                  <p className="text-sm">Safety Video</p>
                  <p className="text-xs text-white/70 mt-1">
                    Coming Soon
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-2">
                Safety Protocols
              </h3>
              <p className="text-slate-600">
                HSE-compliant safety practices and procedures for forestry work.
                Equipment usage and hazard awareness.
              </p>
            </div>

            {/* Quality Standards */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-forest-md transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-forest-600 to-forest-700 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">▶️</div>
                  <p className="text-sm">Quality Standards Video</p>
                  <p className="text-xs text-white/70 mt-1">
                    Coming Soon
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-2">
                Quality Standards
              </h3>
              <p className="text-slate-600">
                Silvicultural precision and quality control measures ensuring
                exceptional tree survival and forest health.
              </p>
            </div>
          </div>

          {/* Note about videos */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 italic">
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
