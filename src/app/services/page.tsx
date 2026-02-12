import { Metadata } from 'next'
import Image from 'next/image'
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
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Our Services - Acer Forestry',
            description:
              'Professional forestry services in Scotland: tree planting, manual ground preparation, fertilising, herbicide/pesticide application, tree removal, invasive species control, and forest maintenance.',
            url: 'https://acerforestry.co.uk/services',
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
                name: 'Our Services',
                item: 'https://acerforestry.co.uk/services',
              },
            ],
          }),
        }}
      />

      <Hero
        title="Complete Forestry Solutions from Planning to Established Woodland"
        highlightedWord="Complete Forestry Solutions"
        subtitle="Professional tree planting, ground preparation, and maintenance with 26 years of expertise"
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
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer4.jpg"
                  alt="Professional tree planting team at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Tree Planting
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Expert planting techniques using quality stock. Proper spacing,
                depth, and soil contact for maximum survival rates. Species
                selection tailored to site conditions.
              </p>
            </div>

            {/* Ground Preparation */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer5.jpg"
                  alt="Site ground preparation for planting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Manual Ground Preparation
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Professional site conditioning and preparation ensuring optimal
                conditions for tree establishment. Mounding, scarification, and
                turf removal.
              </p>
            </div>

            {/* Fertilising */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer12.jpg"
                  alt="Saplings with protective guards showing ongoing care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Fertilising
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Nutrient management programs to support optimal tree growth and
                forest health. Targeted application based on soil analysis and
                species requirements.
              </p>
            </div>

            {/* Herbicide/Pesticide */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer9.jpg"
                  alt="Tree protection installation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Herbicide & Pesticide Application
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Professional weed control and pest management. Safe,
                environmentally responsible application to protect young trees
                and ensure establishment success.
              </p>
            </div>

            {/* Tree Removal */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer7.jpg"
                  alt="Forestry equipment in action"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Tree Removal
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Safe, professional tree removal services. Selective thinning,
                hazardous tree removal, and site clearance with HSE-compliant
                procedures.
              </p>
            </div>

            {/* Invasive Species */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer2.jpg"
                  alt="Woodland establishment site preparation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Invasive Species Control
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Effective management of invasive plant species including
                rhododendron, Japanese knotweed, and other problem vegetation.
                Sustainable control methods.
              </p>
            </div>

            {/* Maintenance */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer25.jpg"
                  alt="Established woodland project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Forest Maintenance
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Ongoing monitoring, protection, and maintenance programs.
                5-year establishment care, beat-up replacements, and long-term
                forest health management.
              </p>
            </div>

            {/* Site Assessment */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer1.jpg"
                  alt="Tree planting project - Highland estate"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Site Analysis & Planning
              </h3>
              <p className="text-slate-900 leading-relaxed">
                Comprehensive site assessment, soil analysis, and forestry
                planning. Species selection and establishment strategy tailored
                to your specific goals.
              </p>
            </div>

            {/* Custom Projects */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-forest-md transition-shadow border-l-4 border-accent-400">
              <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative overflow-hidden">
                <Image
                  src="/images/Acer18.jpg"
                  alt="Large scale woodland planting operation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-bold text-forest-600 mb-3">
                Custom Forestry Projects
              </h3>
              <p className="text-slate-900 leading-relaxed">
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
          <p className="text-lg text-slate-900 mb-8">
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
