'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { label } from 'framer-motion/client'

const navItemsEN = [
  { href: '/divesites', label: 'Dive Sites' },
  { href: '/scubadivingcourses', label: 'Scuba Diving Courses' },
  // { href: '/freedivingcourses', label: 'Freediving Courses' },
  { href: '/gallery', label: 'Gallery', highlight: true },
  { href: '/aboutme', label: 'About Me' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
]

const navItemsRU = [
  { href: '/divesites', label: 'Места для дайвинга' },
  { href: '/scubadivingcourses', label: 'Курсы по дайвингу' },
  // { href: '/freedivingcourses', label: 'Курсы по фридайвингу' },
  { href: '/gallery', label: 'Галерея', highlight: true },
  { href: '/aboutme', label: 'Обо мне' },
  { href: '/contact', label: 'Контакты' },
  { href: '/faq', label: 'FAQ (Вопросы и ответы)' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  const navItems = locale === 'ru' ? navItemsRU : navItemsEN

  function switchLocale(pathname: string, targetLocale: string) {
    if (pathname.startsWith('/ru')) {
      return targetLocale === 'en'
        ? pathname.replace(/^\/ru/, '') || '/'
        : pathname
    }
    return targetLocale === 'ru' ? `/ru${pathname}` : pathname
  }

  return (
    <nav className='bg-blue-900 text-white px-6 py-4 flex items-center justify-between'>
      {/* Logo (Video) */}
      <Link href={locale === 'ru' ? '/ru' : '/'}>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className='rounded-l-full rounded-r-full overflow-hidden border-2 border-white shadow-md'
          style={{ width: '100px', height: '60px' }}
        >
          <video
            src='/images/logo.mkv'
            autoPlay
            muted
            loop
            playsInline
            preload='auto'
            poster='images/logo.png'
            className='w-full h-full object-cover object-center scale-105 -translate-x-[-4px] -translate-y-[2px]'
          />
        </motion.div>
      </Link>
      {/* Navigation + Language */}
      <div className='flex items-center space-x-6'>
        {/* Desktop Links (large screens only) */}
        <ul className={`hidden lg:flex items-center space-x-8 text-lg`}>
          {navItems.map(({ href, label, highlight }) => (
            <li key={href}>
              <Link
                href={locale === 'ru' ? `/ru${href}` : href}
                className={`transition ${
                  highlight
                    ? 'text-yellow-400 font-semibold animate-pulse hover:text-yellow-300'
                    : 'hover:text-yellow-400'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Language Switcher */}
        <div className='hidden lg:flex space-x-4'>
          <Link href={switchLocale(pathname, 'en')}>
            <button
              className={`px-2 py-1 rounded ${
                locale === 'en'
                  ? 'font-bold bg-yellow-400 text-blue-900'
                  : 'text-white hover:text-yellow-400'
              }`}
            >
              EN
            </button>
          </Link>
          <Link href={switchLocale(pathname, 'ru')}>
            <button
              className={`px-2 py-1 rounded ${
                locale === 'ru'
                  ? 'font-bold bg-yellow-400 text-blue-900'
                  : 'text-white hover:text-yellow-400'
              }`}
            >
              RU
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger (medium and smaller) */}
        <div className='lg:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} aria-label='Toggle menu'>
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

          {/* Mobile Menu */}
          {isOpen && (
            <ul className='mt-4 space-y-4 text-lg'>
              {navItems.map(({ href, label, highlight }) => (
                <li key={href}>
                  <Link
                    href={locale === 'ru' ? `/ru${href}` : href}
                    className={`transition block ${
                      highlight
                        ? 'text-yellow-400 font-semibold animate-pulse hover:text-yellow-300'
                        : 'hover:text-yellow-400'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {/* Mobile Language Switcher */}
              <li className='flex space-x-2 mt-2'>
                <Link href={switchLocale(pathname, 'en')}>
                  <button
                    className={`px-2 py-1 rounded ${
                      locale === 'en'
                        ? 'font-bold bg-yellow-400 text-blue-900'
                        : 'text-white hover:text-yellow-400'
                    }`}
                  >
                    EN
                  </button>
                </Link>
                <Link href={switchLocale(pathname, 'ru')}>
                  <button
                    className={`px-2 py-1 rounded ${
                      locale === 'ru'
                        ? 'font-bold bg-yellow-400 text-blue-900'
                        : 'text-white hover:text-yellow-400'
                    }`}
                  >
                    RU
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}
