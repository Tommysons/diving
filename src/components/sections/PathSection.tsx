'use client'

import Image from 'next/image'
import CardsGrid from '../CardsGrid'
import { cards, CardData } from '../../lib/data'
import { useRouter } from 'next/navigation'

export default function PathSection({ locale }: { locale: 'en' | 'ru' }) {
  const router = useRouter()
  const base = locale === 'ru' ? '/ru' : ''

  const handleCardClick = (card: CardData) => {
    switch (card.id) {
      case 'diveSites':
        router.push(`${base}/divesites`)
        break
      case 'divingCourses':
        router.push(`${base}/scubadivingcourses`)
        break
      case 'aboutMe':
        router.push(`${base}/aboutme`)
        break
    }
  }

  return (
    <section className='relative py-20 overflow-hidden'>
      <Image
        src='/images/cpn6a.webp'
        alt='Ocean'
        fill
        sizes='100vw'
        loading='lazy'
        className='object-cover'
      />

      <div className='absolute inset-0 bg-black/30' />

      <div className='relative z-10 max-w-xl mx-auto px-4'>
        <h2 className='text-4xl font-bold text-white text-center mb-10'>
          {locale === 'ru' ? 'Выбери свой путь' : 'Choose Your Path'}
        </h2>

        <CardsGrid cards={cards[locale]} onCardClick={handleCardClick} />
      </div>
    </section>
  )
}
