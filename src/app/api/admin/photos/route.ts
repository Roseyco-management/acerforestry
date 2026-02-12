import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { isDevMode, DEV_PHOTOS } from '@/lib/dev-data'

// GET - Fetch photos (all or by project)
export async function GET(request: NextRequest) {
  // Dev mode bypass - check before auth
  if (isDevMode()) {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    let photos = DEV_PHOTOS
    if (projectId) {
      photos = photos.filter(p => p.project_id === projectId)
    }

    return NextResponse.json({ photos })
  }

  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    let query = supabase
      .from('project_photos')
      .select('*, projects(name)')
      .order('created_at', { ascending: false })

    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching photos:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ photos: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Upload photos
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const projectId = formData.get('projectId') as string | null
    const caption = formData.get('caption') as string | null
    const photoDate = formData.get('photoDate') as string | null

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadedPhotos = []
    const errors = []

    for (const file of files) {
      try {
        // Generate unique filename
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(7)
        const fileExt = file.name.split('.').pop()
        const fileName = `${timestamp}-${randomString}.${fileExt}`
        const filePath = projectId
          ? `${projectId}/${fileName}`
          : `general/${fileName}`

        // Upload to Supabase Storage
        const fileBuffer = await file.arrayBuffer()
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-photos')
          .upload(filePath, fileBuffer, {
            contentType: file.type,
            upsert: false,
          })

        if (uploadError) {
          errors.push({ file: file.name, error: uploadError.message })
          continue
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('project-photos').getPublicUrl(filePath)

        // Save metadata to database
        const { data: photoData, error: dbError } = await supabase
          .from('project_photos')
          .insert({
            project_id: projectId,
            url: publicUrl,
            storage_path: filePath,
            caption: caption || null,
            photo_date: photoDate || null,
            file_name: file.name,
            file_size: file.size,
            mime_type: file.type,
          })
          .select()
          .single()

        if (dbError) {
          // Cleanup: delete uploaded file if database insert fails
          await supabase.storage.from('project-photos').remove([filePath])
          errors.push({ file: file.name, error: dbError.message })
          continue
        }

        uploadedPhotos.push(photoData)
      } catch (err) {
        errors.push({
          file: file.name,
          error: err instanceof Error ? err.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: uploadedPhotos.length > 0,
      uploaded: uploadedPhotos,
      errors: errors.length > 0 ? errors : undefined,
      message: `${uploadedPhotos.length} of ${files.length} photos uploaded successfully`,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete photo
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const photoId = searchParams.get('id')

    if (!photoId) {
      return NextResponse.json({ error: 'Photo ID required' }, { status: 400 })
    }

    // Get photo metadata
    const { data: photo, error: fetchError } = await supabase
      .from('project_photos')
      .select('storage_path')
      .eq('id', photoId)
      .single()

    if (fetchError || !photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('project-photos')
      .remove([photo.storage_path])

    if (storageError) {
      console.error('Error deleting from storage:', storageError)
      // Continue to delete database record even if storage deletion fails
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('project_photos')
      .delete()
      .eq('id', photoId)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Photo deleted' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH - Update photo metadata
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, caption, photo_date, project_id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Photo ID required' }, { status: 400 })
    }

    const updates: any = {}
    if (caption !== undefined) updates.caption = caption
    if (photo_date !== undefined) updates.photo_date = photo_date
    if (project_id !== undefined) updates.project_id = project_id

    const { data, error } = await supabase
      .from('project_photos')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, photo: data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
