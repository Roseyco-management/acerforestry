'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  TextInput,
  Textarea,
  Select,
  DateInput,
  FormGroup,
} from '@/components/admin/FormFields'
import PhotoGallery, { Photo } from '@/components/admin/PhotoGallery'
import { ArrowLeft, Save, Users, Image as ImageIcon } from 'lucide-react'
import type { ProjectWithDetails } from '@/lib/db/projects'
import type { Client, TeamMember } from '@/lib/supabase/types'

const STATUS_OPTIONS = [
  { value: 'planning', label: 'Planning' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'planting', label: 'Planting' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'completed', label: 'Completed' },
  { value: 'on_hold', label: 'On Hold' },
]

const COMMON_SPECIES = [
  'Oak',
  'Ash',
  'Beech',
  'Birch',
  'Scots Pine',
  'Sitka Spruce',
  'Norway Spruce',
  'Larch',
  'Douglas Fir',
  'Alder',
  'Willow',
  'Hazel',
  'Rowan',
  'Wild Cherry',
]

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [project, setProject] = useState<ProjectWithDetails | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [speciesInput, setSpeciesInput] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<
    'details' | 'photos' | 'team'
  >('details')

  const [formData, setFormData] = useState({
    client_id: '',
    project_name: '',
    location: '',
    area_hectares: '',
    planting_year: '',
    grant_scheme: '',
    status: 'planning',
    start_date: '',
    completion_date: '',
    total_cost: '',
    grant_amount: '',
    description: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchProject()
    fetchClients()
    fetchTeamMembers()
  }, [id])

  const fetchProject = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/projects/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch project')
      }

      const result = await response.json()
      const projectData = result.data

      setProject(projectData)
      setFormData({
        client_id: projectData.client_id || '',
        project_name: projectData.project_name || '',
        location: projectData.location || '',
        area_hectares: projectData.area_hectares?.toString() || '',
        planting_year: projectData.planting_year?.toString() || '',
        grant_scheme: projectData.grant_scheme || '',
        status: projectData.status || 'planning',
        start_date: projectData.start_date || '',
        completion_date: projectData.completion_date || '',
        total_cost: projectData.total_cost?.toString() || '',
        grant_amount: projectData.grant_amount?.toString() || '',
        description: projectData.description || '',
        notes: projectData.notes || '',
      })
      setSelectedSpecies(projectData.tree_species || [])
    } catch (error) {
      console.error('Error fetching project:', error)
      alert('Failed to load project')
      router.push('/admin/projects')
    } finally {
      setLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients')
      if (!response.ok) throw new Error('Failed to fetch clients')
      const result = await response.json()
      setClients(result.data || [])
    } catch (error) {
      console.error('Error fetching clients:', error)
    }
  }

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/admin/team')
      if (!response.ok) throw new Error('Failed to fetch team members')
      const result = await response.json()
      setTeamMembers(result.data || [])
    } catch (error) {
      console.error('Error fetching team members:', error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const addSpecies = (species: string) => {
    if (species && !selectedSpecies.includes(species)) {
      setSelectedSpecies([...selectedSpecies, species])
      setSpeciesInput('')
    }
  }

  const removeSpecies = (species: string) => {
    setSelectedSpecies(selectedSpecies.filter((s) => s !== species))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.client_id) newErrors.client_id = 'Client is required'
    if (!formData.project_name)
      newErrors.project_name = 'Project name is required'
    if (!formData.location) newErrors.location = 'Location is required'
    if (!formData.area_hectares) {
      newErrors.area_hectares = 'Area is required'
    } else if (parseFloat(formData.area_hectares) <= 0) {
      newErrors.area_hectares = 'Area must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setSaving(true)

      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tree_species: selectedSpecies.length > 0 ? selectedSpecies : null,
          area_hectares: parseFloat(formData.area_hectares),
          planting_year: formData.planting_year
            ? parseInt(formData.planting_year)
            : null,
          total_cost: formData.total_cost
            ? parseFloat(formData.total_cost)
            : null,
          grant_amount: formData.grant_amount
            ? parseFloat(formData.grant_amount)
            : null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update project')
      }

      alert('Project updated successfully')
      fetchProject()
    } catch (error) {
      console.error('Error updating project:', error)
      alert(
        error instanceof Error ? error.message : 'Failed to update project'
      )
    } finally {
      setSaving(false)
    }
  }

  const clientOptions = [
    { value: '', label: 'Select a client...' },
    ...clients.map((client) => ({
      value: client.id,
      label: client.company_name || client.contact_name,
    })),
  ]

  // Convert project photos to gallery format
  const galleryPhotos: Photo[] =
    project?.photos.map((photo) => ({
      id: photo.id,
      src: photo.storage_path,
      alt: photo.title || undefined,
      title: photo.title || undefined,
      description: photo.description || undefined,
      uploadedAt: photo.created_at,
    })) || []

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Project not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">
            {project.project_name}
          </h1>
          <p className="mt-2 text-slate-600">
            {project.client?.company_name || project.client?.contact_name} • {project.location}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-1 font-medium transition-colors border-b-2 ${
              activeTab === 'details'
                ? 'border-forest-600 text-forest-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Details
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`pb-3 px-1 font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'photos'
                ? 'border-forest-600 text-forest-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Photos ({project.photos.length})
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`pb-3 px-1 font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'team'
                ? 'border-forest-600 text-forest-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Team ({project.team.length})
          </button>
        </div>
      </div>

      {/* Details Tab */}
      {activeTab === 'details' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Basic Information
            </h2>
            <FormGroup>
              <Select
                label="Client"
                name="client_id"
                options={clientOptions}
                value={formData.client_id}
                onChange={handleChange}
                error={errors.client_id}
                required
              />
              <TextInput
                label="Project Name"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                error={errors.project_name}
                required
              />
              <TextInput
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Area (hectares)"
                  name="area_hectares"
                  type="number"
                  step="0.01"
                  value={formData.area_hectares}
                  onChange={handleChange}
                  error={errors.area_hectares}
                  required
                />
                <TextInput
                  label="Planting Year"
                  name="planting_year"
                  type="number"
                  value={formData.planting_year}
                  onChange={handleChange}
                />
              </div>
            </FormGroup>
          </div>

          {/* Tree Species */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Tree Species
            </h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={speciesInput}
                  onChange={(e) => setSpeciesInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSpecies(speciesInput)
                    }
                  }}
                  placeholder="Type species name and press Enter"
                  className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => addSpecies(speciesInput)}
                  className="px-4 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Common Species Quick Add */}
              <div>
                <p className="text-sm text-slate-600 mb-2">Common species:</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SPECIES.map((species) => (
                    <button
                      key={species}
                      type="button"
                      onClick={() => addSpecies(species)}
                      disabled={selectedSpecies.includes(species)}
                      className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:border-forest-600 hover:text-forest-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {species}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Species */}
              {selectedSpecies.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Selected species:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecies.map((species) => (
                      <span
                        key={species}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-100 text-forest-800 rounded-lg"
                      >
                        {species}
                        <button
                          type="button"
                          onClick={() => removeSpecies(species)}
                          className="text-forest-600 hover:text-forest-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Project Details
            </h2>
            <FormGroup>
              <Select
                label="Status"
                name="status"
                options={STATUS_OPTIONS}
                value={formData.status}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DateInput
                  label="Start Date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                />
                <DateInput
                  label="Completion Date"
                  name="completion_date"
                  value={formData.completion_date}
                  onChange={handleChange}
                />
              </div>
              <TextInput
                label="Grant Scheme"
                name="grant_scheme"
                value={formData.grant_scheme}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Total Cost (£)"
                  name="total_cost"
                  type="number"
                  step="0.01"
                  value={formData.total_cost}
                  onChange={handleChange}
                />
                <TextInput
                  label="Grant Amount (£)"
                  name="grant_amount"
                  type="number"
                  step="0.01"
                  value={formData.grant_amount}
                  onChange={handleChange}
                />
              </div>
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
              <Textarea
                label="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
              />
            </FormGroup>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Photos Tab */}
      {activeTab === 'photos' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Project Photos
          </h2>
          <PhotoGallery
            photos={galleryPhotos}
            columns={4}
            emptyMessage="No photos uploaded yet"
          />
          <p className="mt-4 text-sm text-slate-500">
            Photo upload functionality will be implemented in the photo library system.
          </p>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Assigned Team Members
          </h2>
          {project.team.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              No team members assigned yet
            </p>
          ) : (
            <div className="space-y-3">
              {project.team.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {assignment.team_member.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {assignment.role_on_project} • {assignment.team_member.role}
                      {assignment.team_member.company_name &&
                        ` • ${assignment.team_member.company_name}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="mt-4 text-sm text-slate-500">
            Team member assignment functionality will be enhanced in future updates.
          </p>
        </div>
      )}
    </div>
  )
}
