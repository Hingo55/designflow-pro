#!/usr/bin/env node

/**
 * Blog Image Storage Setup Script
 * Initializes Supabase storage bucket for blog images
 * 
 * Run with: node scripts/setup-blog-storage.js
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables')
  console.error('Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupBlogStorage() {
  console.log('🚀 Setting up blog image storage...')

  try {
    // Check if bucket exists
    console.log('📂 Checking for existing blog-images bucket...')
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      throw new Error(`Failed to list buckets: ${listError.message}`)
    }

    const bucketExists = buckets?.some(bucket => bucket.name === 'blog-images')

    if (bucketExists) {
      console.log('✅ Blog-images bucket already exists')
    } else {
      console.log('📦 Creating blog-images bucket...')
      
      // Create the bucket
      const { data, error: createError } = await supabase.storage.createBucket('blog-images', {
        public: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png', 
          'image/webp',
          'image/svg+xml'
        ],
        fileSizeLimit: 5 * 1024 * 1024 // 5MB
      })

      if (createError) {
        throw new Error(`Failed to create bucket: ${createError.message}`)
      }

      console.log('✅ Blog-images bucket created successfully')
    }

    // Test upload permissions
    console.log('🧪 Testing upload permissions...')
    
    // Create a simple test file
    const testFile = new File(['test'], 'test.txt', { type: 'text/plain' })
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload('test/permissions-test.txt', testFile, { upsert: true })

    if (uploadError) {
      console.warn(`⚠️  Upload test failed: ${uploadError.message}`)
      console.warn('You may need to adjust bucket permissions in Supabase dashboard')
    } else {
      console.log('✅ Upload permissions working correctly')
      
      // Clean up test file
      await supabase.storage
        .from('blog-images')
        .remove(['test/permissions-test.txt'])
    }

    // Show configuration summary
    console.log('\n📋 Configuration Summary:')
    console.log('- Bucket: blog-images')
    console.log('- Public access: enabled')
    console.log('- Max file size: 5MB')
    console.log('- Allowed formats: JPEG, PNG, WebP, SVG')
    console.log('- Folder structure: featured/ (for featured images)')
    
    console.log('\n🎉 Blog image storage setup complete!')
    console.log('\nNext steps:')
    console.log('1. Use the BlogImageUpload component in your admin interface')
    console.log('2. Update blog posts with featured_image_url field')
    console.log('3. Images will be automatically optimized by Next.js Image component')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    console.error('\nTroubleshooting:')
    console.error('1. Verify Supabase credentials in .env.local')
    console.error('2. Ensure service role key has storage admin permissions')
    console.error('3. Check Supabase project dashboard for any restrictions')
    process.exit(1)
  }
}

// Run setup
setupBlogStorage()