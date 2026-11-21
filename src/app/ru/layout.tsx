import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'LokaWndr | Дайвинг, снорклинг и океанские приключения',
  description: 'Откройте дайвинг, снорклинг, морскую жизнь и подводные приключения в Таиланде и на Мальдивах вместе с LokaWndr.',
  openGraph: {
    locale: 'ru_RU',
    title: 'LokaWndr | Дайвинг, снорклинг и океанские приключения',
    description: 'Дайвинг, снорклинг и реальные истории о подводном мире Таиланда и Мальдив.',
    url: '/ru',
  },
}

export default function RussianLayout({ children }: { children: ReactNode }) {
  return children
}
