'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DataTable, { Column } from '@/components/admin/DataTable'
import { ContactSubmission } from '@/lib/supabase/types'
import {
  Mail,
  Phone,
  Building2,
  Filter,
  Download,
  Eye,
  Trash2,
  AlertCircle,
} from 'lucide-react'

type ContactStatus = 'all' | 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'spam'

const STATUS_OPTIONS: { value: ContactStatus; label: string; color: string }[] = [
  { value: 'all', label: 'All Submissions', color: 'bg-slate-100 text-slate-700' },
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-700' },
  { value: 'converted', label: 'Converted', color: 'bg-green-100 text-green-700' },
  { value: 'closed', label: 'Closed', color: 'bg-slate-100 text-slate-700' },
  { value: 'spam', label: 'Spam', color: 'bg-red-100 text-red-700' },
]

export default function ContactsPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<ContactStatus>('all')
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [statusFilter])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const response = await fetch(`/api/admin/contacts?${params}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch submissions')
      }

      setSubmissions(result.data || [])
    } catch (err) {
      console.error('Error fetching submissions:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      setExporting(true)

      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const response = await fetch(`/api/admin/contacts/export?${params}`)

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Error exporting:', err)
      alert('Failed to export submissions')
    } finally {
      setExporting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete submission')
      }

      // Refresh the list
      fetchSubmissions()
    } catch (err) {
      console.error('Error deleting submission:', err)
      alert('Failed to delete submission')
    }
  }

  const getStatusBadge = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status)
    if (!option) return null

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${option.color}`}>
        {option.label}
      </span>
    )
  }

  const truncateMessage = (message: string, maxLength: number = 80) => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength) + '...'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const columns: Column<ContactSubmission>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (item) => (
        <div>
          <div className="font-medium text-white">{item.name}</div>
          {item.company_name && (
            <div className="text-sm text-white/70 flex items-center gap-1 mt-0.5">
              <Building2 className="w-3 h-3" />
              {item.company_name}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      render: (item) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm">
            <Mail className="w-3.5 h-3.5 text-white/60" />
            <a href={`mailto:${item.email}`} className="text-white hover:underline">
              {item.email}
            </a>
          </div>
          {item.phone && (
            <div className="flex items-center gap-1.5 text-sm text-white/80">
              <Phone className="w-3.5 h-3.5 text-white/60" />
              <a href={`tel:${item.phone}`} className="hover:underline">
                {item.phone}
              </a>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'message',
      header: 'Message',
      render: (item) => (
        <div className="max-w-md">
          <p className="text-sm text-white">{truncateMessage(item.message)}</p>
          {item.service_interest && (
            <div className="mt-1 text-xs text-white/70">
              Interest: {item.service_interest}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => getStatusBadge(item.status),
    },
    {
      key: 'created_at',
      header: 'Submitted',
      sortable: true,
      render: (item) => (
        <div className="text-sm text-white/80">
          {formatDate(item.created_at)}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/admin/contacts/${item.id}`)
            }}
            className="p-2 text-white/80 hover:text-white hover:bg-forest-600 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(item.id)
            }}
            className="p-2 text-white/80 hover:text-red-300 hover:bg-red-600 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ]

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    converted: submissions.filter(s => s.status === 'converted').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide text-white">Contact Submissions</h1>
          <p className="mt-2 text-white/80">
            Manage and respond to website contact form submissions
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting || submissions.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-4 h-4" />
          {exporting ? 'Exporting...' : 'Export CSV'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg p-4">
          <div className="text-sm font-bold uppercase tracking-wide text-white/80">Total Submissions</div>
          <div className="mt-1 text-2xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg p-4">
          <div className="text-sm font-bold uppercase tracking-wide text-white/80">New</div>
          <div className="mt-1 text-2xl font-bold text-white">{stats.new}</div>
        </div>
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg p-4">
          <div className="text-sm font-bold uppercase tracking-wide text-white/80">Contacted</div>
          <div className="mt-1 text-2xl font-bold text-white">{stats.contacted}</div>
        </div>
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg p-4">
          <div className="text-sm font-bold uppercase tracking-wide text-white/80">Converted</div>
          <div className="mt-1 text-2xl font-bold text-white">{stats.converted}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/70" />
          <span className="text-sm font-medium text-white">Filter by status:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === option.value
                  ? option.color
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-900">Error loading submissions</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Data Table */}
      {loading ? (
        <div className="bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg p-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="ml-3 text-white/80">Loading submissions...</span>
          </div>
        </div>
      ) : (
        <DataTable
          data={submissions}
          columns={columns}
          pageSize={20}
          searchable={true}
          searchPlaceholder="Search by name, email, or message..."
          emptyMessage="No contact submissions found"
          onRowClick={(item) => router.push(`/admin/contacts/${item.id}`)}
        />
      )}
    </div>
  )
}
