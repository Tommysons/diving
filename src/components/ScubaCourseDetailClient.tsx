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
import MedicalFormModal from './MedicalFormModal'
import { motion } from 'framer-motion'

interface ScubaCourseDetailClientProps {
  lang: 'en' | 'ru'
}

export default function ScubaCourseDetailClient({
  lang,
}: ScubaCourseDetailClientProps) {
  const router = useRouter()
  const params = useParams()

  const rawSlug = params?.slug
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug

  const allCourses: (ScubaCourse | SpecialtyCourse)[] =
    lang === 'en'
      ? [...scubaCourses, ...specialtyCourses]
      : [...scubaCoursesRU, ...specialtyCoursesRU]

  const index = useMemo(
    () => allCourses.findIndex((c) => c.slug === slug),
    [slug, allCourses],
  )

  const [activeForm, setActiveForm] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!slug || index === -1)
    return (
      <p className='text-center py-10'>
        {lang === 'en' ? 'Course not found' : 'Курс не найден'}
      </p>
    )

  const course = allCourses[index]
  const isScubaCourse = (c: any): c is ScubaCourse => 'maxDepth' in c

  const go = (dir: -1 | 1) => {
    const nextIndex = (index + dir + allCourses.length) % allCourses.length
    const nextSlug = allCourses[nextIndex].slug
    router.push(
      lang === 'en'
        ? `/scubadivingcourses/${nextSlug}`
        : `/ru/scubadivingcourses/${nextSlug}`,
    )
  }

  return (
    <main className='relative min-h-screen w-full bg-blue-200'>
      <section className='relative z-10 max-w-7xl mx-auto px-4 py-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='bg-white/90 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden'
        >
          {/* HEADER */}
          <div className='flex items-center justify-center gap-4 p-6 border-b bg-white/80'>
            <button
              onClick={() => go(-1)}
              className='bg-cyan-700 hover:bg-cyan-800 text-white w-10 h-10 rounded-full flex items-center justify-center'
            >
              <ChevronLeft />
            </button>

            <h1 className='text-3xl font-bold text-gray-800 text-center px-4'>
              {course.name}
            </h1>

            <button
              onClick={() => go(1)}
              className='bg-cyan-700 hover:bg-cyan-800 text-white w-10 h-10 rounded-full flex items-center justify-center'
            >
              <ChevronRight />
            </button>
          </div>

          {/* LAYOUT */}
          <div className='grid md:grid-cols-2'>
            {/* IMAGE */}
            <div className='relative h-[350px] md:h-full'>
              <Image
                src={course.image}
                alt={course.name}
                fill
                className='object-cover'
                priority={true} // preloads image for faster display
              />
            </div>

            {/* INFO */}
            <div className='p-6 sm:p-8 space-y-5 bg-white/80'>
              <p className='text-gray-700 text-lg'>{course.description}</p>

              {/* INFO BOXES */}
              <div className='grid grid-cols-3 gap-3'>
                <Info
                  label={lang === 'en' ? 'Price' : 'Цена'}
                  value={course.price || '-'}
                />
                <Info
                  label={lang === 'en' ? 'Duration' : 'Длительность'}
                  value={course.duration || '-'}
                />
                <Info
                  label={lang === 'en' ? 'Max Depth' : 'Глубина'}
                  value={isScubaCourse(course) ? course.maxDepth : '-'}
                />
              </div>

              {course.prerequisites && (
                <div>
                  <h3 className='font-semibold text-lg mt-3'>
                    {lang === 'en' ? 'Prerequisites' : 'Требования'}
                  </h3>
                  <p className='text-gray-700'>{course.prerequisites}</p>
                </div>
              )}

              {course.program && (
                <div>
                  <h3 className='font-semibold text-lg mt-3'>
                    {lang === 'en' ? 'Course Program' : 'Программа курса'}
                  </h3>
                  <ul className='list-disc list-inside text-gray-700'>
                    {course.program.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* BUTTONS */}
              <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                <button
                  onClick={() => setActiveForm(!activeForm)}
                  className='bg-cyan-700 hover:bg-cyan-800 text-white px-5 py-2.5 rounded-xl transition'
                >
                  {activeForm
                    ? lang === 'en'
                      ? 'Close Booking Form'
                      : 'Закрыть форму'
                    : lang === 'en'
                      ? 'Book Course'
                      : 'Забронировать курс'}
                </button>

                <button
                  onClick={() =>
                    router.push(lang === 'en' ? '/faq' : '/ru/faq')
                  }
                  className='bg-cyan-700 hover:bg-cyan-800 text-white px-5 py-2.5 rounded-xl transition'
                >
                  {lang === 'en' ? 'Have a Question?' : 'Есть вопрос?'}
                </button>
              </div>

              {activeForm && (
                <div className='mt-4'>
                  <BookingForm type='scuba_course' activity={course.name} />
                </div>
              )}
            </div>
          </div>

          {/* MEDICAL */}
          <div className='p-6 bg-white/90 border-t space-y-3'>
            <h3 className='text-xl font-semibold'>
              {lang === 'en' ? 'Medical Questionnaire' : 'Медицинская анкета'}
            </h3>

            <p className='text-gray-700'>
              {lang === 'en'
                ? 'Before enrolling in this course, please review the medical questionnaire.'
                : 'Перед записью на курс ознакомьтесь с медицинской анкетой.'}
            </p>

            <div className='flex gap-4'>
              <a
                href={
                  lang === 'en'
                    ? '/forms/medical-form.pdf'
                    : '/forms/medical-form-rus.pdf'
                }
                download
                className='bg-blue-600 text-white px-4 py-2 rounded-lg'
              >
                {lang === 'en' ? 'Download PDF' : 'Скачать PDF'}
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className='bg-cyan-700 text-white px-4 py-2 rounded-lg'
              >
                {lang === 'en' ? 'View Fullscreen' : 'Открыть'}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

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
    </main>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-xl border border-gray-300 bg-gray-50 py-2'>
      <div className='text-center text-sm text-gray-500'>{label}</div>
      <div className='text-center text-lg font-semibold text-gray-800'>
        {value}
      </div>
    </div>
  )
}
