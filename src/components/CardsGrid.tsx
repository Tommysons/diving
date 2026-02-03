'use client'

import { CardData } from '../lib/data'
import Card from './Card'
import { motion } from 'framer-motion'

interface CardsGridProps {
  cards: CardData[]
  onCardClick: (card: CardData) => void
}

export default function CardsGrid({ cards, onCardClick }: CardsGridProps) {
  return (
    <div className='w-full flex flex-col lg:flex-col gap-6'>
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className='w-full'
        >
          <Card card={card} onClick={onCardClick} />
        </motion.div>
      ))}
    </div>
  )
}
