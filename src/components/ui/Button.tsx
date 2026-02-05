import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

/**
 * Button component with multiple variants and sizes
 * Supports all standard button props via spread operator
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const baseStyles = 'rounded font-semibold transition-colors duration-200'

  const variantStyles = {
    primary: 'bg-primary text-offwhite hover:bg-secondary',
    secondary: 'bg-secondary text-offwhite hover:bg-accent',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-offwhite',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
