import { Metadata } from 'next'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Section from '@/components/ui/Section'
import Hero from '@/components/sections/Hero'
import ValueProps from '@/components/sections/ValueProps'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Design System | Acer Forestry',
  description: 'Component library and design system documentation for Acer Forestry website.',
}

export default function DesignSystemPage() {
  const sampleValues = [
    {
      title: 'HSE Compliance',
      description: 'Full COSHH and risk assessments, ensuring safe operations on every site.',
      icon: '🛡️',
    },
    {
      title: 'Tree Survival',
      description: '95%+ survival rates through expert planting techniques and aftercare.',
      icon: '🌲',
    },
    {
      title: 'Expertise',
      description: 'Silvicultural knowledge ensures optimal tree health and forest development.',
      icon: '🎓',
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <Hero
        title="Component Library Showcase"
        subtitle="Testing all design system components for Acer Forestry. This page demonstrates buttons, cards, sections, and conversion patterns."
        ctaText="Get Started"
        ctaHref="#components"
      />

      {/* Buttons Section */}
      <Section background="offwhite">
        <Heading as="h2" size="lg" className="mb-8">
          Buttons
        </Heading>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-charcoal">Primary Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">Small Primary</Button>
              <Button variant="primary" size="md">Medium Primary</Button>
              <Button variant="primary" size="lg">Large Primary</Button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-charcoal">Secondary Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="sm">Small Secondary</Button>
              <Button variant="secondary" size="md">Medium Secondary</Button>
              <Button variant="secondary" size="lg">Large Secondary</Button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-charcoal">Outline Variant</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">Small Outline</Button>
              <Button variant="outline" size="md">Medium Outline</Button>
              <Button variant="outline" size="lg">Large Outline</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Headings Section */}
      <Section background="light">
        <Heading as="h2" size="lg" className="mb-8">
          Typography
        </Heading>
        <div className="space-y-4">
          <Heading as="h1" size="xl">Extra Large Heading (h1)</Heading>
          <Heading as="h2" size="lg">Large Heading (h2)</Heading>
          <Heading as="h3" size="md">Medium Heading (h3)</Heading>
          <Heading as="h4" size="sm">Small Heading (h4)</Heading>
          <p className="text-lg text-charcoal leading-relaxed">
            Body text: Inter font with relaxed line height for comfortable reading.
            This is a longer paragraph to demonstrate the typography system in action.
          </p>
          <p className="text-base text-slate leading-relaxed">
            Secondary text color using slate from the design system palette.
          </p>
        </div>
      </Section>

      {/* Cards Section */}
      <Section background="offwhite">
        <Heading as="h2" size="lg" className="mb-8">
          Cards
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Heading as="h3" size="sm" className="mb-3">Card Title One</Heading>
            <p className="text-slate">Clean white background with subtle shadow. Hover to see shadow transition.</p>
          </Card>
          <Card>
            <Heading as="h3" size="sm" className="mb-3">Card Title Two</Heading>
            <p className="text-slate">Cards are flexible containers that compose well with other components.</p>
          </Card>
          <Card>
            <Heading as="h3" size="sm" className="mb-3">Card Title Three</Heading>
            <p className="text-slate">Rounded corners and consistent padding across all cards.</p>
          </Card>
        </div>
      </Section>

      {/* Container Sizes Section */}
      <Section background="light">
        <Heading as="h2" size="lg" className="mb-8">
          Container Sizes
        </Heading>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-charcoal">Small Container</h3>
            <Container size="sm" className="bg-offwhite p-6 rounded">
              <p className="text-slate">max-w-4xl - Ideal for focused content</p>
            </Container>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-charcoal">Medium Container</h3>
            <Container size="md" className="bg-offwhite p-6 rounded">
              <p className="text-slate">max-w-5xl - Balanced width for most content</p>
            </Container>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-charcoal">Large Container (Default)</h3>
            <Container size="lg" className="bg-offwhite p-6 rounded">
              <p className="text-slate">max-w-7xl - Wide layout for rich content</p>
            </Container>
          </div>
        </div>
      </Section>

      {/* Value Props Section */}
      <Section background="offwhite">
        <Heading as="h2" size="lg" className="mb-8">
          Value Propositions Grid
        </Heading>
        <ValueProps values={sampleValues} columns={3} />
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Forest?"
        description="Contact Acer Forestry today for professional tree planting, forest maintenance, and silvicultural services across Scotland."
        primaryCta={{ text: 'Contact Us', href: '#contact' }}
        secondaryCta={{ text: 'View Services', href: '/services' }}
      />

      {/* Section Backgrounds */}
      <Section background="primary">
        <Heading as="h2" size="lg" className="mb-4 text-offwhite">
          Primary Background Section
        </Heading>
        <p className="text-light leading-relaxed">
          Dark green background with light text for high-impact sections.
        </p>
      </Section>
    </main>
  )
}
