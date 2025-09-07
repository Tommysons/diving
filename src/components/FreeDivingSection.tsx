'use client'

import { usePathname } from 'next/navigation'
import CardsGrid from './CardsGrid'
import { cards, CardData } from '../lib/data'

interface FreeDivingSectionProps {
  onCardClick: (card: CardData) => void
}

export default function FreeDivingSection({
  onCardClick,
}: FreeDivingSectionProps) {
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  const freeDivingCourses: CardData[] = cards[locale].filter(
    (card) => card.id === 'freeDivingCourses'
  )

  return (
    <section id='freedivingcourses' className='my-12'>
      <h2 className='text-3xl font-bold mb-6 text-center'>
        {locale === 'ru' ? 'Курсы по фридайвингу' : 'FreeDiving Courses'}
      </h2>
      <CardsGrid cards={freeDivingCourses} onCardClick={onCardClick} />
    </section>
  )
}
