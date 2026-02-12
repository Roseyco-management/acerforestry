import { NextRequest, NextResponse } from 'next/server'
import { getClient } from '@/lib/db/clients'

/**
 * GET /api/admin/clients/[id]
 * Get a single client by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const client = await getClient(id)

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({ client }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/admin/clients/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    )
  }
}
