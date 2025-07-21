'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import CardsGrid from '../components/CardsGrid'
import { cards, CardData } from '../lib/data'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function HomePage() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const router = useRouter()

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card)

    // Navigate based on card title or id
    switch (card.title.toLowerCase()) {
      case 'dive sites':
        router.push('/divesites')
        break
      case 'scuba diving courses':
        router.push('/scubadivingcourses')
        break
      case 'freediving courses':
        router.push('/freedivingcourses')
        break
      case 'about me':
        router.push('/aboutme')
        break
      default:
        alert(`You clicked on: ${card.title}`)
    }
  }

  return (
    <>
      <Header />

      {/* Main Content */}
      <main className='bg-gray-100 min-h-screen'>
        <section id='divesites' className='mt-12'>
          <CardsGrid cards={cards} onCardClick={handleCardClick} />
        </section>

        {/* Other sections here */}
      </main>
      <Footer />
    </>
  )
}
