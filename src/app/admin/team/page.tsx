'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DataTable, { Column } from '@/components/admin/DataTable'
import { Select } from '@/components/admin/FormFields'
import { Plus, Users, UserCheck, Clock } from 'lucide-react'
import type { TeamMemberWithCertifications } from '@/lib/db/team'

interface TeamMemberDisplay extends TeamMemberWithCertifications {
  activeProjects?: number
}

export default function TeamManagementPage() {
  const router = useRouter()
  const [teamMembers, setTeamMembers] = useState<TeamMemberDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter states
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')

  // Fetch team members
  useEffect(() => {
    fetchTeamMembers()
  }, [roleFilter, statusFilter, availabilityFilter])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (roleFilter) params.append('role', roleFilter)
      if (statusFilter) params.append('status', statusFilter)
      if (availabilityFilter) params.append('availability', availabilityFilter)

      const response = await fetch(`/api/admin/team?${params.toString()}`)
      const result = await response.json()

      if (result.success) {
        setTeamMembers(result.data)
        setError(null)
      } else {
        setError(result.error || 'Failed to load team members')
      }
    } catch (err) {
      setError('Failed to load team members')
      console.error('Error fetching team members:', err)
    } finally {
      setLoading(false)
    }
  }

  // Calculate stats
  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter((m) => m.is_active).length,
    available: teamMembers.filter((m) => m.availability_status === 'available')
      .length,
    busy: teamMembers.filter((m) => m.availability_status === 'busy').length,
  }

  // Define table columns
  const columns: Column<TeamMemberDisplay>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (member) => (
        <div>
          <div className="font-bold text-white">{member.name}</div>
          {member.company_name && (
            <div className="text-sm text-white/70">{member.company_name}</div>
          )}
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (member) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-600 text-white">
          {member.role}
        </span>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      render: (member) => (
        <div className="text-sm">
          {member.email && <div className="text-white">{member.email}</div>}
          {member.phone && <div className="text-white/70">{member.phone}</div>}
        </div>
      ),
    },
    {
      key: 'certifications',
      header: 'Certifications',
      render: (member) => {
        const certs = member.certifications || []
        const today = new Date().toISOString().split('T')[0]
        const expired = certs.filter((c) => c.expiryDate < today).length
        const total = certs.length

        if (total === 0) return <span className="text-white/60">None</span>

        return (
          <div className="text-sm">
            <div className="text-white">{total} total</div>
            {expired > 0 && (
              <div className="text-red-300 font-medium">{expired} expired</div>
            )}
          </div>
        )
      },
    },
    {
      key: 'availability_status',
      header: 'Status',
      sortable: true,
      render: (member) => {
        const statusStyles = {
          available: 'bg-accent-600 text-white',
          busy: 'bg-amber-600 text-white',
          unavailable: 'bg-slate-600 text-white',
        }

        return (
          <div className="space-y-1">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                statusStyles[member.availability_status]
              }`}
            >
              {member.availability_status}
            </span>
            {!member.is_active && (
              <div className="text-xs text-red-300 font-medium">Inactive</div>
            )}
          </div>
        )
      },
    },
    {
      key: 'hourly_rate',
      header: 'Hourly Rate',
      sortable: true,
      render: (member) =>
        member.hourly_rate ? (
          <span className="text-white font-medium">£{member.hourly_rate.toFixed(2)}</span>
        ) : (
          <span className="text-white/60">-</span>
        ),
    },
    {
      key: 'projects_completed',
      header: 'Projects',
      sortable: true,
      render: (member) => (
        <span className="text-white font-medium">{member.projects_completed}</span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="mt-1 text-white/80">
            Manage contractors, staff, and subcontractors
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/team/new')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Team Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-forest-600 dark:bg-forest-900 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {stats.total}
              </div>
              <div className="text-sm text-white/80">Total Members</div>
            </div>
          </div>
        </div>

        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-600 rounded-lg">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {stats.active}
              </div>
              <div className="text-sm text-white/80">Active</div>
            </div>
          </div>
        </div>

        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-600 rounded-lg">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {stats.available}
              </div>
              <div className="text-sm text-white/80">Available</div>
            </div>
          </div>
        </div>

        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-600 rounded-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {stats.busy}
              </div>
              <div className="text-sm text-white/80">Busy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: '', label: 'All Roles' },
              { value: 'Tree Planting Contractor', label: 'Tree Planting Contractor' },
              { value: 'Fencing Specialist', label: 'Fencing Specialist' },
              { value: 'Ground Preparation', label: 'Ground Preparation' },
              { value: 'Project Manager', label: 'Project Manager' },
              { value: 'Site Supervisor', label: 'Site Supervisor' },
            ]}
          />

          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />

          <Select
            label="Availability"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            options={[
              { value: '', label: 'All Availability' },
              { value: 'available', label: 'Available' },
              { value: 'busy', label: 'Busy' },
              { value: 'unavailable', label: 'Unavailable' },
            ]}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Team Members Table */}
      {loading ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-forest-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-slate-600">Loading team members...</p>
        </div>
      ) : (
        <DataTable
          data={teamMembers}
          columns={columns}
          searchable={true}
          searchPlaceholder="Search by name, email, phone, or company..."
          emptyMessage="No team members found"
          onRowClick={(member) => router.push(`/admin/team/${member.id}`)}
        />
      )}
    </div>
  )
}
