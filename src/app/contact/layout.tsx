import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Contact us',
  description: 'Ask about diving courses, snorkeling and ocean experiences with LokaWndr.',
  alternates: { canonical: '/contact', languages: { en: '/contact', ru: '/ru/contact' } },
  openGraph: { title: 'Contact LokaWndr | LokaWndr', description: 'Ask about diving courses, snorkeling and ocean experiences with LokaWndr.', url: '/contact' },
}

export default function Layout({ children }: { children: ReactNode }) { return children }
