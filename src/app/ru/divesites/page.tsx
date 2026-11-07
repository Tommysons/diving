'use client'

import Link from 'next/link'
import Image from 'next/image'
import { diveSitesRU } from '@/lib/data/diveSites'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function DiveSitesPageRu() {
  return (
    <>
      <Header />

      <main className='relative min-h-screen w-full bg-[#06283a] text-white overflow-hidden'>
        <div className='relative z-10 max-w-[1480px] mx-auto px-5 sm:px-6 md:px-10 py-12 md:py-16 space-y-12'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-white'
          >
            Места для дайвинга на Ко Тао
          </motion.h1>

          {/* Верхняя секция: Карта + Описание */}
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-10 items-center bg-white/[.07] border border-white/15 backdrop-blur-md p-5 sm:p-8 rounded-3xl shadow-xl'>
            {/* Левая часть: Карта */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='flex justify-center'
            >
              <Image
                src='/images/koh-tao-map.jpg'
                alt='Карта мест для дайвинга на Ко Тао'
                width={600}
                height={400}
                className='h-auto w-full rounded-2xl shadow-lg object-cover'
                sizes='(max-width: 1024px) 100vw, 50vw'
              />
            </motion.div>

            {/* Правая часть: Описание */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='text-slate-200 leading-relaxed text-base sm:text-lg'
            >
              <h2 className='text-2xl font-bold mb-4 text-white'>
                Откройте подводный мир Ко Тао
              </h2>
              <p className='mb-4'>
                Ко Тао, что в переводе означает «Остров Черепах», — это рай для
                дайверов, известный своими кристально чистыми водами, живыми
                коралловыми рифами и богатой морской жизнью. От мелких бухт,
                идеально подходящих для начинающих, до глубоких пиннаклей для
                опытных дайверов — здесь каждый найдет что-то для себя.
              </p>
              <p>
                За последние десятилетия Ко Тао стал одним из самых известных
                мест для дайвинга в мире. Многие дайв-сайты, такие как Чумпхон
                Пиннакль и Сейл Рок, стали легендарными благодаря встречам с
                китовыми акулами, барракудами и гигантскими групперами.
              </p>
            </motion.div>
          </div>

          {/* Разделительная линия */}
          <div className='border-t border-white/40 my-8' />

          {/* Секция: Все места для дайвинга */}
          <h2 className='text-3xl font-bold text-center mb-8 text-white'>
            Все места для дайвинга
          </h2>

          <div className='grid md:grid-cols-2 gap-5 sm:gap-8'>
            {diveSitesRU.map((site) => (
              <motion.div
                key={site.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='border border-white/15 rounded-2xl bg-[#0b354a] p-4 sm:p-5 shadow-lg hover:border-cyan-300/50 hover:shadow-xl transition duration-300'
              >
                <Link
                  href={`/ru/divesites/${site.slug}`}
                  className='flex gap-4 items-center rounded-xl'
                >
                  <Image
                    src={site.imageUrl ?? '/images/hero-about.webp'}
                    alt={site.name}
                    width={112}
                    height={112}
                    sizes='112px'
                    className='h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28'
                  />
                  <div>
                    <h3 className='text-xl font-bold text-white'>
                      {site.name}
                    </h3>
                    <p className='text-slate-200 text-sm line-clamp-3 leading-6'>
                      {site.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Credit */}
          <div className='border-t border-white/40 pt-4'>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center text-slate-200 text-base sm:text-lg'
            >
              Все фотографии сделаны{' '}
              <span className='font-semibold text-cyan-100'>
                Mia{' '}
                <a
                  href='https://www.instagram.com/kakadong123/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:text-cyan-200 transition'
                >
                  @kakadong123
                </a>
              </span>
            </motion.p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
