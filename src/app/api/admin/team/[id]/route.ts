/**
 * Team Member API Route (Single Member)
 *
 * Handles operations for a specific team member.
 *
 * Routes:
 * GET    /api/admin/team/[id] - Get a single team member
 * PUT    /api/admin/team/[id] - Update a team member
 * DELETE /api/admin/team/[id] - Delete a team member
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  getTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getMemberProjects,
} from '@/lib/db/team'

/**
 * GET /api/admin/team/[id]
 * Get a single team member with their assigned projects
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const [member, projects] = await Promise.all([
      getTeamMember(id),
      getMemberProjects(id),
    ])

    return NextResponse.json({
      success: true,
      data: {
        ...member,
        projects,
      },
    })
  } catch (error) {
    console.error('Error getting team member:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get team member',
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/admin/team/[id]
 * Update a team member
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedMember = await updateTeamMember(id, body)

    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: 'Team member updated successfully',
    })
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update team member',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/team/[id]
 * Delete (deactivate) a team member
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const searchParams = request.nextUrl.searchParams
    const hard = searchParams.get('hard') === 'true'

    await deleteTeamMember(id, hard)

    return NextResponse.json({
      success: true,
      message: hard
        ? 'Team member deleted successfully'
        : 'Team member deactivated successfully',
    })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete team member',
      },
      { status: 500 }
    )
  }
}
