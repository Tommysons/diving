'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import CardsGrid from '../components/CardsGrid'
import { cards, CardData } from '../lib/data'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function HomePage() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const router = useRouter()
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card)

    // Navigate based on card id
    switch (card.id) {
      case 'diveSites':
        router.push(`${locale === 'ru' ? '/ru' : ''}/divesites`)
        break
      case 'divingCourses':
        router.push(`${locale === 'ru' ? '/ru' : ''}/scubadivingcourses`)
        break
      // case 'freeDivingCourses':
      //   router.push(`${locale === 'ru' ? '/ru' : ''}/freedivingcourses`)
      //   break
      case 'aboutMe':
        router.push(`${locale === 'ru' ? '/ru' : ''}/aboutme`)
        break
      default:
        alert(`You clicked on: ${card.title}`)
    }
  }

  return (
    <>
      <Header />

      <main className='flex-grow'>
        <section id='main-cards' className='mt-12'>
          <CardsGrid cards={cards[locale]} onCardClick={handleCardClick} />
        </section>
      </main>

      <Footer />
    </>
  )
}
