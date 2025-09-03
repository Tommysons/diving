'use client'
import { useState } from 'react'
import Image from 'next/image'
import { freedivingCoursesRU } from '@/lib/data/freedivingCourses'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'

export default function FreedivingCoursesPageRU() {
  const [activeForm, setActiveForm] = useState<string | null>(null)

  return (
    <>
      <Header />
      <div className='px-6 py-10 max-w-5xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>
          Курсы Фридайвинга
        </h1>

        <section className='space-y-8'>
          {freedivingCoursesRU.map((course) => (
            <div
              key={course.name}
              className='bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row transform transition hover:scale-105 hover:shadow-xl'
            >
              <Image
                src={course.image}
                alt={course.name}
                width={400}
                height={300}
                className='object-cover w-full md:w-1/3 h-64 md:h-auto'
              />
              <div className='p-6 flex-1'>
                <h2 className='text-2xl font-semibold mb-2'>{course.name}</h2>
                <p className='mb-2'>{course.description}</p>
                <p>
                  <strong className='text-blue-600'>
                    Максимальная глубина:
                  </strong>{' '}
                  {course.maxDepth}
                </p>
                <p>
                  <strong className='text-purple-600'>Требования:</strong>{' '}
                  {course.prerequisites}
                </p>

                <button
                  className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
                  onClick={() =>
                    setActiveForm(
                      activeForm === course.name ? null : course.name
                    )
                  }
                >
                  {activeForm === course.name
                    ? 'Закрыть форму бронирования'
                    : 'Забронировать занятие'}
                </button>

                {activeForm === course.name && (
                  <BookingForm
                    type='freediving_course'
                    activity={course.name}
                  />
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  )
}
