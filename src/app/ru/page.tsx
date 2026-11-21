import type { Metadata } from 'next'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = {
  alternates: { canonical: '/ru', languages: { en: '/', ru: '/ru' } },
  openGraph: { url: '/ru', locale: 'ru_RU' },
}

export default function HomePageRU() {
  return <HomePageClient />
}
