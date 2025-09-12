import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogPosts, getFeaturedBlogPost, getBlogCategories } from '@/lib/blog'

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

export default async function Blog() {
  const [featuredPost, recentPosts, categories] = await Promise.all([
    getFeaturedBlogPost(),
    getAllBlogPosts(),
    getBlogCategories()
  ])

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

        {/* Header Section */}
        <section className="bg-design4-bg py-16">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center bg-design4-primary/10 text-design4-ink rounded-full px-4 py-2 text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Design4 Insights
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-design4-ink leading-tight mb-6">
                Transforming Business Through Design
              </h1>
              <p className="text-lg text-design4-neutral-500 mb-8 leading-relaxed">
                Expert insights, practical strategies, and real-world case studies on building businesses that outpace change through the Design4 framework.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="bg-design4-bg py-16">
            <div className="mx-auto max-w-design4-container px-6">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-design4-ink mb-2">Featured Article</h2>
                <p className="text-design4-neutral-500">Our latest insights on business transformation</p>
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

        {/* Categories and Recent Posts */}
        <section className="bg-design4-neutral-100 py-20">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Categories Sidebar */}
              <div className="lg:w-1/4">
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
                  {recentPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-design4-neutral-100 overflow-hidden hover:shadow-lg hover:border-design4-primary/20 transition-all duration-300 group">
                      <div className="h-48 bg-gradient-to-br from-design4-primary/5 to-design4-gold/5 flex items-center justify-center">
                        <div className="w-16 h-16 bg-design4-primary/10 rounded-xl flex items-center justify-center group-hover:bg-design4-primary/20 transition-colors">
                          <svg className="w-8 h-8 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-design4-primary/10 text-design4-primary px-2 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="text-design4-neutral-400 text-xs">{formatReadTime(post.read_time_minutes)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-design4-ink mb-2 leading-tight group-hover:text-design4-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-design4-neutral-500 text-sm mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
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