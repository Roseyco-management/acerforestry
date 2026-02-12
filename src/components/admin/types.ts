/**
 * Common TypeScript types for Admin UI Components
 * Import these types for consistency across your admin panel
 */

import { LucideIcon } from 'lucide-react'

// ============================================================================
// Database Models (Example - Replace with your Supabase types)
// ============================================================================

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  type: 'residential' | 'commercial' | 'government'
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  client_id: string
  name: string
  description?: string
  location: string
  acres?: number
  status: 'planning' | 'active' | 'completed' | 'cancelled'
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  bio?: string
  avatar_url?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface ProjectPhoto {
  id: string
  project_id: string
  url: string
  title?: string
  description?: string
  uploaded_by: string
  uploaded_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  created_at: string
}

// ============================================================================
// UI Component Types
// ============================================================================

export interface DashboardMetric {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  iconColor?: string
  iconBgColor?: string
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  onClick?: () => void
}

export interface StatItem {
  label: string
  value: string | number
  icon?: LucideIcon
  iconColor?: string
  change?: {
    value: number
    isPositive: boolean
  }
}

export interface Photo {
  id: string
  src: string
  alt?: string
  title?: string
  description?: string
  uploadedAt?: Date | string
}

export interface SelectOption {
  value: string
  label: string
}

// ============================================================================
// Form Types
// ============================================================================

export interface ClientFormData {
  name: string
  email: string
  phone?: string
  address?: string
  type: Client['type']
  status: Client['status']
  send_welcome_email?: boolean
}

export interface ProjectFormData {
  client_id: string
  name: string
  description?: string
  location: string
  acres?: number
  status: Project['status']
  start_date?: string
  end_date?: string
}

export interface TeamMemberFormData {
  name: string
  email: string
  role: string
  phone?: string
  bio?: string
  avatar_url?: string
  active: boolean
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, any>
}

// ============================================================================
// Filter & Sort Types
// ============================================================================

export interface FilterOptions {
  status?: string[]
  type?: string[]
  dateRange?: {
    start: string
    end: string
  }
  search?: string
}

export interface SortOptions {
  field: string
  direction: 'asc' | 'desc'
}

export interface PaginationOptions {
  page: number
  pageSize: number
}

// ============================================================================
// Table Types
// ============================================================================

export interface TableColumn<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
}

export interface TableAction<T> {
  label: string
  icon?: LucideIcon
  onClick: (item: T) => void
  variant?: 'default' | 'primary' | 'danger'
  disabled?: (item: T) => boolean
}

// ============================================================================
// Dashboard Types
// ============================================================================

export interface DashboardStats {
  totalClients: number
  activeProjects: number
  totalPhotos: number
  unreadMessages: number
  teamMembers: number
  scheduledVisits: number
  acresManaged: number
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: 'client' | 'project' | 'photo' | 'message'
  title: string
  description?: string
  timestamp: string
  user?: string
}

// ============================================================================
// Settings Types
// ============================================================================

export interface UserSettings {
  id: string
  user_id: string
  theme: 'light' | 'dark'
  notifications_enabled: boolean
  email_notifications: boolean
  language: string
  timezone: string
}

export interface CompanySettings {
  id: string
  company_name: string
  logo_url?: string
  primary_color?: string
  contact_email: string
  contact_phone?: string
  address?: string
  website?: string
}

// ============================================================================
// Utility Types
// ============================================================================

export type Status = 'idle' | 'loading' | 'success' | 'error'

export type AsyncState<T> = {
  data: T | null
  status: Status
  error: string | null
}

export type FormState = {
  isSubmitting: boolean
  errors: Record<string, string>
  isDirty: boolean
  isValid: boolean
}

// ============================================================================
// Export all types
// ============================================================================

export type {
  LucideIcon, // Re-export from lucide-react for convenience
}
