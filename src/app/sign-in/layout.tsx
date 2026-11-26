import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import type { ReactNode } from 'react'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>
}
