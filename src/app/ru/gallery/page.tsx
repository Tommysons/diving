'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { videos } from '@/lib/data/videos'

export default function GalleryPageRU() {
  return (
    <>
      <Navbar />

      <div className='min-h-screen bg-gray-50 py-12 px-6 max-w-6xl mx-auto'>
        {/* Page Title */}
        <h1 className='text-3xl font-bold text-center text-blue-900 mb-8'>
          Моя Подводная Галерея
        </h1>

        {/* Quote / Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className='bg-blue-50 border-l-4 border-blue-400 p-6 italic shadow rounded-md text-center mb-12'>
            «Исследуйте завораживающий мир под волнами. От ярких коралловых
            рифов до встреч с величественными морскими существами — эти видео
            передают красоту и захватывающий дух подводных приключений.»
          </div>
        </motion.div>

        {/* Videos Grid */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {videos.map((video, index) => (
            <motion.a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target='_blank'
              rel='noopener noreferrer'
              className='relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Thumbnail */}
              <img
                src={
                  video.thumbnailUrl ||
                  `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                }
                alt={video.title}
                className='w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300'
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

              {/* Title & optional description */}
              <div className='absolute bottom-0 w-full bg-black/60 text-white text-center py-2 text-lg'>
                <div className='font-semibold'>{video.title}</div>
                {video.description && (
                  <div className='text-sm mt-1 line-clamp-2'>
                    {video.description}
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
