import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Container from './Container'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: 'offwhite' | 'light' | 'primary'
  children: ReactNode
  containerSize?: 'sm' | 'md' | 'lg' | 'full'
}

/**
 * Full-width section wrapper with background variants
 * Contains Container component by default for consistent spacing
 */
export default function Section({
  background = 'offwhite',
  className,
  children,
  containerSize = 'lg',
  ...rest
}: SectionProps) {
  const backgroundStyles = {
    offwhite: 'bg-offwhite',
    light: 'bg-light',
    primary: 'bg-primary text-offwhite',
  }

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        backgroundStyles[background],
        className
      )}
      {...rest}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
