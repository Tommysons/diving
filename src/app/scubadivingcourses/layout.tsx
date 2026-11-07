import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scuba Diving Courses',
  description: 'Explore beginner, advanced and specialty scuba diving courses with LokaWndr.',
  alternates: { canonical: '/scubadivingcourses', languages: { en: '/scubadivingcourses', ru: '/ru/scubadivingcourses' } },
}

export default function CoursesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
