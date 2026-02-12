'use client'

/**
 * Content Editor Component
 *
 * Interactive form for editing content sections.
 * Supports text, richtext (textarea), and image content types.
 * Includes preview and save functionality.
 */

import { useState } from 'react'
import { ContentType } from '@/lib/db/content'

interface ContentEditorProps {
  pageSlug: string
  sectionKey: string
  label: string
  description: string
  contentType: ContentType
  initialContent: string
  initialMetadata?: Record<string, any>
}

export default function ContentEditor({
  pageSlug,
  sectionKey,
  label,
  description,
  contentType,
  initialContent,
  initialMetadata
}: ContentEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [metadata, setMetadata] = useState(initialMetadata || {})
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showPreview, setShowPreview] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('idle')

    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page_slug: pageSlug,
          section_key: sectionKey,
          content,
          content_type: contentType,
          metadata
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save content')
      }

      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      console.error('Error saving content:', error)
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  const renderEditor = () => {
    if (contentType === 'text') {
      return (
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )
    }

    if (contentType === 'richtext') {
      return (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent font-mono text-sm"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )
    }

    if (contentType === 'image') {
      return (
        <div className="space-y-4">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            placeholder="Enter image URL..."
          />
          {content && (
            <div className="mt-2">
              <img
                src={content}
                alt={label}
                className="max-w-xs rounded-lg border border-slate-200 dark:border-slate-700"
              />
            </div>
          )}
        </div>
      )
    }

    return null
  }

  const renderPreview = () => {
    if (contentType === 'text') {
      return (
        <div className="prose dark:prose-invert max-w-none">
          <p>{content || 'No content yet...'}</p>
        </div>
      )
    }

    if (contentType === 'richtext') {
      return (
        <div className="prose dark:prose-invert max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: content.replace(/\n/g, '<br>')
            }}
          />
        </div>
      )
    }

    if (contentType === 'image') {
      return content ? (
        <img
          src={content}
          alt={label}
          className="max-w-md rounded-lg border border-slate-200 dark:border-slate-700"
        />
      ) : (
        <p className="text-slate-500">No image URL provided</p>
      )
    }

    return null
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          {label}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
          {contentType}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setShowPreview(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !showPreview
                ? 'bg-accent-500 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showPreview
                ? 'bg-accent-500 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            Preview
          </button>
        </div>

        {showPreview ? (
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg min-h-[100px]">
            {renderPreview()}
          </div>
        ) : (
          <div>{renderEditor()}</div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-accent-500 hover:bg-accent-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>

        {saveStatus === 'success' && (
          <span className="text-green-600 dark:text-green-400 font-medium">
            Saved successfully!
          </span>
        )}

        {saveStatus === 'error' && (
          <span className="text-red-600 dark:text-red-400 font-medium">
            Error saving. Please try again.
          </span>
        )}
      </div>
    </div>
  )
}
