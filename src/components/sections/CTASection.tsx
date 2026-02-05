import Link from 'next/link'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'

export interface CTALink {
  text: string
  href: string
}

export interface CTASectionProps {
  title: string
  description: string
  primaryCta: CTALink
  secondaryCta?: CTALink
  className?: string
}

/**
 * Prominent call-to-action section with colored background
 * Supports primary and optional secondary CTA buttons
 */
export default function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        'bg-accent text-offwhite py-16 md:py-24',
        className
      )}
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <Heading as="h2" size="lg" className="mb-6 text-offwhite">
            {title}
          </Heading>
          <p className="text-lg mb-8 text-light leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryCta.href}>
              <Button variant="primary" size="lg">
                {primaryCta.text}
              </Button>
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button variant="outline" size="lg">
                  {secondaryCta.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
