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

export default function ProjectDashboardPage() {
  const params = useParams()
  const projectId = params.projectId as string

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Booking>>({})

  /* =====================
     LOAD BOOKINGS
  ====================== */
  async function loadBookings() {
    try {
      const res = await fetch(`/api/dashboard/${projectId}`)

      if (!res.ok) {
        throw new Error('Failed to load bookings')
      }

      const data = await res.json()
      setBookings(data)
      setLoading(false)
    } catch (err: any) {
      console.error(err)
      setError('Failed to load bookings')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (projectId) loadBookings()
  }, [projectId])

  /* =====================
     ACTIONS
  ====================== */

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/dashboard/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    loadBookings()
  }

  async function deleteBooking(id: string) {
    await fetch(`/api/dashboard/${projectId}?id=${id}`, {
      method: 'DELETE',
    })
    loadBookings()
  }

  function startEdit(booking: Booking) {
    setEditingId(booking._id)
    setEditForm(booking)
  }

  async function saveEdit() {
    if (!editingId) return

    await fetch(`/api/dashboard/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingId,
        ...editForm,
      }),
    })

    setEditingId(null)
    setEditForm({})
    loadBookings()
  }

  /* =====================
     RENDER
  ====================== */

  if (loading) return <p className='p-4'>Loading…</p>
  if (error) return <p className='p-4 text-red-500'>{error}</p>

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        Project: {projectId.toUpperCase()}
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className='w-full border border-gray-700 text-sm'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='border p-2'>ID</th>
              <th className='border p-2'>Name</th>
              <th className='border p-2'>Email</th>
              <th className='border p-2'>Type</th>
              <th className='border p-2'>Course / Site</th>
              <th className='border p-2'>Date</th>
              <th className='border p-2'>Time</th>
              <th className='border p-2'>Status</th>
              <th className='border p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className='border-t'>
                <td className='border p-2'>{b._id}</td>
                <td className='border p-2'>{b.name}</td>
                <td className='border p-2'>{b.email}</td>
                <td className='border p-2'>{b.type}</td>
                <td className='border p-2'>{b.course || b.site || '-'}</td>
                <td className='border p-2'>{b.date}</td>
                <td className='border p-2'>{b.time}</td>
                <td className='border p-2 font-semibold'>{b.status}</td>

                {/* ACTIONS */}
                <td className='border p-2 space-x-2'>
                  <button
                    onClick={() => updateStatus(b._id, 'approved')}
                    className='bg-green-600 px-2 py-1 rounded text-white'
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(b._id, 'cancelled')}
                    className='bg-red-600 px-2 py-1 rounded text-white'
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => startEdit(b)}
                    className='bg-blue-600 px-2 py-1 rounded text-white'
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBooking(b._id)}
                    className='bg-gray-700 px-2 py-1 rounded text-white'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* EDIT MODAL */}
      {editingId && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='bg-white text-black p-6 rounded w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Edit Booking</h2>

            <input
              placeholder='Name'
              value={editForm.name || ''}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className='w-full mb-2 p-2 border'
            />

            <input
              placeholder='Email'
              value={editForm.email || ''}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
              className='w-full mb-2 p-2 border'
            />

            <input
              placeholder='Phone'
              value={editForm.phone || ''}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
              className='w-full mb-2 p-2 border'
            />

            <input
              placeholder='Date'
              type='date'
              value={editForm.date || ''}
              onChange={(e) =>
                setEditForm({ ...editForm, date: e.target.value })
              }
              className='w-full mb-2 p-2 border'
            />

            <input
              placeholder='Time'
              type='time'
              value={editForm.time || ''}
              onChange={(e) =>
                setEditForm({ ...editForm, time: e.target.value })
              }
              className='w-full mb-4 p-2 border'
            />

            <div className='flex gap-2 justify-end'>
              <button
                onClick={() => setEditingId(null)}
                className='px-4 py-2 bg-gray-500 text-white rounded'
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className='px-4 py-2 bg-green-600 text-white rounded'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
