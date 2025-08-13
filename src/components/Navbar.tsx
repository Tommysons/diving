'use client'

import { useState } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '/divesites', label: 'Dive Sites' },
  { href: '/scubadivingcourses', label: 'Scuba Diving Courses' },
  { href: '/freedivingcourses', label: 'Freediving Courses' },
  { href: '/aboutme', label: 'About Me' },
  { href: '/contact', label: 'Contact Me' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='bg-blue-900 text-white px-6 py-4 flex items-center justify-between'>
      {/* Logo - clickable */}
      <Link
        href='/'
        className='text-2xl font-bold hover:text-yellow-400 transition'
      >
        Your Logo
      </Link>

      {/* Mobile hamburger */}
      <button
        className='sm:hidden'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle menu'
      >
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          {isOpen ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          )}
        </svg>
      </button>

      {/* Desktop + Mobile Menu */}
      <ul
        className={`
          sm:flex sm:items-center sm:space-x-8
          ${isOpen ? 'block' : 'hidden'} sm:block mt-4 sm:mt-0
          text-lg
        `}
      >
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className='hover:text-yellow-400 transition'>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
