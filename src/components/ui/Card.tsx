import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'elevated'
  children: ReactNode
}

/**
 * Card component with clean white background and subtle shadow
 * Flexible composition via children prop
 * Multiple variants for visual differentiation
 */
export default function Card({
  variant = 'default',
  className,
  children,
  ...rest
}: CardProps) {
  const variantStyles = {
    default: 'bg-offwhite shadow-sm hover:shadow-md',
    gradient: 'bg-gradient-to-br from-offwhite via-white to-slate-50 shadow-md hover:shadow-lg border border-slate-100',
    elevated: 'bg-white shadow-lg hover:shadow-xl border border-slate-100 hover:border-primary/20',
  }

  return (
    <div
      className={cn(
        'rounded-lg p-6 transition-all duration-300 ease-out hover:-translate-y-1',
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
