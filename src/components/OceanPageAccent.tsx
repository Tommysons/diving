'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

/** A decorative, localized introduction for the main editorial pages. */
export default function OceanPageAccent() {
  const pathname = usePathname() || '/'
  const ru = pathname === '/ru' || pathname.startsWith('/ru/')
  const path = pathname.replace(/^\/ru(?=\/|$)/, '') || '/'
  const pages: Record<string, { image: string; en: string; ru: string; enSub: string; ruSub: string }> = {
    '/scubadivingcourses': { image: '/images/generated/thailand-diving.webp', en: 'Dive a little deeper', ru: 'Погрузитесь глубже', enSub: 'Build confidence and discover a world beneath the surface.', ruSub: 'Обретите уверенность и откройте подводный мир.' },
    '/blog': { image: '/images/generated/blog-ocean.webp', en: 'Stories from the blue', ru: 'Истории из мира океана', enSub: 'Stories, marine life and moments from beneath the surface.', ruSub: 'Истории, морские обитатели и мгновения под водой.' },
    '/aboutme': { image: '/images/generated/about-ocean.webp', en: 'The journey behind LokaWndr', ru: 'История LokaWndr', enSub: 'A love of the ocean and a passion for sharing it.', ruSub: 'Любовь к океану и желание делиться открытиями.' },
    '/contact': { image: '/images/generated/contact-ocean.webp', en: 'Let’s explore together', ru: 'Откроем океан вместе', enSub: 'Every ocean adventure begins with a conversation.', ruSub: 'Каждое приключение начинается с разговора.' },
  }
  const page = pages[path]
  if (!page) return null
  return <div className='relative isolate flex min-h-[330px] items-center overflow-hidden bg-[#063348] md:min-h-[430px]'>
    <Image src={page.image} alt='' fill priority sizes='100vw' className='-z-20 object-cover'/>
    <div className='absolute inset-0 -z-10 bg-gradient-to-r from-[#021d30]/95 via-[#03273a]/75 to-[#03273a]/25'/>
    <div className='ocean-motion-layer' aria-hidden='true'><div className='ocean-motion-light'/><div className='ocean-motion-bubbles'><i/><i/><i/><i/><i/><i/></div></div>
    <div className='relative z-[2] mx-auto w-full max-w-[1480px] px-6 py-16 md:px-10'><p className='text-xs font-bold tracking-[.24em] text-cyan-200'>LOKAWNDR · {ru?'ИССЛЕДУЙТЕ ОКЕАН':'EXPLORE THE OCEAN'}</p><p className='mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl'>{ru?page.ru:page.en}</p><p className='mt-5 max-w-xl text-lg leading-8 text-slate-100'>{ru?page.ruSub:page.enSub}</p><p className='mt-5 text-xs text-white/75'>{ru?'Иллюстрация, созданная с помощью ИИ':'AI-generated illustration'}</p></div>
  </div>
}
