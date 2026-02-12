import React from 'react'
import {
  BarChart3,
  Users,
  Briefcase,
  DollarSign,
  Mail,
  TrendingUp,
  Activity,
  Calendar,
} from 'lucide-react'
import DashboardCard, { DashboardCardGrid } from '@/components/admin/DashboardCard'
import StatsWidget from '@/components/admin/StatsWidget'
import {
  getProjectStats,
  getClientStats,
  getRevenueStats,
  getContactStats,
  getRevenueByMonth,
  getClientDistribution,
  getRecentActivity,
  getActiveProjectsTimeline,
} from '@/lib/db/analytics'
import RevenueChart from '@/components/admin/charts/RevenueChart'
import ClientDistributionChart from '@/components/admin/charts/ClientDistributionChart'
import ActivityFeed from '@/components/admin/ActivityFeed'
import ProjectTimeline from '@/components/admin/ProjectTimeline'

export default async function AdminDashboard() {
  // Fetch all data in parallel with error handling
  let projectStats, clientStats, revenueStats, contactStats, revenueByMonth, clientDistribution, recentActivity, activeProjects

  try {
    [
      projectStats,
      clientStats,
      revenueStats,
      contactStats,
      revenueByMonth,
      clientDistribution,
      recentActivity,
      activeProjects,
    ] = await Promise.all([
      getProjectStats(),
      getClientStats(),
      getRevenueStats(),
      getContactStats(),
      getRevenueByMonth(),
      getClientDistribution(),
      getRecentActivity(10),
      getActiveProjectsTimeline(),
    ])
  } catch (error) {
    console.error('Dashboard data fetch error:', error)
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-red-700">{error instanceof Error ? error.message : 'Unknown error'}</p>
          <pre className="mt-4 text-xs text-red-600 overflow-auto">{error instanceof Error ? error.stack : ''}</pre>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-white/80">
          Welcome to Acer Forestry Admin Panel - Overview of your business metrics
        </p>
      </div>

      {/* Key Metrics - Top Row */}
      <DashboardCardGrid columns={4}>
        <DashboardCard
          title="Total Projects"
          value={projectStats.totalProjects}
          description={`${projectStats.completedProjects} completed`}
          icon={Briefcase}
          iconColor="text-forest-600"
          iconBgColor="bg-forest-50"
        />

        <DashboardCard
          title="Active Projects"
          value={projectStats.activeProjects}
          description={`${projectStats.onHoldProjects} on hold`}
          icon={Activity}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
        />

        <DashboardCard
          title="Total Clients"
          value={clientStats.totalClients}
          description={`${clientStats.activeClients} active, ${clientStats.prospects} leads`}
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
        />

        <DashboardCard
          title="Revenue This Month"
          value={`£${(revenueStats.currentMonth / 1000).toFixed(1)}k`}
          description="Total contract value"
          icon={DollarSign}
          iconColor="text-green-600"
          iconBgColor="bg-green-50"
          trend={{
            value: revenueStats.percentageChange,
            isPositive: revenueStats.percentageChange >= 0,
            label: 'vs last month',
          }}
        />
      </DashboardCardGrid>

      {/* Secondary Metrics Row */}
      <DashboardCardGrid columns={4}>
        <DashboardCard
          title="New Contact Submissions"
          value={contactStats.newSubmissions}
          description={`${contactStats.totalSubmissions} total submissions`}
          icon={Mail}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
        />

        <DashboardCard
          title="Conversion Rate"
          value={`${contactStats.conversionRate}%`}
          description="Leads to clients"
          icon={TrendingUp}
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-50"
        />

        <DashboardCard
          title="Active Timeline"
          value={activeProjects.length}
          description="Projects in progress"
          icon={Calendar}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-50"
        />

        <DashboardCard
          title="Quick Stats"
          value={clientStats.prospects}
          description="Prospect leads to follow up"
          icon={BarChart3}
          iconColor="text-rose-600"
          iconBgColor="bg-rose-50"
        />
      </DashboardCardGrid>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg">
          <div className="px-6 py-4 border-b-2 border-forest-600">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              Revenue by Month
            </h3>
            <p className="text-sm text-white/80 mt-1">
              Last 12 months performance
            </p>
          </div>
          <div className="p-6">
            <RevenueChart data={revenueByMonth} />
          </div>
        </div>

        {/* Client Distribution Chart */}
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg">
          <div className="px-6 py-4 border-b-2 border-forest-600">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              Client Status Distribution
            </h3>
            <p className="text-sm text-white/80 mt-1">
              Breakdown by client status
            </p>
          </div>
          <div className="p-6">
            <ClientDistributionChart data={clientDistribution} />
          </div>
        </div>
      </div>

      {/* Project Timeline and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Timeline */}
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg">
          <div className="px-6 py-4 border-b-2 border-forest-600">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              Active Project Timeline
            </h3>
            <p className="text-sm text-white/80 mt-1">
              Current projects overview
            </p>
          </div>
          <div className="p-6">
            <ProjectTimeline projects={activeProjects} />
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg">
          <div className="px-6 py-4 border-b-2 border-forest-600">
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              Recent Activity
            </h3>
            <p className="text-sm text-white/80 mt-1">Latest system actions</p>
          </div>
          <div className="p-6">
            <ActivityFeed activities={recentActivity} />
          </div>
        </div>
      </div>

      {/* Bottom Stats Widget */}
      <StatsWidget
        title="Project Statistics Breakdown"
        variant="default"
        stats={[
          {
            label: 'Planning Phase',
            value: projectStats.activeProjects,
            icon: Calendar,
            iconColor: 'text-blue-600',
          },
          {
            label: 'In Progress',
            value: projectStats.activeProjects,
            icon: Activity,
            iconColor: 'text-green-600',
          },
          {
            label: 'Completed',
            value: projectStats.completedProjects,
            icon: Briefcase,
            iconColor: 'text-forest-600',
          },
        ]}
      />
    </div>
  )
}
