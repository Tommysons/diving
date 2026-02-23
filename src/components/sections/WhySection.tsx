'use client'

import Image from 'next/image'

export default function WhySection({ locale }: { locale: 'en' | 'ru' }) {
  const whyItems =
    locale === 'ru'
      ? [
          { title: 'Безопасность', text: 'Погружения с комфортом.' },
          { title: 'Опыт', text: 'Персональный подход.' },
          { title: 'Приключения', text: 'Настоящие впечатления.' },
        ]
      : [
          { title: 'Safety', text: 'Comfort diving planning.' },
          { title: 'Experience', text: 'Deep local knowledge.' },
          { title: 'Adventure', text: 'Real underwater experiences.' },
        ]

  return (
    <section className='relative py-20 overflow-hidden'>
      <Image
        src='/images/wr/wr1a.webp'
        alt='Diver'
        fill
        sizes='100vw'
        loading='lazy'
        className='object-cover'
      />

      <div className='absolute inset-0 bg-black/30' />

      <div className='relative z-10 max-w-4xl mx-auto text-center px-4'>
        <h2 className='text-4xl font-bold text-white mb-10'>
          {locale === 'ru' ? 'Почему LokaWndr?' : 'Why LokaWndr?'}
        </h2>

        <div className='grid gap-6 place-items-center'>
          {whyItems.map((item, i) => (
            <div
              key={i}
              className='bg-white/85 backdrop-blur px-6 py-4 rounded-xl shadow w-full max-w-md'
            >
              <h3 className='font-semibold mb-2'>{item.title}</h3>
              <p className='text-gray-700'>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
