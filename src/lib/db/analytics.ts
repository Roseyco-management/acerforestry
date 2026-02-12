/**
 * Analytics Database Queries
 *
 * Provides data fetching functions for the admin dashboard analytics.
 * All functions return aggregated data for visualization and reporting.
 */

import { createClient } from '@/lib/supabase/server'

export interface ProjectStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  onHoldProjects: number
}

export interface ClientStats {
  totalClients: number
  activeClients: number
  inactiveClients: number
  prospects: number
}

export interface RevenueStats {
  currentMonth: number
  previousMonth: number
  percentageChange: number
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  projectCount: number
}

export interface ClientDistribution {
  status: string
  count: number
  percentage: number
}

export interface RecentActivity {
  id: string
  action: string
  entity_type: string
  description: string
  created_at: string
  user_id: string | null
}

export interface ContactStats {
  newSubmissions: number
  totalSubmissions: number
  conversionRate: number
}

/**
 * Get project statistics
 */
export async function getProjectStats(): Promise<ProjectStats> {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('status')

  if (error) {
    console.error('Error fetching project stats:', error)
    return {
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      onHoldProjects: 0,
    }
  }

  const stats = projects?.reduce(
    (acc, project) => {
      acc.totalProjects++
      if (
        project.status === 'in_progress' ||
        project.status === 'planning' ||
        project.status === 'planting' ||
        project.status === 'maintenance'
      ) {
        acc.activeProjects++
      }
      if (project.status === 'completed') {
        acc.completedProjects++
      }
      if (project.status === 'on_hold') {
        acc.onHoldProjects++
      }
      return acc
    },
    {
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      onHoldProjects: 0,
    }
  )

  return stats
}

/**
 * Get client statistics
 */
export async function getClientStats(): Promise<ClientStats> {
  const supabase = await createClient()

  const { data: clients, error } = await supabase
    .from('clients')
    .select('status')

  if (error) {
    console.error('Error fetching client stats:', error)
    return {
      totalClients: 0,
      activeClients: 0,
      inactiveClients: 0,
      prospects: 0,
    }
  }

  const stats = clients?.reduce(
    (acc, client) => {
      acc.totalClients++
      if (client.status === 'active') acc.activeClients++
      if (client.status === 'inactive') acc.inactiveClients++
      if (client.status === 'prospect') acc.prospects++
      return acc
    },
    {
      totalClients: 0,
      activeClients: 0,
      inactiveClients: 0,
      prospects: 0,
    }
  )

  return stats
}

/**
 * Get revenue statistics for current month
 */
export async function getRevenueStats(): Promise<RevenueStats> {
  const supabase = await createClient()

  const now = new Date()
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

  // Get current month revenue
  const { data: currentMonth, error: currentError } = await supabase
    .from('projects')
    .select('total_cost')
    .gte('start_date', currentMonthStart.toISOString())
    .not('total_cost', 'is', null)

  // Get previous month revenue
  const { data: previousMonth, error: previousError } = await supabase
    .from('projects')
    .select('total_cost')
    .gte('start_date', previousMonthStart.toISOString())
    .lte('start_date', previousMonthEnd.toISOString())
    .not('total_cost', 'is', null)

  if (currentError || previousError) {
    console.error('Error fetching revenue stats:', currentError || previousError)
    return {
      currentMonth: 0,
      previousMonth: 0,
      percentageChange: 0,
    }
  }

  const currentRevenue =
    currentMonth?.reduce((sum, p) => sum + (p.total_cost || 0), 0) || 0
  const previousRevenue =
    previousMonth?.reduce((sum, p) => sum + (p.total_cost || 0), 0) || 0

  const percentageChange =
    previousRevenue > 0
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
      : 0

  return {
    currentMonth: currentRevenue,
    previousMonth: previousRevenue,
    percentageChange: Math.round(percentageChange * 10) / 10,
  }
}

/**
 * Get revenue by month for the last 12 months
 */
export async function getRevenueByMonth(): Promise<MonthlyRevenue[]> {
  const supabase = await createClient()

  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

  const { data: projects, error } = await supabase
    .from('projects')
    .select('start_date, total_cost')
    .gte('start_date', twelveMonthsAgo.toISOString())
    .not('total_cost', 'is', null)
    .order('start_date', { ascending: true })

  if (error) {
    console.error('Error fetching revenue by month:', error)
    return []
  }

  // Group by month
  const monthlyData = new Map<string, { revenue: number; count: number }>()

  projects?.forEach((project) => {
    if (project.start_date) {
      const date = new Date(project.start_date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

      const existing = monthlyData.get(monthKey) || { revenue: 0, count: 0 }
      monthlyData.set(monthKey, {
        revenue: existing.revenue + (project.total_cost || 0),
        count: existing.count + 1,
      })
    }
  })

  // Convert to array and format
  return Array.from(monthlyData.entries())
    .map(([month, data]) => ({
      month,
      revenue: data.revenue,
      projectCount: data.count,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

/**
 * Get client distribution by status
 */
export async function getClientDistribution(): Promise<ClientDistribution[]> {
  const supabase = await createClient()

  const { data: clients, error } = await supabase
    .from('clients')
    .select('status')

  if (error) {
    console.error('Error fetching client distribution:', error)
    return []
  }

  const total = clients?.length || 0
  if (total === 0) return []

  const distribution = clients?.reduce(
    (acc, client) => {
      const status = client.status || 'unknown'
      acc[status] = (acc[status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return Object.entries(distribution || {}).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count,
    percentage: Math.round((count / total) * 100 * 10) / 10,
  }))
}

/**
 * Get recent activity from the activity log
 */
export async function getRecentActivity(limit = 10): Promise<RecentActivity[]> {
  const supabase = await createClient()

  const { data: activities, error } = await supabase
    .from('activity_log')
    .select('id, action, entity_type, description, created_at, user_id')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent activity:', error)
    return []
  }

  return activities || []
}

/**
 * Get contact submission statistics
 */
export async function getContactStats(): Promise<ContactStats> {
  const supabase = await createClient()

  const { data: submissions, error } = await supabase
    .from('contact_submissions')
    .select('status')

  if (error) {
    console.error('Error fetching contact stats:', error)
    return {
      newSubmissions: 0,
      totalSubmissions: 0,
      conversionRate: 0,
    }
  }

  const newCount = submissions?.filter((s) => s.status === 'new').length || 0
  const convertedCount =
    submissions?.filter((s) => s.status === 'converted').length || 0
  const total = submissions?.length || 0

  return {
    newSubmissions: newCount,
    totalSubmissions: total,
    conversionRate: total > 0 ? Math.round((convertedCount / total) * 100) : 0,
  }
}

/**
 * Get active projects for timeline visualization
 */
export async function getActiveProjectsTimeline() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, project_name, start_date, completion_date, status')
    .in('status', ['in_progress', 'planning', 'planting', 'maintenance'])
    .order('start_date', { ascending: true })
    .limit(20)

  if (error) {
    console.error('Error fetching project timeline:', error)
    return []
  }

  return projects || []
}
