import type { Metadata } from 'next'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = {
  alternates: { canonical: '/', languages: { en: '/', ru: '/ru' } },
  openGraph: { url: '/', locale: 'en_US' },
}

export default function HomePage() {
  return <HomePageClient />
}
