'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import CardsGrid from '../components/CardsGrid'
import { cards, CardData } from '../lib/data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)
  const router = useRouter()
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card)

    switch (card.id) {
      case 'diveSites':
        router.push(`${locale === 'ru' ? '/ru' : ''}/divesites`)
        break
      case 'divingCourses':
        router.push(`${locale === 'ru' ? '/ru' : ''}/scubadivingcourses`)
        break
      case 'aboutMe':
        router.push(`${locale === 'ru' ? '/ru' : ''}/aboutme`)
        break
      default:
        alert(`You clicked on: ${card.title}`)
    }
  }

  const quotes = {
    en: 'In diving, as in the ocean of life, every descent is followed by a rise—never give up.',
    ru: 'В дайвинге, как и в океане жизни, за каждым погружением следует подъём — никогда не сдавайся.',
  }

  return (
    <>
      <Header />

      <main className='relative w-full overflow-x-hidden'>
        {' '}
        {/* prevent horizontal scroll */}
        {/* HERO */}
        <section
          className='relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex items-center justify-center text-center bg-fixed bg-center bg-cover'
          style={{ backgroundImage: "url('/images/hero-about.jpg')" }}
        >
          <div className='absolute inset-0 bg-black/45' />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='relative z-10 w-full max-w-xl px-4 sm:px-8'
          >
            <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight'>
              {locale === 'ru'
                ? 'Открой подводный мир с LokaWndr'
                : 'Explore the Underwater World with LokaWndr'}
            </h1>

            <p className='text-white/90 text-base sm:text-lg md:text-xl mb-6'>
              {locale === 'ru'
                ? 'Дайвинг и приключения под водой с профессиональным инструктором.'
                : 'Scuba diving and underwater adventures guided by a professional instructor.'}
            </p>

            <button
              onClick={() =>
                router.push(`${locale === 'ru' ? '/ru' : ''}/divesites`)
              }
              className='w-full sm:w-auto px-8 py-3 rounded-full bg-cyan-700 hover:bg-cyan-800 text-white font-semibold active:scale-95 hover:scale-105 transition'
            >
              {locale === 'ru' ? 'Начать путешествие' : 'Start Your Dive'}
            </button>
          </motion.div>
        </section>
        {/* WHY */}
        <section
          className='relative flex justify-center items-center bg-fixed bg-center bg-cover'
          style={{ backgroundImage: "url('/images/wr/wr1.jpg')" }}
        >
          <div className='absolute inset-0 bg-black/30' />

          <div className='relative z-10 w-full max-w-3xl lg:max-w-4xl px-4 py-12 mx-auto text-center'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-white'
            >
              {locale === 'ru' ? 'Почему LokaWndr?' : 'Why LokaWndr?'}
            </motion.h2>

            <div className='grid gap-5 place-items-center'>
              {[
                {
                  title: locale === 'ru' ? 'Безопасность' : 'Safety First',
                  text:
                    locale === 'ru'
                      ? 'Погружения с приоритетом на комфорт и контроль.'
                      : 'Every dive is planned with comfort and control in mind.',
                },
                {
                  title: locale === 'ru' ? 'Опыт' : 'Experience',
                  text:
                    locale === 'ru'
                      ? 'Персональный подход и знания локальных мест.'
                      : 'Personal approach with deep local knowledge.',
                },
                {
                  title: locale === 'ru' ? 'Приключения' : 'Adventure',
                  text:
                    locale === 'ru'
                      ? 'Не просто курсы, а настоящие впечатления.'
                      : 'Not just courses, but real underwater experiences.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className='
            bg-white/85
            backdrop-blur
            px-5 py-4
            sm:px-6 sm:py-4
            rounded-xl
            shadow
            text-center
            flex flex-col
            items-center
            w-full
            max-w-md
          '
                >
                  <h3 className='text-base sm:text-lg font-semibold mb-1'>
                    {item.title}
                  </h3>
                  <p className='text-gray-700 text-sm sm:text-base leading-snug'>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* CHOOSE PATH + QUOTE combined */}
        <section
          id='main-cards'
          className='relative flex flex-col justify-center items-center bg-fixed bg-center bg-cover'
          style={{ backgroundImage: "url('/images/twins/twins1.jpg')" }}
        >
          <div className='absolute inset-0 bg-black/30' />
          <div className='relative z-10 w-full max-w-xl px-2 py-12'>
            {/* CHOOSE PATH */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-white'
            >
              {locale === 'ru' ? 'Выбери свой путь' : 'Choose Your Path'}
            </motion.h2>

            <CardsGrid cards={cards[locale]} onCardClick={handleCardClick} />

            {/* QUOTE under cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className='mt-8 bg-blue-50 border-l-4 border-blue-400 sm:p-6 italic shadow rounded-xl max-w-xl text-sm sm:text-base text-center mx-auto'
            >
              “{quotes[locale]}”
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
