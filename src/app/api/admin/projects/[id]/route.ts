/**
 * Single Project API Route
 *
 * Handles operations on individual projects.
 * GET - Get project details
 * PATCH - Update a project
 * DELETE - Delete a project
 */

import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/supabase/server'
import { getProject, updateProject, deleteProject } from '@/lib/db/projects'
import type { ProjectUpdate } from '@/lib/supabase/types'

/**
 * GET /api/admin/projects/[id]
 * Get a single project with full details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Fetch project
    const { data, error } = await getProject(id)

    if (error) {
      console.error('Error fetching project:', error)
      return NextResponse.json(
        { error: 'Failed to fetch project' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error in GET /api/admin/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/projects/[id]
 * Update a project
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Parse request body
    const body = await request.json()

    // Build update object (only include provided fields)
    const updates: ProjectUpdate = {}

    if (body.client_id !== undefined) updates.client_id = body.client_id
    if (body.project_name !== undefined) updates.project_name = body.project_name
    if (body.location !== undefined) updates.location = body.location
    if (body.area_hectares !== undefined)
      updates.area_hectares = parseFloat(body.area_hectares)
    if (body.planting_year !== undefined)
      updates.planting_year = body.planting_year ? parseInt(body.planting_year) : null
    if (body.tree_species !== undefined) updates.tree_species = body.tree_species
    if (body.grant_scheme !== undefined) updates.grant_scheme = body.grant_scheme
    if (body.status !== undefined) updates.status = body.status
    if (body.start_date !== undefined) updates.start_date = body.start_date
    if (body.completion_date !== undefined)
      updates.completion_date = body.completion_date
    if (body.total_cost !== undefined)
      updates.total_cost = body.total_cost ? parseFloat(body.total_cost) : null
    if (body.grant_amount !== undefined)
      updates.grant_amount = body.grant_amount ? parseFloat(body.grant_amount) : null
    if (body.description !== undefined) updates.description = body.description
    if (body.notes !== undefined) updates.notes = body.notes

    // Update the project
    const { data, error } = await updateProject(id, updates)

    if (error) {
      console.error('Error updating project:', error)
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Unexpected error in PATCH /api/admin/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/projects/[id]
 * Delete a project
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Delete the project
    const { success, error } = await deleteProject(id)

    if (error) {
      console.error('Error deleting project:', error)
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      )
    }

    if (!success) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error in DELETE /api/admin/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
