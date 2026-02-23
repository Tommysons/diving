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
    beginnerSlugs.includes(c.slug),
  )
  const certified = [
    ...scubaCourses.filter((c) => !beginnerSlugs.includes(c.slug)),
    ...specialtyCourses,
  ]

  return (
    <>
      <Header />

      <main className='relative min-h-screen w-full bg-blue-200'>
        <div className='relative z-10 max-w-6xl mx-auto px-6 py-10 space-y-12'>
          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='text-4xl md:text-5xl font-bold text-center text-blue-700'
          >
            Scuba Diving Courses
          </motion.h1>

          {/* Introduction */}
          <div className='grid md:grid-cols-2 gap-8 md:gap-10 items-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='flex justify-center'
            >
              <Image
                src='/images/awd.webp'
                alt='Scuba Diving Training'
                width={600}
                height={400}
                className='rounded-2xl shadow-lg object-cover w-full h-auto max-w-md'
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='text-gray-700 leading-relaxed text-base sm:text-lg px-2'
            >
              <h2 className='text-2xl font-semibold mb-4 text-blue-700'>
                Discover the Underwater World
              </h2>
              <p className='mb-4'>
                Scuba diving opens a window to a breathtaking underwater
                universe. From colorful coral reefs to majestic marine
                creatures, every dive is an adventure. Whether you’re a beginner
                or already certified, there’s a course tailored to your level.
              </p>
              <p>
                Dive safely, learn essential skills, and gain the confidence to
                explore deeper. Our courses combine fun, knowledge, and
                professional guidance to make your underwater journey
                unforgettable.
              </p>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className='grid md:grid-cols-2 gap-6 mb-12'>
            <Link
              href='#non-certified'
              className='bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl p-5 text-center shadow-lg transition transform hover:scale-105 text-base sm:text-lg'
            >
              <h3 className='text-xl font-semibold mb-2'>
                For Non-Certified Divers
              </h3>
              <p>DSD & Open Water courses to start your diving adventure.</p>
            </Link>

            <Link
              href='#certified'
              className='bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 text-center shadow-lg transition transform hover:scale-105 text-base sm:text-lg'
            >
              <h3 className='text-xl font-semibold mb-2'>
                For Certified Divers
              </h3>
              <p>Advanced and specialty courses to take your skills further.</p>
            </Link>
          </div>

          {/* Non-Certified Courses */}
          <CourseSection
            id='non-certified'
            title='Courses for Non-Certified Divers'
            courses={nonCertified}
            activeForm={activeForm}
            setActiveForm={setActiveForm}
          />

          {/* Certified Courses */}
          <CourseSection
            id='certified'
            title='Courses for Certified Divers'
            courses={certified}
            activeForm={activeForm}
            setActiveForm={setActiveForm}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}

// Section for a group of courses
function CourseSection({ id, title, courses, activeForm, setActiveForm }: any) {
  return (
    <div className='space-y-8'>
      <h2
        id={id}
        className='text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center'
      >
        {title}
      </h2>
      {courses.map((course: any) => (
        <CourseCard
          key={course.slug}
          course={course}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
        />
      ))}
    </div>
  )
}

// Individual Course Card
function CourseCard({ course, activeForm, setActiveForm }: any) {
  if (!course) return null

  const isActive = activeForm === course.slug

  return (
    <div className='border rounded-2xl shadow-lg bg-white transform transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl flex flex-col md:flex-row md:items-stretch relative w-full max-w-full overflow-hidden'>
      <Link
        href={`/scubadivingcourses/${course.slug}`}
        className='flex-1 flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 cursor-pointer'
      >
        <div className='relative w-full sm:w-1/3 h-56 sm:h-64 flex-shrink-0'>
          <Image
            src={course.image}
            alt={course.name}
            fill
            className='object-cover rounded-xl'
          />
        </div>

        <div className='flex-1 space-y-2 sm:space-y-3 overflow-hidden'>
          <h2 className='text-lg sm:text-2xl font-semibold'>{course.name}</h2>
          <p className='text-sm sm:text-base line-clamp-4'>
            {course.description}
          </p>
          {'maxDepth' in course && (
            <p className='text-sm sm:text-base'>
              <span className='font-semibold text-blue-600'>Max Depth:</span>{' '}
              {course.maxDepth}
            </p>
          )}
          {course.prerequisites && (
            <p className='text-sm sm:text-base'>
              <span className='font-semibold text-blue-600'>
                Prerequisites:
              </span>{' '}
              {course.prerequisites}
            </p>
          )}
        </div>
      </Link>

      <div className='p-4 sm:p-6 pt-0'>
        <button
          className='inline-block mt-2 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded transition text-sm sm:text-base'
          onClick={(e) => {
            e.stopPropagation()
            setActiveForm(isActive ? null : course.slug)
          }}
        >
          {isActive ? 'Close Booking Form' : 'Book Course'}
        </button>

        {isActive && <BookingForm type='scuba_course' activity={course.name} />}
      </div>
    </div>
  )
}
