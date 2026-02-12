/**
 * Public Contact Form Submission API
 *
 * POST /api/contact
 * Accepts contact form submissions from the public website
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company_name, message, service_interest, woodland_area, location } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create Supabase client (this doesn't require authentication for public submissions)
    const supabase = await createClient()

    // Insert the contact submission
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company_name: company_name?.trim() || null,
        message: message.trim(),
        service_interest: service_interest?.trim() || null,
        woodland_area: woodland_area || null,
        location: location?.trim() || null,
        status: 'new',
        source: 'website_contact_form',
      })
      .select()
      .single()

    if (error) {
      console.error('Error submitting contact form:', error)
      return NextResponse.json(
        { error: 'Failed to submit contact form. Please try again.' },
        { status: 500 }
      )
    }

    // Log activity (without user_id for public submissions)
    await supabase.from('activity_log').insert({
      action: 'contact_submission',
      entity_type: 'contact_submissions',
      entity_id: data.id,
      description: `New contact form submission from ${name} (${email})`,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      submission_id: data.id,
    })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Disable other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
