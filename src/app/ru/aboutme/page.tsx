'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

export default function AboutPageRu() {
  return (
    <>
      <Header />
      {/* Фоновое фото в стиле альбома */}
      <div className='flex flex-col'>
        {/* Hero Section */}
        <div className='relative h-72 flex items-center justify-center text-white text-center'>
          <img
            src='/images/hero-about.jpeg'
            alt='Фоновое изображение дайвинга'
            className='absolute inset-0 w-full h-full object-cover'
          />
          {/* Темный оверлей */}
          <div className='absolute inset-0 bg-black bg-opacity-50' />
          <div className='relative z-10'>
            <h1 className='text-4xl font-bold drop-shadow-md'>
              Знакомьтесь с вашим инструктором
            </h1>
            <p className='text-lg mt-2 drop-shadow-md'>
              Страсть к дайвингу. Безопасность превыше всего.
            </p>
          </div>
        </div>

        <div className='max-w-4xl mx-auto px-4 py-12 space-y-12'>
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-white/80 backdrop-blur p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-8'
          >
            <img
              src='/images/badge.png'
              alt='Фото инструктора'
              className='w-40 h-40 rounded-full object-cover shadow-md'
            />
            <div>
              <h2 className='text-2xl font-semibold'>Привет! Я Томми!</h2>
              <p className='text-gray-700 mt-2'>
                Я сертифицированный инструктор по дайвингу на Ко Тао с опытом
                более 3 лет и более 2000 погружений. Мое путешествие началось
                после впечатляющего погружения на Тенерифе, и с тех пор я
                исследую океан. Я обучил более 100 студентов и люблю знакомить
                новичков с удивительным подводным миром.
              </p>
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
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

          {/* Mission / Teaching Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <div className='bg-blue-50 border-l-4 border-blue-400 p-6 italic shadow rounded-md'>
              «Я создаю расслабленную и поддерживающую атмосферу, где студенты
              чувствуют себя в безопасности и уверенно — даже если это их первое
              погружение.»
            </div>
          </motion.div>

          {/* Personal Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
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
            transition={{ duration: 0.9, delay: 0.8 }}
            className='text-center mt-8'
          >
            <a
              href='/ru/contact'
              className='inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition'
            >
              Связаться или забронировать погружение
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
