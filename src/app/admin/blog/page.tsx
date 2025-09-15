'use client'

import { useState, useEffect } from 'react'
import { getAllBlogPosts } from '@/lib/blog'
import BlogImageUpload from '@/components/admin/BlogImageUpload'
import Navigation from '@/components/Navigation'
import { Edit, Image, Calendar, User, Tag } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
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
  post_meta?: {
    target_personas?: string[]
    design4_phases?: string[]
    content_format?: string
    difficulty_level?: string
  } | null
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Load blog posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllBlogPosts()
        setPosts(allPosts)
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  // Update post image URL
  const handleImageUpdate = async (postId: string, imageUrl: string | null) => {
    // Find the post to get its slug
    const post = posts.find(p => p.id === postId)
    if (!post) {
      console.error('Post not found:', postId)
      return
    }

    try {
      console.log(`🔄 Attempting to update post "${post.title}" (slug: ${post.slug}) with image URL:`, imageUrl)
      
      // Update via API route
      const response = await fetch('/api/blog/update-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          slug: post.slug,
          imageUrl: imageUrl
        })
      })
      
      const result = await response.json()
      
      console.log('💾 API update result:', result)
      
      if (result.success) {
        // Update local state only if database update succeeded
        setPosts(prevPosts => 
          prevPosts.map(p => 
            p.id === postId 
              ? { ...p, featured_image_url: imageUrl }
              : p
          )
        )
        
        // Also update the selected post if it's the same one
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost(prev => prev ? { ...prev, featured_image_url: imageUrl } : null)
        }
        
        console.log(`✅ Successfully updated post "${post.title}" with image: ${imageUrl}`)
        alert(`✅ Image updated successfully for "${post.title}"!`)
      } else {
        console.error('❌ Database update failed:', result.error)
        alert(`Failed to update image: ${result.error}`)
      }
    } catch (error) {
      console.error('❌ Unexpected error updating post image:', error)
      alert('Unexpected error occurred. Please check console for details.')
    }
  }

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Draft'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-design4-bg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-design4-primary mx-auto mb-4"></div>
            <p className="text-design4-neutral-500">Loading blog posts...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-design4-bg">
        {/* Header */}
        <div className="bg-white border-b border-design4-neutral-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-design4-ink">Blog Administration</h1>
                <p className="text-design4-neutral-500 mt-1">Manage blog post images and content</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-design4-primary/10 text-design4-primary px-3 py-1 rounded-full text-sm font-medium">
                  {posts.length} Posts
                </div>
                <Link 
                  href="/blog" 
                  className="text-design4-primary hover:text-design4-primary/80 transition-colors"
                >
                  View Blog →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-design4-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-design4-primary focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="h-4 w-4 text-design4-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Posts List */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-design4-ink mb-4">
                Blog Posts ({filteredPosts.length})
              </h2>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPost?.id === post.id
                        ? 'border-design4-primary bg-design4-primary/5'
                        : 'border-design4-neutral-200 hover:border-design4-primary/50 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-design4-ink truncate">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-sm text-design4-neutral-500">
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            <span>{post.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.published_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        {post.featured_image_url ? (
                          <div className="w-12 h-8 rounded overflow-hidden">
                            <img 
                              src={post.featured_image_url} 
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-8 bg-design4-neutral-100 rounded flex items-center justify-center">
                            <Image className="h-3 w-3 text-design4-neutral-400" />
                          </div>
                        )}
                        {post.featured && (
                          <div className="w-2 h-2 bg-design4-gold rounded-full" title="Featured post" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Management Panel */}
            <div className="bg-white rounded-lg border border-design4-neutral-200 p-6">
              {selectedPost ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-design4-ink mb-2">
                      Manage Featured Image
                    </h3>
                    <div className="bg-design4-neutral-50 p-3 rounded-lg">
                      <p className="font-medium text-design4-ink truncate">{selectedPost.title}</p>
                      <p className="text-sm text-design4-neutral-500 mt-1">
                        {selectedPost.category} • {selectedPost.author}
                      </p>
                    </div>
                  </div>

                  <BlogImageUpload
                    slug={selectedPost.slug}
                    currentImageUrl={selectedPost.featured_image_url}
                    onImageUpdate={(imageUrl) => handleImageUpdate(selectedPost.id, imageUrl)}
                  />

                  {/* Additional Actions */}
                  <div className="mt-6 pt-6 border-t border-design4-neutral-200">
                    <div className="flex gap-3">
                      <Link
                        href={`/blog/${selectedPost.slug}`}
                        className="flex items-center gap-2 text-design4-primary hover:text-design4-primary/80 text-sm font-medium"
                      >
                        <Edit className="h-4 w-4" />
                        View Post
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Image className="h-12 w-12 text-design4-neutral-300 mx-auto mb-4" />
                  <h3 className="text-design4-neutral-500 font-medium mb-2">Select a Post</h3>
                  <p className="text-design4-neutral-400 text-sm">
                    Choose a blog post from the list to manage its featured image.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}