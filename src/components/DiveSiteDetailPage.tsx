'use client'

import { useRouter, usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import BookingForm from '@/components/BookingForm'
import { DiveSite, diveSites, diveSitesRU } from '@/lib/data/diveSites'
import clsx from 'clsx'
import { motion } from 'framer-motion'

interface Props {
  site: DiveSite
  locale: 'en' | 'ru'
}

export default function DiveSiteDetail({ site, locale }: Props) {
  const router = useRouter()
  const pathname = usePathname() || '/'
  const inferredLocale = pathname.startsWith('/ru') ? 'ru' : 'en'
  const diveData = inferredLocale === 'ru' ? diveSitesRU : diveSites

  const currentIndex = diveData.findIndex((s) => s.slug === site.slug)
  const [activeForm, setActiveForm] = useState(false)

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + diveData.length) % diveData.length
    router.push(
      `${inferredLocale === 'ru' ? '/ru' : ''}/divesites/${
        diveData[prevIndex].slug
      }`
    )
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % diveData.length
    router.push(
      `${inferredLocale === 'ru' ? '/ru' : ''}/divesites/${
        diveData[nextIndex].slug
      }`
    )
  }

  return (
    <>
      <Header />
      <main className='flex-grow'>
        <section className='max-w-7xl mx-auto px-4 py-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-white shadow-lg rounded-2xl overflow-hidden'
          >
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className='absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-cyan-700 hover:bg-cyan-800 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-md'
              aria-label={locale === 'ru' ? 'Предыдущий' : 'Previous'}
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              className='absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-cyan-700 hover:bg-cyan-800 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-md'
              aria-label={locale === 'ru' ? 'Следующий' : 'Next'}
            >
              ›
            </button>

            {/* 2-Column Layout */}
            <div className='grid md:grid-cols-2 gap-8'>
              {/* Left Side – Image */}
              <div className='relative'>
                <img
                  src={site.imageUrl || site.diveMapUrl}
                  alt={site.name}
                  className='object-cover w-full h-full rounded-l-2xl'
                />
              </div>

              {/* Right Side – Text Content */}
              <div className='p-6 flex flex-col justify-center space-y-5'>
                <h1 className='text-3xl font-bold text-gray-800'>
                  {site.name}
                </h1>

                <p className='text-gray-700 leading-relaxed'>
                  {site.longDescription}
                </p>

                {/* Dive Info */}
                <div className='grid grid-cols-3 gap-3 mt-4'>
                  <Info
                    label={locale === 'ru' ? 'Глубина' : 'Depth'}
                    value={site.depth}
                  />
                  <Info
                    label={locale === 'ru' ? 'Течение' : 'Current'}
                    value={site.current}
                  />
                  <Info
                    label={locale === 'ru' ? 'Видимость' : 'Visibility'}
                    value={site.visibility}
                  />
                </div>

                {/* Things to See */}
                {site.thingsToSee && site.thingsToSee.length > 0 && (
                  <div>
                    <h2 className='text-xl font-semibold text-gray-800 mt-4 mb-2'>
                      {locale === 'ru' ? 'Что можно увидеть' : 'Things to See'}
                    </h2>
                    <ul className='list-disc list-inside text-gray-700'>
                      {site.thingsToSee.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Prices */}
                {site.prices && (
                  <div className='mt-6'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
                      {locale === 'ru' ? 'Цены на дайвы' : 'Fun Dive Prices'}
                    </h2>

                    <div className='overflow-x-auto'>
                      <table className='min-w-full border border-gray-300 rounded-xl overflow-hidden'>
                        <thead className='bg-gray-100'>
                          <tr>
                            <th className='px-4 py-2 text-left text-gray-700'>
                              {locale === 'ru'
                                ? 'Количество погружений'
                                : 'Number of Dives'}
                            </th>
                            <th className='px-4 py-2 text-left text-gray-700'>
                              {locale === 'ru' ? 'Цена' : 'Price'}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {site.prices.dives.map((dive, i) => (
                            <tr key={i} className='border-t'>
                              <td className='px-4 py-2'>{dive.range}</td>
                              <td className='px-4 py-2'>{dive.price}</td>
                            </tr>
                          ))}
                          <tr className='border-t bg-gray-50'>
                            <td className='px-4 py-2 font-medium'>Nitrox</td>
                            <td className='px-4 py-2'>{site.prices.nitrox}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {/* Booking Button */}
                <button
                  onClick={() => setActiveForm(!activeForm)}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl mt-4 transition-all duration-300'
                >
                  {activeForm
                    ? locale === 'ru'
                      ? 'Закрыть форму бронирования'
                      : 'Close Booking Form'
                    : locale === 'ru'
                    ? 'Забронировать дайв'
                    : 'Book a Dive Trip'}
                </button>

                {activeForm && (
                  <div className='mt-4'>
                    <BookingForm type='dive_trip' activity={site.name} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-xl border border-gray-300 bg-gray-50 py-2'>
      <div className='text-center text-sm text-gray-500'>{label}</div>
      <div className='text-center text-lg font-semibold text-gray-800'>
        {value}
      </div>
    </div>
  )
}
