import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full'
  children: ReactNode
}

/**
 * Responsive container component with size variants
 * Centers content and adds responsive padding
 */
export default function Container({
  size = 'lg',
  className,
  children,
  ...rest
}: ContainerProps) {
  const sizeStyles = {
    sm: 'max-w-4xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    full: 'max-w-none',
  }

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
