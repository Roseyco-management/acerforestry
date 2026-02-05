import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Card component with clean white background and subtle shadow
 * Flexible composition via children prop
 */
export default function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'bg-offwhite rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
