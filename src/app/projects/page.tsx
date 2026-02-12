import { Metadata } from 'next'
import ProjectGallery from '@/components/sections/ProjectGallery'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'

export const metadata: Metadata = {
  title: 'Our Projects | Acer Forestry - Woodland Establishment Portfolio',
  description:
    'View our portfolio of successful woodland establishment projects across Scotland. Professional tree planting, ground preparation, and forest maintenance work.',
}

// All Acer project photos
const projectImages = [
  { src: '/images/Acer1.jpg', alt: 'Tree planting project - Highland estate', category: 'Planting' },
  { src: '/images/Acer2.jpg', alt: 'Woodland establishment site preparation', category: 'Ground Prep' },
  { src: '/images/Acer3.jpg', alt: 'Forest creation project overview', category: 'Planting' },
  { src: '/images/Acer4.jpg', alt: 'Professional tree planting team at work', category: 'Planting' },
  { src: '/images/Acer5.jpg', alt: 'Site ground preparation for planting', category: 'Ground Prep' },
  { src: '/images/Acer7.jpg', alt: 'Forestry equipment in action', category: 'Equipment' },
  { src: '/images/Acer8.jpg', alt: 'Newly planted woodland area', category: 'Planting' },
  { src: '/images/Acer9.jpg', alt: 'Tree protection installation', category: 'Protection' },
  { src: '/images/Acer10.jpg', alt: 'Large scale woodland creation', category: 'Planting' },
  { src: '/images/Acer11.jpg', alt: 'Forestry work in Scottish Highlands', category: 'Planting' },
  { src: '/images/Acer12.jpg', alt: 'Saplings with protective guards', category: 'Protection' },
  { src: '/images/Acer13.jpg', alt: 'Woodland establishment project', category: 'Planting' },
  { src: '/images/Acer14.jpg', alt: 'Professional forestry services', category: 'Planting' },
  { src: '/images/Acer15.jpg', alt: 'Tree planting in Perthshire', category: 'Planting' },
  { src: '/images/Acer16.jpg', alt: 'Ground preparation machinery', category: 'Ground Prep' },
  { src: '/images/Acer17.jpg', alt: 'Forest establishment work', category: 'Planting' },
  { src: '/images/Acer18.jpg', alt: 'Large woodland planting operation', category: 'Planting' },
  { src: '/images/Acer19.jpg', alt: 'Tree planting team coordination', category: 'Planting' },
  { src: '/images/Acer20.jpg', alt: 'Woodland creation project site', category: 'Planting' },
  { src: '/images/Acer21.jpg', alt: 'Professional forestry work', category: 'Planting' },
  { src: '/images/Acer22.jpg', alt: 'Tree protection measures', category: 'Protection' },
  { src: '/images/Acer23.jpg', alt: 'Forestry project in Morayshire', category: 'Planting' },
  { src: '/images/Acer24.jpg', alt: 'Woodland establishment site', category: 'Planting' },
  { src: '/images/Acer25.jpg', alt: 'Established woodland project', category: 'Maintenance' },
  { src: '/images/Acer26.jpg', alt: 'Tree planting operations', category: 'Planting' },
  { src: '/images/Acer27.jpg', alt: 'Forest creation work', category: 'Planting' },
  { src: '/images/Acer28.jpg', alt: 'Professional tree planting', category: 'Planting' },
  { src: '/images/Acer29.jpg', alt: 'Woodland site preparation', category: 'Ground Prep' },
  { src: '/images/Acer30.jpg', alt: 'Forestry project completion', category: 'Planting' },
  { src: '/images/Acer31.jpg', alt: 'Tree protection installation', category: 'Protection' },
  { src: '/images/Acer32.jpg', alt: 'Highland forestry work', category: 'Planting' },
  { src: '/images/Acer33.jpg', alt: 'Woodland establishment operations', category: 'Planting' },
  { src: '/images/Acer34.jpg', alt: 'Professional planting services', category: 'Planting' },
  { src: '/images/Acer35.jpg', alt: 'Forest creation project', category: 'Planting' },
  { src: '/images/Acer36.jpg', alt: 'Tree planting in progress', category: 'Planting' },
  { src: '/images/Acer37.jpg', alt: 'Woodland site work', category: 'Planting' },
  { src: '/images/Acer38.jpg', alt: 'Forestry operations', category: 'Planting' },
  { src: '/images/Acer39.jpg', alt: 'Professional tree establishment', category: 'Planting' },
  { src: '/images/Acer40.jpg', alt: 'Woodland creation services', category: 'Planting' },
  { src: '/images/Acer41.jpg', alt: 'Forest planting project', category: 'Planting' },
  { src: '/images/Acer42.jpg', alt: 'Highland woodland establishment', category: 'Planting' },
  { src: '/images/Acer43.jpg', alt: 'Tree planting completion', category: 'Planting' },
  { src: '/images/AcerDeer.jpg', alt: 'Deer fencing installation for tree protection', category: 'Fencing' },
  { src: '/images/AcerLorry.jpg', alt: 'Equipment transport and logistics', category: 'Equipment' },
  { src: '/images/AcerQuadBike.jpg', alt: 'Forestry quad bike for site access', category: 'Equipment' },
  { src: '/images/AcerQuadBike2.jpg', alt: 'All-terrain forestry equipment', category: 'Equipment' },
]

export default function ProjectsPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="py-20 md:py-32 bg-gradient-forest text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading as="h1" size="xl" className="mb-6 text-white">
              Our Projects
            </Heading>
            <p className="text-xl text-white/90 leading-relaxed">
              Explore our portfolio of successful woodland establishment projects across the
              Scottish Highlands, Perthshire, and Morayshire. Professional tree planting,
              ground preparation, and forest maintenance delivered with 26 years of expertise.
            </p>
          </div>
        </Container>
      </section>

      {/* Full Gallery */}
      <ProjectGallery
        images={projectImages}
        title="Complete Project Portfolio"
        subtitle="Professional forestry work across Scotland - from planning to established woodland"
      />

      {/* CTA Section */}
      <section className="py-20 bg-forest-700 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Woodland Project?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Get in touch for a free consultation and discover how we can help establish
              your woodland with professional expertise and exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07756513670"
                className="inline-block px-8 py-4 bg-white text-forest-700 rounded-lg font-bold hover:bg-offwhite transition-colors"
              >
                Call 07756 513 670
              </a>
              <a
                href="mailto:dillan.hill@acerforestry.co.uk"
                className="inline-block px-8 py-4 bg-forest-600 text-white rounded-lg font-bold hover:bg-forest-500 transition-colors border-2 border-white"
              >
                Email Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
