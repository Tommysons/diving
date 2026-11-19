import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Блог о дайвинге и подводных приключениях',
  description: 'Личные истории о дайвинге, морских обитателях и дайв-сайтах Мальдив и Таиланда от LokaWndr.',
  alternates: { canonical: '/ru/blog', languages: { en: '/blog', ru: '/ru/blog' } },
  openGraph: { type: 'website', title: 'Блог о дайвинге | LokaWndr', description: 'Истории о погружениях, подводном мире и путешествиях на Мальдивах и в Таиланде.', url: '/ru/blog' },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}
