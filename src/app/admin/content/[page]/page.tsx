/**
 * Content Section Editor
 *
 * Edit individual content sections for a specific page.
 * Supports text, richtext, and image content types.
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  listEditablePages,
  getPageContent,
  getPageSectionDefinitions
} from '@/lib/db/content'
import ContentEditor from '@/components/admin/ContentEditor'

interface PageParams {
  params: Promise<{
    page: string
  }>
}

export default async function EditPageContent({ params }: PageParams) {
  const { page: pageSlug } = await params

  // Validate page exists
  const pages = await listEditablePages()
  const page = pages.find((p) => p.slug === pageSlug)

  if (!page) {
    notFound()
  }

  // Get existing content and section definitions
  const existingContent = await getPageContent(pageSlug)
  const sectionDefinitions = getPageSectionDefinitions(pageSlug)

  // Create a map of existing content for easy lookup
  const contentMap = new Map(
    existingContent.map((section) => [section.section_key, section])
  )

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/content"
          className="text-accent-600 dark:text-accent-400 hover:underline mb-4 inline-block"
        >
          ← Back to all pages
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Edit {page.title}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {page.description}
        </p>
      </div>

      <div className="space-y-6">
        {sectionDefinitions.map((definition) => {
          const existingSection = contentMap.get(definition.key)
          return (
            <ContentEditor
              key={definition.key}
              pageSlug={pageSlug}
              sectionKey={definition.key}
              label={definition.label}
              description={definition.description}
              contentType={definition.type}
              initialContent={existingSection?.content || ''}
              initialMetadata={existingSection?.metadata}
            />
          )
        })}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const pages = await listEditablePages()
  return pages.map((page) => ({
    page: page.slug
  }))
}
