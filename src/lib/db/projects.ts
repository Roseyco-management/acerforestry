/**
 * Project Database Functions
 *
 * Database layer for CRUD operations on projects.
 * Provides type-safe functions for managing project data in Supabase.
 */

import { createClient } from '@/lib/supabase/server'
import type {
  Project,
  ProjectInsert,
  ProjectUpdate,
  ProjectPhoto,
  ProjectTeam,
} from '@/lib/supabase/types'

export interface ProjectFilters {
  status?: Project['status'] | Project['status'][]
  clientId?: string
  dateRange?: {
    start: string
    end: string
  }
  search?: string
}

export interface ProjectWithClient extends Project {
  client: {
    id: string
    company_name: string | null
    contact_name: string
  } | null
}

export interface ProjectWithDetails extends ProjectWithClient {
  photos: ProjectPhoto[]
  team: Array<{
    id: string
    team_member_id: string
    role_on_project: string
    team_member: {
      id: string
      name: string
      role: string
      company_name: string | null
    }
  }>
}

/**
 * List all projects with optional filters
 */
export async function listProjects(filters?: ProjectFilters): Promise<{
  data: ProjectWithClient[] | null
  error: Error | null
}> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('projects')
      .select(
        `
        *,
        client:clients (
          id,
          company_name,
          contact_name
        )
      `
      )
      .order('created_at', { ascending: false })

    // Apply status filter
    if (filters?.status) {
      if (Array.isArray(filters.status)) {
        query = query.in('status', filters.status)
      } else {
        query = query.eq('status', filters.status)
      }
    }

    // Apply client filter
    if (filters?.clientId) {
      query = query.eq('client_id', filters.clientId)
    }

    // Apply date range filter
    if (filters?.dateRange) {
      query = query
        .gte('start_date', filters.dateRange.start)
        .lte('start_date', filters.dateRange.end)
    }

    // Execute query
    const { data, error } = await query

    if (error) {
      console.error('Error listing projects:', error)
      return { data: null, error: new Error(error.message) }
    }

    // Apply search filter (client-side for complex search across relations)
    let filteredData = data as ProjectWithClient[]
    if (filters?.search && filteredData) {
      const searchLower = filters.search.toLowerCase()
      filteredData = filteredData.filter(
        (project) =>
          project.project_name.toLowerCase().includes(searchLower) ||
          project.location.toLowerCase().includes(searchLower) ||
          project.client?.company_name?.toLowerCase().includes(searchLower) ||
          project.client?.contact_name.toLowerCase().includes(searchLower)
      )
    }

    return { data: filteredData, error: null }
  } catch (err) {
    console.error('Unexpected error in listProjects:', err)
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    }
  }
}

/**
 * Get a single project by ID with full details
 */
export async function getProject(id: string): Promise<{
  data: ProjectWithDetails | null
  error: Error | null
}> {
  try {
    const supabase = await createClient()

    // Get project with client info
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select(
        `
        *,
        client:clients (
          id,
          company_name,
          contact_name
        )
      `
      )
      .eq('id', id)
      .single()

    if (projectError) {
      console.error('Error fetching project:', projectError)
      return { data: null, error: new Error(projectError.message) }
    }

    // Get project photos
    const { data: photos, error: photosError } = await supabase
      .from('project_photos')
      .select('*')
      .eq('project_id', id)
      .order('display_order', { ascending: true })

    if (photosError) {
      console.error('Error fetching project photos:', photosError)
    }

    // Get project team members
    const { data: team, error: teamError } = await supabase
      .from('project_team')
      .select(
        `
        id,
        team_member_id,
        role_on_project,
        team_member:team_members (
          id,
          name,
          role,
          company_name
        )
      `
      )
      .eq('project_id', id)

    if (teamError) {
      console.error('Error fetching project team:', teamError)
    }

    const projectWithDetails: ProjectWithDetails = {
      ...project,
      photos: photos || [],
      team: (team as any) || [],
    }

    return { data: projectWithDetails, error: null }
  } catch (err) {
    console.error('Unexpected error in getProject:', err)
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    }
  }
}

/**
 * Create a new project
 */
export async function createProject(
  projectData: ProjectInsert
): Promise<{
  data: Project | null
  error: Error | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error in createProject:', err)
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    }
  }
}

/**
 * Update an existing project
 */
export async function updateProject(
  id: string,
  updates: ProjectUpdate
): Promise<{
  data: Project | null
  error: Error | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error in updateProject:', err)
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    }
  }
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<{
  success: boolean
  error: Error | null
}> {
  try {
    const supabase = await createClient()

    // Note: Project photos and team assignments will be cascade deleted
    // based on database foreign key constraints
    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) {
      console.error('Error deleting project:', error)
      return { success: false, error: new Error(error.message) }
    }

    return { success: true, error: null }
  } catch (err) {
    console.error('Unexpected error in deleteProject:', err)
    return {
      success: false,
      error: err instanceof Error ? err : new Error('Unknown error'),
    }
  }
}

/**
 * Get all photos for a project
 */
export async function getProjectPhotos(projectId: string): Promise<{
  data: ProjectPhoto[] | null
  error: Error | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('project_photos')
      .select('*')
      .eq('project_id', projectId)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching project photos:', error)
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error in getProjectPhotos:', err)
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    }
  }
}

/**
 * Assign a team member to a project
 */
export async function assignTeamMember(
  projectId: string,
  teamMemberId: string,
  roleOnProject: string
): Promise<{
  data: ProjectTeam | null
  error: Error | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('project_team')
      .insert({
        project_id: projectId,
        team_member_id: teamMemberId,
        role_on_project: roleOnProject,
        assigned_date: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Error assigning team member:', error)
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error in assignTeamMember:', err)
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Unknown error'),
    }
  }
}

/**
 * Remove a team member from a project
 */
export async function removeTeamMember(
  projectId: string,
  teamMemberId: string
): Promise<{
  success: boolean
  error: Error | null
}> {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('project_team')
      .delete()
      .eq('project_id', projectId)
      .eq('team_member_id', teamMemberId)

    if (error) {
      console.error('Error removing team member:', error)
      return { success: false, error: new Error(error.message) }
    }

    return { success: true, error: null }
  } catch (err) {
    console.error('Unexpected error in removeTeamMember:', err)
    return {
      success: false,
      error: err instanceof Error ? err : new Error('Unknown error'),
    }
  }
}
