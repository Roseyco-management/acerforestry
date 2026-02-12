import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  listClients,
  createClient,
  updateClient,
  deleteClient,
} from '@/lib/db/clients'
import type { ClientInsert, ClientUpdate } from '@/lib/supabase/types'
import { isDevMode, DEV_CLIENTS } from '@/lib/dev-data'

// Validation schema for client data
const clientSchema = z.object({
  contact_name: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  company_name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  postcode: z.string().optional().nullable(),
  county: z.string().optional().nullable(),
  total_woodland_area: z.number().optional().nullable(),
  status: z.enum(['active', 'inactive', 'prospect']).optional(),
  notes: z.string().optional().nullable(),
})

/**
 * GET /api/admin/clients
 * List all clients with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    // 🔓 DEV MODE - Return dummy data if using placeholder Supabase
    if (isDevMode()) {
      return NextResponse.json({
        success: true,
        data: DEV_CLIENTS,
        count: DEV_CLIENTS.length,
      })
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') as
      | 'active'
      | 'inactive'
      | 'prospect'
      | null
    const search = searchParams.get('search')

    const filters: any = {}
    if (status) filters.status = status
    if (search) filters.search = search

    const clients = await listClients(filters)

    return NextResponse.json({ data: clients }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/admin/clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/clients
 * Create a new client
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validationResult = clientSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const clientData: ClientInsert = {
      ...validationResult.data,
      status: validationResult.data.status || 'prospect',
    }

    const client = await createClient(clientData)

    return NextResponse.json({ client }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/clients:', error)
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/admin/clients
 * Update an existing client
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      )
    }

    // Validate the update data
    const validationResult = clientSchema.partial().safeParse(updateData)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const clientData: ClientUpdate = validationResult.data

    const client = await updateClient(id, clientData)

    return NextResponse.json({ client }, { status: 200 })
  } catch (error) {
    console.error('Error in PUT /api/admin/clients:', error)
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/clients
 * Soft delete a client (set status to inactive)
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      )
    }

    await deleteClient(id)

    return NextResponse.json(
      { message: 'Client deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in DELETE /api/admin/clients:', error)
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    )
  }
}
