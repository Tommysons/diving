'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import CardsGrid from '../components/CardsGrid'
import { cards, CardData } from '../lib/data'
import { blogPosts } from '@/lib/data/blogPosts'
import { blogPostsRU } from '@/lib/data/blogPostsRU'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  const router = useRouter()
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  const posts = locale === 'ru' ? blogPostsRU : blogPosts

  const quotes = {
    en: 'In diving, as in the ocean of life, every descent is followed by a rise—never give up.',
    ru: 'В дайвинге, как и в океане жизни, за каждым погружением следует подъём — никогда не сдавайся.',
  }

  const handleCardClick = (card: CardData) => {
    const base = locale === 'ru' ? '/ru' : ''

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

  const whyItems =
    locale === 'ru'
      ? [
          {
            title: 'Безопасность',
            text: 'Погружения с приоритетом на комфорт и контроль.',
          },
          {
            title: 'Опыт',
            text: 'Персональный подход и знания локальных мест.',
          },
          {
            title: 'Приключения',
            text: 'Не просто курсы, а настоящие впечатления.',
          },
        ]
      : [
          {
            title: 'Safety First',
            text: 'Every dive is planned with comfort and control in mind.',
          },
          {
            title: 'Experience',
            text: 'Personal approach with deep local knowledge.',
          },
          {
            title: 'Adventure',
            text: 'Not just courses, but real underwater experiences.',
          },
        ]

  return (
    <>
      <Header />

      <main className='relative w-full overflow-x-hidden'>
        {/* ================= HERO (LCP PRIORITY ONLY) ================= */}
        <section className='relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden'>
          <Image
            src='/images/hero-about-a.webp'
            alt='Scuba diving underwater'
            fill
            priority
            fetchPriority='high'
            sizes='100vw'
            className='object-cover'
          />

          <div className='absolute inset-0 bg-black/45' />

          <div className='relative z-10 max-w-xl px-4'>
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>
              {locale === 'ru'
                ? 'Открой подводный мир с LokaWndr'
                : 'Explore the Underwater World with LokaWndr'}
            </h1>
          </div>
        </section>

        {/* ================= WHY SECTION ================= */}
        <section className='relative py-20 overflow-hidden'>
          <Image
            src='/images/wr/wr1a.webp'
            alt='Diver underwater'
            fill
            sizes='100vw'
            loading='lazy'
            className='object-cover'
          />

          <div className='absolute inset-0 bg-black/30' />

          <div className='relative z-10 max-w-4xl mx-auto text-center px-4'>
            <h2 className='text-4xl font-bold text-white mb-10'>
              {locale === 'ru' ? 'Почему LokaWndr?' : 'Why LokaWndr?'}
            </h2>

            <div className='grid gap-6 place-items-center'>
              {whyItems.map((item, i) => (
                <div
                  key={i}
                  className='bg-white/85 backdrop-blur px-6 py-4 rounded-xl shadow w-full max-w-md'
                >
                  <h3 className='font-semibold mb-2'>{item.title}</h3>
                  <p className='text-gray-700'>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CHOOSE PATH ================= */}
        <section className='relative py-20 overflow-hidden'>
          <Image
            src='/images/cpn6a.webp'
            alt='Ocean background'
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

        {/* ================= BLOG SECTION ================= */}
        <section className='relative py-20 overflow-hidden'>
          <Image
            src='/images/wr/wr2a.webp'
            alt='Underwater blog background'
            fill
            sizes='100vw'
            loading='lazy'
            className='object-cover'
          />

          <div className='absolute inset-0 bg-black/40' />

          <div className='relative z-10 max-w-5xl mx-auto px-4 text-center'>
            <h2 className='text-4xl font-bold text-white mb-4'>
              {locale === 'ru' ? 'Последние статьи' : 'Latest Articles'}
            </h2>

            <p className='text-white mb-12'>
              {locale === 'ru'
                ? 'Читайте мои советы и истории из подводного мира.'
                : 'Read my tips and stories from the underwater world.'}
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center'>
              {posts.slice(0, 3).map((post) => (
                <div
                  key={post.slug}
                  className='bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md'
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    loading='lazy'
                    sizes='(max-width: 768px) 100vw, 600px'
                    className='w-full h-48 object-cover'
                  />

                  <div className='p-4'>
                    <h3 className='text-xl font-semibold text-blue-900 mb-2'>
                      {post.title}
                    </h3>

                    <p className='text-blue-800 mb-4'>{post.excerpt}</p>

                    <Link
                      href={`${locale === 'ru' ? '/ru' : ''}/blog/${post.slug}`}
                      className='inline-block px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded'
                    >
                      {locale === 'ru' ? 'Читать далее' : 'Read More'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-12 bg-white/90 p-6 italic shadow rounded-xl max-w-xl mx-auto'>
              “{quotes[locale]}”
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
