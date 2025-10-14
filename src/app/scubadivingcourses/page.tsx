'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { scubaCourses, specialtyCourses } from '@/lib/data/scubaCourses'
import BookingForm from '@/components/BookingForm'
import { motion } from 'framer-motion'

export default function ScubaDivingCoursesPage() {
  const [activeForm, setActiveForm] = useState<string | null>(null)

  const beginnerSlugs = ['discover-scuba-diving-dsd', 'open-water-diver-owd']
  const nonCertified = scubaCourses.filter((c) =>
    beginnerSlugs.includes(c.slug)
  )
  const certified = [
    ...scubaCourses.filter((c) => !beginnerSlugs.includes(c.slug)),
    ...specialtyCourses,
  ]

  const allCourses = [...scubaCourses, ...specialtyCourses]

  return (
    <>
      <Header />

      <div className='px-6 py-10 max-w-6xl mx-auto'>
        {/* Page Title */}
        <h1 className='text-4xl font-bold mb-10 text-center text-blue-800'>
          Scuba Diving Courses
        </h1>

        {/* Introduction Section */}
        <div className='grid md:grid-cols-2 gap-10 mb-16 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='flex justify-center'
          >
            <Image
              src='/images/scuba-intro.jpg' // replace with a nice intro image
              alt='Scuba Diving Introduction'
              width={600}
              height={400}
              className='rounded-2xl shadow-lg object-cover'
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-gray-700 leading-relaxed text-lg'
          >
            <h2 className='text-2xl font-semibold mb-4 text-blue-700'>
              Discover the Underwater World
            </h2>
            <p className='mb-4'>
              Scuba diving opens a window to a breathtaking underwater universe.
              From colorful coral reefs to majestic marine creatures, every dive
              is an adventure. Whether you’re a beginner or already certified,
              there’s a course tailored to your level.
            </p>
            <p>
              Dive safely, learn essential skills, and gain the confidence to
              explore deeper. Our courses combine fun, knowledge, and
              professional guidance to make your underwater journey
              unforgettable.
            </p>
          </motion.div>
        </div>

        {/* Quick Navigation for Beginner / Certified */}
        <div className='grid md:grid-cols-2 gap-6 mb-12'>
          <Link
            href='#non-certified'
            className='bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl p-6 text-center shadow-lg transition transform hover:scale-105'
          >
            <h3 className='text-xl font-semibold mb-2'>
              For Non-Certified Divers
            </h3>
            <p>DSD & Open Water courses to start your diving adventure.</p>
          </Link>

          <Link
            href='#certified'
            className='bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 text-center shadow-lg transition transform hover:scale-105'
          >
            <h3 className='text-xl font-semibold mb-2'>For Certified Divers</h3>
            <p>Advanced and specialty courses to take your skills further.</p>
          </Link>
        </div>

        {/* Non-Certified Courses */}
        <h2
          id='non-certified'
          className='text-3xl font-bold text-blue-800 mb-6'
        >
          Courses for Non-Certified Divers
        </h2>
        <div className='space-y-8'>
          {nonCertified.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              activeForm={activeForm}
              setActiveForm={setActiveForm}
            />
          ))}
        </div>

        {/* Certified Courses */}
        <h2
          id='certified'
          className='text-3xl font-bold text-blue-800 mt-16 mb-6'
        >
          Courses for Certified Divers
        </h2>
        <div className='space-y-8'>
          {certified.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              activeForm={activeForm}
              setActiveForm={setActiveForm}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

// Course Card Component
function CourseCard({ course, activeForm, setActiveForm }: any) {
  return (
    <div className='border rounded-2xl shadow-lg bg-white transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10 flex flex-col md:flex-row items-stretch'>
      {/* Card clickable area */}
      <Link
        href={`/scubadivingcourses/${course.slug}`}
        className='flex-1 flex gap-6 p-4 md:p-6 cursor-pointer'
      >
        {/* Image */}
        <div className='relative w-full md:w-1/3 h-64 flex-shrink-0'>
          <Image
            src={course.image}
            alt={course.name}
            fill
            className='object-cover rounded-xl'
          />
        </div>

        {/* Text */}
        <div className='flex-1 space-y-2 md:space-y-4 overflow-hidden'>
          <h2 className='text-xl md:text-2xl font-semibold'>{course.name}</h2>
          <p className='text-sm md:text-base line-clamp-4'>
            {course.description}
          </p>
          {'maxDepth' in course && (
            <p className='text-sm md:text-base'>
              <span className='font-semibold text-blue-600'>Max Depth:</span>{' '}
              {course.maxDepth}
            </p>
          )}
          {course.prerequisites && (
            <p className='text-sm md:text-base'>
              <span className='font-semibold text-blue-600'>
                Prerequisites:
              </span>{' '}
              {course.prerequisites}
            </p>
          )}
        </div>
      </Link>

      {/* Booking button */}
      <div className='p-4 md:p-6 pt-0'>
        <button
          className='inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          onClick={(e) => {
            e.stopPropagation()
            setActiveForm(activeForm === course.slug ? null : course.slug)
          }}
        >
          {activeForm === course.slug ? 'Close Booking Form' : 'Book Course'}
        </button>

        {activeForm === course.slug && (
          <BookingForm type='scuba_course' activity={course.name} />
        )}
      </div>
    </div>
  )
}
