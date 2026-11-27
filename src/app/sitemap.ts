import type { MetadataRoute } from 'next'
import { publishedDiveSites } from '@/lib/data/diveSites'
import { scubaCourses, specialtyCourses } from '@/lib/data/scubaCourses'
import { blogPosts } from '@/lib/data/blogPosts'

import { getPublishedVideos } from '@/lib/publishedVideos'
export const dynamic='force-dynamic'

const baseUrl = 'https://lokawndr.com'
const staticPaths = ['', '/activities', '/videos', '/dive-trips', '/dive-trips/maldives-mahibadhoo', '/diving', '/fun-diving', '/destinations', '/atlas', '/aboutme', '/blog', '/contact', '/scubadivingcourses', '/snorkeling', '/destinations/thailand', '/destinations/maldives', '/destinations/maldives/udhdhoo-reef']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const libraryVideos=await getPublishedVideos()
  const localized = staticPaths.flatMap((path) => [path, `/ru${path}`])
  const contentPaths = [
    ...libraryVideos.flatMap(v=>['/videos/'+v.slug,'/ru/videos/'+v.slug]),
    ...['yuki-reef', 'wella-giri', 'lhohi-caves'].flatMap((slug) => [`/destinations/maldives/${slug}`, `/ru/destinations/maldives/${slug}`]),
    ...publishedDiveSites.flatMap((site) => [`/divesites/${site.slug}`, `/ru/divesites/${site.slug}`]),
    ...[...scubaCourses, ...specialtyCourses].flatMap((course) => [`/scubadivingcourses/${course.slug}`, `/ru/scubadivingcourses/${course.slug}`]),
    ...blogPosts.flatMap((post) => [`/blog/${post.slug}`, `/ru/blog/${post.slug}`]),
  ]

  return [...localized, ...contentPaths].map((path) => {
    const unlocalizedPath = path.startsWith('/ru') ? path.slice(3) : path
    return {
    url: `${baseUrl}${path}`,
    alternates: { languages: { en: `${baseUrl}${unlocalizedPath}`, ru: `${baseUrl}/ru${unlocalizedPath}` } },
    changeFrequency: path.includes('/blog/') ? 'monthly' : 'weekly',
    priority: path === '' || path === '/ru' ? 1 : 0.7,
  }
  })
}
