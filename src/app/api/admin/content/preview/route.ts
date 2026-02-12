/**
 * Content Preview API
 *
 * Allows previewing content changes without saving them.
 * Returns rendered HTML or formatted content based on content type.
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, content_type } = body

    if (!content || !content_type) {
      return NextResponse.json(
        { error: 'content and content_type are required' },
        { status: 400 }
      )
    }

    // For now, just return the content as-is
    // In the future, this could render markdown, process images, etc.
    let previewHtml = ''

    switch (content_type) {
      case 'text':
        previewHtml = `<p>${content}</p>`
        break
      case 'richtext':
        // Simple line break conversion for MVP
        previewHtml = content.replace(/\n/g, '<br>')
        break
      case 'image':
        previewHtml = `<img src="${content}" alt="Preview" class="max-w-md rounded-lg" />`
        break
      default:
        previewHtml = content
    }

    return NextResponse.json({
      preview: previewHtml,
      content,
      content_type
    })
  } catch (error) {
    console.error('Error generating preview:', error)
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    )
  }
}
