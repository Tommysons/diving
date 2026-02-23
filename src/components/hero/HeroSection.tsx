'use client'

import Image from 'next/image'

export default function HeroSection({ locale }: { locale: 'en' | 'ru' }) {
  return (
    <section className='relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden'>
      <Image
        src='/images/hero-about-a.webp'
        alt='Scuba diving'
        fill
        priority
        fetchPriority='high'
        sizes='100vw'
        className='object-cover'
      />

      <div className='absolute inset-0 bg-black/45' />

      <div className='relative z-10 max-w-xl px-4'>
        <h1 className='text-4xl md:text-6xl font-bold text-white'>
          {locale === 'ru'
            ? 'Открой подводный мир с LokaWndr'
            : 'Explore the Underwater World with LokaWndr'}
        </h1>
      </div>
    </section>
  )
}
