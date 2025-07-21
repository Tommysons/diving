'use client'

import { useState } from 'react'
import CardsGrid from './components/CardsGrid'
import { cards, CardData } from './lib/data'
import Footer from './components/Footer'
import Header from './components/Header'

export default function HomePage() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card)
    // You can implement modal or detail view here
    alert(`You clicked on: ${card.title}`)
  }

  return (
    <>
      <Header />

      {/* Main Content */}
      <main className='bg-gray-100 min-h-screen'>
        <section id='divesites' className='mt-12'>
          <CardsGrid cards={cards} onCardClick={handleCardClick} />
        </section>

        {/* Future sections with IDs "scubacourses", "freedivingcourses", "contacts" can go here */}
      </main>
      <Footer />
    </>
  )
}
