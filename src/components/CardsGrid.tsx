'use client'

import { CardData } from '../lib/data'
import Card from './Card'
import { useState, useEffect } from 'react'

interface CardsGridProps {
  cards: CardData[]
  onCardClick: (card: CardData) => void
}

export default function CardsGrid({ cards, onCardClick }: CardsGridProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='w-full flex flex-col gap-6'>
      {cards.map((card) => (
        <div
          key={card.id}
          className={`transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Card card={card} onClick={onCardClick} />
        </div>
      ))}
    </div>
  )
}
