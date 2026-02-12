'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface DashboardCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  iconColor?: string
  iconBgColor?: string
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  className?: string
  onClick?: () => void
}

/**
 * Dashboard stat card component for displaying metrics
 * Supports icons, trends, and custom styling
 * Responsive and accessible design
 */
export default function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = 'text-white',
  iconBgColor = 'bg-forest-600 dark:bg-forest-900',
  trend,
  className,
  onClick,
}: DashboardCardProps) {
  const isClickable = !!onClick

  return (
    <div
      className={cn(
        'bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 dark:border-forest-700 p-6 shadow-forest-lg transition-all duration-300',
        'hover:shadow-forest-xl hover:bg-forest-600 dark:hover:bg-forest-700',
        isClickable && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-white/80 mb-1 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          {description && <p className="text-sm text-white/70">{description}</p>}
          {trend && (
            <div className="flex items-center mt-2 gap-1">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-accent-300' : 'text-red-300'
                )}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
              {trend.label && (
                <span className="text-sm text-white/70">{trend.label}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-lg bg-forest-600 dark:bg-forest-900', iconBgColor)}>
            <Icon className={cn('w-6 h-6 text-white', iconColor)} />
          </div>
        )}
      </div>
    </div>
  )
}

// Grid container for dashboard cards
export interface DashboardCardGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

/**
 * Responsive grid container for dashboard cards
 */
export function DashboardCardGrid({
  children,
  columns = 4,
  className,
}: DashboardCardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {children}
    </div>
  )
}
