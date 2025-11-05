'use client'

import { useState, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import BookingForm from './BookingForm'
import {
  scubaCourses,
  specialtyCourses,
  scubaCoursesRU,
  specialtyCoursesRU,
  ScubaCourse,
  SpecialtyCourse,
} from '@/lib/data/scubaCourses'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScubaCourseDetailClientProps {
  lang: 'en' | 'ru'
}

export default function ScubaCourseDetailClient({
  lang,
}: ScubaCourseDetailClientProps) {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug

  const allCourses: (ScubaCourse | SpecialtyCourse)[] =
    lang === 'en'
      ? [...scubaCourses, ...specialtyCourses]
      : [...scubaCoursesRU, ...specialtyCoursesRU]

  const index = useMemo(
    () => allCourses.findIndex((c) => c.slug === slug),
    [slug]
  )

  const [activeForm, setActiveForm] = useState(false)

  if (!slug || index === -1)
    return <p>{lang === 'en' ? 'Course not found' : 'Курс не найден'}</p>

  const course = allCourses[index]

  const go = (dir: -1 | 1) => {
    const nextIndex = (index + dir + allCourses.length) % allCourses.length
    const nextSlug = allCourses[nextIndex].slug
    router.push(
      lang === 'en'
        ? `/scubadivingcourses/${nextSlug}`
        : `/ru/scubadivingcourses/${nextSlug}`
    )
  }

  const isScubaCourse = (c: any): c is ScubaCourse => 'maxDepth' in c

  return (
    <div className='px-6 py-12 max-w-4xl mx-auto'>
      <div className='relative rounded-2xl shadow-lg overflow-hidden bg-white'>
        <div className='relative w-full h-64 md:h-80'>
          <Image
            src={course.image}
            alt={course.name}
            fill
            className='object-cover'
          />
        </div>
        <div className='p-6 space-y-4'>
          <h2 className='text-3xl font-bold'>{course.name}</h2>
          <p>{course.description}</p>

          {isScubaCourse(course) && (
            <p>
              <span className='font-semibold text-blue-600'>
                {lang === 'en' ? 'Max Depth:' : 'Максимальная глубина:'}
              </span>{' '}
              {course.maxDepth}
            </p>
          )}

          {course.prerequisites && (
            <p>
              <span className='font-semibold text-blue-600'>
                {lang === 'en' ? 'Prerequisites:' : 'Требования:'}
              </span>{' '}
              {course.prerequisites}
            </p>
          )}

          {course.duration && (
            <p>
              <span className='font-semibold text-blue-600'>
                {lang === 'en' ? 'Duration:' : 'Продолжительность:'}
              </span>{' '}
              {course.duration}
            </p>
          )}

          {course.price && (
            <p>
              <span className='font-semibold text-blue-600'>
                {lang === 'en' ? 'Price:' : 'Цена:'}
              </span>{' '}
              {course.price}
            </p>
          )}

          {course.program && course.program.length > 0 && (
            <div>
              <span className='font-semibold text-blue-600'>
                {lang === 'en' ? 'Course Program:' : 'Программа курса:'}
              </span>
              <ul className='list-disc ml-6 mt-1'>
                {course.program.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className='flex items-center gap-4 mt-4'>
            <button
              onClick={() => go(-1)}
              className=' bg-cyan-700 hover:bg-cyan-800 text-white p-2 border rounded-full'
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => go(1)}
              className='bg-cyan-700 hover:bg-cyan-800 text-white p-2 border rounded-full'
            >
              <ChevronRight />
            </button>
          </div>

          <button
            className='mt-4 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white transition'
            onClick={() => setActiveForm(!activeForm)}
          >
            {activeForm
              ? lang === 'en'
                ? 'Close Booking Form'
                : 'Закрыть форму бронирования'
              : lang === 'en'
              ? 'Book Course'
              : 'Забронировать курс'}
          </button>

          {activeForm && (
            <BookingForm type='scuba_course' activity={course.name} />
          )}
        </div>
      </div>
    </div>
  )
}
