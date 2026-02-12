'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  TextInput,
  Textarea,
  Select,
  FormGroup,
} from '@/components/admin/FormFields'
import { ArrowLeft, Save } from 'lucide-react'

// Validation schema
const clientFormSchema = z.object({
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

type ClientFormData = z.infer<typeof clientFormSchema>

export default function NewClientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      status: 'prospect',
    },
  })

  const onSubmit = async (data: ClientFormData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Convert total_woodland_area to number if present
      const payload = {
        ...data,
        total_woodland_area: data.total_woodland_area
          ? parseFloat(data.total_woodland_area)
          : null,
      }

      const response = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        router.push(`/admin/clients/${result.client.id}`)
      } else {
        setError(result.error || 'Failed to create client')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Error creating client:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Add New Client
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Create a new client record
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

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
              placeholder="John Smith"
            />

            <TextInput
              label="Company Name"
              {...register('company_name')}
              error={errors.company_name?.message}
              placeholder="Smith Forestry Ltd"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Email"
                type="email"
                required
                {...register('email')}
                error={errors.email?.message}
                placeholder="john@example.com"
              />

              <TextInput
                label="Phone"
                type="tel"
                {...register('phone')}
                error={errors.phone?.message}
                placeholder="01234 567890"
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
              placeholder="123 Main Street, Village Name"
              rows={3}
            />

            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Postcode"
                {...register('postcode')}
                error={errors.postcode?.message}
                placeholder="AB12 3CD"
              />

              <TextInput
                label="County"
                {...register('county')}
                error={errors.county?.message}
                placeholder="Devon"
              />
            </div>

            <TextInput
              label="Total Woodland Area (hectares)"
              type="number"
              step="0.01"
              {...register('total_woodland_area')}
              error={errors.total_woodland_area?.message}
              placeholder="25.5"
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
              placeholder="Any additional information about this client..."
              rows={4}
            />
          </FormGroup>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-2.5 bg-forest-600 text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Creating...' : 'Create Client'}
          </button>
        </div>
      </form>
    </div>
  )
}
