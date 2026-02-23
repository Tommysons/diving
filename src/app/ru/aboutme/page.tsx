'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

export default function AboutPageRu() {
  return (
    <>
      <Header />

      <main className='relative min-h-screen w-full bg-blue-200'>
        {/* CONTENT */}
        <section className='relative z-10 max-w-5xl mx-auto px-6 py-16 space-y-12'>
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-center text-white'
          >
            <h1 className='text-4xl md:text-5xl font-bold text-center text-blue-700 mb-2'>
              Знакомьтесь с вашим инструктором
            </h1>
            <p className='text-blue-700 text-lg mx-auto'>
              Страсть к дайвингу. Безопасность превыше всего.
            </p>
          </motion.div>

          {/* PROFILE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8'
          >
            <img
              src='/images/badge.webp'
              alt='Фото инструктора'
              className='w-40 h-40 rounded-full object-cover shadow-md'
            />
            <div>
              <h2 className='text-2xl font-semibold'>Привет! Я Том!</h2>
              <p className='text-gray-700 mt-2'>
                Я сертифицированный инструктор по дайвингу на Ко Тао с опытом
                более 3 лет и более 2000 погружений. Мое путешествие началось
                после впечатляющего погружения на Тенерифе, и с тех пор я
                исследую океан. Я обучил более 100 студентов и люблю знакомить
                новичков с удивительным подводным миром.
              </p>
            </div>
          </motion.div>

          {/* CERTIFICATIONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl'
          >
            <h3 className='text-xl font-semibold mb-4'>Сертификаты и опыт</h3>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700'>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                Инструктор PADI Open Water Scuba (OWSI)
              </li>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                Более 2000 погружений
              </li>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                Более 100 сертифицированных студентов
              </li>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                Специальности: глубоководное, Nitrox, ночное, навигация
              </li>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                Сертификация Rescue Diver
              </li>
            </ul>
          </motion.div>

          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl italic text-gray-800'
          >
            «Я создаю расслабленную и поддерживающую атмосферу, где студенты
            чувствуют себя в безопасности и уверенно — даже если это их первое
            погружение.»
          </motion.div>

          {/* PERSONAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl'
          >
            <h3 className='text-xl font-semibold mb-2'>Когда я не ныряю...</h3>
            <p className='text-gray-700'>
              Я увлекаюсь подводной фотографией, походами и поиском скрытых
              пляжей на острове. Дайвинг для меня — это не просто курс, это
              незабываемые впечатления.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='text-center'
          >
            <a
              href='/ru/contact'
              className='inline-block bg-cyan-700 text-white px-6 py-3 rounded-xl shadow hover:bg-cyan-800 transition'
            >
              Связаться или забронировать погружение
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
