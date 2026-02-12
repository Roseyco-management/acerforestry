/**
 * Database Types
 *
 * Type definitions for the Supabase database schema.
 * These provide TypeScript type safety when working with the database.
 *
 * Note: In production, you should generate these types automatically using:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/database.types.ts
 *
 * For now, we define the core types manually based on our schema.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'manager' | 'viewer'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: 'admin' | 'manager' | 'viewer'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'manager' | 'viewer'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          company_name: string | null
          contact_name: string
          email: string
          phone: string | null
          address: string | null
          postcode: string | null
          county: string | null
          total_woodland_area: number | null
          status: 'active' | 'inactive' | 'prospect'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name?: string | null
          contact_name: string
          email: string
          phone?: string | null
          address?: string | null
          postcode?: string | null
          county?: string | null
          total_woodland_area?: number | null
          status?: 'active' | 'inactive' | 'prospect'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string | null
          contact_name?: string
          email?: string
          phone?: string | null
          address?: string | null
          postcode?: string | null
          county?: string | null
          total_woodland_area?: number | null
          status?: 'active' | 'inactive' | 'prospect'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          project_name: string
          location: string
          area_hectares: number
          planting_year: number | null
          tree_species: string[] | null
          grant_scheme: string | null
          status:
            | 'planning'
            | 'in_progress'
            | 'planting'
            | 'maintenance'
            | 'completed'
            | 'on_hold'
          start_date: string | null
          completion_date: string | null
          total_cost: number | null
          grant_amount: number | null
          description: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          project_name: string
          location: string
          area_hectares: number
          planting_year?: number | null
          tree_species?: string[] | null
          grant_scheme?: string | null
          status?:
            | 'planning'
            | 'in_progress'
            | 'planting'
            | 'maintenance'
            | 'completed'
            | 'on_hold'
          start_date?: string | null
          completion_date?: string | null
          total_cost?: number | null
          grant_amount?: number | null
          description?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          project_name?: string
          location?: string
          area_hectares?: number
          planting_year?: number | null
          tree_species?: string[] | null
          grant_scheme?: string | null
          status?:
            | 'planning'
            | 'in_progress'
            | 'planting'
            | 'maintenance'
            | 'completed'
            | 'on_hold'
          start_date?: string | null
          completion_date?: string | null
          total_cost?: number | null
          grant_amount?: number | null
          description?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          company_name: string | null
          email: string | null
          phone: string
          specializations: string[] | null
          certifications: Json | null
          hourly_rate: number | null
          is_active: boolean
          availability_status: 'available' | 'busy' | 'unavailable'
          projects_completed: number
          quality_rating: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          company_name?: string | null
          email?: string | null
          phone: string
          specializations?: string[] | null
          certifications?: Json | null
          hourly_rate?: number | null
          is_active?: boolean
          availability_status?: 'available' | 'busy' | 'unavailable'
          projects_completed?: number
          quality_rating?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          company_name?: string | null
          email?: string | null
          phone?: string
          specializations?: string[] | null
          certifications?: Json | null
          hourly_rate?: number | null
          is_active?: boolean
          availability_status?: 'available' | 'busy' | 'unavailable'
          projects_completed?: number
          quality_rating?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      project_team: {
        Row: {
          id: string
          project_id: string
          team_member_id: string
          role_on_project: string
          assigned_date: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          team_member_id: string
          role_on_project: string
          assigned_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          team_member_id?: string
          role_on_project?: string
          assigned_date?: string
          created_at?: string
        }
      }
      project_photos: {
        Row: {
          id: string
          project_id: string
          storage_path: string
          file_name: string
          file_size: number | null
          mime_type: string | null
          title: string | null
          description: string | null
          photo_date: string | null
          photo_type: 'before' | 'during' | 'after' | 'progress' | 'other' | null
          is_featured: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          storage_path: string
          file_name: string
          file_size?: number | null
          mime_type?: string | null
          title?: string | null
          description?: string | null
          photo_date?: string | null
          photo_type?: 'before' | 'during' | 'after' | 'progress' | 'other' | null
          is_featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          storage_path?: string
          file_name?: string
          file_size?: number | null
          mime_type?: string | null
          title?: string | null
          description?: string | null
          photo_date?: string | null
          photo_type?: 'before' | 'during' | 'after' | 'progress' | 'other' | null
          is_featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      website_content: {
        Row: {
          id: string
          content_key: string
          content_type: 'text' | 'html' | 'markdown' | 'image_url' | 'json'
          content_value: string
          page: string
          section: string | null
          description: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content_key: string
          content_type: 'text' | 'html' | 'markdown' | 'image_url' | 'json'
          content_value: string
          page: string
          section?: string | null
          description?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content_key?: string
          content_type?: 'text' | 'html' | 'markdown' | 'image_url' | 'json'
          content_value?: string
          page?: string
          section?: string | null
          description?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company_name: string | null
          message: string
          service_interest: string | null
          woodland_area: number | null
          location: string | null
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'spam'
          assigned_to: string | null
          notes: string | null
          follow_up_date: string | null
          source: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company_name?: string | null
          message: string
          service_interest?: string | null
          woodland_area?: number | null
          location?: string | null
          status?:
            | 'new'
            | 'contacted'
            | 'qualified'
            | 'converted'
            | 'closed'
            | 'spam'
          assigned_to?: string | null
          notes?: string | null
          follow_up_date?: string | null
          source?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company_name?: string | null
          message?: string
          service_interest?: string | null
          woodland_area?: number | null
          location?: string | null
          status?:
            | 'new'
            | 'contacted'
            | 'qualified'
            | 'converted'
            | 'closed'
            | 'spam'
          assigned_to?: string | null
          notes?: string | null
          follow_up_date?: string | null
          source?: string
          created_at?: string
          updated_at?: string
        }
      }
      activity_log: {
        Row: {
          id: string
          user_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          description: string
          changes: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          entity_type: string
          entity_id?: string | null
          description: string
          changes?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          entity_type?: string
          entity_id?: string | null
          description?: string
          changes?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      project_photos_with_details: {
        Row: {
          id: string
          project_id: string
          storage_path: string
          file_name: string
          title: string | null
          description: string | null
          photo_date: string | null
          photo_type: string | null
          is_featured: boolean
          project_name: string
          location: string
          client_name: string
        }
      }
    }
  }
}

// Helper types for easier use
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Specific table types for convenience
export type User = Tables<'users'>
export type Client = Tables<'clients'>
export type Project = Tables<'projects'>
export type TeamMember = Tables<'team_members'>
export type ProjectTeam = Tables<'project_team'>
export type ProjectPhoto = Tables<'project_photos'>
export type WebsiteContent = Tables<'website_content'>
export type ContactSubmission = Tables<'contact_submissions'>
export type ActivityLog = Tables<'activity_log'>

// Insert types
export type UserInsert = TablesInsert<'users'>
export type ClientInsert = TablesInsert<'clients'>
export type ProjectInsert = TablesInsert<'projects'>
export type TeamMemberInsert = TablesInsert<'team_members'>
export type ProjectPhotoInsert = TablesInsert<'project_photos'>
export type WebsiteContentInsert = TablesInsert<'website_content'>
export type ContactSubmissionInsert = TablesInsert<'contact_submissions'>
export type ActivityLogInsert = TablesInsert<'activity_log'>

// Update types
export type UserUpdate = TablesUpdate<'users'>
export type ClientUpdate = TablesUpdate<'clients'>
export type ProjectUpdate = TablesUpdate<'projects'>
export type TeamMemberUpdate = TablesUpdate<'team_members'>
export type ProjectPhotoUpdate = TablesUpdate<'project_photos'>
export type WebsiteContentUpdate = TablesUpdate<'website_content'>
export type ContactSubmissionUpdate = TablesUpdate<'contact_submissions'>
export type ActivityLogUpdate = TablesUpdate<'activity_log'>
