'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Booking = {
  _id: string
  name: string
  email: string
  phone: string
  type: string
  course?: string
  site?: string
  date: string
  time: string
  status: string
}

export default function DashboardPage() {
  const params = useParams()
  const projectId = params.projectId as string

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const loadBookings = async () => {
    const res = await fetch(`/api/dashboard/projects/${projectId}`)
    const data = await res.json()
    setBookings(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (projectId) loadBookings()
  }, [projectId])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/dashboard/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    loadBookings()
  }

  const deleteBooking = async (id: string) => {
    await fetch(`/api/dashboard/projects/${projectId}?id=${id}`, {
      method: 'DELETE',
    })
    loadBookings()
  }

  if (loading) return <p className='p-6'>Loading...</p>

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        Project: {projectId?.toUpperCase()}
      </h1>

      <table className='w-full border text-sm'>
        <thead className='bg-gray-900 text-white'>
          <tr>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Date</th>
            <th className='border p-2'>Time</th>
            <th className='border p-2'>Status</th>
            <th className='border p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td className='border p-2'>{b.name}</td>
              <td className='border p-2'>{b.email}</td>
              <td className='border p-2'>{b.date}</td>
              <td className='border p-2'>{b.time}</td>
              <td className='border p-2'>{b.status}</td>
              <td className='border p-2 space-x-2'>
                <button
                  onClick={() => updateStatus(b._id, 'approved')}
                  className='bg-green-600 text-white px-2 py-1 rounded'
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(b._id, 'cancelled')}
                  className='bg-red-600 text-white px-2 py-1 rounded'
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteBooking(b._id)}
                  className='bg-gray-700 text-white px-2 py-1 rounded'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
