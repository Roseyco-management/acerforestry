import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Our Services | Acer Forestry',
  description:
    'Professional forestry services in Scotland: tree planting, manual ground preparation, fertilising, herbicide/pesticide application, tree removal, invasive species control, and forest maintenance. 26 years experience.',
}

export default function Services() {
  return (
    <>
      <Hero
        title="Our Services"
        subtitle="26 years combined experience delivering professional woodland establishment and maintenance services across the Highlands, Perthshire, and Morayshire. From initial planting to long-term forest health, we provide comprehensive forestry solutions."
        ctaText="Call 07756 513 670"
        ctaHref="tel:07756513670"
      />

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-600 text-center mb-16">
            Complete Forestry Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tree Planting */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">
                  🌱 Tree Planting Photo
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Tree Planting
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Expert planting techniques using quality stock. Proper spacing,
                depth, and soil contact for maximum survival rates. Species
                selection tailored to site conditions.
              </p>
            </div>

            {/* Ground Preparation */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">
                  🔧 Ground Prep Photo
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Manual Ground Preparation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Professional site conditioning and preparation ensuring optimal
                conditions for tree establishment. Mounding, scarification, and
                turf removal.
              </p>
            </div>

            {/* Fertilising */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">
                  💧 Fertilising Photo
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Fertilising
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Nutrient management programs to support optimal tree growth and
                forest health. Targeted application based on soil analysis and
                species requirements.
              </p>
            </div>

            {/* Herbicide/Pesticide */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">
                  🛡️ Protection Photo
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Herbicide & Pesticide Application
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Professional weed control and pest management. Safe,
                environmentally responsible application to protect young trees
                and ensure establishment success.
              </p>
            </div>

            {/* Tree Removal */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">🪓 Removal Photo</span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Tree Removal
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Safe, professional tree removal services. Selective thinning,
                hazardous tree removal, and site clearance with HSE-compliant
                procedures.
              </p>
            </div>

            {/* Invasive Species */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">
                  🌿 Control Photo
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Invasive Species Control
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Effective management of invasive plant species including
                rhododendron, Japanese knotweed, and other problem vegetation.
                Sustainable control methods.
              </p>
            </div>

            {/* Maintenance */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">
                  🔧 Maintenance Photo
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Forest Maintenance
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Ongoing monitoring, protection, and maintenance programs.
                5-year establishment care, beat-up replacements, and long-term
                forest health management.
              </p>
            </div>

            {/* Site Assessment */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">
                  🔍 Assessment Photo
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Site Analysis & Planning
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive site assessment, soil analysis, and forestry
                planning. Species selection and establishment strategy tailored
                to your specific goals.
              </p>
            </div>

            {/* Custom Projects */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-slate-400 text-sm">
                  ⚙️ Custom Photo
                </span>
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Custom Forestry Projects
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Flexible approach to unique forestry challenges. We adapt our
                services to meet your specific project requirements and site
                conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-600 mb-6">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Whether you need comprehensive woodland establishment or specific
            forestry services, we&apos;re here to help. Get in touch to discuss
            your requirements.
          </p>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
