import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Уроки и экскурсии по снорклингу',
  description: 'Уроки снорклинга, экскурсии к морским обитателям и ночной снорклинг с LokaWndr. Узнайте о доступности.',
  alternates: { canonical: '/ru/snorkeling', languages: { en: '/snorkeling', ru: '/ru/snorkeling' } },
  openGraph: { title: 'Уроки и экскурсии по снорклингу | LokaWndr', description: 'Уроки снорклинга, экскурсии к морским обитателям и ночной снорклинг с LokaWndr. Узнайте о доступности.', url: '/ru/snorkeling' },
}

export default function Layout({ children }: { children: ReactNode }) { return children }
