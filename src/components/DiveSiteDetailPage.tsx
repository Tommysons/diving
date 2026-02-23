'use client'

import { useRouter, usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useMemo, useEffect } from 'react'
import BookingForm from '@/components/BookingForm'
import { DiveSite, diveSites, diveSitesRU } from '@/lib/data/diveSites'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface Props {
  site: DiveSite
  locale: 'en' | 'ru'
}

export default function DiveSiteDetail({ site, locale }: Props) {
  const router = useRouter()
  const pathname = usePathname() || '/'
  const inferredLocale = pathname.startsWith('/ru') ? 'ru' : 'en'
  const diveData = inferredLocale === 'ru' ? diveSitesRU : diveSites

  const currentIndex = useMemo(
    () => diveData.findIndex((s) => s.slug === site.slug),
    [diveData, site.slug],
  )

  const imageList = useMemo(
    () =>
      [site.imageUrl, site.diveMapUrl, ...(site.extraImages || [])].filter(
        Boolean,
      ),
    [site.imageUrl, site.diveMapUrl, site.extraImages],
  )

  const [activeForm, setActiveForm] = useState(false)
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + diveData.length) % diveData.length
    router.push(
      `${inferredLocale === 'ru' ? '/ru' : ''}/divesites/${diveData[prevIndex].slug}`,
    )
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % diveData.length
    router.push(
      `${inferredLocale === 'ru' ? '/ru' : ''}/divesites/${diveData[nextIndex].slug}`,
    )
  }

  const goToPrevImage = () => {
    if (!hoveredImage) return
    const current = imageList.indexOf(hoveredImage)
    const prevIndex = (current - 1 + imageList.length) % imageList.length
    setHoveredImage(imageList[prevIndex]!)
  }

  const goToNextImage = () => {
    if (!hoveredImage) return
    const current = imageList.indexOf(hoveredImage)
    const nextIndex = (current + 1) % imageList.length
    setHoveredImage(imageList[nextIndex]!)
  }

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!hoveredImage) return
      if (e.key === 'ArrowLeft') goToPrevImage()
      if (e.key === 'ArrowRight') goToNextImage()
      if (e.key === 'Escape') setHoveredImage(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [hoveredImage])

  return (
    <>
      <Header />

      <main className='relative min-h-screen w-full bg-blue-200 overflow-hidden'>
        <section className='relative z-10 max-w-7xl mx-auto px-4 py-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-white/90 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden'
          >
            {/* Header */}
            <div className='flex items-center justify-center gap-6 p-6 border-b border-gray-200'>
              <NavButton onClick={goToPrev} ariaLabel='Previous'>
                <ChevronLeft className='w-5 h-5' />
              </NavButton>

              <h1 className='text-3xl font-bold text-gray-800 text-center'>
                {site.name}
              </h1>

              <NavButton onClick={goToNext} ariaLabel='Next'>
                <ChevronRight className='w-5 h-5' />
              </NavButton>
            </div>

            <div className='grid md:grid-cols-2'>
              {/* IMAGE GRID */}
              <div className='p-4'>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                  {imageList.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      className='cursor-pointer overflow-hidden rounded-xl shadow-md'
                      onClick={() => setHoveredImage(img!)}
                    >
                      <img
                        src={img!}
                        loading='lazy'
                        alt={`${site.name} ${i}`}
                        className='w-full h-48 object-cover hover:scale-110 transition duration-300'
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* INFO */}
              <div className='p-6 flex flex-col justify-center'>
                <p className='text-gray-700 text-lg'>{site.longDescription}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ZOOM MODAL */}
        <AnimatePresence>
          {hoveredImage && (
            <motion.div
              className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHoveredImage(null)}
            >
              <div
                className='relative flex items-center justify-center'
                onClick={(e) => e.stopPropagation()}
              >
                {/* IMAGE WRAPPER (important!) */}
                <div className='relative max-w-[90vw] max-h-[80vh]'>
                  {/* IMAGE */}
                  <motion.img
                    key={hoveredImage}
                    src={hoveredImage}
                    alt='Zoomed dive image'
                    className='max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl object-contain'
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* LEFT ARROW */}
                  <button
                    onClick={goToPrevImage}
                    className='absolute left-3 top-1/2 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-800 text-white w-12 h-12 rounded-full flex items-center justify-center transition'
                  >
                    <ChevronLeft className='w-6 h-6' />
                  </button>

                  {/* RIGHT ARROW */}
                  <button
                    onClick={goToNextImage}
                    className='absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-700 hover:bg-cyan-800 text-white w-12 h-12 rounded-full flex items-center justify-center transition'
                  >
                    <ChevronRight className='w-6 h-6' />
                  </button>

                  {/* CLOSE */}
                  <button
                    className='absolute top-3 right-3 text-white hover:text-gray-300'
                    onClick={() => setHoveredImage(null)}
                  >
                    <X className='w-7 h-7' />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}

/* SMALL NAV BUTTON */
function NavButton({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void
  ariaLabel: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className='bg-cyan-700 hover:bg-cyan-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition'
    >
      {children}
    </button>
  )
}

/* ZOOM BUTTON */
function ZoomButton({
  onClick,
  position,
  children,
}: {
  onClick: () => void
  position: 'left' | 'right'
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`hidden sm:flex absolute ${
        position === 'left' ? '-left-16' : '-right-16'
      } top-1/2 -translate-y-1/2 text-white bg-cyan-700 hover:bg-cyan-800 rounded-full w-12 h-12 items-center justify-center transition hover:scale-110`}
    >
      {children}
    </button>
  )
}
