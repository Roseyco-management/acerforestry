-- Add certifications and hourly_rate to team_members table
-- Migration: 20260212_add_team_certifications_hourly_rate

ALTER TABLE team_members
ADD COLUMN certifications JSONB DEFAULT '[]'::jsonb,
ADD COLUMN hourly_rate DECIMAL(10,2);

-- Add comment for documentation
COMMENT ON COLUMN team_members.certifications IS 'Array of certification objects with structure: [{name: string, expiryDate: string}]';
COMMENT ON COLUMN team_members.hourly_rate IS 'Hourly rate in GBP for billing purposes';

-- Create index for querying certifications
CREATE INDEX idx_team_members_certifications ON team_members USING gin(certifications);
