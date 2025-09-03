'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { scubaCoursesRU, specialtyCoursesRU } from '@/lib/data/scubaCourses'
import Image from 'next/image'
import BookingForm from '@/components/BookingForm'

export default function ScubaDivingCoursesPageRU() {
  const [activeForm, setActiveForm] = useState<string | null>(null)

  return (
    <>
      <Header />
      <div className='px-6 py-12 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center'>
          Курсы Подводного Плавания
        </h1>

        {/* Основные курсы */}
        <div className='space-y-12'>
          {scubaCoursesRU.map((course) => (
            <div
              key={course.name}
              className='flex flex-col md:flex-row gap-6 border rounded-2xl shadow-lg p-6 bg-white
              transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10'
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
                    Максимальная глубина:
                  </span>{' '}
                  {course.maxDepth}
                </p>
                {course.prerequisites && (
                  <p>
                    <span className='font-semibold text-blue-600'>
                      Требования:
                    </span>{' '}
                    {course.prerequisites}
                  </p>
                )}

                <button
                  className='inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
                  onClick={() =>
                    setActiveForm(
                      activeForm === course.name ? null : course.name
                    )
                  }
                >
                  {activeForm === course.name
                    ? 'Закрыть форму бронирования'
                    : 'Забронировать курс'}
                </button>

                {activeForm === course.name && (
                  <BookingForm type='scuba_course' activity={course.name} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Специальные курсы */}
        <h2 className='text-3xl font-bold mt-16 mb-8 text-center'>
          Специальные Курсы
        </h2>

        <div className='space-y-12'>
          {specialtyCoursesRU.map((course) => (
            <div
              key={course.name}
              className='flex flex-col md:flex-row gap-6 border rounded-2xl shadow-lg p-6 bg-white
              transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10'
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
                    Требования:
                  </span>{' '}
                  {course.prerequisites}
                </p>

                <button
                  className='inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
                  onClick={() =>
                    setActiveForm(
                      activeForm === course.name ? null : course.name
                    )
                  }
                >
                  {activeForm === course.name
                    ? 'Закрыть форму бронирования'
                    : 'Забронировать курс'}
                </button>

                {activeForm === course.name && (
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
