import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: ReactNode
}

/**
 * Button component with multiple variants and sizes
 * Supports all standard button props via spread operator
 * Includes loading states and smooth transitions
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const baseStyles = 'rounded font-semibold transition-all duration-300 ease-out inline-flex items-center justify-center gap-2 relative overflow-hidden active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const variantStyles = {
    primary: 'bg-primary text-offwhite hover:bg-secondary hover:shadow-lg hover:-translate-y-0.5 shadow-md focus-visible:outline-primary',
    secondary: 'bg-secondary text-offwhite hover:bg-accent hover:shadow-lg hover:-translate-y-0.5 shadow-md focus-visible:outline-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-offwhite hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-primary',
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
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className={cn(isLoading && 'opacity-70')}>{children}</span>
    </button>
  )
}
