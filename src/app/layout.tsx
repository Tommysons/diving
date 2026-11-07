import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  metadataBase: new URL('https://lokawndr.com'),
  title: {
    default: 'LokaWndr | Scuba Diving, Snorkeling & Ocean Adventures',
    template: '%s | LokaWndr',
  },
  description: 'Explore scuba diving, snorkeling, marine life and real ocean stories from Thailand and the Maldives with LokaWndr.',
  keywords: ['scuba diving', 'snorkeling', 'Koh Tao', 'Maldives', 'ocean adventures', 'dive courses'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'LokaWndr',
    title: 'LokaWndr | Scuba Diving, Snorkeling & Ocean Adventures',
    description: 'Explore scuba diving, snorkeling, marine life and real ocean stories from Thailand and the Maldives with LokaWndr.',
    images: [{ url: '/images/hero-about-a.webp', width: 1200, height: 630, alt: 'A diver exploring the underwater world' }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col bg-[#031b2d] text-white antialiased'>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  )
}
