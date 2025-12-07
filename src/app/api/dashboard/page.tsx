'use client'

import { useState } from 'react'
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from '@clerk/nextjs'
import DashboardTable from '@/components/DashboardTable'

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState<
    'scuba' | 'freediving' | 'dive_trips' | 'digital_art'
  >('scuba')

  return (
    <>
      {/* If user is signed in ✅ */}
      <SignedIn>
        <div className='p-6 max-w-6xl mx-auto'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl font-bold'>Welcome!</h1>
            <UserButton />
          </div>

          <p className='mb-6'>Select a project to manage:</p>

          <div className='flex gap-4 mb-6 flex-wrap'>
            {(
              ['scuba', 'freediving', 'dive_trips', 'digital_art'] as const
            ).map((project) => (
              <button
                key={project}
                className={`px-4 py-2 rounded ${
                  selectedProject === project
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                {project.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          <DashboardTable projectId={selectedProject} />
        </div>
      </SignedIn>

      {/* If user is signed out ❌ */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
