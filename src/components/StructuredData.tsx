import { BlogPost } from '@/lib/blog'

interface StructuredDataProps {
  post: BlogPost
}

export default function StructuredData({ post }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featured_image_url || "https://design4.biz/design4_logo_color.svg",
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://design4.biz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Design4",
      "logo": {
        "@type": "ImageObject",
        "url": "https://design4.biz/design4_logo_color.svg"
      }
    },
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://design4.biz/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.seo_keywords || [post.category],
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.read_time_minutes}M`
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
