import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'
import { getBlogPost, getRelatedPosts, incrementViewCount } from '@/lib/blog'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Design4 Blog',
    }
  }
  
  return {
    title: post.seo_title || `${post.title} | Design4 Blog`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [post.author],
      tags: post.seo_keywords || [post.category],
      url: `https://design4.biz/blog/${resolvedParams.slug}`,
    },
    alternates: {
      canonical: `https://design4.biz/blog/${resolvedParams.slug}`,
    },
  }
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = await getBlogPost(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  // Increment view count (fire and forget)
  incrementViewCount(resolvedParams.slug)

  // Get related posts
  const relatedPosts = await getRelatedPosts(resolvedParams.slug, post.category, 3)

  // Format date for display
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
      <StructuredData post={post} />
      <Navigation />
      <main className="min-h-screen bg-design4-bg">
        {/* Breadcrumb */}
        <section className="bg-design4-bg border-b border-design4-neutral-100">
          <div className="mx-auto max-w-design4-container px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm text-design4-neutral-500">
              <Link href="/" className="hover:text-design4-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-design4-primary transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-design4-ink">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Article */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-design4-container px-6 flex flex-col gap-12 lg:flex-row lg:gap-24">
            <article className="mx-auto max-w-3xl">
              {/* Featured Image */}
              <div className="mb-8 aspect-video w-full rounded-2xl bg-gradient-to-br from-design4-primary/10 to-design4-gold/10 flex items-center justify-center border border-design4-neutral-100">
                <div className="w-24 h-24 bg-design4-primary/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-design4-primary/10 text-design4-primary px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-design4-neutral-400 text-sm">{formatReadTime(post.read_time_minutes)}</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-design4-ink mb-4 leading-tight">
                    {post.title}
                  </h1>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-design4-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-design4-primary font-medium">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-design4-ink font-medium">{post.author}</p>
                      <p className="text-design4-neutral-400 text-sm">{formatDate(post.published_at)}</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="prose-headings:text-design4-ink prose-p:text-design4-neutral-600 prose-strong:text-design4-ink prose-blockquote:border-l-design4-primary prose-blockquote:bg-design4-primary/5 prose-blockquote:text-design4-ink prose-a:text-design4-primary prose-a:no-underline hover:prose-a:underline prose-ul:text-design4-neutral-600 prose-ol:text-design4-neutral-600 prose-li:text-design4-neutral-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-design4-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-design4-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-design4-primary font-medium text-lg">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-design4-ink font-medium text-lg">{post.author}</p>
                      <p className="text-design4-neutral-500">Strategic Transformation Expert</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="text-design4-neutral-400 hover:text-design4-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                    <button className="text-design4-neutral-400 hover:text-design4-primary transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:max-w-[300px]">
              <div className="bg-white border border-design4-neutral-100 flex flex-col items-start rounded-2xl py-8">
                <div className="mb-8 px-6">
                  <img
                    src="/design4_logo_color.svg"
                    alt="Design4 Logo"
                    className="max-h-8 w-full"
                  />
                </div>
                <div className="mb-5 px-6 last:mb-0">
                  <div className="mb-2 text-xs font-semibold text-design4-ink">Framework</div>
                  <div className="text-design4-neutral-500 overflow-hidden text-xs md:text-sm">
                    Design4 provides systematic approaches to align organizational purpose with daily operations for sustainable competitive advantage.
                  </div>
                </div>
                <div className="mb-5 px-6 last:mb-0">
                  <div className="mb-2 text-xs font-semibold text-design4-ink">Focus Areas</div>
                  <div className="text-design4-neutral-500 overflow-hidden text-xs md:text-sm">
                    Strategy, Capabilities, Operations, Transformation
                  </div>
                </div>
                <div className="border-design4-neutral-200 mb-5 w-full border-t px-6 pt-5 last:mb-0">
                  <div className="mb-2 text-xs font-semibold text-design4-ink">Created by</div>
                  <div className="text-design4-neutral-500 overflow-hidden text-xs md:text-sm">
                    Omar Choudhry & Design4 Team
                  </div>
                </div>
                <div className="mb-5 px-6 last:mb-0">
                  <div className="mb-2 text-xs font-semibold text-design4-ink">Industries</div>
                  <div className="text-design4-neutral-500 overflow-hidden text-xs md:text-sm">
                    Technology, Financial Services, Healthcare, Manufacturing
                  </div>
                </div>
                <div className="mb-5 px-6 last:mb-0">
                  <div className="mb-2 text-xs font-semibold text-design4-ink">Website</div>
                  <div className="text-design4-neutral-500 overflow-hidden text-xs md:text-sm">
                    <Link href="/" className="hover:text-design4-primary underline transition-colors">
                      https://design4.biz
                    </Link>
                  </div>
                </div>
                <div className="mb-5 px-6 last:mb-0">
                  <div className="mb-2 text-xs font-semibold text-design4-ink">Topics</div>
                  <div className="text-design4-neutral-500 overflow-hidden text-xs md:text-sm">
                    Business Transformation, Strategic Alignment, Organizational Design
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="mt-8 bg-white border border-design4-neutral-100 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-design4-ink mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-design4-ink group-hover:text-design4-primary transition-colors mb-1">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-design4-neutral-500 mb-2">
                          {relatedPost.excerpt?.substring(0, 100)}...
                        </p>
                        <div className="flex items-center text-xs text-design4-neutral-400">
                          <span>{formatDate(relatedPost.published_at)}</span>
                          <span className="mx-2">•</span>
                          <span>{formatReadTime(relatedPost.read_time_minutes)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-design4-primary py-16">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Organization?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Discover how the Design4 framework can help you build sustainable competitive advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/design4assessment"
                  className="inline-flex items-center justify-center bg-white text-design4-primary px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Take Assessment
                </Link>
                <Link 
                  href="/ai-strategy"
                  className="inline-flex items-center justify-center text-white font-medium hover:text-white/80 transition-colors"
                >
                  Try Design4 Assistant →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}