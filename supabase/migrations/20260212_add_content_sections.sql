-- Content Management System Tables
-- Allows editing of website content sections through the admin panel

-- Create content_sections table
CREATE TABLE IF NOT EXISTS public.content_sections (
    id BIGSERIAL PRIMARY KEY,
    page_slug VARCHAR(100) NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    content_type VARCHAR(20) NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'image', 'richtext')),
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(page_slug, section_key)
);

-- Create index for faster lookups
CREATE INDEX idx_content_sections_page_slug ON public.content_sections(page_slug);
CREATE INDEX idx_content_sections_page_section ON public.content_sections(page_slug, section_key);

-- Add RLS policies
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for displaying content on the website)
CREATE POLICY "Allow public read access"
    ON public.content_sections
    FOR SELECT
    USING (true);

-- Allow authenticated users to insert/update/delete (admin only in practice)
CREATE POLICY "Allow authenticated users to manage content"
    ON public.content_sections
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.content_sections
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Add some sample content for the home page
INSERT INTO public.content_sections (page_slug, section_key, content_type, content) VALUES
    ('home', 'hero_title', 'text', 'Professional Woodland Establishment for the Scottish Highlands'),
    ('home', 'hero_subtitle', 'richtext', 'Expert tree planting, ground preparation, and forest maintenance. HSE-compliant forestry services with exceptional survival rates backed by 26 years of combined experience.'),
    ('home', 'hero_cta_text', 'text', 'Call 07756 513 670')
ON CONFLICT (page_slug, section_key) DO NOTHING;

COMMENT ON TABLE public.content_sections IS 'Stores editable content sections for website pages';
COMMENT ON COLUMN public.content_sections.page_slug IS 'Page identifier (e.g., home, services, training)';
COMMENT ON COLUMN public.content_sections.section_key IS 'Section identifier within the page (e.g., hero_title, hero_subtitle)';
COMMENT ON COLUMN public.content_sections.content_type IS 'Type of content: text, image, or richtext';
COMMENT ON COLUMN public.content_sections.content IS 'The actual content (text, URL for images, or rich text)';
COMMENT ON COLUMN public.content_sections.metadata IS 'Additional metadata stored as JSON (optional)';
