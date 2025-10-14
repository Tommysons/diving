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

      <div className='px-6 py-10 max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold mb-10 text-center text-blue-800'>
          Dive Sites of Koh Tao
        </h1>

        {/* Top section: Map + Description */}
        <div className='grid md:grid-cols-2 gap-10 mb-16 items-center'>
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
            className='text-gray-700 leading-relaxed text-lg'
          >
            <h2 className='text-2xl font-semibold mb-4 text-blue-700'>
              Explore the Underwater World of Koh Tao
            </h2>
            <p className='mb-4'>
              Koh Tao, meaning “Turtle Island,” is a diver’s paradise known for
              its crystal-clear waters, thriving coral reefs, and abundant
              marine life. From shallow bays perfect for beginners to deep
              pinnacles for advanced divers, the island offers a variety of
              sites each with its own unique charm.
            </p>
            <p>
              Over the past few decades, Koh Tao has grown into one of the
              world’s most famous diving destinations. Many dive sites here,
              such as Chumphon Pinnacle and Sail Rock, have become legendary for
              encounters with whale sharks, barracudas, and giant groupers.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-300 my-8'></div>

        {/* All Dive Sites Section */}
        <h2 className='text-3xl font-bold text-center mb-8 text-blue-800'>
          All Dive Sites
        </h2>

        <div className='grid md:grid-cols-2 gap-8'>
          {diveSites.map((site) => (
            <motion.div
              key={site.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='border rounded-2xl bg-white p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300'
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
                  <h3 className='text-xl font-semibold text-blue-700'>
                    {site.name}
                  </h3>
                  <p className='text-gray-600 text-sm line-clamp-3'>
                    {site.shortDescription}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
