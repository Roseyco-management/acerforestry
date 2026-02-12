/**
 * Admin Contact Submissions Export API
 *
 * GET /api/admin/contacts/export - Export submissions to CSV
 */

import { createClient } from '@/lib/supabase/server'
import { getUserProfile } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * GET - Export contact submissions to CSV
 * Query params:
 * - status: filter by status (optional)
 */
export async function GET(request: Request) {
  try {
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
    const status = searchParams.get('status')

    // Build query
    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply status filter if provided
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching contact submissions for export:', error)
      return NextResponse.json(
        { error: 'Failed to fetch contact submissions' },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No data to export' },
        { status: 404 }
      )
    }

    // Create CSV content
    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Message',
      'Service Interest',
      'Woodland Area (ha)',
      'Location',
      'Status',
      'Assigned To',
      'Notes',
      'Follow Up Date',
      'Source',
      'Created At',
      'Updated At',
    ]

    const csvRows = [headers.join(',')]

    data.forEach((submission) => {
      const row = [
        submission.id,
        `"${(submission.name || '').replace(/"/g, '""')}"`,
        submission.email || '',
        submission.phone || '',
        `"${(submission.company_name || '').replace(/"/g, '""')}"`,
        `"${(submission.message || '').replace(/"/g, '""')}"`,
        `"${(submission.service_interest || '').replace(/"/g, '""')}"`,
        submission.woodland_area || '',
        `"${(submission.location || '').replace(/"/g, '""')}"`,
        submission.status,
        submission.assigned_to || '',
        `"${(submission.notes || '').replace(/"/g, '""')}"`,
        submission.follow_up_date || '',
        submission.source,
        submission.created_at,
        submission.updated_at,
      ]
      csvRows.push(row.join(','))
    })

    const csv = csvRows.join('\n')

    // Log activity
    await supabase.from('activity_log').insert({
      user_id: profile.id,
      action: 'export',
      entity_type: 'contact_submissions',
      description: `Exported ${data.length} contact submissions to CSV`,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
    })

    // Return CSV file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="contact-submissions-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Contact submissions export error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
