'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* MAIN WITH SHARED BACKGROUND */}
      <main className='min-h-screen w-full bg-blue-200'>
        <section className='max-w-5xl mx-auto px-6 py-16 space-y-12'>
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-3'>
              Meet Your Instructor
            </h1>
            <p className='text-gray-600'>
              Passionate about diving. Focused on safety.
            </p>
          </motion.div>

          {/* PROFILE */}
          <div className='bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8'>
            <Image
              src='/images/badge.jpg'
              alt='Instructor photo'
              width={160}
              height={160}
              className='rounded-full object-cover shadow-md'
              priority
            />

            <div>
              <h2 className='text-2xl font-semibold text-gray-900'>
                Hi, I'm Tom!
              </h2>

              <p className='text-gray-700 mt-2'>
                I’m a certified scuba diving instructor based in Koh Tao with
                over 3 years of experience and 2000+ dives. My journey began
                after a life-changing dive in Tenerife, and I’ve been exploring
                the ocean ever since. I’ve certified more than 100 students and
                love introducing beginners to the magic of the underwater world.
              </p>
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div className='bg-white p-6 rounded-2xl shadow-lg'>
            <h3 className='text-xl font-semibold mb-4 text-gray-900'>
              Certifications & Experience
            </h3>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700'>
              {[
                'PADI Open Water Scuba Instructor (OWSI)',
                '2000+ Logged Dives',
                '100+ Students Certified',
                'Specialties: Deep, Nitrox, Night, Navigation',
                'Rescue Diver Certified',
              ].map((item) => (
                <li key={item} className='flex items-center gap-2'>
                  <FaCheckCircle className='text-blue-600' />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* MISSION */}
          <div className='bg-white p-6 rounded-2xl shadow-lg italic text-gray-800'>
            “I create a relaxed and supportive environment where students feel
            safe and confident — even if it’s their first time underwater.”
          </div>

          {/* PERSONAL */}
          <div className='bg-white p-6 rounded-2xl shadow-lg'>
            <h3 className='text-xl font-semibold mb-2 text-gray-900'>
              When I’m Not Diving...
            </h3>
            <p className='text-gray-700'>
              I enjoy underwater photography, hiking, and discovering hidden
              beach spots around the island. I believe diving should be more
              than a course — it should be an unforgettable experience.
            </p>
          </div>

          {/* CTA */}
          <div className='text-center'>
            <a
              href='/contact'
              className='inline-block bg-cyan-700 text-white px-6 py-3 rounded-xl shadow hover:bg-cyan-800 transition'
            >
              Contact Me or Book a Dive
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
