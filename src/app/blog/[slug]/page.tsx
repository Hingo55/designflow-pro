import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getBlogPost, getAllBlogPosts, incrementViewCount, getPostSeries } from '@/lib/blog'
import { JsonLd } from '@/components/seo/JsonLd'
import { LearnBox } from '@/components/blog/LearnBox'
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
        {/* Article */}
        <section className="pt-24 lg:pt-28 pb-16 lg:pb-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <article className="prose prose-xl max-w-none">
              
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
                
                <div className="flex items-center gap-3 mb-6 overflow-x-auto -ml-12 lg:-ml-16">
                  {/* Personas */}
                  {samplePersonas.map((persona) => (
                    <span key={persona} className="bg-design4-primary/10 text-design4-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      👑 {persona}
                    </span>
                  ))}
                  
                  {/* Phases */}
                  {samplePhases.map((phase) => (
                    <span key={phase} className="bg-design4-gold/10 text-design4-ink px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                      🔄 {phase}
                    </span>
                  ))}
                  
                  {/* Category (Pillar) */}
                  <span className="bg-design4-neutral-100 text-design4-neutral-600 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                    📋 {post.category}
                  </span>
                  
                  {/* Read time */}
                  <span className="text-design4-neutral-400 text-sm whitespace-nowrap">
                    ⏱️ {post.read_time_minutes} min read
                  </span>
                  
                  {/* Time to apply */}
                  <span className="text-design4-neutral-400 text-sm whitespace-nowrap">
                    🎯 Apply in 30 mins
                  </span>
                </div>

                {/* Title with featured image thumbnail */}
                <div className="flex gap-8 mb-4 -ml-12 lg:-ml-16">
                  {/* Featured image thumbnail */}
                  {post.featured_image_url && (
                    <div className="flex-shrink-0">
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  
                  {/* Title and excerpt */}
                  <div className="flex-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-design4-ink leading-tight mb-3">
                      {post.title}
                    </h1>
                    
                    {post.excerpt && (
                      <p className="text-base text-design4-neutral-600 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {/* Author info positioned under excerpt */}
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-design4-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-design4-primary font-medium text-base">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-design4-ink font-medium text-sm">{post.author}</p>
                        <p className="text-design4-neutral-400 text-xs">{formatDate(post.published_at)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {seriesInfo && (
                  <div className="inline-flex items-center gap-2 bg-design4-primary/5 text-design4-primary px-3 py-1.5 rounded-lg text-sm font-medium mb-4 -ml-12 lg:-ml-16">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {seriesInfo.name} Series
                  </div>
                )}
              </header>


              {/* Markdown content - Medium-style layout */}
              <div className="mb-16">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl lg:text-3xl font-bold text-design4-ink mb-8 mt-12 leading-tight tracking-tight">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl lg:text-2xl font-bold text-design4-ink mb-6 mt-12 leading-tight tracking-tight">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg lg:text-xl font-semibold text-design4-ink mb-5 mt-10 leading-tight">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-base leading-7 text-gray-800 mb-4 font-normal">
                        {children}
                      </p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-design4-primary bg-design4-primary/5 pl-6 py-3 my-6 text-base italic text-design4-ink leading-7">
                        {children}
                      </blockquote>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 space-y-2 text-base leading-7 text-gray-800 pl-6">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 space-y-2 text-base leading-7 text-gray-800 pl-6">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-8 list-disc">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    a: ({ children, href }) => (
                      <a 
                        href={href} 
                        className="text-design4-primary hover:text-design4-primary/80 underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-100 text-design4-primary px-2 py-1 rounded font-mono text-lg">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-8 text-base">
                        {children}
                      </pre>
                    ),
                    table: ({ children }) => (
                      <div className="my-8 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-design4-neutral-50">
                        {children}
                      </thead>
                    ),
                    tbody: ({ children }) => (
                      <tbody>
                        {children}
                      </tbody>
                    ),
                    tr: ({ children }) => (
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        {children}
                      </tr>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-design4-ink bg-design4-neutral-100">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-300 px-6 py-4 text-base leading-6 text-gray-800">
                        {children}
                      </td>
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
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