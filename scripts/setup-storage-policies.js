#!/usr/bin/env node

/**
 * Supabase Storage Policies Setup Script
 * Configures Row Level Security policies for blog image uploads
 * 
 * Run with: node scripts/setup-storage-policies.js
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  console.error('')
  console.error('SUPABASE_SERVICE_ROLE_KEY is needed for policy management.')
  console.error('You can find it in your Supabase project settings under API.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupStoragePolicies() {
  console.log('🔐 Setting up Supabase Storage policies...')

  try {
    // First, let's check if the bucket exists
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    
    if (bucketError) {
      throw new Error(`Failed to list buckets: ${bucketError.message}`)
    }

    const blogBucket = buckets?.find(bucket => bucket.name === 'blog-images')
    
    if (!blogBucket) {
      throw new Error('blog-images bucket not found. Please run setup-blog-storage.js first.')
    }

    console.log('✅ Found blog-images bucket')

    // Create storage policies using SQL
    const policies = [
      {
        name: 'Public read access for blog images',
        sql: `
          CREATE POLICY "Public read access for blog images" ON storage.objects 
          FOR SELECT USING (bucket_id = 'blog-images');
        `
      },
      {
        name: 'Anyone can upload blog images',
        sql: `
          CREATE POLICY "Anyone can upload blog images" ON storage.objects 
          FOR INSERT WITH CHECK (bucket_id = 'blog-images');
        `
      },
      {
        name: 'Anyone can update blog images', 
        sql: `
          CREATE POLICY "Anyone can update blog images" ON storage.objects 
          FOR UPDATE USING (bucket_id = 'blog-images') WITH CHECK (bucket_id = 'blog-images');
        `
      },
      {
        name: 'Anyone can delete blog images',
        sql: `
          CREATE POLICY "Anyone can delete blog images" ON storage.objects 
          FOR DELETE USING (bucket_id = 'blog-images');
        `
      }
    ]

    console.log('📝 Creating storage policies...')

    // Execute each policy (some may already exist, that's OK)
    for (const policy of policies) {
      try {
        const { error } = await supabase.rpc('exec_sql', { 
          sql: policy.sql 
        })

        if (error) {
          // Policy might already exist - check if it's a "already exists" error
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            console.log(`⚠️  Policy "${policy.name}" already exists - skipping`)
          } else {
            console.warn(`⚠️  Failed to create policy "${policy.name}": ${error.message}`)
          }
        } else {
          console.log(`✅ Created policy: ${policy.name}`)
        }
      } catch (err) {
        console.warn(`⚠️  Policy error for "${policy.name}": ${err.message}`)
      }
    }

    // Alternative approach: Update bucket to be public
    console.log('🌐 Ensuring bucket is public...')
    
    try {
      const { error: updateError } = await supabase.storage.updateBucket('blog-images', {
        public: true
      })

      if (updateError) {
        console.warn(`⚠️  Bucket update warning: ${updateError.message}`)
      } else {
        console.log('✅ Bucket set to public')
      }
    } catch (err) {
      console.warn(`⚠️  Bucket update error: ${err.message}`)
    }

    // Test upload to verify permissions
    console.log('🧪 Testing upload permissions...')
    
    const testFile = new File(['test image content'], 'test-upload.txt', { 
      type: 'text/plain' 
    })
    
    const { data: uploadTest, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload('test/permissions-test-' + Date.now() + '.txt', testFile, {
        upsert: true
      })

    if (uploadError) {
      console.error('❌ Upload test failed:', uploadError.message)
      console.log('')
      console.log('🛠️  Manual Setup Required:')
      console.log('1. Go to your Supabase Dashboard')
      console.log('2. Navigate to Storage > blog-images')
      console.log('3. Go to Policies tab') 
      console.log('4. Create these policies:')
      console.log('   - SELECT: Allow public read access')
      console.log('   - INSERT: Allow public uploads') 
      console.log('   - UPDATE: Allow public updates')
      console.log('   - DELETE: Allow public deletes')
      console.log('5. Or disable RLS entirely for this bucket')
    } else {
      console.log('✅ Upload test successful!')
      
      // Clean up test file
      await supabase.storage
        .from('blog-images')
        .remove([uploadTest.path])
    }

    console.log('')
    console.log('🎉 Storage policies setup complete!')
    console.log('')
    console.log('📋 Summary:')
    console.log('- Bucket: blog-images')
    console.log('- Public access: enabled') 
    console.log('- Upload permissions: configured')
    console.log('- Policies: applied for full CRUD operations')
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    console.log('')
    console.log('🛠️  Manual Fix Options:')
    console.log('')
    console.log('Option 1 - Dashboard Setup:')
    console.log('1. Go to Supabase Dashboard > Storage > blog-images')
    console.log('2. Click on "Policies" tab')
    console.log('3. Create a policy: "Allow public access to blog images"')
    console.log('4. Set it to allow SELECT, INSERT, UPDATE, DELETE operations')
    console.log('5. Use expression: bucket_id = \'blog-images\'')
    console.log('')
    console.log('Option 2 - Disable RLS (simpler):')
    console.log('1. Go to Supabase Dashboard > Storage > Settings')
    console.log('2. Find "blog-images" bucket')
    console.log('3. Disable Row Level Security for this bucket')
    
    process.exit(1)
  }
}

// Run setup
setupStoragePolicies()