'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  TextInput,
  Textarea,
  Select,
  FormGroup,
} from '@/components/admin/FormFields'
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import type { Client } from '@/lib/supabase/types'

// Form input schema (before transformation)
const clientFormInputSchema = z.object({
  contact_name: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  company_name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  postcode: z.string().optional(),
  county: z.string().optional(),
  total_woodland_area: z.string().optional(),
  status: z.enum(['active', 'inactive', 'prospect']),
  notes: z.string().optional(),
})

type ClientFormData = z.infer<typeof clientFormInputSchema>

interface Project {
  id: string
  project_name: string
  location: string
  area_hectares: number
  status: string
  start_date: string | null
}

export default function ClientDetailPage() {
  const router = useRouter()
  const params = useParams()
  const clientId = params?.id as string

  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormInputSchema),
  })

  // Fetch client data
  useEffect(() => {
    if (clientId) {
      fetchClientData()
      fetchClientProjects()
    }
  }, [clientId])

  const fetchClientData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/clients/${clientId}`)
      const data = await response.json()

      if (response.ok && data.client) {
        setClient(data.client)
        reset({
          contact_name: data.client.contact_name,
          email: data.client.email,
          company_name: data.client.company_name || '',
          phone: data.client.phone || '',
          address: data.client.address || '',
          postcode: data.client.postcode || '',
          county: data.client.county || '',
          total_woodland_area: data.client.total_woodland_area?.toString() || '',
          status: data.client.status,
          notes: data.client.notes || '',
        })
      } else {
        setError('Client not found')
      }
    } catch (err) {
      setError('Failed to load client')
      console.error('Error fetching client:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchClientProjects = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/projects`)
      const data = await response.json()

      if (response.ok) {
        setProjects(data.projects || [])
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
    }
  }

  const onSubmit = async (data: ClientFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)
      setSuccessMessage(null)

      // Transform the data for API submission
      const submitData = {
        ...data,
        total_woodland_area:
          data.total_woodland_area && data.total_woodland_area !== ''
            ? parseFloat(data.total_woodland_area)
            : null,
      }

      const response = await fetch('/api/admin/clients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: clientId, ...submitData }),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccessMessage('Client updated successfully')
        setClient(result.client)
        reset(data)
        setTimeout(() => setSuccessMessage(null), 3000)
      } else {
        setError(result.error || 'Failed to update client')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Error updating client:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (
      !confirm(
        'Are you sure you want to delete this client? This will set their status to inactive.'
      )
    ) {
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch(`/api/admin/clients?id=${clientId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/clients')
      } else {
        const result = await response.json()
        setError(result.error || 'Failed to delete client')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Error deleting client:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading client...</div>
      </div>
    )
  }

  if (error && !client) {
    return (
      <div className="max-w-4xl">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-4 text-forest-600 hover:text-forest-700"
        >
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {client?.contact_name}
            </h1>
            {client?.company_name && (
              <p className="mt-1 text-lg text-slate-600 dark:text-slate-400">
                {client.company_name}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2.5 border border-red-300 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete Client
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">{successMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Basic Information
              </h2>
              <FormGroup>
                <TextInput
                  label="Contact Name"
                  required
                  {...register('contact_name')}
                  error={errors.contact_name?.message}
                />

                <TextInput
                  label="Company Name"
                  {...register('company_name')}
                  error={errors.company_name?.message}
                />

                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    label="Email"
                    type="email"
                    required
                    {...register('email')}
                    error={errors.email?.message}
                  />

                  <TextInput
                    label="Phone"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                </div>

                <Select
                  label="Status"
                  required
                  {...register('status')}
                  error={errors.status?.message}
                  options={[
                    { value: 'prospect', label: 'Prospect' },
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </FormGroup>
            </div>

            {/* Location Details */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Location Details
              </h2>
              <FormGroup>
                <Textarea
                  label="Address"
                  {...register('address')}
                  error={errors.address?.message}
                  rows={3}
                />

                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    label="Postcode"
                    {...register('postcode')}
                    error={errors.postcode?.message}
                  />

                  <TextInput
                    label="County"
                    {...register('county')}
                    error={errors.county?.message}
                  />
                </div>

                <TextInput
                  label="Total Woodland Area (hectares)"
                  type="number"
                  step="0.01"
                  {...register('total_woodland_area')}
                  error={errors.total_woodland_area?.message}
                />
              </FormGroup>
            </div>

            {/* Additional Information */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Additional Information
              </h2>
              <FormGroup>
                <Textarea
                  label="Notes"
                  {...register('notes')}
                  error={errors.notes?.message}
                  rows={4}
                />
              </FormGroup>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="inline-flex items-center px-6 py-2.5 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Save className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Quick Contact
            </h2>
            <div className="space-y-3">
              {client?.email && (
                <a
                  href={`mailto:${client.email}`}
                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-forest-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {client.email}
                </a>
              )}
              {client?.phone && (
                <a
                  href={`tel:${client.phone}`}
                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-forest-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </a>
              )}
              {client?.county && (
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <MapPin className="w-4 h-4" />
                  {client.county}
                </div>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
              <button
                onClick={() =>
                  router.push(`/admin/projects/new?client_id=${clientId}`)
                }
                className="inline-flex items-center px-3 py-1.5 text-sm bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                New
              </button>
            </div>

            {projects.length === 0 ? (
              <p className="text-sm text-slate-500">No projects yet</p>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                    className="w-full text-left p-3 border border-slate-200 rounded-lg hover:border-forest-600 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 group-hover:text-forest-600">
                          {project.project_name}
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          {project.location} • {project.area_hectares} ha
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-forest-600 flex-shrink-0 ml-2" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Metadata
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Created:</span>
                <span className="text-slate-900">
                  {client?.created_at &&
                    new Date(client.created_at).toLocaleDateString('en-GB')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Updated:</span>
                <span className="text-slate-900">
                  {client?.updated_at &&
                    new Date(client.updated_at).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
