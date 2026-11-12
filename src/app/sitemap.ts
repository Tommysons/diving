import type { MetadataRoute } from 'next'
import { diveSites } from '@/lib/data/diveSites'
import { scubaCourses, specialtyCourses } from '@/lib/data/scubaCourses'
import { blogPosts } from '@/lib/data/blogPosts'
import { maldivesGuideSites } from '@/lib/data/maldivesGuides'

const baseUrl = 'https://lokawndr.com'
const staticPaths = ['', '/activities', '/destinations', '/atlas', '/aboutme', '/blog', '/contact', '/divesites', '/faq', '/gallery', '/scubadivingcourses', '/snorkeling', '/destinations/thailand', '/destinations/maldives']

export default function sitemap(): MetadataRoute.Sitemap {
  const localized = staticPaths.flatMap((path) => [path, `/ru${path}`])
  const contentPaths = [
    ...maldivesGuideSites.flatMap((site) => [`/destinations/maldives/${site.slug}`, `/ru/destinations/maldives/${site.slug}`]),
    ...diveSites.flatMap((site) => [`/divesites/${site.slug}`, `/ru/divesites/${site.slug}`]),
    ...[...scubaCourses, ...specialtyCourses].flatMap((course) => [`/scubadivingcourses/${course.slug}`, `/ru/scubadivingcourses/${course.slug}`]),
    ...blogPosts.flatMap((post) => [`/blog/${post.slug}`, `/ru/blog/${post.slug}`]),
  ]

  return [...localized, ...contentPaths].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path.includes('/blog/') ? 'monthly' : 'weekly',
    priority: path === '' || path === '/ru' ? 1 : 0.7,
  }))
}
