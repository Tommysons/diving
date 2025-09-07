'use client'

import { usePathname } from 'next/navigation'
import CardsGrid from './CardsGrid'
import { cards, CardData } from '../lib/data'

interface DiveSitesSectionProps {
  onCardClick: (card: CardData) => void
}

export default function DiveSitesSection({
  onCardClick,
}: DiveSitesSectionProps) {
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  // Select locale and filter dive sites
  const diveSites: CardData[] = cards[locale].filter(
    (card) => card.id === 'diveSites'
  )

  return (
    <section id='divesites' className='my-12'>
      <h2 className='text-3xl font-bold mb-6 text-center'>
        {locale === 'ru' ? 'Места для дайвинга' : 'Dive Sites'}
      </h2>
      <CardsGrid cards={diveSites} onCardClick={onCardClick} />
    </section>
  )
}
