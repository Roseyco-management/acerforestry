'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ContactSubmission } from '@/lib/supabase/types'
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Save,
  CheckCircle,
  AlertCircle,
  TreePine,
  Tag,
} from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-700' },
  { value: 'converted', label: 'Converted', color: 'bg-green-100 text-green-700' },
  { value: 'closed', label: 'Closed', color: 'bg-slate-100 text-slate-700' },
  { value: 'spam', label: 'Spam', color: 'bg-red-100 text-red-700' },
]

export default function ContactDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [submission, setSubmission] = useState<ContactSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetchSubmission()
  }, [id])

  const fetchSubmission = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/admin/contacts?id=${id}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch submission')
      }

      if (!result.data) {
        throw new Error('Submission not found')
      }

      setSubmission(result.data)
      setStatus(result.data.status)
      setNotes(result.data.notes || '')
    } catch (err) {
      console.error('Error fetching submission:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch submission')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!submission) return

    try {
      setSaving(true)
      setError(null)
      setSuccess(false)

      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: submission.id,
          status,
          notes: notes.trim() || null,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update submission')
      }

      setSubmission(result.data)
      setSuccess(true)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error updating submission:', err)
      setError(err instanceof Error ? err.message : 'Failed to update submission')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadge = (statusValue: string) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === statusValue)
    if (!option) return null

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${option.color}`}>
        {option.label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600"></div>
          <span className="text-slate-600">Loading submission details...</span>
        </div>
      </div>
    )
  }

  if (error && !submission) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push('/admin/contacts')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Submissions
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error Loading Submission</h3>
              <p className="text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!submission) {
    return null
  }

  const hasChanges = status !== submission.status || notes !== (submission.notes || '')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/contacts')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Contact Submission</h1>
            <p className="text-slate-600 mt-1">
              Submitted {formatDate(submission.created_at)}
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-900 font-medium">Changes saved successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-900">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-600">Name</div>
                  <div className="text-slate-900 mt-1">{submission.name}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-600">Email</div>
                  <a
                    href={`mailto:${submission.email}`}
                    className="text-forest-600 hover:underline mt-1 block"
                  >
                    {submission.email}
                  </a>
                </div>
              </div>

              {submission.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-600">Phone</div>
                    <a
                      href={`tel:${submission.phone}`}
                      className="text-forest-600 hover:underline mt-1 block"
                    >
                      {submission.phone}
                    </a>
                  </div>
                </div>
              )}

              {submission.company_name && (
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-600">Company</div>
                    <div className="text-slate-900 mt-1">{submission.company_name}</div>
                  </div>
                </div>
              )}

              {submission.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-600">Location</div>
                    <div className="text-slate-900 mt-1">{submission.location}</div>
                  </div>
                </div>
              )}

              {submission.service_interest && (
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-600">Service Interest</div>
                    <div className="text-slate-900 mt-1">{submission.service_interest}</div>
                  </div>
                </div>
              )}

              {submission.woodland_area && (
                <div className="flex items-start gap-3">
                  <TreePine className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-600">Woodland Area</div>
                    <div className="text-slate-900 mt-1">{submission.woodland_area} hectares</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Message</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 whitespace-pre-wrap">{submission.message}</p>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Internal Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this submission, follow-up actions, etc..."
              rows={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Status</h2>
            <div className="space-y-3">
              {STATUS_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={status === option.value}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-4 h-4 text-forest-600 focus:ring-forest-600"
                  />
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${option.color}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Metadata</h2>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-slate-600">Source</div>
                <div className="text-slate-900 font-medium mt-0.5">
                  {submission.source.replace(/_/g, ' ')}
                </div>
              </div>
              <div>
                <div className="text-slate-600">Submission ID</div>
                <div className="text-slate-900 font-mono text-xs mt-0.5 break-all">
                  {submission.id}
                </div>
              </div>
              <div>
                <div className="text-slate-600">Created</div>
                <div className="text-slate-900 mt-0.5">{formatDate(submission.created_at)}</div>
              </div>
              <div>
                <div className="text-slate-600">Last Updated</div>
                <div className="text-slate-900 mt-0.5">{formatDate(submission.updated_at)}</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a
                href={`mailto:${submission.email}?subject=Re: Your inquiry about Acer Forestry Services`}
                className="flex items-center gap-2 w-full px-4 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors text-center justify-center"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
              {submission.phone && (
                <a
                  href={`tel:${submission.phone}`}
                  className="flex items-center gap-2 w-full px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-center justify-center"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
