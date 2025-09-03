'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Sample Dive 1' },
  { id: '9bZkp7q19f0', title: 'Sample Dive 2' },
  { id: '3JZ_D3ELwOQ', title: 'Sample Dive 3' },
  { id: 'M7lc1UVf-VE', title: 'Sample Dive 4' },
  { id: 'kJQP7kiw5Fk', title: 'Sample Dive 5' },
  { id: 'e-ORhEE9VVg', title: 'Sample Dive 6' },
]

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-50 py-12 px-6'>
        <h1 className='text-3xl font-bold text-center text-blue-900 mb-12'>
          My Underwater Gallery
        </h1>

        {/* Grid */}
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
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className='w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300'
              />

              {/* Overlay with Play button */}
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
              <div className='absolute bottom-0 w-full bg-black/60 text-white text-center py-2 text-lg'>
                {video.title}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
