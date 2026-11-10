import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Курсы дайвинга',
  description: 'Курсы дайвинга для начинающих, сертифицированных дайверов и специализации с LokaWndr.',
  alternates: { canonical: '/ru/scubadivingcourses', languages: { en: '/scubadivingcourses', ru: '/ru/scubadivingcourses' } },
}

export default function CoursesRuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
