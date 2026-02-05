import { Metadata } from 'next'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Heading from '@/components/ui/Heading'

export const metadata: Metadata = {
  title: 'Our Services | Acer Forestry',
  description:
    'Professional forestry services in Scotland: tree planting, manual ground preparation, fertilising, herbicide/pesticide application, tree removal, invasive species control, and forest maintenance. 26 years experience.',
}

export default function Services() {
  return (
    <>
      {/* Hero Section */}
      <Section background="primary" className="min-h-[60vh] flex items-center">
        <div className="text-center max-w-4xl mx-auto">
          <Heading as="h1" size="xl" className="mb-6 text-offwhite">
            Our Services
          </Heading>
          <p className="text-lg md:text-xl text-light leading-relaxed">
            26 years combined experience delivering professional woodland establishment and maintenance services across the Highlands, Perthshire, and Morayshire. From initial planting to long-term forest health, we provide comprehensive forestry solutions.
          </p>
        </div>
      </Section>

      {/* Service Cards */}
      <Section background="light">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <Heading as="h2" size="lg" className="mb-4">
                Tree Planting
              </Heading>
              <p className="text-charcoal leading-relaxed">
                Professional tree planting using silvicultural best practices. Every tree planted with precision to ensure establishment success and long-term forest health. 26 years experience across diverse Scottish terrain and species.
              </p>
            </Card>

            <Card>
              <Heading as="h2" size="lg" className="mb-4">
                Manual Ground Preparation
              </Heading>
              <p className="text-charcoal leading-relaxed">
                Expert manual ground preparation optimizing site conditions for planting. Careful terrain assessment and preparation techniques that respect site ecology while ensuring optimal tree establishment.
              </p>
            </Card>

            <Card>
              <Heading as="h2" size="lg" className="mb-4">
                Fertilising
              </Heading>
              <p className="text-charcoal leading-relaxed">
                Targeted fertilising programs supporting young tree growth and forest health. Application methods adapted to site conditions and species requirements, promoting strong early growth and long-term vitality.
              </p>
            </Card>

            <Card>
              <Heading as="h2" size="lg" className="mb-4">
                Herbicide/Pesticide Application
              </Heading>
              <p className="text-charcoal leading-relaxed">
                Professional herbicide and pesticide application protecting young forests from competition and pests. All applications follow stringent HSE protocols with certified operators ensuring environmental compliance and forest protection.
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
