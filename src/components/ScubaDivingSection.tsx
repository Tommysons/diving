'use client'

import { usePathname } from 'next/navigation'
import CardsGrid from './CardsGrid'
import { cards, CardData } from '../lib/data'

interface ScubaCoursesSectionProps {
  onCardClick: (card: CardData) => void
}

export default function ScubaCoursesSection({
  onCardClick,
}: ScubaCoursesSectionProps) {
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  const scubaCourses: CardData[] = cards[locale].filter(
    (card) => card.id === 'divingCourses'
  )

  return (
    <section id='scubacourses' className='my-12'>
      <h2 className='text-3xl font-bold mb-6 text-center'>
        {locale === 'ru' ? 'Курсы по дайвингу' : 'Scuba Diving Courses'}
      </h2>
      <CardsGrid cards={scubaCourses} onCardClick={onCardClick} />
    </section>
  )
}
