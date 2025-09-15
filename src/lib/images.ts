import { supabase } from './supabase'

export interface ImageUploadResult {
  url: string
  path: string
  error?: string
}

// Blog images storage configuration
const STORAGE_BUCKET = 'blog-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']

/**
 * Upload a blog featured image to Supabase Storage
 * @param file - The image file to upload
 * @param slug - The blog post slug (used for organizing files)
 * @returns Promise with upload result
 */
export async function uploadBlogImage(file: File, slug: string): Promise<ImageUploadResult> {
  try {
    // Validate file
    if (!file) {
      return { url: '', path: '', error: 'No file provided' }
    }

    if (file.size > MAX_FILE_SIZE) {
      return { url: '', path: '', error: 'File size too large (max 5MB)' }
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { url: '', path: '', error: 'Invalid file type. Allowed: JPEG, PNG, WebP, SVG' }
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const fileName = `${slug}-${Date.now()}.${fileExtension}`
    const filePath = `featured/${fileName}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return { url: '', path: '', error: `Upload failed: ${error.message}` }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path)

    return {
      url: urlData.publicUrl,
      path: data.path,
      error: undefined
    }
  } catch (error) {
    console.error('Image upload error:', error)
    return { 
      url: '', 
      path: '', 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}

/**
 * Delete a blog image from Supabase Storage
 * @param path - The storage path of the image to delete
 * @returns Promise with success/error result
 */
export async function deleteBlogImage(path: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Image delete error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}

/**
 * Get optimized image URL from Supabase Storage with transformations
 * @param path - The storage path of the image
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  path: string, 
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  } = {}
): string {
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path)

  let url = data.publicUrl

  // Add transformation parameters if available
  if (options.width || options.height || options.quality || options.format) {
    const params = new URLSearchParams()
    if (options.width) params.append('width', options.width.toString())
    if (options.height) params.append('height', options.height.toString())
    if (options.quality) params.append('quality', options.quality.toString())
    if (options.format) params.append('format', options.format)
    
    url += `?${params.toString()}`
  }

  return url
}

/**
 * Generate placeholder image URL for blog posts without featured images
 * Uses a consistent Design4-themed placeholder
 */
export function getBlogPlaceholderImage(category: string = 'default'): string {
  // Map categories to curated blog-specific images
  const categoryImages: Record<string, string> = {
    'Leadership': '/blog/leadership-featured.png',
    'Strategy': '/blog/strategy-featured.png', 
    'Case Studies': '/blog/consulting-featured.png',
    'Capabilities': '/blog/capabilities-featured.png',
    'default': '/design4_logo.png'
  }

  return categoryImages[category] || categoryImages.default
}

/**
 * Validate and prepare image URL for blog post
 * Handles both Supabase Storage URLs and fallback placeholders
 */
export function prepareBlogImageUrl(
  featuredImageUrl: string | null, 
  category: string = 'default',
  options: { width?: number; height?: number; quality?: number } = {}
): string {
  // If no featured image URL, use category-specific placeholder
  if (!featuredImageUrl || featuredImageUrl.trim() === '') {
    return getBlogPlaceholderImage(category)
  }

  // For Supabase URLs, return as-is (Next.js will handle optimization)
  if (featuredImageUrl.includes('supabase.co')) {
    return featuredImageUrl
  }

  // For other external URLs, return as-is
  if (featuredImageUrl.startsWith('http')) {
    return featuredImageUrl
  }

  // For relative paths, assume they're in public folder
  if (featuredImageUrl.startsWith('/')) {
    return featuredImageUrl
  }

  // If it doesn't match any pattern, use placeholder
  return getBlogPlaceholderImage(category)
}

/**
 * Initialize blog images storage bucket (run once during setup)
 * This should be called from a setup script or admin interface
 */
export async function initializeBlogStorage(): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      return { success: false, error: `Failed to list buckets: ${listError.message}` }
    }

    const bucketExists = buckets?.some(bucket => bucket.name === STORAGE_BUCKET)

    if (!bucketExists) {
      // Create the bucket
      const { data, error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
        public: true,
        allowedMimeTypes: ALLOWED_TYPES,
        fileSizeLimit: MAX_FILE_SIZE
      })

      if (createError) {
        return { success: false, error: `Failed to create bucket: ${createError.message}` }
      }

      console.log('Blog images storage bucket created successfully')
    }

    return { success: true }
  } catch (error) {
    console.error('Storage initialization error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}

export { STORAGE_BUCKET, MAX_FILE_SIZE, ALLOWED_TYPES }