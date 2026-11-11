'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

/** A shared decorative ocean accent; the Atlas and the image-led home/snorkeling heroes stand alone. */
export default function OceanPageAccent() {
  const pathname = usePathname() || '/'
  const path = pathname.replace(/^\/ru(?=\/|$)/, '') || '/'
  if (path === '/' || path === '/atlas' || path.startsWith('/atlas/') || path === '/snorkeling') return null
  return <div className='relative h-16 overflow-hidden bg-[#063348] sm:h-24' aria-hidden='true'>
    <Image src='/images/generated/ocean-reef.webp' alt='' fill sizes='100vw' className='object-cover object-[center_45%]'/>
    <div className='absolute inset-0 bg-gradient-to-r from-[#032033]/80 via-[#03283b]/45 to-[#032033]/25'/>
  </div>
}
