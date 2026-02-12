'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface StatItem {
  label: string
  value: string | number
  icon?: LucideIcon
  iconColor?: string
  change?: {
    value: number
    isPositive: boolean
  }
}

export interface StatsWidgetProps {
  title?: string
  stats: StatItem[]
  variant?: 'default' | 'compact' | 'detailed'
  className?: string
}

/**
 * Metrics display widget with icons and trend indicators
 * Multiple variants for different layout needs
 * Fully responsive and accessible
 */
export default function StatsWidget({
  title,
  stats,
  variant = 'default',
  className,
}: StatsWidgetProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 p-4 shadow-forest-lg', className)}>
        {title && <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">{title}</h3>}
        <div className="space-y-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {Icon && (
                    <Icon className={cn('w-4 h-4 text-white/80', stat.iconColor)} />
                  )}
                  <span className="text-sm text-white/90">{stat.label}</span>
                </div>
                <span className="text-sm font-bold text-white">{stat.value}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={cn('bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg', className)}>
        {title && (
          <div className="px-6 py-4 border-b-2 border-forest-600">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">{title}</h3>
          </div>
        )}
        <div className="p-6">
          <div className="grid gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {Icon && (
                      <div className="p-2 rounded-lg bg-forest-600 dark:bg-forest-900">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white/80 mb-1 uppercase tracking-wide">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      {stat.change && (
                        <p className={cn(
                          'text-sm font-medium mt-1',
                          stat.change.isPositive ? 'text-green-600' : 'text-red-600'
                        )}>
                          {stat.change.isPositive ? '+' : ''}{stat.change.value}% from last period
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn('bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg', className)}>
      {title && (
        <div className="px-6 py-4 border-b-2 border-forest-600">
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">{title}</h3>
        </div>
      )}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  {Icon && (
                    <Icon className={cn('w-5 h-5 text-white/80', stat.iconColor)} />
                  )}
                  <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">{stat.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  {stat.change && (
                    <span className={cn(
                      'text-sm font-medium',
                      stat.change.isPositive ? 'text-green-600' : 'text-red-600'
                    )}>
                      {stat.change.isPositive ? '↑' : '↓'} {Math.abs(stat.change.value)}%
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Simple stat display component (for inline stats)
export interface InlineStatProps {
  label: string
  value: string | number
  icon?: LucideIcon
  iconColor?: string
  className?: string
}

/**
 * Compact inline stat display for use within other components
 */
export function InlineStat({ label, value, icon: Icon, iconColor, className }: InlineStatProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Icon && <Icon className={cn('w-4 h-4 text-white/80', iconColor)} />}
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm text-white/80">{label}:</span>
        <span className="text-sm font-semibold text-white">{value}</span>
      </div>
    </div>
  )
}
