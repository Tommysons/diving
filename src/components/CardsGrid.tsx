'use client'

import { CardData } from '../lib/data'
import Card from './Card'

interface CardsGridProps {
  cards: CardData[]
  onCardClick: (card: CardData) => void
}

export default function CardsGrid({ cards, onCardClick }: CardsGridProps) {
  return (
    <div className='flex justify-center w-full'>
      <div className='w-full max-w-xl px-2 py-6 space-y-8'>
        {cards.map((card) => (
          <div key={card.id} className='w-full'>
            <Card card={card} onClick={onCardClick} />
          </div>
        ))}
      </div>
    </div>
  )
}
