import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { slug, imageUrl } = await request.json()
    
    if (!slug) {
      return NextResponse.json(
        { success: false, error: 'Slug is required' },
        { status: 400 }
      )
    }

    console.log('🔧 API: Attempting update with slug:', slug)
    console.log('🔧 API: Image URL:', imageUrl)
    
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({ featured_image_url: imageUrl })
      .eq('slug', slug)
      .select('id, title, slug, featured_image_url, status')

    console.log('🔧 API: Direct update result:', { data, error })

    if (error) {
      console.error('API: Error updating blog post image:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      console.error('API: No rows updated - post not found')
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    console.log('✅ API: Update successful:', data[0])
    return NextResponse.json({ success: true, post: data[0] })
    
  } catch (error) {
    console.error('API: Update blog post image error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    )
  }
}