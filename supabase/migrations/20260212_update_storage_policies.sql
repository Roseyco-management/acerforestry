-- Update storage policies for project-photos bucket
-- Make the bucket public for easier access to photo URLs

-- Update the bucket to be public
UPDATE storage.buckets
SET public = true,
    file_size_limit = 10485760 -- 10MB max file size
WHERE id = 'project-photos';

-- Add policy to allow public read access
CREATE POLICY IF NOT EXISTS "Public can view project photos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'project-photos');
