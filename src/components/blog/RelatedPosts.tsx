import Link from 'next/link'
import { BlogPostSummary } from '@/lib/blog'

interface RelatedPostsProps {
  posts: BlogPostSummary[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts?.length) return null

  return (
    <section className="mt-16 pt-12 border-t border-design4-neutral-200">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-design4-ink mb-2">Related Articles</h2>
        <p className="text-design4-neutral-500">Continue your learning journey with these related insights</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-xl border border-design4-neutral-100 overflow-hidden hover:shadow-lg hover:border-design4-primary/20 transition-all duration-300"
          >
            <div className="h-40 bg-gradient-to-br from-design4-primary/5 to-design4-gold/5 flex items-center justify-center">
              <div className="w-12 h-12 bg-design4-primary/10 rounded-lg flex items-center justify-center group-hover:bg-design4-primary/20 transition-colors">
                <svg className="w-6 h-6 text-design4-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-design4-primary/10 text-design4-primary text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-design4-neutral-400 text-xs">
                  {post.read_time_minutes} min read
                </span>
              </div>
              
              <h3 className="font-semibold text-design4-ink group-hover:text-design4-primary transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>
              
              {post.excerpt && (
                <p className="text-design4-neutral-600 text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-design4-neutral-500 text-xs">
                  by {post.author}
                </span>
                <div className="text-design4-primary group-hover:translate-x-1 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}