import CardsGrid from './CardsGrid'
import { cards, CardData } from '../lib/data'

interface DiveSitesSectionProps {
  onCardClick: (card: CardData) => void
}

export default function DiveSitesSection({
  onCardClick,
}: DiveSitesSectionProps) {
  const diveSites = cards.filter((card) => card.id === 'diveSites')

  return (
    <section id='divesites' className='my-12'>
      <h2 className='text-3xl font-bold mb-6 text-center'>Dive Sites</h2>
      <CardsGrid cards={diveSites} onCardClick={onCardClick} />
    </section>
  )
}
