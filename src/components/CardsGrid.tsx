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
        flex
        flex-row
        flex-wrap
        gap-x-[400px]
       gap-y-[50px]
        justify-start
        max-w-7xl
        mx-auto
        px-4
        py-8
      '
    >
      {' '}
      {cards.map((card) => (
        <div
          key={card.id}
          className='flex-shrink-0 w-full sm:w-64 md:w-72 lg:w-80'
        >
          <Card card={card} onClick={onCardClick} />
        </div>
      ))}
    </div>
  )
}
