'use client'

import Link from 'next/link'
import Image from 'next/image'
import { diveSites } from '@/lib/data/diveSites'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function DiveSitesPage() {
  return (
    <>
      <Header />

      <main className='relative min-h-screen w-full bg-[#06283a] text-white overflow-hidden'>
        <div className='relative z-10 max-w-[1480px] mx-auto px-5 sm:px-6 md:px-10 py-12 md:py-16 space-y-12'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-white'
          >
            Dive Sites of Koh Tao
          </motion.h1>

          {/* Top section: Map + Description */}
          <div className='grid md:grid-cols-2 gap-10 items-center bg-white/[.07] border border-white/15 backdrop-blur-md p-5 sm:p-8 rounded-3xl shadow-xl'>
            {/* Left side: Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='flex justify-center'
            >
              <Image
                src='/images/koh-tao-map.jpg'
                alt='Koh Tao Dive Sites Map'
                width={600}
                height={400}
                className='rounded-2xl shadow-lg object-cover'
              />
            </motion.div>

            {/* Right side: Description */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='text-slate-200 leading-relaxed text-base sm:text-lg'
            >
              <h2 className='text-2xl font-bold mb-4 text-white'>
                Explore the Underwater World of Koh Tao
              </h2>
              <p className='mb-4'>
                Koh Tao, meaning "Turtle Island," is a diver's paradise known
                for its crystal-clear waters, thriving coral reefs, and abundant
                marine life. From shallow bays perfect for beginners to deep
                pinnacles for advanced divers, the island offers a variety of
                sites each with its own unique charm.
              </p>
              <p>
                Over the past few decades, Koh Tao has grown into one of the
                world’s most famous diving destinations. Many dive sites here,
                such as Chumphon Pinnacle and Sail Rock, have become legendary
                for encounters with whale sharks, barracudas, and giant
                groupers.
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className='border-t border-white/40 my-8' />

          {/* All Dive Sites Section */}
          <h2 className='text-3xl font-bold text-center mb-8 text-white'>
            All Dive Sites
          </h2>

          <div className='grid md:grid-cols-2 gap-5 sm:gap-8'>
            {diveSites.map((site) => (
              <motion.div
                key={site.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='border border-white/15 rounded-2xl bg-[#0b354a] p-4 sm:p-5 shadow-lg hover:border-cyan-300/50 hover:shadow-xl transition duration-300'
              >
                <Link
                  href={`/divesites/${site.slug}`}
                  className='flex gap-4 items-center'
                >
                  <img
                    src={site.imageUrl}
                    alt={site.name}
                    className='w-28 h-28 object-cover rounded-xl'
                  />
                  <div>
                    <h3 className='text-xl font-bold text-white'>
                      {site.name}
                    </h3>
                    <p className='text-slate-200 text-sm line-clamp-3 leading-6'>
                      {site.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom Credit */}
          <div className='border-t border-white/40 pt-4'>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-center text-black text-lg'
            >
              All photos taken by{' '}
              <span className='font-semibold text-blue-800'>
                Mia{' '}
                <a
                  href='https://www.instagram.com/kakadong123/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:text-blue-400 transition'
                >
                  @kakadong123
                </a>
              </span>
            </motion.p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
