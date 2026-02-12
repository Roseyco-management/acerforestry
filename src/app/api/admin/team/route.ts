/**
 * Team Members API Route
 *
 * Handles CRUD operations for team members (contractors, staff, subcontractors).
 *
 * Routes:
 * GET    /api/admin/team - List all team members with optional filters
 * POST   /api/admin/team - Create a new team member
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  listTeamMembers,
  createTeamMember,
  type TeamMemberFilters,
} from '@/lib/db/team'
import { isDevMode, DEV_TEAM } from '@/lib/dev-data'

/**
 * GET /api/admin/team
 * List team members with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    // 🔓 DEV MODE - Return dummy data if using placeholder Supabase
    if (isDevMode()) {
      return NextResponse.json({
        success: true,
        data: DEV_TEAM,
        count: DEV_TEAM.length,
      })
    }

    const searchParams = request.nextUrl.searchParams

    const filters: TeamMemberFilters = {
      role: searchParams.get('role') || undefined,
      status: (searchParams.get('status') as 'active' | 'inactive') || undefined,
      availability: (searchParams.get('availability') as
        | 'available'
        | 'busy'
        | 'unavailable') || undefined,
      search: searchParams.get('search') || undefined,
    }

    const teamMembers = await listTeamMembers(filters)

    return NextResponse.json({
      success: true,
      data: teamMembers,
      count: teamMembers.length,
    })
  } catch (error) {
    console.error('Error listing team members:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to list team members',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/team
 * Create a new team member
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.role || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, role, phone',
        },
        { status: 400 }
      )
    }

    const newMember = await createTeamMember(body)

    return NextResponse.json(
      {
        success: true,
        data: newMember,
        message: 'Team member created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create team member',
      },
      { status: 500 }
    )
  }
}
