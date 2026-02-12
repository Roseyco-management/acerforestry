import { NextRequest, NextResponse } from 'next/server'
import { getClientProjects } from '@/lib/db/clients'

/**
 * GET /api/admin/clients/[id]/projects
 * Get all projects for a specific client
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const projects = await getClientProjects(id)

    return NextResponse.json({ projects }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/admin/clients/[id]/projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
