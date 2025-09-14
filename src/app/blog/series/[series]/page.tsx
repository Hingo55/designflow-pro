import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getBlogPostsBySeries, getAllBlogSeries } from '@/lib/blog'

interface BlogSeriesPageProps {
  params: Promise<{
    series: string
  }>
}

export async function generateStaticParams() {
  const series = await getAllBlogSeries()
  return series.map((s) => ({
    series: s.slug,
  }))
}

export async function generateMetadata({ params }: BlogSeriesPageProps) {
  const resolvedParams = await params
  const allSeries = await getAllBlogSeries()
  const seriesInfo = allSeries.find(s => s.slug === resolvedParams.series)
  
  if (!seriesInfo) {
    return {
      title: 'Series Not Found | Design4 Blog',
    }
  }
  
  return {
    title: `${seriesInfo.name} Series | Design4 Blog`,
    description: `${seriesInfo.description} - ${seriesInfo.count} articles in this series.`,
    openGraph: {
      title: `${seriesInfo.name} Series | Design4 Blog`,
      description: `${seriesInfo.description} - ${seriesInfo.count} articles in this series.`,
      type: 'website',
    },
    alternates: {
      canonical: `/blog/series/${resolvedParams.series}`,
    },
  }
}

export default async function BlogSeriesPage({ params }: BlogSeriesPageProps) {
  const resolvedParams = await params
  const posts = await getBlogPostsBySeries(resolvedParams.series)
  const allSeries = await getAllBlogSeries()
  const seriesInfo = allSeries.find(s => s.slug === resolvedParams.series)
  
  if (!seriesInfo || posts.length === 0) {
    notFound()
  }

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Draft'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
              <span className="text-design4-neutral-400">Series</span>
              <span>/</span>
              <span className="text-design4-ink">{seriesInfo.name}</span>
            </nav>
          </div>
        </section>

        {/* Series Header */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-design4-container px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-design4-primary/10 text-design4-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Article Series
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-design4-ink mb-4">
                {seriesInfo.name}
              </h1>
              <p className="text-xl text-design4-neutral-600 max-w-3xl mx-auto mb-6">
                {seriesInfo.description}
              </p>
              <div className="flex items-center justify-center gap-4 text-design4-neutral-500">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
                </span>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl shadow-sm border border-design4-neutral-100 overflow-hidden hover:shadow-lg hover:border-design4-primary/20 transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-design4-primary/5 to-design4-gold/5 flex items-center justify-center">
                    <div className="w-16 h-16 bg-design4-primary/10 rounded-xl flex items-center justify-center group-hover:bg-design4-primary/20 transition-colors">
                      <svg className="w-8 h-8 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-design4-primary/10 text-design4-primary px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-design4-neutral-400 text-sm">
                        {post.read_time_minutes} min read
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-design4-ink group-hover:text-design4-primary transition-colors mb-3 leading-tight">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-design4-neutral-600 mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-design4-neutral-500 text-sm">
                        <span>by {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                      <div className="text-design4-primary group-hover:translate-x-1 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Other Series */}
            <section className="mt-20 pt-12 border-t border-design4-neutral-200">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-design4-ink mb-2">Explore Other Series</h2>
                <p className="text-design4-neutral-500">Discover more curated content collections</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allSeries
                  .filter(s => s.slug !== resolvedParams.series)
                  .map((series) => (
                    <Link
                      key={series.slug}
                      href={`/blog/series/${series.slug}`}
                      className="group block bg-white rounded-xl border border-design4-neutral-100 p-6 hover:shadow-lg hover:border-design4-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-design4-primary/10 rounded-lg flex items-center justify-center group-hover:bg-design4-primary/20 transition-colors">
                          <svg className="w-6 h-6 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <span className="bg-design4-neutral-100 text-design4-neutral-600 px-2 py-1 rounded-full text-xs font-medium">
                          {series.count} articles
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-design4-ink group-hover:text-design4-primary transition-colors mb-2">
                        {series.name}
                      </h3>
                      <p className="text-design4-neutral-600 text-sm leading-relaxed">
                        {series.description}
                      </p>
                    </Link>
                  ))}
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}