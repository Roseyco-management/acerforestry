/**
 * Content Management - Page Selector
 *
 * Shows all editable pages and allows navigation to edit each page's sections.
 */

import Link from 'next/link'
import { listEditablePages } from '@/lib/db/content'

export default async function ContentPage() {
  const pages = await listEditablePages()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-white">
          Content Management
        </h1>
        <p className="mt-2 text-white/80">
          Select a page to edit its content sections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/content/${page.slug}`}
            className="block p-6 bg-forest-700 dark:bg-forest-800 rounded-lg border-2 border-forest-600 shadow-forest-lg hover:border-white transition-colors"
          >
            <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
              {page.title}
            </h3>
            <p className="text-white/80">
              {page.description}
            </p>
            <div className="mt-4 text-white font-bold">
              Edit content →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
