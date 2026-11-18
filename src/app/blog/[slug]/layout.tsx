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

export default function BlogPostLayout({ children }: Props) {
  return children
}
