import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Koh Tao Dive Sites',
  description: 'Discover Koh Tao dive sites, from beginner-friendly bays to world-famous pinnacles.',
  alternates: { canonical: '/divesites', languages: { en: '/divesites', ru: '/ru/divesites' } },
}

export default function DiveSitesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
