'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardTable from '@/components/DashboardTable'

export default function DashboardPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in')
    } else {
      setLoading(false)
    }
  }, [isSignedIn, router])

  if (loading) return <p>Loading dashboard...</p>

  return <DashboardTable projectId='scuba' />
}
