import { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
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

      {/* Video Grid - Ready for embeds or placeholders */}
      <Section background="light">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video cards will be added in Task 2 based on user input */}
          </div>
        </Container>
      </Section>
    </>
  )
}
