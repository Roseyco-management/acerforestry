import { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'

export const metadata: Metadata = {
  title: 'Training Videos | Acer Forestry',
  description:
    'Educational forestry training videos demonstrating professional tree planting techniques, ground preparation methods, and safety protocols. Learn from 26 years of Scottish forestry experience.',
}

export default function Training() {
  return (
    <>
      {/* Hero Section */}
      <Section background="primary" className="min-h-[60vh] flex items-center">
        <div className="text-center max-w-4xl mx-auto">
          <Heading as="h1" size="xl" className="mb-6 text-offwhite">
            Training Videos
          </Heading>
          <p className="text-lg md:text-xl text-light leading-relaxed">
            Demonstrating professional forestry techniques and safety practices
            developed over 26 years of Scottish woodland work. These videos
            showcase our commitment to quality and expertise in tree planting,
            ground preparation, and forest establishment.
          </p>
        </div>
      </Section>

      {/* Video Grid - Placeholders ready for actual video URLs

          Performance optimization for video embeds:
          When adding YouTube/Vimeo iframes, use:
          - loading="lazy" attribute for native lazy loading
          - strategy="afterInteractive" if using Next.js Script
          - Wrap in aspect-video div to maintain 16:9 ratio

          Example YouTube embed pattern:
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Video title"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded"
            />
          </div>

          This ensures videos don't load until scrolled into viewport,
          maintaining fast page load for rural connections.
      */}
      <Section background="light">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
                Video coming soon
              </div>
              <Heading as="h2" size="lg" className="mb-4">
                Tree Planting Techniques
              </Heading>
              <p className="text-charcoal leading-relaxed">
                Professional demonstration of proper tree planting methods,
                spacing, and depth techniques ensuring optimal establishment
                success across diverse Scottish terrain and species.
              </p>
            </Card>

            <Card>
              <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
                Video coming soon
              </div>
              <Heading as="h2" size="lg" className="mb-4">
                Ground Preparation Methods
              </Heading>
              <p className="text-charcoal leading-relaxed">
                Step-by-step guide to manual ground preparation techniques,
                including site assessment, terrain considerations, and
                preparation methods that optimize planting conditions.
              </p>
            </Card>

            <Card>
              <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
                Video coming soon
              </div>
              <Heading as="h2" size="lg" className="mb-4">
                Safety Protocols
              </Heading>
              <p className="text-charcoal leading-relaxed">
                Essential safety procedures and equipment usage for forestry
                work. Demonstrating HSE compliance, risk assessment, and best
                practices developed through 26 years of professional experience.
              </p>
            </Card>

            <Card>
              <div className="aspect-video bg-neutral-200 rounded mb-4 flex items-center justify-center text-neutral-400 text-sm">
                Video coming soon
              </div>
              <Heading as="h2" size="lg" className="mb-4">
                Quality Standards
              </Heading>
              <p className="text-charcoal leading-relaxed">
                Our approach to maintaining high-quality forestry work,
                including inspection criteria, silvicultural best practices, and
                the attention to detail that ensures long-term forest health.
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
