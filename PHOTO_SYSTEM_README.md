# Photo Library and Upload System

## Overview

The photo management system allows administrators to upload, organize, and manage project photos. Photos can be associated with specific projects or stored in a general library.

## Features

- Drag & drop photo upload interface using react-dropzone
- Bulk upload support (up to 20 photos at once)
- Image optimization/compression
- Project association
- Captions and dates
- Photo gallery with lightbox viewer
- Search and filter capabilities
- Delete photos with confirmation

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── photos/
│   │       ├── page.tsx              # Main photo gallery view
│   │       └── upload/
│   │           └── page.tsx          # Photo upload interface
│   └── api/
│       └── admin/
│           └── photos/
│               └── route.ts          # API endpoints for photo operations
└── components/
    └── admin/
        ├── PhotoGallery.tsx         # Gallery component (already existed)
        └── PhotoUploader.tsx        # Drag & drop uploader component
```

## Database Schema

### project_photos Table

```sql
CREATE TABLE project_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE, -- Nullable for general library

  -- Storage information
  url TEXT,                      -- Public URL of the photo
  storage_path TEXT NOT NULL,    -- Path in Supabase Storage
  file_name TEXT NOT NULL,
  file_size INTEGER,             -- in bytes
  mime_type TEXT,

  -- Photo metadata
  caption TEXT,                  -- Photo caption/description
  photo_date DATE,              -- Date the photo was taken
  title TEXT,
  description TEXT,
  photo_type TEXT CHECK (photo_type IN ('before', 'during', 'after', 'progress', 'other')),

  -- Display settings
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Supabase Storage

### Bucket: project-photos

- **Access**: Public (for photo URLs to work)
- **Max File Size**: 10MB
- **Allowed Types**: JPEG, PNG, WebP
- **Structure**:
  - `{project_id}/{timestamp}-{random}.{ext}` - For project photos
  - `general/{timestamp}-{random}.{ext}` - For general library photos

### Storage Policies

```sql
-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload project photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-photos');

-- Public can view (for URLs)
CREATE POLICY "Public can view project photos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'project-photos');

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete project photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-photos');
```

## API Endpoints

### GET /api/admin/photos

Fetch photos with optional filtering.

**Query Parameters:**
- `projectId` (optional) - Filter by project ID

**Response:**
```json
{
  "photos": [
    {
      "id": "uuid",
      "url": "https://...",
      "file_name": "photo.jpg",
      "caption": "Tree planting progress",
      "photo_date": "2024-03-15",
      "created_at": "2024-03-15T10:30:00Z",
      "projects": { "name": "Oak Woodland" }
    }
  ]
}
```

### POST /api/admin/photos

Upload one or more photos.

**Body (FormData):**
- `files` - Array of image files
- `projectId` (optional) - Project to associate with
- `caption` (optional) - Caption for all photos
- `photoDate` (optional) - Date for all photos

**Response:**
```json
{
  "success": true,
  "uploaded": [...],
  "errors": [...],
  "message": "5 of 5 photos uploaded successfully"
}
```

### DELETE /api/admin/photos?id={photoId}

Delete a photo from storage and database.

**Response:**
```json
{
  "success": true,
  "message": "Photo deleted"
}
```

### PATCH /api/admin/photos

Update photo metadata.

**Body:**
```json
{
  "id": "uuid",
  "caption": "Updated caption",
  "photo_date": "2024-03-15",
  "project_id": "uuid"
}
```

## Components

### PhotoUploader

Drag & drop photo upload component with preview.

```tsx
import PhotoUploader from '@/components/admin/PhotoUploader'

<PhotoUploader
  onUpload={handleUpload}
  maxFiles={20}
  maxSizeMB={10}
/>
```

### PhotoGallery

Grid gallery with lightbox viewer.

```tsx
import PhotoGallery from '@/components/admin/PhotoGallery'

<PhotoGallery
  photos={photos}
  columns={4}
  gap="md"
  aspectRatio="square"
  showOverlay={true}
  onPhotoDelete={handleDelete}
/>
```

## Setup Instructions

1. **Run Database Migrations:**
   ```bash
   # Apply the schema updates in Supabase SQL Editor
   # Run: supabase/migrations/20260212_update_project_photos.sql
   # Run: supabase/migrations/20260212_update_storage_policies.sql
   ```

2. **Create Storage Bucket:**
   ```bash
   # In Supabase Dashboard or SQL Editor
   # Run: supabase/storage-setup.sql
   ```

3. **Verify Policies:**
   - Check that storage policies are active in Supabase Dashboard
   - Test photo upload and access

## Usage

### Uploading Photos

1. Navigate to Admin > Photos
2. Click "Upload Photos" button
3. Select project (optional)
4. Add caption and date (optional)
5. Drag & drop photos or click to browse
6. Click "Upload" button

### Managing Photos

1. View all photos in the gallery
2. Use search to find specific photos
3. Filter by project
4. Click photo to view in lightbox
5. Click delete (twice to confirm) to remove photo

## Future Enhancements

- [ ] Image compression before upload
- [ ] Thumbnail generation for performance
- [ ] Batch edit capabilities
- [ ] Photo categorization/tagging
- [ ] Export photos by project
- [ ] Storage usage analytics
- [ ] Advanced sorting options
- [ ] Photo metadata (EXIF data)

## Troubleshooting

### Photos not uploading

- Check Supabase Storage bucket exists
- Verify storage policies are active
- Check file size limits (max 10MB)
- Ensure allowed MIME types are correct

### Photos not displaying

- Verify bucket is set to public
- Check public URL is being generated correctly
- Ensure storage policies allow public SELECT

### CORS errors

- Check Supabase project URL is correct
- Verify CORS settings in Supabase dashboard
