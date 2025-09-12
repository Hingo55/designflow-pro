import { supabase } from './supabase'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  author: string
  author_email: string | null
  category: string
  featured_image_url: string | null
  read_time_minutes: number
  published_at: string | null
  created_at: string
  updated_at: string
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[] | null
  status: 'draft' | 'published' | 'archived'
  view_count: number
  featured: boolean
}

export interface BlogPostSummary {
  id: string
  title: string
  slug: string
  excerpt: string | null
  author: string
  category: string
  featured_image_url: string | null
  read_time_minutes: number
  published_at: string | null
  featured: boolean
}

// supabase client is imported from ./supabase

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      author,
      category,
      featured_image_url,
      read_time_minutes,
      published_at,
      featured
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

export async function getFeaturedBlogPost(): Promise<BlogPostSummary | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      author,
      category,
      featured_image_url,
      read_time_minutes,
      published_at,
      featured
    `)
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching featured blog post:', error)
    return null
  }

  return data
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPostSummary[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      author,
      category,
      featured_image_url,
      read_time_minutes,
      published_at,
      featured
    `)
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts by category:', error)
    return []
  }

  return data || []
}

export async function getBlogCategories(): Promise<{ name: string; count: number }[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('category')
    .eq('status', 'published')

  if (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }

  // Count posts per category
  const categoryCounts = data?.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  // Convert to array format
  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count
  }))

  // Add "All Posts" category
  const totalPosts = data?.length || 0
  categories.unshift({ name: 'All Posts', count: totalPosts })

  return categories
}

export async function incrementViewCount(slug: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment_view_count', { post_slug: slug })
    
    if (error) {
      // Silently handle missing database function in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('View count function not configured:', error.message)
      }
    }
  } catch (err) {
    // Fallback: get current count and increment
    const { data: post } = await supabase
      .from('blog_posts')
      .select('view_count')
      .eq('slug', slug)
      .single()
    
    if (post) {
      await supabase
        .from('blog_posts')
        .update({ view_count: post.view_count + 1 })
        .eq('slug', slug)
    }
  }
}

export async function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): Promise<BlogPostSummary[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      author,
      category,
      featured_image_url,
      read_time_minutes,
      published_at,
      featured
    `)
    .eq('status', 'published')
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }

  return data || []
}

// Generate sitemap data for SEO
export async function getBlogSitemapData(): Promise<{ slug: string; updated_at: string }[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching sitemap data:', error)
    return []
  }

  return data || []
}
