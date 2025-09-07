'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import CardsGrid from '@/components/CardsGrid'
import { cards, CardData } from '@/lib/data'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function HomePage() {
  const router = useRouter()
  const pathname = usePathname()
  const inferredLocale = pathname.startsWith('/ru') ? 'ru' : 'en'
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card)

    switch (card.id) {
      case 'diveSites':
        router.push(`${inferredLocale === 'ru' ? '/ru' : ''}/divesites`)
        break
      case 'divingCourses':
        router.push(
          `${inferredLocale === 'ru' ? '/ru' : ''}/scubadivingcourses`
        )
        break
      case 'freeDivingCourses':
        router.push(`${inferredLocale === 'ru' ? '/ru' : ''}/freedivingcourses`)
        break
      case 'aboutMe':
        router.push(`${inferredLocale === 'ru' ? '/ru' : ''}/aboutme`)
        break
      default:
        alert(`Clicked: ${card.title}`)
    }
  }

  return (
    <>
      <Header />
      <main className='flex-grow'>
        <section id='home' className='mt-12'>
          <CardsGrid
            cards={cards[inferredLocale]} // 👈 load localized cards
            onCardClick={handleCardClick}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
