/**
 * Contact Submissions Export API
 *
 * GET /api/admin/contacts/export - Export submissions to CSV
 */

import { createClient } from '@/lib/supabase/server'
import { getUserProfile } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * GET - Export contact submissions as CSV
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

    // Apply status filter
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

    // Convert to CSV
    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Location',
      'Service Interest',
      'Woodland Area (ha)',
      'Message',
      'Status',
      'Notes',
      'Assigned To',
      'Follow Up Date',
      'Source',
      'Created At',
      'Updated At',
    ]

    const csvRows = [
      headers.join(','),
      ...data.map((submission) =>
        [
          submission.id,
          escapeCsvValue(submission.name),
          escapeCsvValue(submission.email),
          escapeCsvValue(submission.phone || ''),
          escapeCsvValue(submission.company_name || ''),
          escapeCsvValue(submission.location || ''),
          escapeCsvValue(submission.service_interest || ''),
          submission.woodland_area || '',
          escapeCsvValue(submission.message),
          submission.status,
          escapeCsvValue(submission.notes || ''),
          submission.assigned_to || '',
          submission.follow_up_date || '',
          submission.source || '',
          new Date(submission.created_at).toISOString(),
          new Date(submission.updated_at).toISOString(),
        ].join(',')
      ),
    ]

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
    return new Response(csv, {
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

/**
 * Helper function to escape CSV values
 */
function escapeCsvValue(value: string): string {
  if (!value) return ''

  // If the value contains comma, quote, or newline, wrap it in quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    // Escape quotes by doubling them
    return `"${value.replace(/"/g, '""')}"`
  }

  return value
}
