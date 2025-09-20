'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogPosts, getFeaturedBlogPost } from '@/lib/blog'
import { prepareBlogImageUrl } from '@/lib/images'
import SidebarFilters from './SidebarFilters'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string
  author: string
  published_at: string | null
  read_time_minutes: number
  featured_image_url: string | null
  featured: boolean
  post_meta?: {
    target_personas?: string[]
    design4_phases?: string[]
    content_format?: string
    difficulty_level?: string
  } | null
}

export default function Blog() {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    persona: '',
    phase: '',
    search: ''
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Load blog posts function
  const loadPosts = useCallback(async () => {
    try {
      setLoading(true)
      const [featured, posts] = await Promise.all([
        getFeaturedBlogPost(),
        getAllBlogPosts()
      ])
      
      // Debug logging for image URLs
      if (featured) {
        console.log('Featured post:', featured.title, 'Image URL:', featured.featured_image_url)
        console.log('Featured post slug:', featured.slug)
        console.log('Featured post featured flag:', featured.featured)
      } else {
        console.log('No featured post found')
      }
      
      const cmhaPost = posts.find(p => p.title.includes('CMHA'))
      if (cmhaPost) {
        console.log('CMHA post image URL:', cmhaPost.featured_image_url)
        console.log('CMHA post slug:', cmhaPost.slug)
        console.log('CMHA post featured flag:', cmhaPost.featured)
      }
      
      // Log all posts with their featured status
      console.log('All posts with featured status:', posts.map(p => ({
        title: p.title.substring(0, 30) + '...',
        slug: p.slug,
        featured: p.featured,
        hasImage: !!p.featured_image_url
      })))
      
      setFeaturedPost(featured)
      setAllPosts(posts)
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load blog posts on mount
  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  // Listen for storage events to refresh when images are updated
  useEffect(() => {
    const handleStorageChange = () => {
      loadPosts()
    }
    
    // Also listen for focus events (when user switches back to this tab)
    const handleFocus = () => {
      loadPosts()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [loadPosts])

  // Add a manual refresh button for development
  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered')
    loadPosts()
  }

  // Filter posts based on current filters
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesTitle = post.title.toLowerCase().includes(searchTerm)
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(searchTerm) || false
        const matchesCategory = post.category.toLowerCase().includes(searchTerm)
        if (!matchesTitle && !matchesExcerpt && !matchesCategory) {
          return false
        }
      }

      // Persona filter - for now using category-based mapping since post_meta is not populated
      if (filters.persona && filters.persona !== 'All Roles') {
        const personaMatches = {
          'Founder': post.category === 'Leadership',
          'Transformation Leader': post.category === 'Strategy',
          'Consultant': post.category === 'Case Studies',
          'Project Operations': post.category === 'Capabilities'
        }
        if (!personaMatches[filters.persona as keyof typeof personaMatches]) {
          return false
        }
      }

      // Phase filter - using content-based mapping
      if (filters.phase && filters.phase !== 'All Phases') {
        const phaseMatches = {
          'Discover': post.title.toLowerCase().includes('strategic'),
          'Define': post.title.toLowerCase().includes('transformation') || post.category === 'Case Studies',
          'Develop': post.title.toLowerCase().includes('capabilities'),
          'Deliver': post.title.toLowerCase().includes('deliver') || post.title.toLowerCase().includes('implementation')
        }
        if (!phaseMatches[filters.phase as keyof typeof phaseMatches]) {
          return false
        }
      }

      return true
    })
  }, [allPosts, filters])

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: { persona: string; phase: string; search: string }) => {
    setFilters(newFilters)
  }, [])

  // Format dates for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Draft'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatReadTime = (minutes: number) => `${minutes} min read`

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-design4-bg">
          <div className="mx-auto max-w-design4-container px-6 py-20 pt-28">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-design4-primary mx-auto"></div>
              <p className="mt-4 text-design4-neutral-500">Loading articles...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">

        {/* Featured Post - Prominent */}
        {featuredPost && (
          <section className="bg-design4-bg pt-28 pb-20">
            <div className="mx-auto max-w-design4-container px-6">
              <div className="mb-10">
                <h1 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-3">Featured Article</h1>
                <p className="text-lg text-design4-neutral-500">Expert insights on business transformation</p>
              </div>
              
              <div className="bg-white rounded-3xl shadow-sm border border-design4-neutral-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                    <div className="h-64 lg:h-full relative overflow-hidden">
                      <Image
                        src={prepareBlogImageUrl(featuredPost.featured_image_url, featuredPost.category, { width: 600, height: 400, quality: 85 })}
                        alt={featuredPost.title}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-design4-primary/10 via-transparent to-design4-gold/10" />
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-design4-primary/10 text-design4-primary px-3 py-1 rounded-full text-xs font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="text-design4-neutral-400 text-sm">{formatReadTime(featuredPost.read_time_minutes)}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-design4-neutral-500 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-design4-primary/10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-design4-primary font-medium text-sm">
                            {featuredPost.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-design4-ink font-medium text-sm">{featuredPost.author}</p>
                          <p className="text-design4-neutral-400 text-xs">{formatDate(featuredPost.published_at)}</p>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center text-design4-primary font-medium hover:text-design4-primary/80 transition-colors"
                      >
                        Read Article
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sidebar Layout with Filters and Recent Posts */}
        <section className={`bg-white py-20 ${!featuredPost ? 'pt-28' : ''}`}>
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex gap-12">
              {/* Left Sidebar - Filters */}
              <div className="w-64 flex-shrink-0 hidden lg:block">
                <SidebarFilters onFiltersChange={handleFiltersChange} />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                    </svg>
                    Filters
                  </button>
                </div>

                {/* Mobile Filter Overlay */}
                {showMobileFilters && (
                  <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
                    <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-xl p-6 overflow-y-auto">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                        <button
                          onClick={() => setShowMobileFilters(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <SidebarFilters onFiltersChange={handleFiltersChange} />
                    </div>
                  </div>
                )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-design4-ink mb-2">
                  {filters.search || filters.persona !== '' || filters.phase !== '' 
                    ? `Filtered Articles (${filteredPosts.length})` 
                    : 'Recent Articles'
                  }
                </h2>
                <p className="text-design4-neutral-500">
                  {filters.search || filters.persona !== '' || filters.phase !== ''
                    ? `Showing ${filteredPosts.length} articles matching your criteria`
                    : 'Latest insights and strategies from our team'
                  }
                </p>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-design4-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-design4-ink mb-2">No articles found</h3>
                  <p className="text-design4-neutral-500 mb-4">
                    Try adjusting your filters or search terms to find more articles.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-design4-neutral-100 overflow-hidden hover:shadow-lg hover:border-design4-primary/20 transition-all duration-300 group">
                      <div className="h-56 relative overflow-hidden">
                        <Image
                          src={prepareBlogImageUrl(post.featured_image_url, post.category, { width: 400, height: 320, quality: 85 })}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-design4-primary/20 via-transparent to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="bg-design4-primary/10 text-design4-primary px-2 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                          {post.post_meta?.content_format && (
                            <span className="bg-design4-gold/10 text-design4-ink px-2 py-1 rounded-full text-xs font-medium">
                              {post.post_meta.content_format}
                            </span>
                          )}
                          {post.post_meta?.difficulty_level && (
                            <span className="bg-design4-neutral-100 text-design4-neutral-600 px-2 py-1 rounded-full text-xs font-medium">
                              {post.post_meta.difficulty_level}
                            </span>
                          )}
                          <span className="text-design4-neutral-400 text-xs">{formatReadTime(post.read_time_minutes)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-design4-ink mb-2 leading-tight group-hover:text-design4-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-design4-neutral-500 text-sm mb-3 leading-relaxed">
                          {post.excerpt || 'No excerpt available'}
                        </p>
                        
                        {/* Enhanced Persona and Phase Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {/* Persona Badges - For now showing sample personas since post_meta is null */}
                          {post.category === 'Leadership' && (
                            <span className="bg-design4-primary/10 text-design4-primary px-2 py-1 rounded-full text-xs font-medium">
                              👑 Founder
                            </span>
                          )}
                          {post.category === 'Strategy' && (
                            <span className="bg-design4-primary/10 text-design4-primary px-2 py-1 rounded-full text-xs font-medium">
                              🚀 Transformation Leader
                            </span>
                          )}
                          {post.category === 'Case Studies' && (
                            <span className="bg-design4-primary/10 text-design4-primary px-2 py-1 rounded-full text-xs font-medium">
                              🎯 Consultant
                            </span>
                          )}
                          {post.category === 'Capabilities' && (
                            <span className="bg-design4-primary/10 text-design4-primary px-2 py-1 rounded-full text-xs font-medium">
                              ⚙️ Project Operations
                            </span>
                          )}
                          
                          {/* Phase Badges - Sample mapping based on content */}
                          {(post.title.toLowerCase().includes('transformation') || post.category === 'Case Studies') && (
                            <span className="bg-design4-gold/10 text-design4-ink px-2 py-1 rounded-full text-xs font-medium">
                              Define
                            </span>
                          )}
                          {post.title.toLowerCase().includes('capabilities') && (
                            <span className="bg-design4-gold/10 text-design4-ink px-2 py-1 rounded-full text-xs font-medium">
                              Develop
                            </span>
                          )}
                          {post.title.toLowerCase().includes('strategic') && (
                            <span className="bg-design4-gold/10 text-design4-ink px-2 py-1 rounded-full text-xs font-medium">
                              Discover
                            </span>
                          )}
                        </div>

                        {post.post_meta?.target_personas && post.post_meta?.target_personas?.length > 0 && (
                          <div className="flex items-center gap-1 mb-4">
                            <span className="text-design4-neutral-400 text-xs">For:</span>
                            {post.post_meta?.target_personas?.slice(0, 2).map((persona, index) => (
                              <span key={persona} className="text-design4-primary text-xs font-medium">
                                {persona.charAt(0).toUpperCase() + persona.slice(1).replace('-', ' ')}{index < Math.min(post.post_meta?.target_personas?.length || 0, 2) - 1 ? ', ' : ''}
                              </span>
                            ))}
                            {(post.post_meta?.target_personas?.length || 0) > 2 && (
                              <span className="text-design4-neutral-400 text-xs">+{(post.post_meta?.target_personas?.length || 0) - 2} more</span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-design4-primary/10 rounded-full flex items-center justify-center mr-2">
                              <span className="text-design4-primary font-medium text-xs">
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="text-design4-ink font-medium text-xs">{post.author}</p>
                              <p className="text-design4-neutral-400 text-xs">{formatDate(post.published_at)}</p>
                            </div>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-design4-primary font-medium text-sm hover:text-design4-primary/80 transition-colors"
                          >
                            Read →
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Load More - only show if there are results and no filters active */}
              {filteredPosts.length > 0 && !filters.search && !filters.persona && !filters.phase && (
                <div className="text-center mt-12">
                  <button className="bg-design4-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-design4-primary/90 transition-colors">
                    Load More Articles
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-design4-primary py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Stay Updated with Design4 Insights
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Get the latest articles and strategies delivered to your inbox. Join 2,500+ leaders transforming their organizations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-design4-gold focus:ring-offset-2 focus:ring-offset-design4-primary"
                />
                <button className="bg-design4-gold text-design4-ink px-6 py-3 rounded-xl font-medium hover:bg-design4-gold/90 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-white/70 text-sm mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}