'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <>
      <Header />
      {/* Here later need to add a my background photo in albulm style*/}
      <div className='flex flex-col'>
        {/* Hero Section */}
        <div className='relative h-72 flex items-center justify-center text-white text-center'>
          <img
            src='/images/hero-about.jpeg'
            alt='Scuba diving background'
            className='absolute inset-0 w-full h-full object-cover'
          />

          {/* Dark overlay */}
          <div className='absolute inset-0 bg-black bg-opacity-50' />

          <div className='relative z-10'>
            <h1 className='text-4xl font-bold drop-shadow-md'>
              Meet Your Instructor
            </h1>
            <p className='text-lg mt-2 drop-shadow-md'>
              Passionate about diving. Focused on safety.
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
              alt='Instructor photo'
              className='w-40 h-40 rounded-full object-cover shadow-md'
            />
            <div>
              <h2 className='text-2xl font-semibold'>Hi, I'm Tommy!</h2>
              <p className='text-gray-700 mt-2'>
                I’m a certified scuba diving instructor based in Koh Tao with
                over 3 years of experience and 2000+ dives. My journey began
                after a life-changing dive in Tenerife, and I’ve been exploring
                the ocean ever since. I’ve certified more than 100 students and
                love introducing beginners to the magic of the underwater world.
              </p>
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <h3 className='text-xl font-semibold mb-4'>
              Certifications & Experience
            </h3>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700'>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                PADI Open Water Scuba Instructor (OWSI)
              </li>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                2000+ Logged Dives
              </li>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                100+ Students Certified
              </li>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                Specialties: Deep, Nitrox, Night, Navigation
              </li>
              <li className='flex items-center gap-2'>
                <FaCheckCircle className='text-blue-600' />
                Rescue Diver Certified
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
              “I create a relaxed and supportive environment where students feel
              safe and confident — even if it’s their first time underwater.”
            </div>
          </motion.div>

          {/* Personal Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <h3 className='text-xl font-semibold mb-2'>
              When I’m Not Diving...
            </h3>
            <p className='text-gray-700'>
              I enjoy underwater photography, hiking, and discovering hidden
              beach spots around the island. I believe diving should be more
              than a course — it should be an unforgettable experience.
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
              href='/contact'
              className='inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition'
            >
              Contact Me or Book a Dive
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
