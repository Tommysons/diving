'use client'

import { useParams } from 'next/navigation'
import { diveSites } from '@/lib/data/diveSites'
import YouTube, { YouTubeProps } from 'react-youtube'

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
    <div className='p-6 max-w-4xl mx-auto space-y-6'>
      <h1 className='text-3xl font-bold'>{site.name}</h1>
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
    </div>
  )
}

function extractYouTubeId(url: string): string {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/
  const match = url.match(regex)
  return match ? match[1] : ''
}
