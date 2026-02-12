-- Acer Forestry Database - Common Queries Reference
-- Quick reference for frequently used database operations

-- ============================================================================
-- USER MANAGEMENT
-- ============================================================================

-- Create a new admin user (after they've signed up through Supabase Auth)
INSERT INTO users (id, email, full_name, role)
VALUES (
  'auth-user-uuid-here',
  'admin@acerforestry.co.uk',
  'Admin Name',
  'admin'
);

-- List all users
SELECT id, email, full_name, role, is_active, created_at
FROM users
ORDER BY created_at DESC;

-- Update user role
UPDATE users
SET role = 'manager'
WHERE email = 'user@example.com';

-- Deactivate a user
UPDATE users
SET is_active = false
WHERE email = 'user@example.com';

-- ============================================================================
-- CLIENT MANAGEMENT
-- ============================================================================

-- Add a new client
INSERT INTO clients (
  company_name,
  contact_name,
  email,
  phone,
  address,
  postcode,
  county,
  total_woodland_area,
  status
) VALUES (
  'Example Estates Ltd',
  'John Smith',
  'john@example-estates.com',
  '01234 567890',
  '123 Forest Lane',
  'AB12 3CD',
  'Yorkshire',
  25.5,
  'active'
);

-- List all active clients
SELECT *
FROM clients
WHERE status = 'active'
ORDER BY contact_name;

-- Search clients by name or email
SELECT *
FROM clients
WHERE contact_name ILIKE '%smith%'
   OR email ILIKE '%smith%'
ORDER BY created_at DESC;

-- Get client with their projects
SELECT
  c.*,
  COUNT(p.id) as project_count,
  SUM(p.area_hectares) as total_project_area
FROM clients c
LEFT JOIN projects p ON p.client_id = c.id
WHERE c.id = 'client-uuid-here'
GROUP BY c.id;

-- ============================================================================
-- PROJECT MANAGEMENT
-- ============================================================================

-- Create a new project
INSERT INTO projects (
  client_id,
  project_name,
  location,
  area_hectares,
  planting_year,
  tree_species,
  grant_scheme,
  status,
  start_date,
  total_cost,
  grant_amount,
  description
) VALUES (
  'client-uuid-here',
  'Oak Woodland Creation - North Field',
  'North Yorkshire',
  15.5,
  2024,
  ARRAY['Oak', 'Beech', 'Ash', 'Hazel'],
  'Woodland Creation Grant',
  'planning',
  '2024-03-01',
  45000.00,
  30000.00,
  'Creation of mixed native woodland on agricultural land'
);

-- List all active projects
SELECT
  p.*,
  c.contact_name as client_name,
  c.company_name
FROM projects p
JOIN clients c ON p.client_id = c.id
WHERE p.status IN ('planning', 'in_progress', 'planting')
ORDER BY p.start_date DESC;

-- Get project summary with team and photos
SELECT
  p.project_name,
  p.location,
  p.status,
  c.contact_name as client_name,
  COUNT(DISTINCT pt.team_member_id) as team_members_count,
  COUNT(DISTINCT pp.id) as photos_count
FROM projects p
JOIN clients c ON p.client_id = c.id
LEFT JOIN project_team pt ON pt.project_id = p.id
LEFT JOIN project_photos pp ON pp.project_id = p.id
WHERE p.id = 'project-uuid-here'
GROUP BY p.id, p.project_name, p.location, p.status, c.contact_name;

-- Update project status
UPDATE projects
SET status = 'in_progress',
    updated_at = NOW()
WHERE id = 'project-uuid-here';

-- Get projects by planting year
SELECT
  p.project_name,
  p.location,
  p.area_hectares,
  c.contact_name as client_name,
  p.status
FROM projects p
JOIN clients c ON p.client_id = c.id
WHERE p.planting_year = 2024
ORDER BY p.start_date;

-- ============================================================================
-- TEAM MEMBER MANAGEMENT
-- ============================================================================

-- Add a new team member
INSERT INTO team_members (
  name,
  role,
  company_name,
  email,
  phone,
  specializations,
  is_active,
  availability_status
) VALUES (
  'ABC Tree Planting Ltd',
  'Tree Planting Contractor',
  'ABC Tree Planting Ltd',
  'contact@abctrees.com',
  '01234 567890',
  ARRAY['Tree Planting', 'Ground Preparation', 'Fencing'],
  true,
  'available'
);

-- List all available team members
SELECT *
FROM team_members
WHERE is_active = true
  AND availability_status = 'available'
ORDER BY name;

-- Assign team member to project
INSERT INTO project_team (project_id, team_member_id, role_on_project)
VALUES (
  'project-uuid-here',
  'team-member-uuid-here',
  'Lead Planting Contractor'
);

-- Get team members for a specific project
SELECT
  tm.*,
  pt.role_on_project,
  pt.assigned_date
FROM team_members tm
JOIN project_team pt ON pt.team_member_id = tm.id
WHERE pt.project_id = 'project-uuid-here'
ORDER BY pt.assigned_date;

-- Update team member availability
UPDATE team_members
SET availability_status = 'busy'
WHERE id = 'team-member-uuid-here';

-- ============================================================================
-- PROJECT PHOTOS
-- ============================================================================

-- Add a project photo
INSERT INTO project_photos (
  project_id,
  storage_path,
  file_name,
  title,
  description,
  photo_date,
  photo_type,
  is_featured
) VALUES (
  'project-uuid-here',
  'project-photos/project-uuid/photo-uuid.jpg',
  'site-preparation-march-2024.jpg',
  'Site Preparation Complete',
  'Ground preparation and fencing completed',
  '2024-03-15',
  'progress',
  false
);

-- Get all photos for a project
SELECT *
FROM project_photos
WHERE project_id = 'project-uuid-here'
ORDER BY photo_date DESC, display_order;

-- Get featured photos across all projects
SELECT
  pp.*,
  p.project_name,
  p.location
FROM project_photos pp
JOIN projects p ON pp.project_id = p.id
WHERE pp.is_featured = true
ORDER BY pp.photo_date DESC;

-- Mark photo as featured
UPDATE project_photos
SET is_featured = true
WHERE id = 'photo-uuid-here';

-- ============================================================================
-- WEBSITE CONTENT (CMS)
-- ============================================================================

-- Update homepage hero title
UPDATE website_content
SET content_value = 'Expert Woodland Establishment Services Across the UK'
WHERE content_key = 'hero_title';

-- Get all content for a specific page
SELECT *
FROM website_content
WHERE page = 'homepage'
  AND is_published = true
ORDER BY section, content_key;

-- Add new content item
INSERT INTO website_content (
  content_key,
  content_type,
  content_value,
  page,
  section,
  description,
  is_published
) VALUES (
  'services_grid_item_1_title',
  'text',
  'Woodland Creation',
  'services',
  'services_grid',
  'First service grid item title',
  true
);

-- ============================================================================
-- CONTACT SUBMISSIONS
-- ============================================================================

-- View new contact submissions
SELECT *
FROM contact_submissions
WHERE status = 'new'
ORDER BY created_at DESC;

-- Assign submission to user
UPDATE contact_submissions
SET status = 'contacted',
    assigned_to = 'user-uuid-here',
    follow_up_date = CURRENT_DATE + INTERVAL '3 days'
WHERE id = 'submission-uuid-here';

-- Mark submission as converted (became a client)
UPDATE contact_submissions
SET status = 'converted',
    notes = 'Converted to client and project created'
WHERE id = 'submission-uuid-here';

-- Get submissions statistics
SELECT
  status,
  COUNT(*) as count
FROM contact_submissions
GROUP BY status
ORDER BY count DESC;

-- ============================================================================
-- ACTIVITY LOG
-- ============================================================================

-- Log an activity (usually done automatically by app)
INSERT INTO activity_log (
  user_id,
  action,
  entity_type,
  entity_id,
  description
) VALUES (
  'user-uuid-here',
  'create',
  'project',
  'project-uuid-here',
  'Created new project: Oak Woodland Creation'
);

-- View recent activity
SELECT
  al.*,
  u.full_name as user_name,
  u.email as user_email
FROM activity_log al
LEFT JOIN users u ON al.user_id = u.id
ORDER BY al.created_at DESC
LIMIT 50;

-- Get activity for specific entity
SELECT *
FROM activity_log
WHERE entity_type = 'project'
  AND entity_id = 'project-uuid-here'
ORDER BY created_at DESC;

-- Get user's activity history
SELECT *
FROM activity_log
WHERE user_id = 'user-uuid-here'
ORDER BY created_at DESC
LIMIT 100;

-- ============================================================================
-- REPORTING QUERIES
-- ============================================================================

-- Dashboard statistics
SELECT
  (SELECT COUNT(*) FROM clients WHERE status = 'active') as active_clients,
  (SELECT COUNT(*) FROM projects WHERE status IN ('planning', 'in_progress', 'planting')) as active_projects,
  (SELECT COUNT(*) FROM team_members WHERE is_active = true) as active_team_members,
  (SELECT COUNT(*) FROM contact_submissions WHERE status = 'new') as new_leads,
  (SELECT SUM(area_hectares) FROM projects WHERE status = 'completed') as total_hectares_completed;

-- Projects by status
SELECT
  status,
  COUNT(*) as count,
  SUM(area_hectares) as total_area,
  SUM(total_cost) as total_cost,
  SUM(grant_amount) as total_grant
FROM projects
GROUP BY status
ORDER BY count DESC;

-- Monthly project creation trend
SELECT
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as projects_created
FROM projects
WHERE created_at >= NOW() - INTERVAL '12 months'
GROUP BY month
ORDER BY month DESC;

-- Top clients by project count
SELECT
  c.contact_name,
  c.company_name,
  COUNT(p.id) as project_count,
  SUM(p.area_hectares) as total_area
FROM clients c
JOIN projects p ON p.client_id = c.id
GROUP BY c.id, c.contact_name, c.company_name
ORDER BY project_count DESC
LIMIT 10;

-- Team member utilization
SELECT
  tm.name,
  tm.role,
  COUNT(pt.project_id) as current_projects,
  tm.projects_completed,
  tm.quality_rating,
  tm.availability_status
FROM team_members tm
LEFT JOIN project_team pt ON pt.team_member_id = tm.id
WHERE tm.is_active = true
GROUP BY tm.id, tm.name, tm.role, tm.projects_completed, tm.quality_rating, tm.availability_status
ORDER BY current_projects DESC;

-- ============================================================================
-- MAINTENANCE QUERIES
-- ============================================================================

-- Check table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Verify RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Count records in all tables
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL SELECT 'clients', COUNT(*) FROM clients
UNION ALL SELECT 'projects', COUNT(*) FROM projects
UNION ALL SELECT 'team_members', COUNT(*) FROM team_members
UNION ALL SELECT 'project_team', COUNT(*) FROM project_team
UNION ALL SELECT 'project_photos', COUNT(*) FROM project_photos
UNION ALL SELECT 'website_content', COUNT(*) FROM website_content
UNION ALL SELECT 'contact_submissions', COUNT(*) FROM contact_submissions
UNION ALL SELECT 'activity_log', COUNT(*) FROM activity_log;

-- Clean up old activity logs (keep last 90 days)
DELETE FROM activity_log
WHERE created_at < NOW() - INTERVAL '90 days';
