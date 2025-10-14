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

      <div className='px-6 py-10 max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold mb-10 text-center text-blue-800'>
          Места для дайвинга на Ко Тао
        </h1>

        {/* Верхняя секция: Карта + Описание */}
        <div className='grid md:grid-cols-2 gap-10 mb-16 items-center'>
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
              className='rounded-2xl shadow-lg object-cover'
            />
          </motion.div>

          {/* Правая часть: Описание */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-gray-700 leading-relaxed text-lg'
          >
            <h2 className='text-2xl font-semibold mb-4 text-blue-700'>
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
              За последние десятилетия Ко Тао стал одним из самых известных мест
              для дайвинга в мире. Многие дайв-сайты, такие как Чумпхон Пиннакль
              и Сейл Рок, стали легендарными благодаря встречам с китовыми
              акулами, барракудами и гигантскими групперами.
            </p>
          </motion.div>
        </div>

        {/* Разделительная линия */}
        <div className='border-t border-gray-300 my-8'></div>

        {/* Секция: Все места для дайвинга */}
        <h2 className='text-3xl font-bold text-center mb-8 text-blue-800'>
          Все места для дайвинга
        </h2>

        <div className='grid md:grid-cols-2 gap-8'>
          {diveSitesRU.map((site) => (
            <motion.div
              key={site.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='border rounded-2xl bg-white p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300'
            >
              <Link
                href={`/ru/divesites/${site.slug}`}
                className='flex gap-4 items-center'
              >
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className='w-28 h-28 object-cover rounded-xl'
                />
                <div>
                  <h3 className='text-xl font-semibold text-blue-700'>
                    {site.name}
                  </h3>
                  <p className='text-gray-600 text-sm line-clamp-3'>
                    {site.shortDescription}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
