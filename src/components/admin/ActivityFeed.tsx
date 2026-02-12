'use client'

import React from 'react'
import {
  UserPlus,
  FileText,
  Users,
  Briefcase,
  Settings,
  Image,
  Mail,
  Activity,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  action: string
  entity_type: string
  description: string
  created_at: string
  user_id: string | null
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

// Map entity types to icons and colors
const getActivityIcon = (entityType: string, action: string) => {
  const lowerEntity = entityType.toLowerCase()
  const lowerAction = action.toLowerCase()

  if (lowerEntity.includes('client')) {
    return { Icon: Users, color: 'text-white', bg: 'bg-purple-600' }
  }
  if (lowerEntity.includes('project')) {
    return { Icon: Briefcase, color: 'text-white', bg: 'bg-forest-600' }
  }
  if (lowerEntity.includes('user')) {
    return { Icon: UserPlus, color: 'text-white', bg: 'bg-blue-600' }
  }
  if (lowerEntity.includes('photo') || lowerEntity.includes('image')) {
    return { Icon: Image, color: 'text-white', bg: 'bg-amber-600' }
  }
  if (lowerEntity.includes('contact')) {
    return { Icon: Mail, color: 'text-white', bg: 'bg-rose-600' }
  }
  if (lowerEntity.includes('content')) {
    return { Icon: FileText, color: 'text-white', bg: 'bg-indigo-600' }
  }
  if (lowerEntity.includes('setting')) {
    return { Icon: Settings, color: 'text-white', bg: 'bg-slate-600' }
  }

  return { Icon: Activity, color: 'text-white', bg: 'bg-forest-600' }
}

// Format relative time
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Activity className="w-12 h-12 text-white/30 mb-3" />
        <p className="text-white/70 font-medium">No recent activity</p>
        <p className="text-sm text-white/60 mt-1">
          Activity will appear here as actions are performed
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const { Icon, color, bg } = getActivityIcon(
          activity.entity_type,
          activity.action
        )

        return (
          <div
            key={activity.id}
            className={cn(
              'flex items-start gap-3 pb-4',
              index !== activities.length - 1 && 'border-b border-forest-600'
            )}
          >
            {/* Icon */}
            <div className={cn('p-2 rounded-lg flex-shrink-0', bg)}>
              <Icon className={cn('w-4 h-4', color)} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-white/70 capitalize">
                  {activity.action.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-white/50">•</span>
                <span className="text-xs text-white/70">
                  {activity.entity_type}
                </span>
              </div>
            </div>

            {/* Time */}
            <span className="text-xs text-white/60 flex-shrink-0">
              {formatRelativeTime(activity.created_at)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
