'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhotoUploader from '@/components/admin/PhotoUploader'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  name: string
}

export default function PhotoUploadPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [caption, setCaption] = useState('')
  const [photoDate, setPhotoDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // Fetch projects for dropdown
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/admin/projects')
        if (response.ok) {
          const data = await response.json()
          setProjects(data.projects || [])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleUpload = async (files: File[]) => {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file)
    })

    if (selectedProject) {
      formData.append('projectId', selectedProject)
    }

    if (caption) {
      formData.append('caption', caption)
    }

    if (photoDate) {
      formData.append('photoDate', photoDate)
    }

    const response = await fetch('/api/admin/photos', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }

    const data = await response.json()

    if (data.errors && data.errors.length > 0) {
      console.error('Some uploads failed:', data.errors)
    }

    // Show success message
    setUploadSuccess(true)

    // Reset form
    setCaption('')
    setPhotoDate('')

    // Redirect after short delay
    setTimeout(() => {
      router.push('/admin/photos')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/admin/photos"
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Upload Photos</h1>
          </div>
          <p className="text-slate-600">
            Upload new photos to your project library
          </p>
        </div>
      </div>

      {/* Success Message */}
      {uploadSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-green-900">Upload Successful!</p>
            <p className="text-sm text-green-700">
              Redirecting to photo library...
            </p>
          </div>
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Photo Details</h2>
          <p className="text-sm text-slate-600 mt-1">
            Optional metadata for all uploaded photos
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Project Selection */}
          <div>
            <label
              htmlFor="project"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Project (Optional)
            </label>
            <select
              id="project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="">No project (General library)</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Caption */}
          <div>
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Caption (Optional)
            </label>
            <input
              type="text"
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption for these photos"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            />
          </div>

          {/* Photo Date */}
          <div>
            <label
              htmlFor="photoDate"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Photo Date (Optional)
            </label>
            <input
              type="date"
              id="photoDate"
              value={photoDate}
              onChange={(e) => setPhotoDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Photo Uploader */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <PhotoUploader onUpload={handleUpload} maxFiles={20} maxSizeMB={10} />
      </div>
    </div>
  )
}
