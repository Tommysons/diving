import './globals.css'
import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: 'LokaWndr | Scuba Diving, Snorkeling & Ocean Adventures',
  description: 'Explore scuba diving, snorkeling, marine life and real ocean stories from Thailand and the Maldives with LokaWndr.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className=' flex flex-col min-h-screen bg-gray-100'>
        <ClerkProvider>{children}</ClerkProvider>
        <Analytics />
      </body>
    </html>
  )
}
