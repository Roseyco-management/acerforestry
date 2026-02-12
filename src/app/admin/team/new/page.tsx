'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  TextInput,
  Select,
  Textarea,
  FormGroup,
  DateInput,
} from '@/components/admin/FormFields'
import { ArrowLeft, Plus, X } from 'lucide-react'
import type { Certification } from '@/lib/db/team'

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

export default function NewTeamMemberPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
          id: Date.now().toString(),
          name: newCertName,
          expiryDate: newCertExpiry,
        },
      ])
      setNewCertName('')
      setNewCertExpiry('')
    }
  }

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter((c) => c.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Build submission data
      const submitData = {
        ...formData,
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
        certifications: certifications.map((c) => ({
          name: c.name,
          expiryDate: c.expiryDate,
        })),
      }

      const response = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (result.success) {
        router.push('/admin/team')
      } else {
        setError(result.error || 'Failed to create team member')
      }
    } catch (err) {
      setError('An error occurred while creating the team member')
      console.error('Error creating team member:', err)
    } finally {
      setLoading(false)
    }
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

        <h1 className="text-3xl font-bold text-slate-900">Add Team Member</h1>
        <p className="mt-1 text-slate-600">
          Add a new contractor, staff member, or subcontractor
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
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
              placeholder="John Doe"
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
                placeholder="Optional"
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
                placeholder="john@example.com"
              />

              <TextInput
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="01234 567890"
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
                placeholder="25.00"
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
          </FormGroup>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Certifications
          </h2>

          {/* Existing Certifications */}
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
            placeholder="Any additional information about this team member..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {loading ? 'Creating...' : 'Create Team Member'}
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
