import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogPosts, getFeaturedBlogPost, getBlogCategories, getAllPersonas, getAllPhases } from '@/lib/blog'
import BlogFilters from './BlogFilters'

export const metadata = {
  title: 'Design4 Blog | Insights & Strategies',
  description: 'Expert insights on business transformation, strategic alignment, and organizational design from the Design4 framework.',
  openGraph: {
    title: 'Design4 Blog | Insights & Strategies',
    description: 'Expert insights on business transformation, strategic alignment, and organizational design from the Design4 framework.',
    type: 'website',
    url: 'https://design4.biz/blog',
  },
  alternates: {
    canonical: 'https://design4.biz/blog',
  },
}

interface BlogPageProps {
  searchParams: Promise<{
    persona?: string
    phase?: string
  }>
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams
  const selectedPersonas = new Set(resolvedSearchParams.persona?.split(',').filter(Boolean) || [])
  const selectedPhases = new Set(resolvedSearchParams.phase?.split(',').filter(Boolean) || [])

  const [featuredPost, allPosts, categories, personas, phases] = await Promise.all([
    getFeaturedBlogPost(),
    getAllBlogPosts(),
    getBlogCategories(),
    getAllPersonas(),
    getAllPhases()
  ])

  // Filter posts based on query parameters
  // For now, since we don't have post_meta in database, we'll simulate filtering
  // When post_meta is available, this will filter based on actual metadata
  const filteredPosts = allPosts.filter(post => {
    // Until database has post_meta, we'll show all posts for now
    // In future: filter by post.post_meta?.target_personas and post.post_meta?.design4_phases
    return true
  })

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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
        {/* Breadcrumb */}
        <section className="bg-design4-bg border-b border-design4-neutral-100">
          <div className="mx-auto max-w-design4-container px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm text-design4-neutral-500">
              <Link href="/" className="hover:text-design4-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-design4-ink">Blog</span>
            </nav>
          </div>
        </section>


        {/* Featured Post - Prominent */}
        {featuredPost && (
          <section className="bg-design4-bg pt-8 pb-20">
            <div className="mx-auto max-w-design4-container px-6">
              <div className="mb-10">
                <h1 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-3">Featured Article</h1>
                <p className="text-lg text-design4-neutral-500">Expert insights on business transformation</p>
              </div>
              
              <div className="bg-white rounded-3xl shadow-sm border border-design4-neutral-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                    <div className="h-64 lg:h-full bg-gradient-to-br from-design4-primary/10 to-design4-gold/10 flex items-center justify-center">
                      <div className="w-24 h-24 bg-design4-primary/20 rounded-2xl flex items-center justify-center">
                        <svg className="w-12 h-12 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
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

        {/* Interactive Filters and Recent Posts */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            {/* Interactive Filter Bar */}
            <div className="mb-12">
              <BlogFilters />
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Enhanced Filters Sidebar */}
              <div className="lg:w-1/4 space-y-6">
                {/* Persona Filter */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                  <h3 className="text-lg font-bold text-design4-ink mb-4">For Your Role</h3>
                  <div className="space-y-2">
                    {personas.map((persona) => (
                      <button
                        key={persona.id}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors text-design4-neutral-500 hover:bg-design4-neutral-50 hover:text-design4-ink"
                      >
                        <div className="flex items-center">
                          <span className="mr-2">{persona.icon}</span>
                          <span>{persona.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phase Filter */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100">
                  <h3 className="text-lg font-bold text-design4-ink mb-4">Design4 Phases</h3>
                  <div className="space-y-2">
                    {phases.map((phase) => (
                      <button
                        key={phase.id}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors text-design4-neutral-500 hover:bg-design4-neutral-50 hover:text-design4-ink"
                      >
                        <div className="flex items-center justify-between">
                          <span>{phase.name}</span>
                          <span className="text-xs text-design4-neutral-400">{phase.order}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-design4-neutral-100 sticky top-6">
                  <h3 className="text-lg font-bold text-design4-ink mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          index === 0 
                            ? 'bg-design4-primary/10 text-design4-primary' 
                            : 'text-design4-neutral-500 hover:bg-design4-neutral-50 hover:text-design4-ink'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category.name}</span>
                          <span className="text-xs text-design4-neutral-400">{category.count}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Posts Grid */}
              <div className="lg:w-3/4">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-design4-ink mb-2">Recent Articles</h2>
                  <p className="text-design4-neutral-500">Latest insights and strategies from our team</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-design4-neutral-100 overflow-hidden hover:shadow-lg hover:border-design4-primary/20 transition-all duration-300 group">
                      <div className="h-48 bg-gradient-to-br from-design4-primary/5 to-design4-gold/5 flex items-center justify-center">
                        <div className="w-16 h-16 bg-design4-primary/10 rounded-xl flex items-center justify-center group-hover:bg-design4-primary/20 transition-colors">
                          <svg className="w-8 h-8 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </div>
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
                          {post.excerpt}
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

                        {post.post_meta?.target_personas && post.post_meta.target_personas.length > 0 && (
                          <div className="flex items-center gap-1 mb-4">
                            <span className="text-design4-neutral-400 text-xs">For:</span>
                            {post.post_meta.target_personas.slice(0, 2).map((persona, index) => (
                              <span key={persona} className="text-design4-primary text-xs font-medium">
                                {persona.charAt(0).toUpperCase() + persona.slice(1).replace('-', ' ')}{index < Math.min(post.post_meta.target_personas.length, 2) - 1 ? ', ' : ''}
                              </span>
                            ))}
                            {post.post_meta.target_personas.length > 2 && (
                              <span className="text-design4-neutral-400 text-xs">+{post.post_meta.target_personas.length - 2} more</span>
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

                {/* Load More */}
                <div className="text-center mt-12">
                  <button className="bg-design4-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-design4-primary/90 transition-colors">
                    Load More Articles
                  </button>
                </div>
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