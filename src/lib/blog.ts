import { supabase, supabaseAdmin } from './supabase'

export interface Persona {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface Phase {
  id: string
  name: string
  description: string
  order: number
}

export interface PostMeta {
  target_personas: string[]
  design4_phases: string[]
  design4_pillars: string[]
  content_format: 'Playbook' | 'Case Study' | 'Runbook' | 'Opinion' | 'Article'
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced'
  estimated_implementation_time: string
  prerequisites: string[]
  key_outcomes: string[]
  related_tools: string[]
  industry_focus: string[]
  company_size: string[]
  transformation_stage: string[]
  content_tags: string[]
  external_links: Array<{
    title: string
    url: string
    description?: string
  }>
}

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
  post_meta: PostMeta | null
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
  created_at: string
  featured: boolean
  post_meta: PostMeta | null
}

// supabase client is imported from ./supabase

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  const { data, error } = await supabaseAdmin
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
      created_at,
      featured
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  // Debug: log raw data from database
  console.log('🔍 Raw blog posts data from database:', data?.map(post => ({
    title: post.title?.substring(0, 30) + '...',
    slug: post.slug,
    featured_image_url: post.featured_image_url,
    featured: post.featured
  })))

  return (data || []).map(post => ({ ...post, post_meta: null }))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      author,
      author_email,
      category,
      featured_image_url,
      read_time_minutes,
      published_at,
      created_at,
      updated_at,
      seo_title,
      seo_description,
      seo_keywords,
      status,
      view_count,
      featured
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data ? { ...data, post_meta: null } : null
}

export async function getFeaturedBlogPost(): Promise<BlogPostSummary | null> {
  const { data, error } = await supabaseAdmin
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
      created_at,
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

  // Debug: log raw featured post data from database
  console.log('🔍 Raw featured post data from database:', {
    title: data?.title,
    slug: data?.slug,
    featured_image_url: data?.featured_image_url,
    featured: data?.featured
  })

  return data ? { ...data, post_meta: null } : null
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
      created_at,
      featured
    `)
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts by category:', error)
    return []
  }

  return (data || []).map(post => ({ ...post, post_meta: null }))
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
      created_at,
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

  return (data || []).map(post => ({ ...post, post_meta: null }))
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

// Get all available personas
export async function getAllPersonas(): Promise<Persona[]> {
  // For now, return static data. In future, this could come from database
  return [
    {
      id: 'founder',
      name: 'Founder',
      description: 'Visionary leaders building and scaling organizations',
      icon: '👑',
      color: 'bg-blue-500'
    },
    {
      id: 'transformation-leader',
      name: 'Transformation Leader',
      description: 'Leaders driving organizational change and growth',
      icon: '🚀',
      color: 'bg-purple-500'
    },
    {
      id: 'consultant',
      name: 'Consultant',
      description: 'Strategic advisors and implementation partners',
      icon: '🎯',
      color: 'bg-green-500'
    }
  ]
}

// Get all available Design4 phases
export async function getAllPhases(): Promise<Phase[]> {
  // For now, return static data. In future, this could come from database
  return [
    { id: 'discover', name: 'Discover', description: 'Understand current state and opportunities', order: 1 },
    { id: 'define', name: 'Define', description: 'Define vision, strategy, and objectives', order: 2 },
    { id: 'design', name: 'Design', description: 'Design solutions and transformation roadmap', order: 3 },
    { id: 'develop', name: 'Develop', description: 'Build capabilities and execute initiatives', order: 4 },
    { id: 'deliver', name: 'Deliver', description: 'Deploy, measure, and optimize results', order: 5 }
  ]
}

// Get blog posts filtered by persona
export async function getBlogPostsByPersona(persona: string): Promise<BlogPostSummary[]> {
  // Return empty array until database schema is updated with post_meta column
  console.warn('getBlogPostsByPersona: post_meta column not yet available in database')
  return []
}

// Get blog posts filtered by phase
export async function getBlogPostsByPhase(phase: string): Promise<BlogPostSummary[]> {
  // Return empty array until database schema is updated with post_meta column
  console.warn('getBlogPostsByPhase: post_meta column not yet available in database')
  return []
}

// Get blog posts filtered by content format
export async function getBlogPostsByFormat(format: string): Promise<BlogPostSummary[]> {
  // Return empty array until database schema is updated with post_meta column
  console.warn('getBlogPostsByFormat: post_meta column not yet available in database')
  return []
}

// Get blog posts with advanced filtering
export async function getFilteredBlogPosts(filters: {
  personas?: string[]
  phases?: string[]
  pillars?: string[]
  formats?: string[]
  categories?: string[]
  difficultyLevel?: string
}): Promise<BlogPostSummary[]> {
  // For now, only support category filtering until database schema is updated
  console.warn('getFilteredBlogPosts: post_meta column not yet available, only category filtering supported')
  
  if (filters.categories && filters.categories.length > 0) {
    return getBlogPostsByCategory(filters.categories[0])
  }
  
  // Return all posts if no category filter
  return getAllBlogPosts()
}

// Get blog posts by series
export async function getBlogPostsBySeries(series: string): Promise<BlogPostSummary[]> {
  // For now, simulate series data based on post titles and categories
  // In future, this would query the database with a proper series column
  const allPosts = await getAllBlogPosts()
  
  // Sample series mapping based on existing posts
  const seriesMapping: Record<string, string[]> = {
    'alignment': ['strategic-plans-alignment-gap', 'four-phases-business-transformation'],
    'transformation': ['cmha-toronto-design4-transformation', 'four-phases-business-transformation'],
    'capabilities': ['building-capabilities-that-matter'],
    'design4-fundamentals': ['four-phases-business-transformation', 'strategic-plans-alignment-gap']
  }
  
  const seriesSlugs = seriesMapping[series.toLowerCase()] || []
  
  return allPosts
    .filter(post => seriesSlugs.includes(post.slug))
    .sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at).getTime()
      const dateB = new Date(b.published_at || b.created_at).getTime()
      return dateB - dateA // Sort by date descending (newest first)
    })
}

// Get all available blog series
export async function getAllBlogSeries(): Promise<Array<{ name: string; slug: string; count: number; description: string }>> {
  // For now, return static series data. In future, this would come from database
  const allPosts = await getAllBlogPosts()
  
  const series = [
    {
      name: 'Alignment',
      slug: 'alignment',
      description: 'Bridging the gap between strategy and execution through systematic alignment',
      count: 0
    },
    {
      name: 'Transformation',
      slug: 'transformation',
      description: 'Real-world case studies and frameworks for organizational transformation',
      count: 0
    },
    {
      name: 'Capabilities',
      slug: 'capabilities',
      description: 'Building and developing organizational capabilities that drive results',
      count: 0
    },
    {
      name: 'Design4 Fundamentals',
      slug: 'design4-fundamentals',
      description: 'Core principles and methodologies of the Design4 framework',
      count: 0
    }
  ]
  
  // Calculate actual counts
  for (const s of series) {
    const seriesPosts = await getBlogPostsBySeries(s.slug)
    s.count = seriesPosts.length
  }
  
  return series.filter(s => s.count > 0)
}

// Get series information for a specific post
export function getPostSeries(post: BlogPost | BlogPostSummary): { name: string; slug: string } | null {
  // Sample series detection based on post content/category
  // In future, this would read from the database post_meta or series column
  
  const titleLower = post.title.toLowerCase()
  const categoryLower = post.category.toLowerCase()
  
  if (titleLower.includes('alignment') || post.slug.includes('alignment')) {
    return { name: 'Alignment', slug: 'alignment' }
  }
  
  if (titleLower.includes('transformation') || post.slug.includes('transformation') || categoryLower === 'leadership') {
    return { name: 'Transformation', slug: 'transformation' }
  }
  
  if (titleLower.includes('capabilities') || post.slug.includes('capabilities')) {
    return { name: 'Capabilities', slug: 'capabilities' }
  }
  
  if (titleLower.includes('design4') || titleLower.includes('four phases') || categoryLower === 'strategy') {
    return { name: 'Design4 Fundamentals', slug: 'design4-fundamentals' }
  }
  
  return null
}

/**
 * Update a blog post's featured image URL
 * @param slug - The blog post slug
 * @param imageUrl - The new image URL (or null to remove)
 * @returns Promise with success/error result
 */
export async function updateBlogPostImage(slug: string, imageUrl: string | null): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🔧 Attempting update with slug:', slug)
    console.log('🔧 Image URL:', imageUrl)
    
    // Simple, direct update - remove status filter for now
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update({ featured_image_url: imageUrl })
      .eq('slug', slug)
      .select('id, title, slug, featured_image_url, status')

    console.log('🔧 Direct update result:', { data, error })

    if (error) {
      console.error('Error updating blog post image:', error)
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      console.error('No rows updated - post not found or not published')
      return { success: false, error: 'Post not found or not published' }
    }

    console.log('✅ Update successful:', data[0])
    return { success: true }
  } catch (error) {
    console.error('Update blog post image error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}
