'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import {
  TextInput,
  Select,
  Textarea,
  FormGroup,
  DateInput,
} from '@/components/admin/FormFields'
import { ArrowLeft, Plus, X, Trash2, ExternalLink } from 'lucide-react'
import type { TeamMemberWithCertifications, Certification } from '@/lib/db/team'

interface FormData {
  name: string
  role: string
  company_name: string
  email: string
  phone: string
  specializations: string[]
  hourly_rate: string
  availability_status: 'available' | 'busy' | 'unavailable'
  is_active: boolean
  notes: string
}

interface CertificationInput extends Certification {
  id: string
}

interface ProjectAssignment {
  id: string
  role_on_project: string
  assigned_date: string
  project: {
    id: string
    project_name: string
    location: string
    status: string
    client: {
      contact_name: string
      company_name: string | null
    }
  }
}

export default function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [member, setMember] = useState<TeamMemberWithCertifications | null>(null)
  const [projects, setProjects] = useState<ProjectAssignment[]>([])

  const [formData, setFormData] = useState<FormData>({
    name: '',
    role: '',
    company_name: '',
    email: '',
    phone: '',
    specializations: [],
    hourly_rate: '',
    availability_status: 'available',
    is_active: true,
    notes: '',
  })

  const [certifications, setCertifications] = useState<CertificationInput[]>([])
  const [newCertName, setNewCertName] = useState('')
  const [newCertExpiry, setNewCertExpiry] = useState('')

  // Fetch team member data
  useEffect(() => {
    fetchTeamMember()
  }, [id])

  const fetchTeamMember = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/team/${id}`)
      const result = await response.json()

      if (result.success) {
        const data = result.data
        setMember(data)
        setProjects(data.projects || [])

        setFormData({
          name: data.name || '',
          role: data.role || '',
          company_name: data.company_name || '',
          email: data.email || '',
          phone: data.phone || '',
          specializations: data.specializations || [],
          hourly_rate: data.hourly_rate?.toString() || '',
          availability_status: data.availability_status || 'available',
          is_active: data.is_active ?? true,
          notes: data.notes || '',
        })

        setCertifications(
          (data.certifications || []).map((cert: Certification, idx: number) => ({
            ...cert,
            id: `existing-${idx}`,
          }))
        )

        setError(null)
      } else {
        setError(result.error || 'Failed to load team member')
      }
    } catch (err) {
      setError('Failed to load team member')
      console.error('Error fetching team member:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const addCertification = () => {
    if (newCertName && newCertExpiry) {
      setCertifications([
        ...certifications,
        {
          id: `new-${Date.now()}`,
          name: newCertName,
          expiryDate: newCertExpiry,
        },
      ])
      setNewCertName('')
      setNewCertExpiry('')
    }
  }

  const removeCertification = (certId: string) => {
    setCertifications(certifications.filter((c) => c.id !== certId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const submitData = {
        ...formData,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
        certifications: certifications.map((c) => ({
          name: c.name,
          expiryDate: c.expiryDate,
        })),
      }

      const response = await fetch(`/api/admin/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (result.success) {
        router.push('/admin/team')
      } else {
        setError(result.error || 'Failed to update team member')
      }
    } catch (err) {
      setError('An error occurred while updating the team member')
      console.error('Error updating team member:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to deactivate this team member? They will be marked as inactive but not deleted.'
      )
    ) {
      return
    }

    try {
      const response = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        router.push('/admin/team')
      } else {
        setError(result.error || 'Failed to delete team member')
      }
    } catch (err) {
      setError('An error occurred while deleting the team member')
      console.error('Error deleting team member:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-forest-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-slate-600">Loading team member...</p>
        </div>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Team member not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Team
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{member.name}</h1>
            <p className="mt-1 text-slate-600">{member.role}</p>
          </div>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Deactivate
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Assigned Projects */}
      {projects.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Assigned Projects ({projects.length})
          </h2>
          <div className="space-y-3">
            {projects.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div>
                  <div className="font-medium text-slate-900">
                    {assignment.project.project_name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {assignment.project.location} •{' '}
                    {assignment.project.client.company_name ||
                      assignment.project.client.contact_name}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    Role: {assignment.role_on_project} • Assigned:{' '}
                    {new Date(assignment.assigned_date).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() =>
                    router.push(`/admin/projects/${assignment.project.id}`)
                  }
                  className="text-forest-600 hover:text-forest-700"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Basic Information
          </h2>
          <FormGroup>
            <TextInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                options={[
                  { value: '', label: 'Select a role' },
                  {
                    value: 'Tree Planting Contractor',
                    label: 'Tree Planting Contractor',
                  },
                  { value: 'Fencing Specialist', label: 'Fencing Specialist' },
                  { value: 'Ground Preparation', label: 'Ground Preparation' },
                  { value: 'Project Manager', label: 'Project Manager' },
                  { value: 'Site Supervisor', label: 'Site Supervisor' },
                  { value: 'Ecologist', label: 'Ecologist' },
                  { value: 'Surveyor', label: 'Surveyor' },
                ]}
              />

              <TextInput
                label="Company Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
              />
            </div>
          </FormGroup>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Contact Information
          </h2>
          <FormGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextInput
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </FormGroup>
        </div>

        {/* Professional Details */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Professional Details
          </h2>
          <FormGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Hourly Rate (£)"
                name="hourly_rate"
                type="number"
                step="0.01"
                value={formData.hourly_rate}
                onChange={handleChange}
              />

              <Select
                label="Availability Status"
                name="availability_status"
                value={formData.availability_status}
                onChange={handleChange}
                options={[
                  { value: 'available', label: 'Available' },
                  { value: 'busy', label: 'Busy' },
                  { value: 'unavailable', label: 'Unavailable' },
                ]}
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-forest-600 focus:ring-2 focus:ring-forest-600"
              />
              <label htmlFor="is_active" className="text-sm text-slate-700">
                Active team member
              </label>
            </div>
          </FormGroup>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Certifications
          </h2>

          {certifications.length > 0 && (
            <div className="mb-4 space-y-2">
              {certifications.map((cert) => {
                const isExpired =
                  cert.expiryDate < new Date().toISOString().split('T')[0]
                return (
                  <div
                    key={cert.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-slate-900">
                        {cert.name}
                      </div>
                      <div
                        className={`text-sm ${
                          isExpired ? 'text-red-600' : 'text-slate-600'
                        }`}
                      >
                        Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                        {isExpired && ' (Expired)'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Add New Certification */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Certification Name"
                value={newCertName}
                onChange={(e) => setNewCertName(e.target.value)}
                placeholder="e.g., Chainsaw Operator License"
              />

              <DateInput
                label="Expiry Date"
                value={newCertExpiry}
                onChange={(e) => setNewCertExpiry(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={addCertification}
              disabled={!newCertName || !newCertExpiry}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-forest-600 hover:text-forest-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add Certification
            </button>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Additional Notes
          </h2>
          <Textarea
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
          />
        </div>

        {/* Performance Stats */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-600">Projects Completed</div>
              <div className="text-2xl font-bold text-slate-900">
                {member.projects_completed}
              </div>
            </div>
            {member.quality_rating && (
              <div>
                <div className="text-sm text-slate-600">Quality Rating</div>
                <div className="text-2xl font-bold text-slate-900">
                  {member.quality_rating.toFixed(2)} / 5.00
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
