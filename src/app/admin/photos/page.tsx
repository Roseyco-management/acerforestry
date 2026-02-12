'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PhotoGallery, { Photo } from '@/components/admin/PhotoGallery'
import { Plus, Filter, Search, Download, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  name: string
}

interface PhotoData {
  id: string
  url: string
  caption: string | null
  photo_date: string | null
  file_name: string
  created_at: string
  projects: { name: string } | null
}

export default function PhotosPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Fetch photos and projects
  useEffect(() => {
    async function fetchData() {
      try {
        const [photosRes, projectsRes] = await Promise.all([
          fetch('/api/admin/photos'),
          fetch('/api/admin/projects'),
        ])

        if (photosRes.ok) {
          const photosData = await photosRes.json()
          const formattedPhotos: Photo[] = (photosData.photos || []).map(
            (p: PhotoData) => ({
              id: p.id,
              src: p.url,
              title: p.file_name,
              description: p.caption || undefined,
              alt: p.caption || p.file_name,
              uploadedAt: p.created_at,
            })
          )
          setPhotos(formattedPhotos)
          setFilteredPhotos(formattedPhotos)
        }

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json()
          setProjects(projectsData.projects || [])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter photos
  useEffect(() => {
    let filtered = photos

    if (selectedProject !== 'all') {
      filtered = filtered.filter((photo) => {
        // This would need project_id on the photo object
        // For now, this is a placeholder
        return true
      })
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (photo) =>
          photo.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredPhotos(filtered)
  }, [photos, selectedProject, searchQuery])

  const handleDelete = async (photo: Photo) => {
    if (deleteConfirm !== photo.id) {
      setDeleteConfirm(photo.id)
      setTimeout(() => setDeleteConfirm(null), 3000)
      return
    }

    try {
      const response = await fetch(`/api/admin/photos?id=${photo.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete photo')
      }

      setPhotos((prev) => prev.filter((p) => p.id !== photo.id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('Failed to delete photo')
    }
  }

  const stats = {
    total: photos.length,
    thisMonth: photos.filter((p) => {
      const date = new Date(p.uploadedAt || '')
      const now = new Date()
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      )
    }).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide text-white">Photo Library</h1>
          <p className="text-white/80 mt-1">
            Manage your project photos and gallery
          </p>
        </div>
        <Link
          href="/admin/photos/upload"
          className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          Upload Photos
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-forest-700 dark:bg-forest-800 rounded-xl shadow-forest-lg border-2 border-forest-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white/80">Total Photos</p>
              <p className="text-3xl font-bold text-white mt-1">
                {stats.total}
              </p>
            </div>
            <div className="p-3 bg-forest-600 rounded-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-forest-700 dark:bg-forest-800 rounded-xl shadow-forest-lg border-2 border-forest-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white/80">This Month</p>
              <p className="text-3xl font-bold text-white mt-1">
                {stats.thisMonth}
              </p>
            </div>
            <div className="p-3 bg-forest-600 rounded-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-forest-700 dark:bg-forest-800 rounded-xl shadow-forest-lg border-2 border-forest-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white/80">Storage Used</p>
              <p className="text-3xl font-bold text-white mt-1">-</p>
            </div>
            <div className="p-3 bg-forest-600 rounded-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-forest-700 dark:bg-forest-800 rounded-xl shadow-forest-lg border-2 border-forest-600 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            />
          </div>

          {/* Project Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="bg-forest-700 dark:bg-forest-800 rounded-xl shadow-forest-lg border-2 border-forest-600 p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <PhotoGallery
            photos={filteredPhotos}
            columns={4}
            gap="md"
            aspectRatio="square"
            showOverlay={true}
            onPhotoDelete={(photo) => handleDelete(photo)}
            emptyMessage="No photos yet. Upload your first photos to get started!"
          />
        )}
      </div>

      {/* Delete Confirmation Toast */}
      {deleteConfirm && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
          <Trash2 className="w-5 h-5" />
          <p className="font-medium">Click delete again to confirm</p>
        </div>
      )}
    </div>
  )
}
