'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable, { Column } from '@/components/admin/DataTable'
import { Select } from '@/components/admin/FormFields'
import { Plus, Eye, Pencil, Trash2, Filter } from 'lucide-react'
import type { ProjectWithClient } from '@/lib/db/projects'

type ProjectStatus = 'planning' | 'active' | 'completed' | 'on-hold'

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'planning', label: 'Planning' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On Hold' },
]

const STATUS_COLORS: Record<string, string> = {
  planning: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  planting: 'bg-green-100 text-green-800',
  maintenance: 'bg-purple-100 text-purple-800',
  completed: 'bg-emerald-100 text-emerald-800',
  on_hold: 'bg-slate-100 text-slate-800',
}

const STATUS_LABELS: Record<string, string> = {
  planning: 'Planning',
  in_progress: 'In Progress',
  planting: 'Planting',
  maintenance: 'Maintenance',
  completed: 'Completed',
  on_hold: 'On Hold',
}

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectWithClient[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [dateStartFilter, setDateStartFilter] = useState('')
  const [dateEndFilter, setDateEndFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [statusFilter, dateStartFilter, dateEndFilter])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (statusFilter) params.append('status', statusFilter)
      if (dateStartFilter) params.append('dateStart', dateStartFilter)
      if (dateEndFilter) params.append('dateEnd', dateEndFilter)

      const response = await fetch(`/api/admin/projects?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }

      const result = await response.json()
      setProjects(result.data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      alert('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, projectName: string) => {
    if (!confirm(`Are you sure you want to delete "${projectName}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      alert('Project deleted successfully')
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  const columns: Column<ProjectWithClient>[] = [
    {
      key: 'project_name',
      header: 'Project Name',
      sortable: true,
      render: (project) => (
        <div className="font-medium text-white">{project.project_name}</div>
      ),
    },
    {
      key: 'client',
      header: 'Client',
      sortable: false,
      render: (project) => (
        <div className="text-white">
          {project.client?.company_name || project.client?.contact_name || '-'}
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
    },
    {
      key: 'area_hectares',
      header: 'Area (ha)',
      sortable: true,
      render: (project) => (
        <div className="text-white">{project.area_hectares.toFixed(2)}</div>
      ),
    },
    {
      key: 'tree_species',
      header: 'Species',
      sortable: false,
      render: (project) => (
        <div className="text-white text-sm">
          {project.tree_species && project.tree_species.length > 0
            ? project.tree_species.slice(0, 2).join(', ') +
              (project.tree_species.length > 2 ? '...' : '')
            : '-'}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (project) => (
        <span
          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
            STATUS_COLORS[project.status] || 'bg-slate-100 text-slate-800'
          }`}
        >
          {STATUS_LABELS[project.status] || project.status}
        </span>
      ),
    },
    {
      key: 'start_date',
      header: 'Start Date',
      sortable: true,
      render: (project) => (
        <div className="text-white">
          {project.start_date
            ? new Date(project.start_date).toLocaleDateString()
            : '-'}
        </div>
      ),
    },
    {
      key: 'completion_date',
      header: 'Completion',
      sortable: true,
      render: (project) => (
        <div className="text-white">
          {project.completion_date
            ? new Date(project.completion_date).toLocaleDateString()
            : '-'}
        </div>
      ),
    },
    {
      key: 'total_cost',
      header: 'Value',
      sortable: true,
      render: (project) => (
        <div className="text-white font-medium">
          {project.total_cost
            ? `£${project.total_cost.toLocaleString()}`
            : '-'}
        </div>
      ),
    },
    {
      key: 'id',
      header: 'Actions',
      sortable: false,
      render: (project) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/admin/projects/${project.id}`)
            }}
            className="p-1.5 text-white/80 hover:text-white hover:bg-forest-600 rounded transition-colors"
            title="View/Edit"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(project.id, project.project_name)
            }}
            className="p-1.5 text-white/80 hover:text-red-300 hover:bg-red-600 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/80">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide text-white">Projects</h1>
          <p className="mt-2 text-white/80">
            Manage woodland creation and maintenance projects
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/projects/new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg p-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-white font-medium hover:text-white/80 transition-colors"
        >
          <Filter className="w-5 h-5" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Status"
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-white">
                Start Date From
              </label>
              <input
                type="date"
                value={dateStartFilter}
                onChange={(e) => setDateStartFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-white">
                Start Date To
              </label>
              <input
                type="date"
                value={dateEndFilter}
                onChange={(e) => setDateEndFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Projects Table */}
      <DataTable
        data={projects}
        columns={columns}
        searchable
        searchPlaceholder="Search projects..."
        emptyMessage="No projects found"
        onRowClick={(project) => router.push(`/admin/projects/${project.id}`)}
      />
    </div>
  )
}
