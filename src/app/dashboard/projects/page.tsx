'use client'

import { useEffect, useState } from 'react'

type Booking = {
  _id: string
  name: string
  email: string
  date: string
  time: string
  status: string
  project: string
}

export default function ProjectsDashboardPage() {
  const [rows, setRows] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const [editing, setEditing] = useState<Booking | null>(null)
  const [editDate, setEditDate] = useState('')
  const [editTime, setEditTime] = useState('')
  const [editStatus, setEditStatus] = useState('pending')

  useEffect(() => {
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    const res = await fetch('/api/dashboard/projects')
    const data = await res.json()
    setRows(data)
    setLoading(false)
  }

  async function approve(project: string, id: string) {
    await fetch(`/api/dashboard/projects/${project}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'approved' }),
    })
    loadAll()
  }

  async function cancel(project: string, id: string) {
    await fetch(`/api/dashboard/projects/${project}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'cancelled' }),
    })
    loadAll()
  }

  async function remove(project: string, id: string) {
    if (!confirm('Delete this booking?')) return
    await fetch(`/api/dashboard/projects/${project}?id=${id}`, {
      method: 'DELETE',
    })
    loadAll()
  }

  function openEdit(b: Booking) {
    setEditing(b)
    setEditDate(b.date)
    setEditTime(b.time)
    setEditStatus(b.status)
  }

  async function saveEdit() {
    if (!editing) return

    await fetch(`/api/dashboard/projects/${editing.project}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editing._id,
        date: editDate,
        time: editTime,
        status: editStatus,
      }),
    })

    setEditing(null)
    loadAll()
  }

  if (loading) return <p className='p-6'>Loading...</p>

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>All Projects Dashboard</h1>

      <table className='w-full border'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border p-2'>Project</th>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Date</th>
            <th className='border p-2'>Time</th>
            <th className='border p-2'>Status</th>
            <th className='border p-2'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((b) => (
            <tr key={b._id}>
              <td className='border p-2'>{b.project}</td>
              <td className='border p-2'>{b.name}</td>
              <td className='border p-2'>{b.email}</td>
              <td className='border p-2'>{b.date}</td>
              <td className='border p-2'>{b.time}</td>
              <td className='border p-2'>{b.status}</td>
              <td className='border p-2 space-x-2'>
                <button
                  onClick={() => approve(b.project, b._id)}
                  className='bg-green-600 text-white px-2 py-1 rounded'
                >
                  Approve
                </button>

                <button
                  onClick={() => cancel(b.project, b._id)}
                  className='bg-yellow-600 text-white px-2 py-1 rounded'
                >
                  Cancel
                </button>

                <button
                  onClick={() => openEdit(b)}
                  className='bg-blue-600 text-white px-2 py-1 rounded'
                >
                  Edit
                </button>

                <button
                  onClick={() => remove(b.project, b._id)}
                  className='bg-red-600 text-white px-2 py-1 rounded'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editing && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded w-96'>
            <h2 className='text-xl font-bold mb-3'>Edit Booking</h2>

            <label className='block mb-2'>
              Date
              <input
                type='date'
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className='border w-full p-2'
              />
            </label>

            <label className='block mb-2'>
              Time
              <input
                type='time'
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                className='border w-full p-2'
              />
            </label>

            <label className='block mb-4'>
              Status
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className='border w-full p-2'
              >
                <option value='pending'>Pending</option>
                <option value='approved'>Approved</option>
                <option value='cancelled'>Cancelled</option>
              </select>
            </label>

            <div className='flex justify-end gap-2'>
              <button
                onClick={() => setEditing(null)}
                className='px-3 py-1 border rounded'
              >
                Close
              </button>
              <button
                onClick={saveEdit}
                className='bg-blue-600 text-white px-3 py-1 rounded'
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
