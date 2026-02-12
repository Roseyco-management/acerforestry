/**
 * Content Management API Routes
 *
 * Endpoints:
 * - GET: Fetch content by page_slug and optional section_key
 * - POST: Update/create content section
 * - DELETE: Remove content section
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  getPageContent,
  getSectionContent,
  updateContent,
  deleteContent,
  ContentType
} from '@/lib/db/content'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const pageSlug = searchParams.get('page_slug')
    const sectionKey = searchParams.get('section_key')

    if (!pageSlug) {
      return NextResponse.json(
        { error: 'page_slug is required' },
        { status: 400 }
      )
    }

    // If section_key provided, get specific section
    if (sectionKey) {
      const section = await getSectionContent(pageSlug, sectionKey)
      if (!section) {
        return NextResponse.json(
          { error: 'Section not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(section)
    }

    // Otherwise, get all sections for the page
    const sections = await getPageContent(pageSlug)
    return NextResponse.json(sections)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page_slug, section_key, content, content_type, metadata } = body

    // Validate required fields
    if (!page_slug || !section_key || !content) {
      return NextResponse.json(
        { error: 'page_slug, section_key, and content are required' },
        { status: 400 }
      )
    }

    // Validate content_type
    const validTypes: ContentType[] = ['text', 'image', 'richtext']
    const type: ContentType = content_type || 'text'
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid content_type. Must be text, image, or richtext' },
        { status: 400 }
      )
    }

    const updatedSection = await updateContent(
      page_slug,
      section_key,
      content,
      type,
      metadata
    )

    return NextResponse.json(updatedSection)
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const pageSlug = searchParams.get('page_slug')
    const sectionKey = searchParams.get('section_key')

    if (!pageSlug || !sectionKey) {
      return NextResponse.json(
        { error: 'page_slug and section_key are required' },
        { status: 400 }
      )
    }

    await deleteContent(pageSlug, sectionKey)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Failed to delete content' },
      { status: 500 }
    )
  }
}
