'use client'

import YouTube, { YouTubeProps } from 'react-youtube'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import clsx from 'clsx'
import { useState } from 'react'
import BookingForm from '@/components/BookingForm'
import { DiveSite } from '@/lib/data/diveSites'

interface Props {
  site: DiveSite
  locale: 'en' | 'ru'
}

export default function DiveSiteDetail({ site, locale }: Props) {
  const [activeForm, setActiveForm] = useState(false)

  const videoId = extractYouTubeId(site.videoUrl)
  const onReady: YouTubeProps['onReady'] = (event) => {
    try {
      event.target.playVideo()
    } catch {}
  }

  return (
    <>
      <Header />
      <main className='flex-grow'>
        <section className='max-w-7xl mx-auto px-4 py-8'>
          <div className='relative bg-white shadow-lg rounded-xl p-6 space-y-6'>
            <h1 className='text-3xl font-bold text-gray-800'>{site.name}</h1>
            <div className='w-full max-w-4xl aspect-video'>
              <YouTube
                videoId={videoId}
                className='w-full h-full'
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: { autoplay: 1, controls: 1, mute: 1 },
                }}
                onReady={onReady}
              />
            </div>

            <p className='text-gray-700'>{site.longDescription}</p>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <Info
                label={locale === 'ru' ? 'Глубина' : 'Depth'}
                value={site.depth}
              />
              <Info
                label={locale === 'ru' ? 'Течение' : 'Current'}
                value={site.current}
              />
              <Info
                label={locale === 'ru' ? 'Видимость' : 'Visibility'}
                value={site.visibility}
              />
            </div>

            <button
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4'
              onClick={() => setActiveForm(!activeForm)}
            >
              {activeForm
                ? locale === 'ru'
                  ? 'Закрыть форму бронирования'
                  : 'Close Booking Form'
                : locale === 'ru'
                ? 'Забронировать дайв'
                : 'Book a Dive Trip'}
            </button>

            {activeForm && (
              <BookingForm type='dive_trip' activity={site.name} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className='rounded-xl border border-gray-300 p-1 bg-white'>
      <div className='text-center text-sm text-gray-500'>{label}</div>
      <div className='text-center text-lg font-medium text-gray-800'>
        {value}
      </div>
    </div>
  )
}

function extractYouTubeId(url: string): string {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/
  const match = url.match(regex)
  return match ? match[1] : ''
}
