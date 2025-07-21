import CardsGrid from './CardsGrid'
import { cards, CardData } from '../lib/data'

interface FreeDivingSectionProps {
  onCardClick: (card: CardData) => void
}

export default function FreeDivingSection({
  onCardClick,
}: FreeDivingSectionProps) {
  const freeDivingCourses = cards.filter(
    (card) => card.id === 'freeDivingCourses'
  )

  return (
    <section id='freedivingcourses' className='my-12'>
      <h2 className='text-3xl font-bold mb-6 text-center'>
        FreeDiving Courses
      </h2>
      <CardsGrid cards={freeDivingCourses} onCardClick={onCardClick} />
    </section>
  )
}
