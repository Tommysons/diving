'use client'

import { useEffect, useState } from 'react'

type Booking = {
  _id: string
  project: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  status: string
  course?: string
  site?: string
}

export default function ProjectsDashboard() {
  const [data, setData] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const res = await fetch('/api/dashboard/projects')
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const update = async (id: string, project: string, status: string) => {
    await fetch('/api/dashboard/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, project, status }),
    })
    load()
  }

  const remove = async (id: string, project: string) => {
    await fetch(`/api/dashboard/projects?id=${id}&project=${project}`, {
      method: 'DELETE',
    })
    load()
  }

  if (loading) return <p className='p-6'>Loading...</p>

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>All Projects Dashboard</h1>

      <table className='w-full border text-sm'>
        <thead className='bg-black text-white'>
          <tr>
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
          {data.map((b) => (
            <tr key={b._id}>
              <td className='border p-2 font-bold'>{b.project}</td>
              <td className='border p-2'>{b.name}</td>
              <td className='border p-2'>{b.email}</td>
              <td className='border p-2'>{b.date}</td>
              <td className='border p-2'>{b.time}</td>
              <td className='border p-2 font-semibold'>{b.status}</td>
              <td className='border p-2 space-x-2'>
                <button
                  onClick={() => update(b._id, b.project, 'approved')}
                  className='bg-green-600 text-white px-2 py-1 rounded'
                >
                  Approve
                </button>
                <button
                  onClick={() => update(b._id, b.project, 'cancelled')}
                  className='bg-red-600 text-white px-2 py-1 rounded'
                >
                  Cancel
                </button>
                <button
                  onClick={() => remove(b._id, b.project)}
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
