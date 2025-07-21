// src/components/CardsGrid.tsx
import { CardData } from '../lib/data'
import Card from './Card'

interface CardsGridProps {
  cards: CardData[]
  onCardClick: (card: CardData) => void
}

export default function CardsGrid({ cards, onCardClick }: CardsGridProps) {
  return (
    <div
      className='
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-8
        max-w-7xl
        mx-auto
        px-4
        py-8
      '
    >
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  )
}
