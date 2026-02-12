/**
 * Admin UI Components - Usage Examples
 *
 * This file demonstrates how to use the admin components in real-world scenarios.
 * Copy these examples into your admin pages as needed.
 */

'use client'

import { useState } from 'react'
import {
  DataTable,
  Column,
  TextInput,
  Textarea,
  Select,
  DateInput,
  Checkbox,
  FormGroup,
  DashboardCard,
  DashboardCardGrid,
  StatsWidget,
  Modal,
  ConfirmModal,
  PhotoGallery,
  PhotoUploader,
  Photo,
} from '@/components/admin'
import { Users, FolderOpen, Image, Mail, Calendar, MapPin } from 'lucide-react'

// Example 1: Client Management Table
export function ClientsTableExample() {
  interface Client {
    id: string
    name: string
    email: string
    phone: string
    status: 'active' | 'inactive'
    createdAt: string
  }

  const clients: Client[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '555-0101',
      status: 'active',
      createdAt: '2024-01-15',
    },
    // ... more clients
  ]

  const columns: Column<Client>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (client) => (
        <div className="font-medium text-slate-900">{client.name}</div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'phone',
      header: 'Phone',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (client) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            client.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {client.status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (client) => new Date(client.createdAt).toLocaleDateString(),
    },
  ]

  return (
    <DataTable
      data={clients}
      columns={columns}
      pageSize={10}
      searchable
      searchPlaceholder="Search clients by name, email, or phone..."
      emptyMessage="No clients found"
      onRowClick={(client) => console.log('Selected client:', client)}
    />
  )
}

// Example 2: Dashboard Overview
export function DashboardExample() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <DashboardCardGrid columns={4}>
        <DashboardCard
          title="Total Clients"
          value={42}
          description="Active clients"
          icon={Users}
          iconColor="text-forest-600"
          iconBgColor="bg-forest-50"
          trend={{ value: 12, isPositive: true, label: 'vs last month' }}
          onClick={() => console.log('Navigate to clients')}
        />

        <DashboardCard
          title="Active Projects"
          value={15}
          description="In progress"
          icon={FolderOpen}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-50"
          trend={{ value: -5, isPositive: false, label: 'vs last month' }}
        />

        <DashboardCard
          title="Photos Uploaded"
          value="1,234"
          description="This month"
          icon={Image}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
        />

        <DashboardCard
          title="Unread Messages"
          value={8}
          icon={Mail}
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
        />
      </DashboardCardGrid>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatsWidget
          title="Team Overview"
          stats={[
            {
              label: 'Team Members',
              value: 12,
              icon: Users,
              iconColor: 'text-forest-600',
              change: { value: 3, isPositive: true },
            },
            {
              label: 'Scheduled Visits',
              value: 28,
              icon: Calendar,
              iconColor: 'text-blue-600',
            },
            {
              label: 'Locations',
              value: 5,
              icon: MapPin,
              iconColor: 'text-amber-600',
            },
          ]}
          variant="default"
        />

        <StatsWidget
          title="Project Statistics"
          stats={[
            {
              label: 'Acres Managed',
              value: '2,450',
              change: { value: 15, isPositive: true },
            },
            {
              label: 'Trees Marked',
              value: '3,890',
            },
            {
              label: 'Site Visits',
              value: 45,
            },
          ]}
          variant="detailed"
        />
      </div>
    </div>
  )
}

// Example 3: Client Form with Validation
export function ClientFormExample() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Handle form submission
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <FormGroup>
        <TextInput
          label="Client Name"
          required
          placeholder="Enter client name"
          helperText="Full legal name or business name"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Email Address" type="email" required />
          <TextInput label="Phone Number" type="tel" />
        </div>

        <Textarea
          label="Address"
          rows={3}
          placeholder="Enter full address"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Client Type"
            required
            options={[
              { value: 'residential', label: 'Residential' },
              { value: 'commercial', label: 'Commercial' },
              { value: 'government', label: 'Government' },
            ]}
            placeholder="Select type"
          />

          <Select
            label="Status"
            required
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>

        <DateInput label="Contract Start Date" />

        <Checkbox label="Send welcome email to client" />

        <Checkbox label="Add to monthly newsletter list" />

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Client'}
          </button>
          <button
            type="button"
            className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </FormGroup>
    </form>
  )
}

// Example 4: Photo Gallery with Upload
export function PhotoGalleryExample() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      src: '/images/project-1.jpg',
      title: 'Forest Assessment',
      description: 'Initial site survey and evaluation',
      uploadedAt: '2024-01-15',
    },
    {
      id: '2',
      src: '/images/project-2.jpg',
      title: 'Tree Marking',
      description: 'Marked trees for selective harvest',
      uploadedAt: '2024-01-20',
    },
  ])

  const handleUpload = async (files: File[]) => {
    console.log('Uploading files:', files)
    // Handle file upload to server
  }

  const handleDelete = async (photo: Photo) => {
    if (confirm('Delete this photo?')) {
      setPhotos(photos.filter((p) => p.id !== photo.id))
    }
  }

  return (
    <div className="space-y-6">
      <PhotoUploader
        onUpload={handleUpload}
        maxFiles={10}
        maxSizeMB={5}
      />

      <PhotoGallery
        photos={photos}
        columns={4}
        gap="md"
        aspectRatio="square"
        showOverlay
        onPhotoDelete={handleDelete}
      />
    </div>
  )
}

// Example 5: Modal Usage
export function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleDelete = () => {
    console.log('Deleting item...')
    setIsConfirmOpen(false)
  }

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-forest-600 text-white rounded-lg"
        >
          Open Form Modal
        </button>
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Delete Item
        </button>
      </div>

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Project"
        description="Update project information"
        size="lg"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Saving...')
                setIsModalOpen(false)
              }}
              className="px-4 py-2 bg-forest-600 text-white rounded-lg"
            >
              Save Changes
            </button>
          </>
        }
      >
        <FormGroup>
          <TextInput label="Project Name" required />
          <Textarea label="Description" rows={4} />
          <Select
            label="Status"
            options={[
              { value: 'planning', label: 'Planning' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
        </FormGroup>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone and all associated data will be permanently removed."
        confirmText="Delete Project"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </>
  )
}
