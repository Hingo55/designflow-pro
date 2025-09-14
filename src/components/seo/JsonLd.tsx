import { BlogPost, getPostSeries } from '@/lib/blog'

interface JsonLdProps {
  post: BlogPost
  personas?: string[]
  phases?: string[]
}

export function JsonLd({ post, personas = [], phases = [] }: JsonLdProps) {
  const seriesInfo = getPostSeries(post)
  
  // Enhanced BlogPosting with persona/phase targeting
  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.seo_description,
    author: {
      '@type': 'Person',
      name: post.author,
      email: post.author_email
    },
    publisher: {
      '@type': 'Organization',
      name: 'Design4.biz',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
      }
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`
    },
    image: post.featured_image_url ? {
      '@type': 'ImageObject',
      url: post.featured_image_url,
      width: 1200,
      height: 630
    } : undefined,
    articleSection: post.category,
    keywords: post.seo_keywords?.join(', '),
    wordCount: Math.ceil(post.content.length / 5),
    timeRequired: `PT${post.read_time_minutes}M`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    copyrightYear: new Date(post.published_at || post.created_at).getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: 'Design4.biz'
    },
    // Enhanced with persona/phase targeting
    about: [...phases, post.category].filter(Boolean),
    audience: personas.map(p => ({ '@type': 'Audience', audienceType: p })),
    // Add series information if present
    isPartOf: seriesInfo ? {
      '@type': 'BlogPosting',
      name: seriesInfo.name,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/series/${seriesInfo.slug}`
    } : undefined
  }

  // BreadcrumbList for navigation
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog` }
  ]
  
  // Add series breadcrumb if present
  if (seriesInfo) {
    breadcrumbItems.push({
      '@type': 'ListItem', 
      position: 3, 
      name: `${seriesInfo.name} Series`, 
      item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/series/${seriesInfo.slug}`
    })
    breadcrumbItems.push({
      '@type': 'ListItem', 
      position: 4, 
      name: post.title, 
      item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`
    })
  } else {
    breadcrumbItems.push({
      '@type': 'ListItem', 
      position: 3, 
      name: post.title, 
      item: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`
    })
  }

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  }

  // Remove undefined values
  const cleanBlogPosting = JSON.parse(JSON.stringify(blogPosting))
  const cleanBreadcrumb = JSON.parse(JSON.stringify(breadcrumbList))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanBlogPosting, null, 2)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanBreadcrumb, null, 2)
        }}
      />
    </>
  )
}