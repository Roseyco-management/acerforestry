# Content Management System (CMS)

## Overview

The CMS allows administrators to edit website content through a user-friendly interface without needing to modify code. Content is stored in Supabase and can be updated in real-time.

## Features

- **Page Selector**: Browse all editable pages (Home, Services, Training, etc.)
- **Section Editor**: Edit individual content sections with forms
- **Content Types**: Support for text, richtext, and image content
- **Preview**: Preview changes before saving
- **Auto-save**: Changes are saved immediately to the database

## Architecture

### Database Layer
`/src/lib/db/content.ts`
- `listEditablePages()` - Get all pages that can be edited
- `getPageContent(pageSlug)` - Get all sections for a page
- `getSectionContent(pageSlug, sectionKey)` - Get specific section
- `updateContent(...)` - Update or create content section
- `deleteContent(...)` - Delete content section
- `getPageSectionDefinitions(pageSlug)` - Get section metadata for a page

### API Routes
`/src/app/api/admin/content/route.ts`
- `GET` - Fetch content by page_slug and optional section_key
- `POST` - Update/create content section
- `DELETE` - Remove content section

`/src/app/api/admin/content/preview/route.ts`
- `POST` - Generate preview of content changes

### UI Components
- `/src/app/admin/content/page.tsx` - Page selector grid
- `/src/app/admin/content/[page]/page.tsx` - Section editor for specific page
- `/src/components/admin/ContentEditor.tsx` - Interactive content editor component

## Database Schema

```sql
CREATE TABLE content_sections (
    id BIGSERIAL PRIMARY KEY,
    page_slug VARCHAR(100) NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    content_type VARCHAR(20) NOT NULL, -- 'text' | 'image' | 'richtext'
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(page_slug, section_key)
);
```

## Content Types

### Text
Single-line text input. Used for:
- Page titles
- Button text
- Short descriptions

### Richtext
Multi-line textarea. Used for:
- Paragraphs
- Descriptions
- Long-form content

**Note**: For MVP, richtext is a simple textarea. Future versions could integrate a WYSIWYG editor like TipTap or Lexical.

### Image
Image URL input with preview. Used for:
- Hero images
- Section backgrounds
- Icons and illustrations

## Editable Pages

1. **Home** (`/`)
   - hero_title, hero_subtitle, hero_cta_text
   - value_props_title, value_props_description
   - services_title, services_description

2. **Services** (`/services`)
   - hero_title, hero_subtitle
   - service_planting_title, service_planting_description
   - service_ground_title, service_ground_description
   - cta_text

3. **Training** (`/training`)
   - hero_title, hero_subtitle
   - training_programs, certifications

4. **Forest Managers** (`/forest-managers`)
   - hero_title, hero_subtitle
   - benefits, services_overview

5. **Subcontractors** (`/subcontractors`)
   - hero_title, hero_subtitle
   - requirements, opportunities

6. **Privacy** (`/privacy`)
   - policy_content

7. **Terms** (`/terms`)
   - terms_content

## Adding New Sections

To add a new editable section:

1. Update `getPageSectionDefinitions()` in `/src/lib/db/content.ts`:
```typescript
{
  key: 'new_section_key',
  label: 'New Section Label',
  type: 'text', // or 'richtext' or 'image'
  description: 'Description of what this section does'
}
```

2. Update your page component to use the CMS content:
```typescript
import { getSectionContent } from '@/lib/db/content'

const heroTitle = await getSectionContent('home', 'hero_title')
// Use heroTitle?.content in your component
```

## Security

- RLS (Row Level Security) enabled
- Public read access (for website display)
- Authenticated users can manage content (admin panel)
- Consider adding role-based access control for additional security

## Future Enhancements

- [ ] Rich text WYSIWYG editor (TipTap, Lexical)
- [ ] Image upload and management
- [ ] Content versioning and rollback
- [ ] Draft/publish workflow
- [ ] Bulk import/export
- [ ] Search and filtering
- [ ] Content scheduling
- [ ] Multi-language support
