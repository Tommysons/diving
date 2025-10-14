'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { scubaCoursesRU, specialtyCoursesRU } from '@/lib/data/scubaCourses'
import BookingForm from '@/components/BookingForm'

export default function ScubaDivingCoursesPageRU() {
  const [activeForm, setActiveForm] = useState<string | null>(null)

  const allCourses = [...scubaCoursesRU, ...specialtyCoursesRU]

  return (
    <>
      <Header />
      <div className='px-6 py-12 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Курсы Дайвинга</h1>

        <div className='space-y-8'>
          {allCourses.map((course) => (
            <div
              key={course.slug}
              className='border rounded-2xl shadow-lg bg-white transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10 flex flex-col md:flex-row items-stretch'
            >
              {/* Card clickable area */}
              <Link
                href={`/ru/scubadivingcourses/${course.slug}`}
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
                  <h2 className='text-xl md:text-2xl font-semibold'>
                    {course.name}
                  </h2>
                  <p className='text-sm md:text-base line-clamp-4'>
                    {course.description}
                  </p>
                  {'maxDepth' in course && (
                    <p className='text-sm md:text-base'>
                      <span className='font-semibold text-blue-600'>
                        Максимальная глубина:
                      </span>{' '}
                      {course.maxDepth}
                    </p>
                  )}
                  {course.prerequisites && (
                    <p className='text-sm md:text-base'>
                      <span className='font-semibold text-blue-600'>
                        Требования:
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
                    setActiveForm(
                      activeForm === course.slug ? null : course.slug
                    )
                  }}
                >
                  {activeForm === course.slug
                    ? 'Закрыть форму бронирования'
                    : 'Забронировать'}
                </button>

                {activeForm === course.slug && (
                  <BookingForm type='scuba_course' activity={course.name} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
