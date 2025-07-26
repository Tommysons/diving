'use client'

import { scubaCourses, specialtyCourses } from '@/lib/data/scubaCourses'
import Button from '@/components/Button'

export default function ScubaDivingCoursesPage() {
  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Scuba Diving Courses
      </h1>
      <div className='space-y-6'>
        {scubaCourses.map((course, index) => (
          <div key={index} className='p-4 border rounded-xl shadow bg-white'>
            <h2 className='text-xl font-semibold'>{course.name}</h2>
            <p className='text-gray-700'>{course.description}</p>
            <p className='mt-2 text-sm text-blue-700'>
              Max Depth: {course.maxDepth}
            </p>
            <div className='mt-4'>
              <Button size='sm'>Book Appointment</Button>
            </div>
          </div>
        ))}

        <h2 className='text-2xl font-bold mt-10'>Specialty Courses</h2>
        {specialtyCourses.map((course, index) => (
          <div
            key={index}
            className='p-4 border rounded-xl shadow bg-white mt-4'
          >
            <h3 className='text-lg font-semibold'>{course.name}</h3>
            <p className='text-gray-700'>{course.description}</p>
            <p className='text-sm text-blue-700 mt-1'>
              Prerequisites: {course.prerequisites}
            </p>
            <div className='mt-4'>
              <Button size='sm'>Book Appointment</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
