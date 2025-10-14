'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import CardsGrid from '../components/CardsGrid'
import { cards, CardData } from '../lib/data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

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

  // Quotes in both languages
  const quotes = {
    en: 'In diving, as in the ocean of life, every descent is followed by a rise—never give up.',
    ru: 'В дайвинге, как и в океане жизни, за каждым погружением следует подъём — никогда не сдавайся.',
  }

  return (
    <>
      <Header />

      <main className='mx-auto px-4'>
        {/* Cards Section */}
        <section id='main-cards' className='mt-12'>
          <CardsGrid cards={cards[locale]} onCardClick={handleCardClick} />
        </section>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className='w-full flex justify-center mt-12 mb-12'
        >
          <div className='bg-blue-50 border-l-4 border-blue-400 p-6 italic shadow rounded-md max-w-3xl text-center'>
            “{quotes[locale]}”
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  )
}
