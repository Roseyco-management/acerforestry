'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export interface PhotoFile {
  file: File
  preview: string
  id: string
}

export interface PhotoUploaderProps {
  onUpload: (files: File[]) => Promise<void>
  maxFiles?: number
  maxSizeMB?: number
  accept?: Record<string, string[]>
  className?: string
  projectId?: string
}

export default function PhotoUploader({
  onUpload,
  maxFiles = 20,
  maxSizeMB = 10,
  accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
  },
  className,
}: PhotoUploaderProps) {
  const [files, setFiles] = useState<PhotoFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null)

    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map((f) => {
        if (f.errors[0]?.code === 'file-too-large') {
          return `${f.file.name} is too large (max ${maxSizeMB}MB)`
        }
        if (f.errors[0]?.code === 'file-invalid-type') {
          return `${f.file.name} is not a supported image format`
        }
        return `${f.file.name} was rejected`
      })
      setError(errors.join(', '))
      return
    }

    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7),
    }))

    setFiles((prev) => [...prev, ...newFiles])
  }, [maxSizeMB])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSizeMB * 1024 * 1024,
    maxFiles,
    multiple: true,
  })

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setError(null)

    try {
      await onUpload(files.map((f) => f.file))

      // Clear files after successful upload
      files.forEach((f) => URL.revokeObjectURL(f.preview))
      setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer',
          isDragActive
            ? 'border-forest-600 bg-forest-50/50 scale-[1.02]'
            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/50',
          files.length > 0 && 'p-8'
        )}
      >
        <input {...getInputProps()} />
        <div className="pointer-events-none">
          <div className="mx-auto w-16 h-16 mb-4 text-slate-400">
            <Upload className="w-full h-full" strokeWidth={1.5} />
          </div>
          <p className="text-slate-700 font-semibold text-lg mb-2">
            {isDragActive ? 'Drop photos here' : 'Drag & drop photos here'}
          </p>
          <p className="text-sm text-slate-500 mb-4">
            or click to browse your files
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" />
              JPG, PNG, WebP
            </span>
            <span>•</span>
            <span>Max {maxSizeMB}MB per file</span>
            <span>•</span>
            <span>Up to {maxFiles} files</span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">Upload Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Preview Grid */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              {files.length} {files.length === 1 ? 'photo' : 'photos'} ready to upload
            </p>
            <button
              onClick={() => {
                files.forEach((f) => URL.revokeObjectURL(f.preview))
                setFiles([])
              }}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((photoFile) => (
              <div
                key={photoFile.id}
                className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 group"
              >
                <Image
                  src={photoFile.preview}
                  alt={photoFile.file.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
                  <button
                    onClick={() => removeFile(photoFile.id)}
                    className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove photo"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs truncate">{photoFile.file.name}</p>
                  <p className="text-white/70 text-xs">
                    {(photoFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => {
                files.forEach((f) => URL.revokeObjectURL(f.preview))
                setFiles([])
              }}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={cn(
                'px-6 py-2 rounded-lg text-sm font-semibold text-white transition-all',
                uploading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-forest-600 hover:bg-forest-700 hover:shadow-lg'
              )}
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </span>
              ) : (
                `Upload ${files.length} ${files.length === 1 ? 'Photo' : 'Photos'}`
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
