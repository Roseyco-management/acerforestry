-- Acer Forestry Storage Bucket Configuration
-- Run this in the Supabase SQL Editor after creating the main schema

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Create a bucket for project photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-photos',
  'project-photos',
  false, -- Not public by default, requires authentication
  5242880, -- 5MB max file size
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Create a bucket for website content images (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'website-images',
  'website-images',
  true, -- Public bucket for website assets
  10485760, -- 10MB max file size
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
);

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- Project Photos Bucket Policies
-- Allow authenticated users to upload project photos
CREATE POLICY "Authenticated users can upload project photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-photos');

-- Allow authenticated users to view project photos
CREATE POLICY "Authenticated users can view project photos"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'project-photos');

-- Allow authenticated users to update project photos
CREATE POLICY "Authenticated users can update project photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-photos');

-- Only admins can delete project photos
CREATE POLICY "Only admins can delete project photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'project-photos' AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Website Images Bucket Policies
-- Allow authenticated users to upload website images
CREATE POLICY "Authenticated users can upload website images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'website-images');

-- Allow everyone to view website images (public bucket)
CREATE POLICY "Anyone can view website images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'website-images');

-- Allow authenticated users to update website images
CREATE POLICY "Authenticated users can update website images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'website-images');

-- Only admins can delete website images
CREATE POLICY "Only admins can delete website images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'website-images' AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- HELPER VIEWS FOR FILE MANAGEMENT
-- ============================================================================

-- View to see project photos with project details
CREATE OR REPLACE VIEW project_photos_with_details AS
SELECT
  pp.*,
  p.project_name,
  p.location,
  c.contact_name as client_name
FROM project_photos pp
JOIN projects p ON pp.project_id = p.id
JOIN clients c ON p.client_id = c.id;

-- Grant access to authenticated users
GRANT SELECT ON project_photos_with_details TO authenticated;
