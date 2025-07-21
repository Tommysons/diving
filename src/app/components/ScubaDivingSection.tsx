import CardsGrid from './CardsGrid'
import { cards, CardData } from '../lib/data'

interface ScubaDivingSectionProps {
  onCardClick: (card: CardData) => void
}

export default function ScubaDivingSection({
  onCardClick,
}: ScubaDivingSectionProps) {
  const scubaCourses = cards.filter((card) => card.id === 'divingCourses')

  return (
    <section id='scubacourses' className='my-12'>
      <h2 className='text-3xl font-bold mb-6 text-center'>
        Scuba Diving Courses
      </h2>
      <CardsGrid cards={scubaCourses} onCardClick={onCardClick} />
    </section>
  )
}
