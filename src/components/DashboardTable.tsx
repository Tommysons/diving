'use client'

import { useState, useEffect } from 'react'

interface Booking {
  _id: string
  name: string
  email: string
  type?: string
  course?: string | null
  site?: string | null
  date?: string
  time?: string
  status?: string
  message?: string
}

interface DashboardTableProps {
  projectId: 'scuba' | 'freediving' | 'dive_trips' | 'digital_art'
}

export default function DashboardTable({ projectId }: DashboardTableProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true)
    const res = await fetch(`/api/dashboard/projects/${projectId}`)
    const data = await res.json()
    setBookings(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [projectId])

  // Handle approve, cancel, edit
  const handleAction = async (
    id: string,
    action: 'approved' | 'cancelled' | 'edit'
  ) => {
    if (action === 'cancelled') {
      const confirmCancel = confirm(
        'Are you sure you want to cancel this booking?'
      )
      if (!confirmCancel) return
    }

    let body: any = { id, action }

    if (action === 'edit') {
      const newDate = prompt('Enter new date (YYYY-MM-DD):')
      const newTime = prompt('Enter new time (HH:MM):')
      if (!newDate || !newTime) return
      body.newDate = newDate
      body.newTime = newTime
    }

    const res = await fetch(`/api/dashboard/projects/${projectId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const result = await res.json()
    if (!res.ok) {
      alert('Action failed: ' + result.error)
    }

    // Refresh table
    fetchBookings()
  }

  if (loading) return <p>Loading...</p>
  if (bookings.length === 0) return <p>No bookings yet.</p>

  // Status badge colors
  const statusColor = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-200 text-green-800'
      case 'cancelled':
        return 'bg-red-200 text-red-800'
      default:
        return 'bg-yellow-200 text-yellow-800'
    }
  }

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border rounded-lg overflow-hidden'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='border px-4 py-2'>ID</th>
            <th className='border px-4 py-2'>Name</th>
            <th className='border px-4 py-2'>Email</th>
            <th className='border px-4 py-2'>Type</th>
            <th className='border px-4 py-2'>Course / Site</th>
            <th className='border px-4 py-2'>Date</th>
            <th className='border px-4 py-2'>Time</th>
            <th className='border px-4 py-2'>Status</th>
            <th className='border px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className='hover:bg-gray-50'>
              <td className='border px-4 py-2 text-sm'>{b._id}</td>
              <td className='border px-4 py-2'>{b.name}</td>
              <td className='border px-4 py-2'>{b.email}</td>
              <td className='border px-4 py-2'>{b.type || '-'}</td>
              <td className='border px-4 py-2'>{b.course || b.site || '-'}</td>
              <td className='border px-4 py-2'>{b.date || '-'}</td>
              <td className='border px-4 py-2'>{b.time || '-'}</td>
              <td className='border px-4 py-2'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(
                    b.status
                  )}`}
                >
                  {b.status || 'pending'}
                </span>
              </td>
              <td className='border px-4 py-2 flex gap-2 flex-wrap'>
                <button
                  className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded'
                  onClick={() => handleAction(b._id, 'approved')}
                >
                  Approve
                </button>
                <button
                  className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
                  onClick={() => handleAction(b._id, 'cancelled')}
                >
                  Cancel
                </button>
                <button
                  className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded'
                  onClick={() => handleAction(b._id, 'edit')}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
