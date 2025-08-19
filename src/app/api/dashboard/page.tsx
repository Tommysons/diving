'use client'

import { useState } from 'react'
import DashboardTable from '@/components/DashboardTable'

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState<
    'scuba' | 'freediving' | 'dive_trips' | 'digital_art'
  >('scuba')

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Welcome, Tommy!</h1>
      <p className='mb-6'>Select a project to manage:</p>

      <div className='flex gap-4 mb-6'>
        <button
          className={`px-4 py-2 rounded ${
            selectedProject === 'scuba'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setSelectedProject('scuba')}
        >
          Scuba Diving
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedProject === 'freediving'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setSelectedProject('freediving')}
        >
          Freediving
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedProject === 'dive_trips'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setSelectedProject('dive_trips')}
        >
          Dive Trips
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedProject === 'digital_art'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setSelectedProject('digital_art')}
        >
          Digital Art
        </button>
      </div>

      {/* Display the table for the selected project */}
      <DashboardTable projectId={selectedProject} />
    </div>
  )
}
