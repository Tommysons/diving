'use client'

import { useParams } from 'next/navigation'
import { diveSites } from '@/lib/data/diveSites'
import YouTube, { YouTubeProps } from 'react-youtube'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DiveSiteDetailPage() {
  const { slug } = useParams()
  const site = diveSites.find((site) => site.slug === slug)

  if (!site) return <div className='p-6 text-red-500'>Dive site not found.</div>

  const videoId = extractYouTubeId(site.videoUrl)

  const onReady: YouTubeProps['onReady'] = (event) => {
    try {
      event.target.playVideo()
    } catch {
      // ignore autoplay error
    }
  }

  return (
    <>
      <Header />
      <main className='flex-grow'>
        <section className='max-w-7xl mx-auto px-4 py-8'>
          <div className='bg-white shadow-lg rounded-xl p-6 space-y-6'>
            <h1 className='text-3xl font-bold text-gray-800'>{site.name}</h1>
            <YouTube
              videoId={videoId}
              opts={{
                width: '100%',
                height: '400',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  mute: 1,
                },
              }}
              onReady={onReady}
            />
            <p className='text-gray-700'>{site.longDescription}</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 rounded-xl '>
              <Info label='Depth' value={site.depth} />
              <Info label='Current' value={site.current} />
              <Info label='Visibility' value={site.visibility} />
            </div>

            <div>
              <h2 className='text-xl font-semibold mt-4 mb-2'>
                {' '}
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className=' rounded-xl border border-gray-300 p-1 bg-white'>
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
