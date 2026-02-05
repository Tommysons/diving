'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { videos } from '@/lib/data/videos'

export default function GalleryPageRU() {
  return (
    <>
      <Navbar />

      <main className='relative min-h-screen w-full overflow-hidden'>
        {/* BACKGROUND IMAGE */}
        <div className='absolute inset-0'>
          <img
            src='/images/gallery.jpg'
            alt='Фон галереи'
            className='w-full h-full object-cover brightness-110'
          />
          <div className='absolute inset-0 bg-black/40' />
        </div>

        {/* CONTENT */}
        <section className='relative z-10 max-w-7xl mx-auto px-4 py-12'>
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-center mb-10'
          >
            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
              Моя Подводная Галерея
            </h1>
            <p className='text-white/90 max-w-2xl mx-auto'>
              Я люблю исследовать мир под волнами. От ярких коралловых рифов до
              встреч с величественными морскими обитателями — эти видео передают
              красоту и атмосферу моих подводных приключений.
            </p>
          </motion.div>

          {/* GRID CONTAINER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='bg-white/85 backdrop-blur-md rounded-2xl shadow-xl p-6'
          >
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {videos.map((video, index) => (
                <motion.a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer'
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  {/* Thumbnail */}
                  <img
                    src={
                      video.thumbnailUrl ||
                      `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                    }
                    alt={video.title}
                    className='w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300'
                  />

                  {/* Overlay */}
                  <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'>
                    <svg
                      className='w-16 h-16 text-white'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  </div>

                  {/* Title */}
                  <div className='absolute bottom-0 w-full bg-black/60 text-white text-center py-3 px-3'>
                    <div className='font-semibold'>{video.title}</div>
                    {video.description && (
                      <div className='text-sm mt-1 line-clamp-2 text-white/90'>
                        {video.description}
                      </div>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
