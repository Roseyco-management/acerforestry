/**
 * Content Management Database Layer
 *
 * Handles database operations for the CMS system.
 * Supports text, image, and richtext content types.
 */

import { createClient } from '@/lib/supabase/server'

export type ContentType = 'text' | 'image' | 'richtext'

export interface ContentSection {
  id: number
  page_slug: string
  section_key: string
  content_type: ContentType
  content: string
  metadata?: Record<string, any>
  updated_at: string
}

export interface EditablePage {
  slug: string
  title: string
  description: string
}

/**
 * Get all editable pages in the CMS
 */
export async function listEditablePages(): Promise<EditablePage[]> {
  // These are the pages that can be edited via the CMS
  return [
    {
      slug: 'home',
      title: 'Home Page',
      description: 'Main landing page with hero, services, and contact sections'
    },
    {
      slug: 'services',
      title: 'Services',
      description: 'Detailed service descriptions and offerings'
    },
    {
      slug: 'training',
      title: 'Training & Certification',
      description: 'Training programs and certifications'
    },
    {
      slug: 'forest-managers',
      title: 'Forest Managers',
      description: 'Information for forest managers and landowners'
    },
    {
      slug: 'subcontractors',
      title: 'Subcontractors',
      description: 'Subcontractor opportunities and requirements'
    },
    {
      slug: 'privacy',
      title: 'Privacy Policy',
      description: 'Privacy policy and data handling'
    },
    {
      slug: 'terms',
      title: 'Terms & Conditions',
      description: 'Terms and conditions of service'
    }
  ]
}

/**
 * Get all content sections for a specific page
 */
export async function getPageContent(pageSlug: string): Promise<ContentSection[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('content_sections')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('section_key')

  if (error) {
    throw new Error(`Failed to fetch page content: ${error.message}`)
  }

  return data || []
}

/**
 * Get a specific content section
 */
export async function getSectionContent(
  pageSlug: string,
  sectionKey: string
): Promise<ContentSection | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('content_sections')
    .select('*')
    .eq('page_slug', pageSlug)
    .eq('section_key', sectionKey)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned - section doesn't exist yet
      return null
    }
    throw new Error(`Failed to fetch section content: ${error.message}`)
  }

  return data
}

/**
 * Update or create content section
 */
export async function updateContent(
  pageSlug: string,
  sectionKey: string,
  content: string,
  contentType: ContentType = 'text',
  metadata?: Record<string, any>
): Promise<ContentSection> {
  const supabase = await createClient()

  // Check if section exists
  const existing = await getSectionContent(pageSlug, sectionKey)

  if (existing) {
    // Update existing section
    const { data, error } = await supabase
      .from('content_sections')
      .update({
        content,
        content_type: contentType,
        metadata,
        updated_at: new Date().toISOString()
      })
      .eq('page_slug', pageSlug)
      .eq('section_key', sectionKey)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update content: ${error.message}`)
    }

    return data
  } else {
    // Create new section
    const { data, error } = await supabase
      .from('content_sections')
      .insert({
        page_slug: pageSlug,
        section_key: sectionKey,
        content,
        content_type: contentType,
        metadata
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create content: ${error.message}`)
    }

    return data
  }
}

/**
 * Delete a content section
 */
export async function deleteContent(
  pageSlug: string,
  sectionKey: string
): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('content_sections')
    .delete()
    .eq('page_slug', pageSlug)
    .eq('section_key', sectionKey)

  if (error) {
    throw new Error(`Failed to delete content: ${error.message}`)
  }
}

/**
 * Get default section definitions for each page
 */
export function getPageSectionDefinitions(pageSlug: string): Array<{
  key: string
  label: string
  type: ContentType
  description: string
}> {
  const definitions: Record<string, Array<{
    key: string
    label: string
    type: ContentType
    description: string
  }>> = {
    home: [
      { key: 'hero_title', label: 'Hero Title', type: 'text', description: 'Main headline on homepage' },
      { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'richtext', description: 'Subtitle text below hero title' },
      { key: 'hero_cta_text', label: 'Hero CTA Text', type: 'text', description: 'Call-to-action button text' },
      { key: 'value_props_title', label: 'Value Props Title', type: 'text', description: 'Title for value propositions section' },
      { key: 'value_props_description', label: 'Value Props Description', type: 'richtext', description: 'Description for value propositions' },
      { key: 'services_title', label: 'Services Section Title', type: 'text', description: 'Title for services grid section' },
      { key: 'services_description', label: 'Services Description', type: 'richtext', description: 'Description for services section' }
    ],
    services: [
      { key: 'hero_title', label: 'Page Title', type: 'text', description: 'Main page heading' },
      { key: 'hero_subtitle', label: 'Page Subtitle', type: 'richtext', description: 'Page introduction text' },
      { key: 'service_planting_title', label: 'Tree Planting Title', type: 'text', description: 'Tree planting service title' },
      { key: 'service_planting_description', label: 'Tree Planting Description', type: 'richtext', description: 'Tree planting service description' },
      { key: 'service_ground_title', label: 'Ground Prep Title', type: 'text', description: 'Ground preparation service title' },
      { key: 'service_ground_description', label: 'Ground Prep Description', type: 'richtext', description: 'Ground preparation description' },
      { key: 'cta_text', label: 'CTA Text', type: 'text', description: 'Call-to-action text' }
    ],
    training: [
      { key: 'hero_title', label: 'Page Title', type: 'text', description: 'Main page heading' },
      { key: 'hero_subtitle', label: 'Page Subtitle', type: 'richtext', description: 'Page introduction text' },
      { key: 'training_programs', label: 'Training Programs', type: 'richtext', description: 'List of training programs offered' },
      { key: 'certifications', label: 'Certifications', type: 'richtext', description: 'Certifications and qualifications' }
    ],
    'forest-managers': [
      { key: 'hero_title', label: 'Page Title', type: 'text', description: 'Main page heading' },
      { key: 'hero_subtitle', label: 'Page Subtitle', type: 'richtext', description: 'Page introduction text' },
      { key: 'benefits', label: 'Benefits', type: 'richtext', description: 'Benefits for forest managers' },
      { key: 'services_overview', label: 'Services Overview', type: 'richtext', description: 'Overview of services for forest managers' }
    ],
    subcontractors: [
      { key: 'hero_title', label: 'Page Title', type: 'text', description: 'Main page heading' },
      { key: 'hero_subtitle', label: 'Page Subtitle', type: 'richtext', description: 'Page introduction text' },
      { key: 'requirements', label: 'Requirements', type: 'richtext', description: 'Subcontractor requirements' },
      { key: 'opportunities', label: 'Opportunities', type: 'richtext', description: 'Available opportunities' }
    ],
    privacy: [
      { key: 'policy_content', label: 'Privacy Policy Content', type: 'richtext', description: 'Full privacy policy text' }
    ],
    terms: [
      { key: 'terms_content', label: 'Terms & Conditions Content', type: 'richtext', description: 'Full terms and conditions text' }
    ]
  }

  return definitions[pageSlug] || []
}
