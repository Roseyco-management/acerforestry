/**
 * Projects API Route
 *
 * Handles CRUD operations for projects.
 * GET - List all projects with filters
 * POST - Create a new project
 */

import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/supabase/server'
import { listProjects, createProject } from '@/lib/db/projects'
import type { ProjectInsert } from '@/lib/supabase/types'
import { isDevMode, DEV_PROJECTS } from '@/lib/dev-data'

/**
 * GET /api/admin/projects
 * List projects with optional filters
 *
 * Query params:
 * - status: string | string[] - Filter by status
 * - clientId: string - Filter by client
 * - dateStart: string - Start date for range filter
 * - dateEnd: string - End date for range filter
 * - search: string - Search term
 */
export async function GET(request: NextRequest) {
  try {
    // 🔓 DEV MODE - Return dummy data if using placeholder Supabase
    if (isDevMode()) {
      return NextResponse.json({
        success: true,
        data: DEV_PROJECTS,
        count: DEV_PROJECTS.length,
      })
    }

    // Check authentication
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const clientId = searchParams.get('clientId')
    const dateStart = searchParams.get('dateStart')
    const dateEnd = searchParams.get('dateEnd')
    const search = searchParams.get('search')

    // Build filters
    const filters: any = {}

    if (status) {
      // Handle multiple statuses (comma-separated)
      filters.status = status.includes(',') ? status.split(',') : status
    }

    if (clientId) {
      filters.clientId = clientId
    }

    if (dateStart && dateEnd) {
      filters.dateRange = {
        start: dateStart,
        end: dateEnd,
      }
    }

    if (search) {
      filters.search = search
    }

    // Fetch projects
    const { data, error } = await listProjects(filters)

    if (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error in GET /api/admin/projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/projects
 * Create a new project
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['client_id', 'project_name', 'location', 'area_hectares']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create project data object
    const projectData: ProjectInsert = {
      client_id: body.client_id,
      project_name: body.project_name,
      location: body.location,
      area_hectares: parseFloat(body.area_hectares),
      planting_year: body.planting_year ? parseInt(body.planting_year) : null,
      tree_species: body.tree_species || null,
      grant_scheme: body.grant_scheme || null,
      status: body.status || 'planning',
      start_date: body.start_date || null,
      completion_date: body.completion_date || null,
      total_cost: body.total_cost ? parseFloat(body.total_cost) : null,
      grant_amount: body.grant_amount ? parseFloat(body.grant_amount) : null,
      description: body.description || null,
      notes: body.notes || null,
    }

    // Create the project
    const { data, error } = await createProject(projectData)

    if (error) {
      console.error('Error creating project:', error)
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error in POST /api/admin/projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
