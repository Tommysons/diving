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

      <main className='relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 overflow-x-hidden'>
        {/* HERO */}
        <section className='relative min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex items-center justify-center text-center mt-4'>
          <div className='absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden'>
            <img
              src='/images/hero-about.jpg'
              alt='LokaWndr Diving'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black/45' />
          </div>

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
        <section className='mt-20 flex justify-center'>
          <div className='w-full max-w-xl px-2'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10'
            >
              {locale === 'ru' ? 'Почему LokaWndr?' : 'Why LokaWndr?'}
            </motion.h2>

            <div className='grid gap-6'>
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className='bg-white/80 backdrop-blur p-5 sm:p-6 rounded-2xl shadow'
                >
                  <h3 className='text-lg sm:text-xl font-semibold mb-2'>
                    {item.title}
                  </h3>
                  <p className='text-gray-600 text-sm sm:text-base'>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CHOOSE PATH */}
        <section id='main-cards' className='mt-20 flex justify-center'>
          <div className='w-full max-w-xl px-2'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8'
            >
              {locale === 'ru' ? 'Выбери свой путь' : 'Choose Your Path'}
            </motion.h2>

            <CardsGrid cards={cards[locale]} onCardClick={handleCardClick} />
          </div>
        </section>

        {/* QUOTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className='w-full flex justify-center mt-20 mb-20'
        >
          <div className='bg-blue-50 border-l-4 border-blue-400 p-5 sm:p-6 italic shadow rounded-xl max-w-xl text-sm sm:text-base text-center'>
            “{quotes[locale]}”
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  )
}
