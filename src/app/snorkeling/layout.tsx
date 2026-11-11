import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Snorkeling Lessons and Excursions',
  description: 'Discover snorkeling lessons, marine-life excursions and night snorkeling with LokaWndr. Contact us for availability.',
  alternates: { canonical: '/snorkeling', languages: { en: '/snorkeling', ru: '/ru/snorkeling' } },
  openGraph: { title: 'Snorkeling Lessons and Excursions | LokaWndr', description: 'Discover snorkeling lessons, marine-life excursions and night snorkeling with LokaWndr. Contact us for availability.', url: '/snorkeling' },
}

export default function Layout({ children }: { children: ReactNode }) { return children }
