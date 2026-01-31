'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { videos } from '@/lib/data/videos'

export default function GalleryPageRU() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className='relative bg-blue-900 py-20 sm:py-28 md:py-32'>
        <div className='absolute inset-0'>
          <img
            src='/images/hero-about.jpg'
            alt='Галерея LokaWndr'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 ' />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'
        >
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4'>
            Моя Подводная Галерея
          </h1>
          <p className='text-white/90 text-sm sm:text-base md:text-lg'>
            Я люблю исследовать мир под волнами. От ярких коралловых рифов до
            встреч с величественными морскими обитателями — эти видео передают
            красоту и захватывающий дух моих подводных приключений.
          </p>
        </motion.div>
      </section>

      {/* VIDEOS GRID */}
      <main className='py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {videos.map((video, index) => (
            <motion.a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className='relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Thumbnail */}
              <img
                src={
                  video.thumbnailUrl ||
                  `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                }
                alt={video.title}
                className='w-full h-64 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-300'
              />

              {/* Overlay Play Button */}
              <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
                <svg
                  className='w-16 h-16 text-white'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
              </div>

              {/* Title & Description */}
              <div className='absolute bottom-0 w-full bg-black/60 text-white text-center py-2 px-2 sm:px-3'>
                <div className='font-semibold text-sm sm:text-base'>
                  {video.title}
                </div>
                {video.description && (
                  <div className='text-xs sm:text-sm mt-1 line-clamp-2'>
                    {video.description}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
