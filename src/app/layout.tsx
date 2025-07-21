import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Scuba Diving Site',
  description: 'Explore dive sites, courses and more',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-100'>{children}</body>
    </html>
  )
}
