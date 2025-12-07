'use client'

import { useEffect, useState } from 'react'

type Booking = {
  _id: string
  name: string
  email: string
  phone: string
  project: string
  course?: string
  site?: string
  date: string
  time: string
  status: string
}

export default function AdminAllProjects() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [editing, setEditing] = useState<null | Booking>(null)
  const [form, setForm] = useState({ date: '', time: '', status: '' })

  async function loadAll() {
    const res = await fetch('/api/dashboard/projects')
    const data = await res.json()
    setBookings(data)
  }

  useEffect(() => {
    loadAll()
  }, [])

  async function updateBooking(id: string, project: string, updates: any) {
    await fetch(`/api/dashboard/projects/${project}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    })
    setEditing(null)
    loadAll()
  }

  function openEdit(b: Booking) {
    setEditing(b)
    setForm({ date: b.date, time: b.time, status: b.status })
  }

  async function changeStatus(id: string, project: string, status: string) {
    await updateBooking(id, project, { status })
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>All Projects Dashboard</h1>

      <table className='w-full border text-sm'>
        <thead className='bg-black text-white'>
          <tr>
            <th>Project</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course / Site</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className='border-t'>
              <td>{b.project}</td>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.course || b.site || '-'}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td className='font-bold'>{b.status}</td>
              <td className='space-x-2'>
                <button
                  onClick={() => changeStatus(b._id, b.project, 'approved')}
                  className='bg-green-600 text-white px-2 py-1 rounded'
                >
                  Approve
                </button>

                <button
                  onClick={() => changeStatus(b._id, b.project, 'cancelled')}
                  className='bg-red-600 text-white px-2 py-1 rounded'
                >
                  Cancel
                </button>

                <button
                  onClick={() => openEdit(b)}
                  className='bg-blue-600 text-white px-2 py-1 rounded'
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal */}
      {editing && (
        <div className='fixed inset-0 bg-black/70 flex justify-center items-center'>
          <div className='bg-white text-black p-6 rounded w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>
              Edit Booking ({editing.project})
            </h2>

            <input
              type='date'
              className='border p-2 w-full mb-2'
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <input
              type='time'
              className='border p-2 w-full mb-2'
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />

            <select
              className='border p-2 w-full mb-4'
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value='pending'>Pending</option>
              <option value='approved'>Approved</option>
              <option value='cancelled'>Cancelled</option>
            </select>

            <div className='flex justify-end gap-2'>
              <button
                className='bg-gray-500 text-white px-4 py-2'
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>

              <button
                className='bg-blue-600 text-white px-4 py-2'
                onClick={() =>
                  updateBooking(editing._id, editing.project, form)
                }
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
