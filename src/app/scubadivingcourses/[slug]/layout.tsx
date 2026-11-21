import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { scubaCourses, specialtyCourses, scubaCoursesRU, specialtyCoursesRU } from '@/lib/data/scubaCourses'

type Props = { children: ReactNode; params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = [...scubaCourses, ...specialtyCourses].find((item) => item.slug === slug)
  if (!course) return { robots: { index: false, follow: true } }

  const en = `/scubadivingcourses/${slug}`
  const ru = `/ru/scubadivingcourses/${slug}`
  const canonical = en
  return {
    title: course.name,
    description: course.description,
    alternates: { canonical, languages: { en, ru } },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      title: course.name,
      description: course.description,
      url: canonical,
      images: [{ url: course.image, alt: course.name }],
    },
  }
}

export default function CourseDetailLayout({ children }: Props) {
  return children
}
