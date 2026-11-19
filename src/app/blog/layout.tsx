import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Ocean Stories & Scuba Diving Blog',
  description: 'Read firsthand scuba diving stories, underwater encounters, and dive-site guides from the Maldives and Thailand with LokaWndr.',
  alternates: { canonical: '/blog', languages: { en: '/blog', ru: '/ru/blog' } },
  openGraph: { type: 'website', title: 'Ocean Stories & Scuba Diving Blog | LokaWndr', description: 'Real diving experiences, underwater encounters, and ocean stories from the Maldives and Thailand.', url: '/blog' },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}
