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
import MedicalFormModal from '@/components/MedicalFormModal'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!slug || index === -1)
    return <p>{lang === 'en' ? 'Course not found' : 'Курс не найден'}</p>

  const course = allCourses[index]
  const isScubaCourse = (c: any): c is ScubaCourse => 'maxDepth' in c

  const go = (dir: -1 | 1) => {
    const nextIndex = (index + dir + allCourses.length) % allCourses.length
    const nextSlug = allCourses[nextIndex].slug
    router.push(
      lang === 'en'
        ? `/scubadivingcourses/${nextSlug}`
        : `/ru/scubadivingcourses/${nextSlug}`
    )
  }

  return (
    <div className='px-6 py-12 max-w-5xl mx-auto space-y-8'>
      {/* Course Card */}
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

          {/* Course Details */}
          <div className='space-y-1'>
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
          </div>

          {/* Course Program */}
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

          {/* Medical Questionnaire Section */}
          <div className='mt-6 p-4 border rounded-xl bg-gray-50 space-y-3'>
            <h3 className='text-xl font-semibold'>
              {lang === 'en' ? 'Medical Questionnaire' : 'Медицинская анкета'}
            </h3>
            <p className='text-gray-700'>
              {lang === 'en'
                ? 'Before enrolling in this course, please review the medical questionnaire. If you answer "YES" to any question, a doctor’s approval may be required.'
                : 'Перед записью на курс, пожалуйста, ознакомьтесь с медицинской анкетой. Если вы ответите «ДА» на какой-либо вопрос, может потребоваться одобрение врача.'}
            </p>

            <div className='flex flex-wrap gap-4'>
              <a
                href={
                  lang === 'en'
                    ? '/forms/medical-form.pdf'
                    : '/forms/medical-form-rus.pdf'
                }
                download
                className='inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
              >
                {lang === 'en' ? 'Download PDF' : 'Скачать PDF'}
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className='inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition'
              >
                {lang === 'en' ? 'View Fullscreen' : 'Открыть на весь экран'}
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className='flex items-center gap-4 mt-4'>
            <button
              onClick={() => go(-1)}
              className='bg-cyan-700 hover:bg-cyan-800 text-white p-2 border rounded-full'
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

          {/* Action Buttons */}
          <div className='flex flex-col md:flex-row gap-4 mt-4'>
            {/* Book Course */}
            <button
              className='flex-1 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white transition rounded-lg'
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

            {/* Have a Question? */}
            <button
              className='flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white transition rounded-lg'
              onClick={() => router.push(lang === 'en' ? '/faq' : '/ru/faq')}
            >
              {lang === 'en' ? 'Have a Question?' : 'Есть вопрос?'}
            </button>
          </div>

          {/* Booking Form */}
          {activeForm && (
            <div className='mt-4'>
              <BookingForm type='scuba_course' activity={course.name} />
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Medical Modal */}
      <MedicalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filePath={
          lang === 'en'
            ? '/forms/medical-form.pdf'
            : '/forms/medical-form-rus.pdf'
        }
        lang={lang}
      />
    </div>
  )
}
