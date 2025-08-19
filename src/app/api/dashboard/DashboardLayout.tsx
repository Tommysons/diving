'use client'

import { useState, useEffect } from 'react'

interface Item {
  _id: string
  name: string
  email: string
  type?: string
  course?: string | null
  site?: string | null
  date?: string
  status?: string
}

const projects = [
  { id: 'scuba', name: 'Scuba Diving' },
  { id: 'freediving', name: 'Freediving' },
  { id: 'dive_trips', name: 'Dive Trips' },
  { id: 'digital_art', name: 'Digital Art' },
]

export default function DashboardLayout() {
  const [selectedProject, setSelectedProject] = useState(projects[0].id)
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchItems() {
      setLoading(true)
      const res = await fetch(`/api/dashboard/projects/${selectedProject}`)
      const data = await res.json()
      setItems(data)
      setLoading(false)
    }
    fetchItems()
  }, [selectedProject])

  async function handleAction(
    id: string,
    action: 'approved' | 'cancelled' | 'edit'
  ) {
    if (action === 'edit') {
      const newDate = prompt('Enter new date (YYYY-MM-DD):')
      const newTime = prompt('Enter new time (HH:MM):')
      if (!newDate || !newTime) return
      const res = await fetch(
        `/api/dashboard/projects/${selectedProject}/action`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, action: 'edit', newDate, newTime }),
        }
      )
      const data = await res.json()
      if (!res.ok) alert('Edit failed: ' + data.error)
      else alert('Edit applied successfully!')
    } else {
      const res = await fetch(
        `/api/dashboard/projects/${selectedProject}/action`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, action }),
        }
      )
      const data = await res.json()
      if (!res.ok) alert('Action failed: ' + data.error)
      else alert(`Action "${action}" applied successfully!`)
    }

    // Refresh table
    const updatedRes = await fetch(`/api/dashboard/projects/${selectedProject}`)
    const updatedItems = await updatedRes.json()
    setItems(updatedItems)
  }

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className='w-64 bg-gray-800 text-white p-4'>
        <h2 className='text-xl font-bold mb-6'>Projects</h2>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={`p-2 mb-2 cursor-pointer rounded ${
                selectedProject === project.id ? 'bg-gray-600' : ''
              }`}
              onClick={() => setSelectedProject(project.id)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className='flex-1 p-6 bg-gray-100 overflow-auto'>
        <h1 className='text-2xl font-bold mb-4'>
          {projects.find((p) => p.id === selectedProject)?.name} Dashboard
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No data yet</p>
        ) : (
          <table className='min-w-full bg-white border'>
            <thead>
              <tr>
                <th className='border px-4 py-2'>ID</th>
                <th className='border px-4 py-2'>Name</th>
                <th className='border px-4 py-2'>Email</th>
                <th className='border px-4 py-2'>Type</th>
                <th className='border px-4 py-2'>Date</th>
                <th className='border px-4 py-2'>Status</th>
                <th className='border px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td className='border px-4 py-2'>{item._id}</td>
                  <td className='border px-4 py-2'>{item.name}</td>
                  <td className='border px-4 py-2'>{item.email}</td>
                  <td className='border px-4 py-2'>{item.type || '-'}</td>
                  <td className='border px-4 py-2'>{item.date || '-'}</td>
                  <td className='border px-4 py-2'>
                    {item.status || 'pending'}
                  </td>
                  <td className='border px-4 py-2 flex gap-2'>
                    <button
                      className='bg-green-500 text-white px-2 py-1 rounded'
                      onClick={() => handleAction(item._id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className='bg-red-500 text-white px-2 py-1 rounded'
                      onClick={() => handleAction(item._id, 'cancelled')}
                    >
                      Cancel
                    </button>
                    <button
                      className='bg-yellow-500 text-white px-2 py-1 rounded'
                      onClick={() => handleAction(item._id, 'edit')}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
