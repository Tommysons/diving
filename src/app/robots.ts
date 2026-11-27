import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: ['https://lokawndr.com/sitemap.xml','https://lokawndr.com/video-sitemap.xml'],
  }
}
