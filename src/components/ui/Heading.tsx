import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xl' | 'lg' | 'md' | 'sm'
  children: ReactNode
  className?: string
}

/**
 * Semantic heading component that decouples visual style from HTML level
 * Example: <Heading as="h1" size="xl"> for large visual style with h1 semantics
 */
export default function Heading({
  as: Component = 'h2',
  size = 'lg',
  className,
  children,
}: HeadingProps) {
  const baseStyles = 'font-bold text-charcoal leading-tight'

  const sizeStyles = {
    xl: 'text-3xl md:text-5xl',
    lg: 'text-2xl md:text-4xl',
    md: 'text-xl md:text-3xl',
    sm: 'text-lg md:text-2xl',
  }

  return (
    <Component className={cn(baseStyles, sizeStyles[size], className)}>
      {children}
    </Component>
  )
}
