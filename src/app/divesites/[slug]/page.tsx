'use client'

import { useParams, useRouter } from 'next/navigation'
import { diveSites } from '@/lib/data/diveSites'
import YouTube, { YouTubeProps } from 'react-youtube'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import clsx from 'clsx'
import { useState } from 'react'
import BookingForm from '@/components/BookingForm'

export default function DiveSiteDetailPage() {
  const router = useRouter()
  const { slug } = useParams()
  const slugStr = Array.isArray(slug) ? slug[0] : slug
  const currentIndex = diveSites.findIndex((site) => site.slug === slugStr)
  const site = diveSites[currentIndex]

  const [activeForm, setActiveForm] = useState(false)

  if (!site) return <div className='p-6 text-red-500'>Dive site not found.</div>

  const videoId = extractYouTubeId(site.videoUrl)

  const onReady: YouTubeProps['onReady'] = (event) => {
    try {
      event.target.playVideo()
    } catch {
      // ignore autoplay error
    }
  }

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + diveSites.length) % diveSites.length
    router.push(`/divesites/${diveSites[prevIndex].slug}`)
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % diveSites.length
    router.push(`/divesites/${diveSites[nextIndex].slug}`)
  }

  return (
    <>
      <Header />
      <main className='flex-grow'>
        <section className='max-w-7xl mx-auto px-4 py-8'>
          <div className='relative bg-white shadow-lg rounded-xl p-6 space-y-6'>
            <h1 className='text-3xl font-bold text-gray-800'>{site.name}</h1>

            {/* Video with Arrows */}
            <div className='relative flex justify-center items-center'>
              <div className='w-full max-w-4xl aspect-video'>
                <YouTube
                  videoId={videoId}
                  className='w-full h-full'
                  opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                      autoplay: 1,
                      controls: 1,
                      mute: 1,
                    },
                  }}
                  onReady={onReady}
                />
              </div>

              <button
                onClick={goToPrev}
                aria-label='Previous'
                className={clsx(
                  'absolute left-4 z-10 w-12 h-12 md:w-14 md:h-14',
                  'bg-cyan-700 hover:bg-cyan-800 text-white',
                  'rounded-full flex items-center justify-center',
                  'text-3xl font-bold shadow-md'
                )}
              >
                ‹
              </button>

              <button
                onClick={goToNext}
                aria-label='Next'
                className={clsx(
                  'absolute right-4 z-10 w-12 h-12 md:w-14 md:h-14',
                  'bg-cyan-700 hover:bg-cyan-800 text-white',
                  'rounded-full flex items-center justify-center',
                  'text-3xl font-bold shadow-md'
                )}
              >
                ›
              </button>
            </div>

            {/* Description */}
            <p className='text-gray-700'>{site.longDescription}</p>

            {/* Info Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <Info label='Depth' value={site.depth} />
              <Info label='Current' value={site.current} />
              <Info label='Visibility' value={site.visibility} />
            </div>

            {/* Sea Life */}
            <div>
              <h2 className='text-xl font-semibold mt-4 mb-2'>
                Seasonal Sea Life
              </h2>
              <ul className='list-disc list-inside text-gray-700'>
                {Object.entries(site.seaLife).map(([season, species]) => (
                  <li key={season}>
                    <strong>{season}:</strong> {species.join(', ')}
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Form Toggle */}
            <button
              className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4'
              onClick={() => setActiveForm(!activeForm)}
            >
              {activeForm ? 'Close Booking Form' : 'Book a Dive Trip'}
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
