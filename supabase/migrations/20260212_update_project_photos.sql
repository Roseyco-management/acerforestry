-- Migration to update project_photos table
-- Make project_id nullable to support general photo library
-- Add url field for easier access

-- Make project_id nullable
ALTER TABLE project_photos
  ALTER COLUMN project_id DROP NOT NULL;

-- Add url column for the public URL
ALTER TABLE project_photos
  ADD COLUMN IF NOT EXISTS url TEXT;

-- Add caption column if it doesn't exist (using description instead)
ALTER TABLE project_photos
  ADD COLUMN IF NOT EXISTS caption TEXT;

-- Update the foreign key constraint to allow null
ALTER TABLE project_photos
  DROP CONSTRAINT IF EXISTS project_photos_project_id_fkey,
  ADD CONSTRAINT project_photos_project_id_fkey
    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE;

-- Create index for faster queries on photos without projects
CREATE INDEX IF NOT EXISTS idx_project_photos_no_project
  ON project_photos(id)
  WHERE project_id IS NULL;

-- Update RLS policies to allow public access if needed
-- (already covered by existing policies)
