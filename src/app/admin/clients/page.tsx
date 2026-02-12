'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DataTable, { Column } from '@/components/admin/DataTable'
import { Select } from '@/components/admin/FormFields'
import { Plus, Mail, Phone, MapPin } from 'lucide-react'
import type { ClientWithProjectCount } from '@/lib/db/clients'

export default function ClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<ClientWithProjectCount[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')

  // Fetch clients
  useEffect(() => {
    fetchClients()
  }, [statusFilter])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)

      const response = await fetch(`/api/admin/clients?${params.toString()}`)
      const result = await response.json()

      if (response.ok) {
        setClients(result.data || [])
      } else {
        console.error('Failed to fetch clients:', result.error)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-slate-100 text-slate-800',
      prospect: 'bg-blue-100 text-blue-800',
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          colors[status as keyof typeof colors] || colors.prospect
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  // Define table columns
  const columns: Column<ClientWithProjectCount>[] = [
    {
      key: 'contact_name',
      header: 'Name',
      sortable: true,
      render: (client) => (
        <div>
          <div className="font-medium text-white">{client.contact_name}</div>
          {client.company_name && (
            <div className="text-sm text-white/70">{client.company_name}</div>
          )}
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      render: (client) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-white">
            <Mail className="w-4 h-4 mr-1.5 text-white/60" />
            {client.email}
          </div>
          {client.phone && (
            <div className="flex items-center text-sm text-white/80">
              <Phone className="w-4 h-4 mr-1.5 text-white/60" />
              {client.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'county',
      header: 'Location',
      sortable: true,
      render: (client) => (
        <div className="flex items-center text-sm text-white">
          {client.county ? (
            <>
              <MapPin className="w-4 h-4 mr-1.5 text-white/60" />
              {client.county}
            </>
          ) : (
            <span className="text-white/60">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (client) => <StatusBadge status={client.status} />,
    },
    {
      key: 'project_count',
      header: 'Projects',
      sortable: true,
      render: (client) => (
        <div className="text-center">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-forest-100 text-forest-800 font-semibold text-sm">
            {client.project_count}
          </span>
        </div>
      ),
    },
    {
      key: 'updated_at',
      header: 'Last Contact',
      sortable: true,
      render: (client) => (
        <div className="text-sm text-white/80">
          {formatDate(client.updated_at)}
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/80">Loading clients...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide text-white">
            Clients
          </h1>
          <p className="mt-2 text-white/80">
            Manage your client database and relationships
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/clients/new')}
          className="inline-flex items-center px-4 py-2.5 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg">
        <div className="w-64">
          <Select
            label="Filter by Status"
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'prospect', label: 'Prospect' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
        <div className="ml-auto text-sm text-white/80">
          <span className="font-medium">{clients.length}</span> clients
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={clients}
        columns={columns}
        searchable={true}
        searchPlaceholder="Search clients by name, company, email, or location..."
        emptyMessage="No clients found. Add your first client to get started."
        onRowClick={(client) => router.push(`/admin/clients/${client.id}`)}
        rowClassName="cursor-pointer"
      />
    </div>
  )
}
