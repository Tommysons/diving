// app/freedivingcourses/page.tsx

'use client'

import Image from 'next/image'
import { freedivingCourses } from '@/lib/data/freedivingCourses'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FreedivingCoursesPage() {
  return (
    <>
      <Header />
      <div className='px-6 py-10 max-w-5xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>
          Freediving Courses
        </h1>

        <section className='space-y-8'>
          {freedivingCourses.map((course) => (
            <div
              key={course.name}
              className='bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row
              transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:z-10'
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
                  <strong className='text-blue-600'>Max Depth:</strong>{' '}
                  {course.maxDepth}
                </p>
                <p>
                  <strong className='text-purple-600'>Prerequisites:</strong>{' '}
                  {course.prerequisites}
                </p>
                <button className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'>
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  )
}
