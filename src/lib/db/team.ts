/**
 * Team Members Database Layer
 *
 * Provides database access functions for team member management.
 * Handles CRUD operations for contractors, staff, and subcontractors.
 */

import { createClient } from '@/lib/supabase/server'
import type {
  TeamMember,
  TeamMemberInsert,
  TeamMemberUpdate,
} from '@/lib/supabase/types'

export interface Certification {
  name: string
  expiryDate: string // ISO date string
}

export interface TeamMemberWithCertifications
  extends Omit<TeamMember, 'certifications'> {
  certifications: Certification[]
}

export interface TeamMemberFilters {
  role?: string
  status?: 'active' | 'inactive'
  availability?: 'available' | 'busy' | 'unavailable'
  search?: string
}

/**
 * List all team members with optional filtering
 */
export async function listTeamMembers(filters?: TeamMemberFilters) {
  const supabase = await createClient()

  let query = supabase
    .from('team_members')
    .select('*')
    .order('name', { ascending: true })

  // Apply filters
  if (filters?.role) {
    query = query.eq('role', filters.role)
  }

  if (filters?.status === 'active') {
    query = query.eq('is_active', true)
  } else if (filters?.status === 'inactive') {
    query = query.eq('is_active', false)
  }

  if (filters?.availability) {
    query = query.eq('availability_status', filters.availability)
  }

  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%,company_name.ilike.%${filters.search}%`
    )
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to list team members: ${error.message}`)
  }

  return data as TeamMemberWithCertifications[]
}

/**
 * Get a single team member by ID
 */
export async function getTeamMember(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to get team member: ${error.message}`)
  }

  return data as TeamMemberWithCertifications
}

/**
 * Create a new team member
 */
export async function createTeamMember(
  data: TeamMemberInsert & { certifications?: Certification[]; hourly_rate?: number }
) {
  const supabase = await createClient()

  const { data: newMember, error } = await supabase
    .from('team_members')
    .insert(data)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create team member: ${error.message}`)
  }

  return newMember as TeamMemberWithCertifications
}

/**
 * Update an existing team member
 */
export async function updateTeamMember(
  id: string,
  data: TeamMemberUpdate & { certifications?: Certification[]; hourly_rate?: number }
) {
  const supabase = await createClient()

  const { data: updatedMember, error } = await supabase
    .from('team_members')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update team member: ${error.message}`)
  }

  return updatedMember as TeamMemberWithCertifications
}

/**
 * Delete a team member (soft delete by setting is_active to false)
 */
export async function deleteTeamMember(id: string, hard = false) {
  const supabase = await createClient()

  if (hard) {
    // Hard delete - actually remove from database
    const { error } = await supabase.from('team_members').delete().eq('id', id)

    if (error) {
      throw new Error(`Failed to delete team member: ${error.message}`)
    }
  } else {
    // Soft delete - just mark as inactive
    const { error } = await supabase
      .from('team_members')
      .update({ is_active: false })
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to deactivate team member: ${error.message}`)
    }
  }

  return { success: true }
}

/**
 * Get projects assigned to a team member
 */
export async function getMemberProjects(memberId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('project_team')
    .select(
      `
      id,
      role_on_project,
      assigned_date,
      project:projects (
        id,
        project_name,
        location,
        status,
        area_hectares,
        start_date,
        completion_date,
        client:clients (
          id,
          contact_name,
          company_name
        )
      )
    `
    )
    .eq('team_member_id', memberId)
    .order('assigned_date', { ascending: false })

  if (error) {
    throw new Error(`Failed to get member projects: ${error.message}`)
  }

  return data
}

/**
 * Get team members with expired certifications
 */
export async function getTeamMembersWithExpiredCertifications() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)

  if (error) {
    throw new Error(`Failed to get team members: ${error.message}`)
  }

  // Filter in JavaScript for certification expiry check
  const today = new Date().toISOString().split('T')[0]

  const membersWithExpired = (data as TeamMemberWithCertifications[]).filter(
    (member) => {
      if (!member.certifications || member.certifications.length === 0) {
        return false
      }

      return member.certifications.some((cert) => cert.expiryDate < today)
    }
  )

  return membersWithExpired
}

/**
 * Get team member statistics
 */
export async function getTeamMemberStats() {
  const supabase = await createClient()

  const { data, error } = await supabase.from('team_members').select('*')

  if (error) {
    throw new Error(`Failed to get team member stats: ${error.message}`)
  }

  const stats = {
    total: data.length,
    active: data.filter((m) => m.is_active).length,
    inactive: data.filter((m) => !m.is_active).length,
    available: data.filter((m) => m.availability_status === 'available').length,
    busy: data.filter((m) => m.availability_status === 'busy').length,
    unavailable: data.filter((m) => m.availability_status === 'unavailable').length,
  }

  return stats
}
