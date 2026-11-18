import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { blogPosts } from '@/lib/data/blogPosts'

type Props = { children: ReactNode; params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)
  if (!post) return {}
  const path = `/blog/${post.slug}`
  const canonical = `${path}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical, languages: { en: path, ru: `/ru${path}` } },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, url: canonical, publishedTime: post.date, images: [{ url: post.image, alt: post.title }] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [post.image] },
  }
}

export default async function BlogPostLayout({ children, params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)
  if (!post) return children
  const url = `https://lokawndr.com/blog/${post.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: 'en',
    image: `https://lokawndr.com${post.image}`,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'LokaWndr' },
    publisher: { '@type': 'Organization', name: 'LokaWndr', url: 'https://lokawndr.com' },
  }
  return <>
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    {children}
  </>
}
