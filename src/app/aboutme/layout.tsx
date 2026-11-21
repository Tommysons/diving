import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Meet Your PADI & SSI Diving Instructor',
  description: 'Meet the LokaWndr scuba diving instructor, explore PADI and SSI qualifications, dive experience and a passion for safe underwater adventures.',
  alternates: { canonical: '/aboutme', languages: { en: '/aboutme', ru: '/ru/aboutme' } },
  openGraph: {
    title: 'Meet Your PADI & SSI Diving Instructor',
    description: 'Discover the instructor and diving experience behind LokaWndr.',
    url: '/aboutme',
  },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
