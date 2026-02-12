import Image from 'next/image'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Heading from '@/components/ui/Heading'
import FadeIn from '@/components/animations/FadeIn'

/**
 * Team section showcasing company directors
 */
export default function TeamSection() {
  const team = [
    {
      name: 'Rob',
      role: 'Director',
      image: '/images/Rob, Director at AcerForestry.jpg',
    },
    {
      name: 'Dillan',
      role: 'Director',
      image: '/images/Dillan, Director at AcerForestry.jpg',
    },
  ]

  return (
    <Section className="bg-white">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <Heading as="h2" size="lg" className="mb-4">
              Meet Our Directors
            </Heading>
            <p className="text-lg text-darkgray max-w-2xl mx-auto">
              With over 26 years of combined experience, our team brings unparalleled expertise in woodland establishment and forestry management across Scotland.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <FadeIn key={member.name} delay={0.2 * (index + 1)}>
              <div className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Acer Forestry`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  {member.name}
                </h3>
                <p className="text-darkgray font-medium">{member.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
