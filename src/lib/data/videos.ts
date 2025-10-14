// lib/data/videos.ts

export interface VideoData {
  id: string // YouTube video ID
  title: string // Title to display
  description?: string // Optional description
  thumbnailUrl?: string // Optional custom thumbnail (otherwise use YouTube default)
}

// Replace with your own YouTube channel video IDs and titles
export const videos: VideoData[] = [
  {
    id: 'Kh7xl21708Q',
    title: 'Perfect place to escape',
    description: 'Experience the colorful coral reefs and marine life.',
  },
  {
    id: 'RgSC9fjpxSo',
    title: 'Finding Nemo?',
    description: 'See the underwater world come alive after dark.',
  },
  {
    id: 'dlkxJwazUfo',
    title: 'Exploring Chumphon Pinnacle',
  },
  {
    id: 'MkJo-7nEJkg',
    title: 'Ulalah, Whale shark in Koh Tao',
  },
  {
    id: '0I2ZLnj5cqI',
    title: 'Barracuda’s in Koh Tao',
  },
  {
    id: 'RGbkGjW3hWc',
    title: 'Wondering at Aow Mao, Tanote, Lighhouse in Koh Tao',
  },
]
