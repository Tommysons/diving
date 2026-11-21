import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Обо мне | Инструктор по дайвингу PADI и SSI',
  description: 'Познакомьтесь с инструктором LokaWndr: обучение дайвингу PADI и SSI, опыт погружений и безопасные подводные приключения.',
  alternates: { canonical: '/ru/aboutme', languages: { en: '/aboutme', ru: '/ru/aboutme' } },
  openGraph: {
    locale: 'ru_RU',
    title: 'Обо мне | Инструктор по дайвингу PADI и SSI',
    description: 'Узнайте об опыте и квалификации инструктора LokaWndr.',
    url: '/ru/aboutme',
  },
}

export default function AboutLayoutRU({ children }: { children: ReactNode }) {
  return children
}
