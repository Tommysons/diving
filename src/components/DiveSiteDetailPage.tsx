'use client'

import { useRouter, usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import BookingForm from '@/components/BookingForm'
import { DiveSite, diveSites, diveSitesRU } from '@/lib/data/diveSites'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

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

  const imageList = [
    site.imageUrl,
    site.diveMapUrl,
    ...(site.extraImages || []),
  ].filter(Boolean)

  return (
    <>
      <Header />
      <main className='flex-grow relative'>
        <section className='max-w-7xl mx-auto px-4 py-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-white shadow-lg rounded-2xl overflow-hidden relative'
          >
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className='absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-cyan-700 hover:bg-cyan-800 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-md'
              aria-label={locale === 'ru' ? 'Предыдущий' : 'Previous'}
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              className='absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-cyan-700 hover:bg-cyan-800 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-3xl font-bold shadow-md'
              aria-label={locale === 'ru' ? 'Следующий' : 'Next'}
            >
              ›
            </button>

            {/* Layout */}
            <div className='grid md:grid-cols-2 gap-0'>
              {/* Left Side – Image Grid */}
              <div className='relative bg-gray-100 p-4 rounded-l-2xl overflow-hidden'>
                {/* Grid of images (fills full left side) */}
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                  {imageList.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className='relative cursor-pointer overflow-hidden rounded-xl shadow-md'
                      onClick={() => setHoveredImage(img!)}
                    >
                      <img
                        src={img!}
                        alt={`${site.name} image ${i + 1}`}
                        className='w-full h-48 object-cover transition-transform duration-300 hover:scale-110'
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Popup / modal for full image */}
                {hoveredImage && (
                  <motion.div
                    className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setHoveredImage(null)}
                  >
                    <motion.img
                      src={hoveredImage}
                      alt='Zoomed dive image'
                      className='max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl object-contain'
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <button
                      className='absolute top-6 right-6 text-white text-4xl font-bold hover:text-gray-300 transition'
                      onClick={() => setHoveredImage(null)}
                    >
                      ×
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Right Side – Info */}
              <div className='p-8 flex flex-col justify-center space-y-5'>
                <h1 className='text-3xl font-bold text-gray-800'>
                  {site.name}
                </h1>
                <p className='text-gray-700 leading-relaxed'>
                  {site.longDescription}
                </p>

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

                {site.thingsToSee?.length ? (
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
                ) : null}

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

                {/* Booking */}
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
