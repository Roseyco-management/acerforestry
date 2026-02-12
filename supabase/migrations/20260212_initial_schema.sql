-- Acer Forestry Admin Database Schema
-- This migration sets up the complete database structure for the admin system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS TABLE (Admin Accounts)
-- ============================================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================================
-- CLIENTS TABLE (Forest Managers)
-- ============================================================================
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  postcode TEXT,
  county TEXT,
  total_woodland_area DECIMAL(10,2), -- in hectares
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'prospect')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for searching and filtering
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_contact_name ON clients(contact_name);

-- ============================================================================
-- PROJECTS TABLE (Woodland Establishment Projects)
-- ============================================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  location TEXT NOT NULL,
  area_hectares DECIMAL(10,2) NOT NULL,

  -- Project details
  planting_year INTEGER,
  tree_species TEXT[], -- Array of species planted
  grant_scheme TEXT, -- e.g., "Woodland Creation Grant", "HS2 Woodland Fund"

  -- Project status and timeline
  status TEXT NOT NULL DEFAULT 'planning' CHECK (
    status IN ('planning', 'in_progress', 'planting', 'maintenance', 'completed', 'on_hold')
  ),
  start_date DATE,
  completion_date DATE,

  -- Financial
  total_cost DECIMAL(12,2),
  grant_amount DECIMAL(12,2),

  -- Additional information
  description TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_planting_year ON projects(planting_year);
CREATE INDEX idx_projects_start_date ON projects(start_date);

-- ============================================================================
-- TEAM_MEMBERS TABLE (Subcontractors, Staff)
-- ============================================================================
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- e.g., "Tree Planting Contractor", "Fencing Specialist"
  company_name TEXT,
  email TEXT,
  phone TEXT NOT NULL,

  -- Specializations and skills
  specializations TEXT[], -- Array of skills/services

  -- Status
  is_active BOOLEAN DEFAULT true,
  availability_status TEXT DEFAULT 'available' CHECK (
    availability_status IN ('available', 'busy', 'unavailable')
  ),

  -- Performance tracking
  projects_completed INTEGER DEFAULT 0,
  quality_rating DECIMAL(3,2), -- Out of 5.00

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_team_members_role ON team_members(role);
CREATE INDEX idx_team_members_is_active ON team_members(is_active);
CREATE INDEX idx_team_members_availability ON team_members(availability_status);

-- ============================================================================
-- PROJECT_TEAM (Junction table for projects and team members)
-- ============================================================================
CREATE TABLE project_team (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  team_member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  role_on_project TEXT NOT NULL,
  assigned_date DATE DEFAULT CURRENT_DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(project_id, team_member_id)
);

CREATE INDEX idx_project_team_project_id ON project_team(project_id);
CREATE INDEX idx_project_team_team_member_id ON project_team(team_member_id);

-- ============================================================================
-- PROJECT_PHOTOS TABLE
-- ============================================================================
CREATE TABLE project_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Storage information
  storage_path TEXT NOT NULL, -- Path in Supabase Storage
  file_name TEXT NOT NULL,
  file_size INTEGER, -- in bytes
  mime_type TEXT,

  -- Photo metadata
  title TEXT,
  description TEXT,
  photo_date DATE,
  photo_type TEXT CHECK (photo_type IN ('before', 'during', 'after', 'progress', 'other')),

  -- Display settings
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_project_photos_project_id ON project_photos(project_id);
CREATE INDEX idx_project_photos_is_featured ON project_photos(is_featured);
CREATE INDEX idx_project_photos_photo_type ON project_photos(photo_type);

-- ============================================================================
-- WEBSITE_CONTENT TABLE (CMS)
-- ============================================================================
CREATE TABLE website_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Content identification
  content_key TEXT UNIQUE NOT NULL, -- e.g., 'homepage_hero_title', 'services_intro'
  content_type TEXT NOT NULL CHECK (
    content_type IN ('text', 'html', 'markdown', 'image_url', 'json')
  ),

  -- Content data
  content_value TEXT NOT NULL,

  -- Metadata
  page TEXT NOT NULL, -- e.g., 'homepage', 'services', 'about'
  section TEXT, -- e.g., 'hero', 'services_grid', 'testimonials'
  description TEXT, -- Helper text for editors

  -- Publishing
  is_published BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_website_content_page ON website_content(page);
CREATE INDEX idx_website_content_is_published ON website_content(is_published);
CREATE INDEX idx_website_content_content_key ON website_content(content_key);

-- ============================================================================
-- CONTACT_SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,

  -- Submission details
  message TEXT NOT NULL,
  service_interest TEXT, -- What service they're interested in
  woodland_area DECIMAL(10,2), -- If they mentioned area
  location TEXT,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam')
  ),
  assigned_to UUID REFERENCES users(id),

  -- Follow-up
  notes TEXT,
  follow_up_date DATE,

  -- Source tracking
  source TEXT DEFAULT 'website', -- 'website', 'referral', 'direct', etc.

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_assigned_to ON contact_submissions(assigned_to);

-- ============================================================================
-- ACTIVITY_LOG TABLE
-- ============================================================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Who did what
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL, -- e.g., 'create', 'update', 'delete', 'login'
  entity_type TEXT NOT NULL, -- e.g., 'project', 'client', 'team_member'
  entity_id UUID,

  -- Details
  description TEXT NOT NULL,
  changes JSONB, -- Store before/after values for updates

  -- Context
  ip_address TEXT,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX idx_activity_log_entity_type ON activity_log(entity_type);
CREATE INDEX idx_activity_log_entity_id ON activity_log(entity_id);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can access data
-- Note: In Supabase, you'll need to set up authentication first
-- These policies assume you're using Supabase Auth

-- Users table policies
CREATE POLICY "Authenticated users can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can insert users"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update users"
  ON users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Clients table policies
CREATE POLICY "Authenticated users can view clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can delete clients"
  ON clients FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Projects table policies
CREATE POLICY "Authenticated users can view projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Team members table policies
CREATE POLICY "Authenticated users can view team members"
  ON team_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can delete team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Project team junction table policies
CREATE POLICY "Authenticated users can view project team"
  ON project_team FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage project team"
  ON project_team FOR ALL
  TO authenticated
  USING (true);

-- Project photos table policies
CREATE POLICY "Authenticated users can view project photos"
  ON project_photos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage project photos"
  ON project_photos FOR ALL
  TO authenticated
  USING (true);

-- Website content table policies
CREATE POLICY "Authenticated users can view website content"
  ON website_content FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage website content"
  ON website_content FOR ALL
  TO authenticated
  USING (true);

-- Contact submissions table policies
CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage contact submissions"
  ON contact_submissions FOR ALL
  TO authenticated
  USING (true);

-- Activity log table policies
CREATE POLICY "Authenticated users can view activity log"
  ON activity_log FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert activity log"
  ON activity_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_photos_updated_at BEFORE UPDATE ON project_photos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_content_updated_at BEFORE UPDATE ON website_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SEED DATA (Optional - for initial setup)
-- ============================================================================

-- Insert some initial website content keys
INSERT INTO website_content (content_key, content_type, content_value, page, section, description) VALUES
  ('hero_title', 'text', 'Expert Woodland Establishment Services', 'homepage', 'hero', 'Main hero section title'),
  ('hero_subtitle', 'text', 'Professional forestry services across the UK', 'homepage', 'hero', 'Hero section subtitle'),
  ('services_intro', 'text', 'Comprehensive woodland creation and management services', 'services', 'intro', 'Services page introduction'),
  ('about_company_description', 'html', '<p>Acer Forestry specializes in professional woodland establishment...</p>', 'about', 'company', 'Company description HTML');

-- Note: First admin user should be created through Supabase Auth
-- Then link to users table with appropriate role
