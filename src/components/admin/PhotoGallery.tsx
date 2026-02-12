'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { X, ChevronLeft, ChevronRight, ZoomIn, Download, Trash2 } from 'lucide-react'
import Image from 'next/image'

export interface Photo {
  id: string
  src: string
  alt?: string
  title?: string
  description?: string
  uploadedAt?: Date | string
}

export interface PhotoGalleryProps {
  photos: Photo[]
  columns?: 2 | 3 | 4 | 5
  gap?: 'sm' | 'md' | 'lg'
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto'
  showOverlay?: boolean
  onPhotoClick?: (photo: Photo) => void
  onPhotoDelete?: (photo: Photo) => void
  className?: string
  emptyMessage?: string
}

/**
 * Photo gallery component with grid layout and lightbox viewer
 * Supports multiple columns, aspect ratios, and actions
 * Fully responsive and accessible
 */
export default function PhotoGallery({
  photos,
  columns = 4,
  gap = 'md',
  aspectRatio = 'square',
  showOverlay = true,
  onPhotoClick,
  onPhotoDelete,
  className,
  emptyMessage = 'No photos available',
}: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  }

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  }

  const handlePhotoClick = (photo: Photo, index: number) => {
    if (onPhotoClick) {
      onPhotoClick(photo)
    } else {
      setLightboxIndex(index)
    }
  }

  const closeLightbox = () => setLightboxIndex(null)

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return

    const newIndex =
      direction === 'prev'
        ? (lightboxIndex - 1 + photos.length) % photos.length
        : (lightboxIndex + 1) % photos.length

    setLightboxIndex(newIndex)
  }

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 border-2 border-dashed border-slate-300 rounded-lg">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className={cn('grid', gridCols[columns], gapClasses[gap], className)}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={cn(
              'relative group overflow-hidden rounded-lg bg-slate-100 cursor-pointer',
              aspectRatioClasses[aspectRatio]
            )}
            onClick={() => handlePhotoClick(photo, index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt || photo.title || `Photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes={`(max-width: 768px) 100vw, (max-width: 1024px) 50vw, ${100 / columns}vw`}
            />

            {/* Overlay */}
            {showOverlay && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {photo.title && (
                    <p className="text-white font-medium text-sm mb-1">{photo.title}</p>
                  )}
                  {photo.description && (
                    <p className="text-white/80 text-xs line-clamp-2">{photo.description}</p>
                  )}
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex(index)
                    }}
                    className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                    aria-label="View full size"
                  >
                    <ZoomIn className="w-4 h-4 text-slate-700" />
                  </button>
                  {onPhotoDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onPhotoDelete(photo)
                      }}
                      className="p-2 bg-red-500/90 rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="Delete photo"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Buttons */}
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox('prev')
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox('next')
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].alt || photos[lightboxIndex].title || `Photo ${lightboxIndex + 1}`}
                width={1920}
                height={1080}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                priority
              />
            </div>

            {/* Photo Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              {photos[lightboxIndex].title && (
                <h3 className="text-white font-semibold text-lg mb-1">
                  {photos[lightboxIndex].title}
                </h3>
              )}
              {photos[lightboxIndex].description && (
                <p className="text-white/80 text-sm mb-2">
                  {photos[lightboxIndex].description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <p className="text-white/60 text-sm">
                  {lightboxIndex + 1} / {photos.length}
                </p>
                <div className="flex gap-2">
                  <a
                    href={photos[lightboxIndex].src}
                    download
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    aria-label="Download photo"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-5 h-5 text-white" />
                  </a>
                  {onPhotoDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onPhotoDelete(photos[lightboxIndex])
                        closeLightbox()
                      }}
                      className="p-2 bg-red-500/80 rounded-lg hover:bg-red-600 transition-colors"
                      aria-label="Delete photo"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Simple photo uploader component
export interface PhotoUploaderProps {
  onUpload: (files: File[]) => void
  maxFiles?: number
  maxSizeMB?: number
  accept?: string
  className?: string
}

/**
 * Simple drag-and-drop photo uploader
 */
export function PhotoUploader({
  onUpload,
  maxFiles = 10,
  maxSizeMB = 5,
  accept = 'image/*',
  className,
}: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    )

    if (files.length > 0) {
      onUpload(files.slice(0, maxFiles))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onUpload(files.slice(0, maxFiles))
    }
  }

  return (
    <div
      className={cn(
        'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors',
        isDragging
          ? 'border-forest-600 bg-forest-50'
          : 'border-slate-300 hover:border-slate-400',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Upload photos"
      />
      <div className="pointer-events-none">
        <div className="mx-auto w-12 h-12 mb-4 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-slate-600 font-medium mb-1">
          Drag and drop photos here, or click to select
        </p>
        <p className="text-sm text-slate-500">
          Maximum {maxFiles} files, {maxSizeMB}MB each
        </p>
      </div>
    </div>
  )
}
