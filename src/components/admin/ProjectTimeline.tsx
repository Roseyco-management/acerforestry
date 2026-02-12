'use client'

import React from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Project {
  id: string
  project_name: string
  start_date: string | null
  completion_date: string | null
  status: string
}

interface ProjectTimelineProps {
  projects: Project[]
}

// Status color mapping
const getStatusColor = (status: string) => {
  const statusMap: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    planning: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    in_progress: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
    },
    planting: {
      bg: 'bg-forest-50',
      text: 'text-forest-700',
      border: 'border-forest-200',
    },
    maintenance: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
    },
    completed: {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
    },
    on_hold: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
    },
  }

  return (
    statusMap[status] || {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
    }
  )
}

// Format date range
const formatDateRange = (
  startDate: string | null,
  endDate: string | null
): string => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
  }

  if (!startDate) return 'Not scheduled'

  const start = formatDate(startDate)
  if (!endDate) return `${start} - Ongoing`

  const end = formatDate(endDate)
  return `${start} - ${end}`
}

// Calculate project duration in days
const calculateDuration = (
  startDate: string | null,
  endDate: string | null
): number | null => {
  if (!startDate) return null

  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export default function ProjectTimeline({ projects }: ProjectTimelineProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="w-12 h-12 text-slate-300 mb-3" />
        <p className="text-slate-500 font-medium">No active projects</p>
        <p className="text-sm text-slate-400 mt-1">
          Active projects will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {projects.map((project, index) => {
        const statusColors = getStatusColor(project.status)
        const duration = calculateDuration(
          project.start_date,
          project.completion_date
        )

        return (
          <div
            key={project.id}
            className={cn(
              'relative pl-6 pb-4',
              index !== projects.length - 1 &&
                'border-l-2 border-slate-200 ml-2'
            )}
          >
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent-400 border-2 border-white z-10" />

            {/* Content card */}
            <div className="bg-forest-700 dark:bg-forest-800 border-2 border-forest-600 rounded-lg p-4 shadow-forest-lg hover:shadow-forest-xl transition-shadow">
              {/* Project name and status */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-white flex-1">
                  {project.project_name}
                </h4>
                <span
                  className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium border',
                    statusColors.bg,
                    statusColors.text,
                    statusColors.border
                  )}
                >
                  {project.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Date range */}
              <div className="flex items-center gap-2 text-xs text-white/80 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {formatDateRange(project.start_date, project.completion_date)}
                </span>
              </div>

              {/* Duration */}
              {duration !== null && (
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{duration} days</span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
