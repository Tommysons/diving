import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Связаться с нами',
  description: 'Узнайте о курсах дайвинга, снорклинге и приключениях на океане вместе с LokaWndr.',
  alternates: { canonical: '/ru/contact', languages: { en: '/contact', ru: '/ru/contact' } },
  openGraph: { title: 'Связаться с LokaWndr | LokaWndr', description: 'Узнайте о курсах дайвинга, снорклинге и приключениях на океане вместе с LokaWndr.', url: '/ru/contact' },
}

export default function Layout({ children }: { children: ReactNode }) { return children }
