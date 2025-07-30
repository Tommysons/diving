'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { scubaCourses, specialtyCourses } from '@/lib/data/scubaCourses'
import Image from 'next/image'
import Link from 'next/link'

export default function ScubaDivingCoursesPage() {
  return (
    <>
      <Header />
      <div className='px-6 py-12 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          Scuba Diving Courses
        </h1>

        <div className='space-y-12'>
          {scubaCourses.map((course) => (
            <div
              key={course.name}
              className='flex flex-col md:flex-row gap-6 border rounded-2xl shadow-lg p-6 bg-white'
            >
              <div className='relative w-full md:w-1/3 h-64'>
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className='object-cover rounded-xl'
                />
              </div>

              <div className='md:w-2/3 space-y-4'>
                <h2 className='text-2xl font-semibold'>{course.name}</h2>
                <p>{course.description}</p>
                <p>
                  <span className='font-semibold text-blue-600'>
                    Max Depth:
                  </span>{' '}
                  {course.maxDepth}
                </p>
                {course.prerequisites && (
                  <p>
                    <span className='font-semibold text-blue-600'>
                      Prerequisites:
                    </span>{' '}
                    {course.prerequisites}
                  </p>
                )}
                <Link
                  href='#'
                  className='inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h2 className='text-3xl font-bold mt-16 mb-8 text-center'>
          Specialty Courses
        </h2>

        <div className='space-y-12'>
          {specialtyCourses.map((course) => (
            <div
              key={course.name}
              className='flex flex-col md:flex-row gap-6 border rounded-2xl shadow-lg p-6 bg-white'
            >
              <div className='relative w-full md:w-1/3 h-64'>
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className='object-cover rounded-xl'
                />
              </div>

              <div className='md:w-2/3 space-y-4'>
                <h3 className='text-2xl font-semibold'>{course.name}</h3>
                <p>{course.description}</p>
                <p>
                  <span className='font-semibold text-blue-600'>
                    Prerequisites:
                  </span>{' '}
                  {course.prerequisites}
                </p>
                <Link
                  href='#'
                  className='inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
