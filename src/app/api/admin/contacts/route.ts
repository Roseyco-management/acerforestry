/**
 * Admin Contact Submissions API
 *
 * GET /api/admin/contacts - List submissions with filters
 * PATCH /api/admin/contacts - Update submission status/notes
 * DELETE /api/admin/contacts - Delete submission
 */

import { createClient } from '@/lib/supabase/server'
import { getUserProfile } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { isDevMode, DEV_CONTACTS } from '@/lib/dev-data'

/**
 * GET - List contact submissions with optional filters or get a single submission by ID
 * Query params:
 * - id: specific submission ID (if provided, returns single submission)
 * - status: filter by status (new, contacted, qualified, converted, closed, spam)
 * - search: search in name, email, message
 * - limit: number of results (default 100)
 * - offset: pagination offset (default 0)
 */
export async function GET(request: Request) {
  try {
    // 🔓 DEV MODE - Return dummy data if using placeholder Supabase
    if (isDevMode()) {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')

      if (id) {
        const contact = DEV_CONTACTS.find(c => c.id === id)
        if (!contact) {
          return NextResponse.json(
            { error: 'Contact not found' },
            { status: 404 }
          )
        }
        return NextResponse.json({ data: contact })
      }

      return NextResponse.json({
        success: true,
        data: DEV_CONTACTS,
        count: DEV_CONTACTS.length,
      })
    }

    // Check authentication
    const profile = await getUserProfile()
    if (!profile) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    const id = searchParams.get('id')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    // If ID is provided, fetch single submission
    if (id) {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching submission:', error)
        return NextResponse.json(
          { error: 'Submission not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ data })
    }

    // Build query for list
    let query = supabase
      .from('contact_submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,message.ilike.%${search}%`)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching contact submissions:', error)
      return NextResponse.json(
        { error: 'Failed to fetch contact submissions' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      count,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Contact submissions list error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

/**
 * PATCH - Update contact submission
 * Body: { id, status?, notes?, assigned_to?, follow_up_date? }
 */
export async function PATCH(request: Request) {
  try {
    // Check authentication and require admin or manager role
    const profile = await getUserProfile()
    if (!profile || !['admin', 'manager'].includes(profile.role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, status, notes, assigned_to, follow_up_date } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Build update object
    const updates: any = {
      updated_at: new Date().toISOString(),
    }

    if (status !== undefined) updates.status = status
    if (notes !== undefined) updates.notes = notes
    if (assigned_to !== undefined) updates.assigned_to = assigned_to
    if (follow_up_date !== undefined) updates.follow_up_date = follow_up_date

    // Update submission
    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating contact submission:', error)
      return NextResponse.json(
        { error: 'Failed to update contact submission' },
        { status: 500 }
      )
    }

    // Log activity
    await supabase.from('activity_log').insert({
      user_id: profile.id,
      action: 'update',
      entity_type: 'contact_submissions',
      entity_id: id,
      description: `Updated contact submission from ${data.name}`,
      changes: updates,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
    })

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('Contact submission update error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

/**
 * DELETE - Delete contact submission
 * Query param: id
 */
export async function DELETE(request: Request) {
  try {
    // Check authentication and require admin role
    const profile = await getUserProfile()
    if (!profile || profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get submission details before deleting
    const { data: submission } = await supabase
      .from('contact_submissions')
      .select('name, email')
      .eq('id', id)
      .single()

    // Delete submission
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting contact submission:', error)
      return NextResponse.json(
        { error: 'Failed to delete contact submission' },
        { status: 500 }
      )
    }

    // Log activity
    if (submission) {
      await supabase.from('activity_log').insert({
        user_id: profile.id,
        action: 'delete',
        entity_type: 'contact_submissions',
        entity_id: id,
        description: `Deleted contact submission from ${submission.name} (${submission.email})`,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        user_agent: request.headers.get('user-agent'),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Contact submission deleted successfully',
    })
  } catch (error) {
    console.error('Contact submission deletion error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
