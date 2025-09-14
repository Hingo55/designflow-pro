import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getBlogPost, getAllBlogPosts, incrementViewCount, getPostSeries } from '@/lib/blog'
import { JsonLd } from '@/components/seo/JsonLd'
import { LearnBox } from '@/components/blog/LearnBox'
import { PostCTA } from '@/components/blog/PostCTA'
import { AuthorCard } from '@/components/blog/AuthorCard'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

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
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
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

  // Get all posts for related post matching
  const allPosts = await getAllBlogPosts()
  
  // Generate sample personas and phases based on category
  const samplePersonas = post.category === 'Leadership' ? ['Founder'] : 
                        post.category === 'Strategy' ? ['Transformation Leader'] :
                        post.category === 'Operations' ? ['Project Operations'] : ['Consultant']
  const samplePhases = post.category === 'Leadership' ? ['Discover', 'Define'] :
                      post.category === 'Strategy' ? ['Define', 'Develop'] :
                      post.category === 'Operations' ? ['Develop', 'Deliver'] : ['Discover', 'Deliver']
  
  // Related posts matching algorithm (same persona OR same phase) then by pillar; exclude current slug
  const related = allPosts
    .filter(p => p.slug !== post.slug)
    .map(p => {
      const pPersonas = p.category === 'Leadership' ? ['Founder'] : 
                       p.category === 'Strategy' ? ['Transformation Leader'] :
                       p.category === 'Operations' ? ['Project Operations'] : ['Consultant']
      const pPhases = p.category === 'Leadership' ? ['Discover', 'Define'] :
                     p.category === 'Strategy' ? ['Define', 'Develop'] :
                     p.category === 'Operations' ? ['Develop', 'Deliver'] : ['Discover', 'Deliver']
      
      const score = (pPersonas.some(x => samplePersonas.includes(x)) ? 2 : 0) +
                   (pPhases.some(x => samplePhases.includes(x)) ? 2 : 0) +
                   (p.category === post.category ? 1 : 0)
      return { p, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.p)

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Draft'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Sample learning outcomes based on category
  const sampleLearningOutcomes = post.category === 'Leadership' ? [
    'How to align organizational vision with operational execution',
    'Frameworks for strategic decision-making under uncertainty',
    'Methods to build and maintain high-performing teams'
  ] : post.category === 'Strategy' ? [
    'Strategic planning methodologies for transformation',
    'Change management best practices and frameworks',
    'How to measure and track transformation success'
  ] : post.category === 'Operations' ? [
    'Operational excellence principles and implementation',
    'Process optimization and continuous improvement methods',
    'Project management techniques for complex initiatives'
  ] : [
    'Consulting methodologies and engagement frameworks',
    'Client relationship management strategies',
    'How to deliver measurable business value'
  ]

  // Get series information for this post
  const seriesInfo = getPostSeries(post)

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
              <Link href="/blog" className="hover:text-design4-primary transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-design4-ink">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Article */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-design4-container px-6">
            <article className="prose prose-lg max-w-none mx-auto max-w-4xl">
              
              {/* Header: title, dek, badges (personas, phases, pillar, time to apply), read time */}
              <header className="mb-12">
                {/* Series link if present */}
                {seriesInfo && (
                  <div className="mb-4">
                    <Link 
                      href={`/blog/series/${seriesInfo.slug}`}
                      className="inline-flex items-center gap-2 text-design4-primary hover:text-design4-primary/80 transition-colors group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span className="text-sm font-medium">Part of the {seriesInfo.name} Series</span>
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  {/* Personas */}
                  {samplePersonas.map((persona) => (
                    <span key={persona} className="bg-design4-primary/10 text-design4-primary px-3 py-1 rounded-full text-sm font-medium">
                      👑 {persona}
                    </span>
                  ))}
                  
                  {/* Phases */}
                  {samplePhases.map((phase) => (
                    <span key={phase} className="bg-design4-gold/10 text-design4-ink px-3 py-1 rounded-full text-sm font-medium">
                      🔄 {phase}
                    </span>
                  ))}
                  
                  {/* Category (Pillar) */}
                  <span className="bg-design4-neutral-100 text-design4-neutral-600 px-3 py-1 rounded-full text-sm font-medium">
                    📋 {post.category}
                  </span>
                  
                  {/* Read time */}
                  <span className="text-design4-neutral-400 text-sm">
                    ⏱️ {post.read_time_minutes} min read
                  </span>
                  
                  {/* Time to apply */}
                  <span className="text-design4-neutral-400 text-sm">
                    🎯 Apply in 30 mins
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-design4-ink mb-4 leading-tight">
                  {post.title}
                </h1>
                
                {seriesInfo && (
                  <div className="inline-flex items-center gap-2 bg-design4-primary/5 text-design4-primary px-3 py-1.5 rounded-lg text-sm font-medium mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {seriesInfo.name} Series
                  </div>
                )}
                
                {post.excerpt && (
                  <p className="text-xl text-design4-neutral-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center mb-8">
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
              </header>

              {/* What you'll learn: bordered box rendering whatYoullLearn list if present */}
              <LearnBox items={sampleLearningOutcomes} />

              {/* Primary CTA: top button; use post-specific cta or fall back to persona default map */}
              <PostCTA personas={samplePersonas} />

              {/* MDX content */}
              <div className="prose-headings:text-design4-ink prose-p:text-design4-neutral-600 prose-strong:text-design4-ink prose-blockquote:border-l-design4-primary prose-blockquote:bg-design4-primary/5 prose-blockquote:text-design4-ink prose-a:text-design4-primary prose-a:no-underline hover:prose-a:underline prose-ul:text-design4-neutral-600 prose-ol:text-design4-neutral-600 prose-li:text-design4-neutral-600 mb-12">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Content upgrade: inline download card if present (placeholder for now) */}
              {post.category === 'Leadership' && (
                <div className="my-12 p-6 bg-gradient-to-r from-design4-neutral-50 to-design4-primary/5 rounded-xl border border-design4-neutral-200">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-design4-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-design4-ink mb-2">Download the Leadership Framework Template</h3>
                      <p className="text-design4-neutral-600 text-sm mb-3">Get our complete framework template to implement these strategies in your organization.</p>
                      <button className="inline-flex items-center gap-2 bg-design4-primary text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-design4-primary/90 transition-colors">
                        Download Template
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Author card */}
              <AuthorCard 
                name={post.author}
                email={post.author_email}
                bio="Strategic transformation expert with 15+ years helping organizations implement systematic change and achieve sustainable competitive advantage."
                social={{
                  linkedin: "https://linkedin.com/in/design4expert",
                  twitter: "https://twitter.com/design4expert",
                  website: "https://design4.biz"
                }}
              />

              {/* Related posts: 3 posts, matched by (same persona OR same phase) then by pillar; exclude current slug */}
              <RelatedPosts posts={related} />

              {/* Secondary CTA: same as top */}
              <PostCTA personas={samplePersonas} className="mt-16" />
            </article>
          </div>
        </section>
      </main>
      
      {/* JsonLd for SEO */}
      <JsonLd post={post} personas={samplePersonas} phases={samplePhases} />
      
      <Footer />
    </>
  )
}