'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className='relative min-h-screen w-full overflow-hidden'>
        {/* BACKGROUND IMAGE */}
        <div className='absolute inset-0'>
          <img
            src='/images/about-me.jpg'
            alt='About Me Background'
            className='w-full h-full object-cover brightness-110'
          />
          <div className='absolute inset-0 bg-black/45' />
        </div>

        {/* CONTENT */}
        <section className='relative z-10 max-w-5xl mx-auto px-6 py-16 space-y-12'>
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-center text-white'
          >
            <h1 className='text-4xl md:text-5xl font-bold drop-shadow-md mb-3'>
              Meet Your Instructor
            </h1>
            <p className='text-white/90'>
              Passionate about diving. Focused on safety.
            </p>
          </motion.div>

          {/* PROFILE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8'
          >
            <img
              src='/images/badge.jpg'
              alt='Instructor photo'
              className='w-40 h-40 rounded-full object-cover shadow-md'
            />
            <div>
              <h2 className='text-2xl font-semibold'>Hi, I'm Tom!</h2>
              <p className='text-gray-700 mt-2'>
                I’m a certified scuba diving instructor based in Koh Tao with
                over 3 years of experience and 2000+ dives. My journey began
                after a life-changing dive in Tenerife, and I’ve been exploring
                the ocean ever since. I’ve certified more than 100 students and
                love introducing beginners to the magic of the underwater world.
              </p>
            </div>
          </motion.div>

          {/* CERTIFICATIONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl'
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

          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className='bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl italic text-gray-800'
          >
            “I create a relaxed and supportive environment where students feel
            safe and confident — even if it’s their first time underwater.”
          </motion.div>

          {/* PERSONAL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl'
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
            transition={{ duration: 0.8, delay: 0.5 }}
            className='text-center'
          >
            <a
              href='/contact'
              className='inline-block bg-cyan-700 text-white px-6 py-3 rounded-xl shadow hover:bg-cyan-800 transition'
            >
              Contact Me or Book a Dive
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
