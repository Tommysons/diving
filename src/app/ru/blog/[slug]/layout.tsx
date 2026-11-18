import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { blogPostsRU } from '@/lib/data/blogPostsRU'

type Props = { children: ReactNode; params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPostsRU.find((item) => item.slug === slug)
  if (!post) return {}
  const path = `/blog/${post.slug}`
  const canonical = `/ru${path}`
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
