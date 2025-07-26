'use client'

import { freedivingCourses } from '@/lib/data/freedivingCourses'
import Button from '@/components/Button'

export default function FreedivingCoursesPage() {
  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        Freediving Courses
      </h1>
      <div className='space-y-6'>
        {freedivingCourses.map((course, index) => (
          <div key={index} className='p-4 border rounded-xl shadow bg-white'>
            <h2 className='text-xl font-semibold'>{course.name}</h2>
            <p className='text-gray-700'>{course.description}</p>
            <p className='mt-2 text-sm text-blue-700'>
              Max Depth: {course.maxDepth}
            </p>
            <p className='mt-1 text-sm text-blue-700'>
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
