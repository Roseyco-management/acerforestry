import { createClient as createSupabaseClient } from '@/lib/supabase/server'
import type { Client, ClientInsert, ClientUpdate } from '@/lib/supabase/types'

export interface ClientFilters {
  status?: 'active' | 'inactive' | 'prospect'
  search?: string
}

export interface ClientWithProjectCount extends Client {
  project_count: number
}

/**
 * List all clients with optional filters
 */
export async function listClients(
  filters?: ClientFilters
): Promise<ClientWithProjectCount[]> {
  const supabase = await createSupabaseClient()

  let query = supabase
    .from('clients')
    .select(
      `
      *,
      projects:projects(count)
    `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })

  // Apply status filter
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  // Apply search filter (searches across name, company, email)
  if (filters?.search) {
    const searchTerm = `%${filters.search}%`
    query = query.or(
      `contact_name.ilike.${searchTerm},company_name.ilike.${searchTerm},email.ilike.${searchTerm},county.ilike.${searchTerm}`
    )
  }

  const { data, error } = await query

  if (error) {
    console.error('Error listing clients:', error)
    throw new Error(`Failed to list clients: ${error.message}`)
  }

  // Transform the data to include project count
  return (data || []).map((client: any) => ({
    ...client,
    project_count: client.projects?.[0]?.count || 0,
    projects: undefined, // Remove the projects array
  }))
}

/**
 * Get a single client by ID
 */
export async function getClient(id: string): Promise<Client | null> {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Client not found
    }
    console.error('Error getting client:', error)
    throw new Error(`Failed to get client: ${error.message}`)
  }

  return data
}

/**
 * Create a new client
 */
export async function createClient(data: ClientInsert): Promise<Client> {
  const supabase = await createSupabaseClient()

  const { data: client, error } = await supabase
    .from('clients')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('Error creating client:', error)
    throw new Error(`Failed to create client: ${error.message}`)
  }

  return client
}

/**
 * Update an existing client
 */
export async function updateClient(
  id: string,
  data: ClientUpdate
): Promise<Client> {
  const supabase = await createSupabaseClient()

  const { data: client, error } = await supabase
    .from('clients')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating client:', error)
    throw new Error(`Failed to update client: ${error.message}`)
  }

  return client
}

/**
 * Soft delete a client (set status to inactive)
 */
export async function deleteClient(id: string): Promise<void> {
  const supabase = await createSupabaseClient()

  const { error } = await supabase
    .from('clients')
    .update({ status: 'inactive', updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('Error deleting client:', error)
    throw new Error(`Failed to delete client: ${error.message}`)
  }
}

/**
 * Get all projects for a specific client
 */
export async function getClientProjects(clientId: string) {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error getting client projects:', error)
    throw new Error(`Failed to get client projects: ${error.message}`)
  }

  return data || []
}
