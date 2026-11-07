import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Дайв-сайты Ко Тао',
  description: 'Откройте для себя дайв-сайты Ко Тао: от спокойных бухт для начинающих до знаменитых пиннаклей.',
  alternates: { canonical: '/ru/divesites', languages: { en: '/divesites', ru: '/ru/divesites' } },
}

export default function DiveSitesRuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
