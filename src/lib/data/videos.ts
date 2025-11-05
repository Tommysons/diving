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
    description: 'Experience the colorful coral reefs and marine life',
  },
  {
    id: 'RgSC9fjpxSo',
    title: 'Finding Nemo?',
    description: 'Our dive buddy today — a graceful Bigeye Trevally',
  },
  {
    id: 'dlkxJwazUfo',
    title: 'Exploring Chumphon Pinnacle',
    description: 'Surrounded by batfish, fusiliers, butterflyfish',
  },
  {
    id: 'MkJo-7nEJkg',
    title: 'Whale shark',
    description: 'Whale shark surrounded by bubbles and divers',
  },
  {
    id: '0I2ZLnj5cqI',
    title: 'Barracuda’s in Koh Tao',
    description: 'A wall of barracudas appears out of the blue',
  },
  {
    id: 'RGbkGjW3hWc',
    title: 'Wondering at Aow Mao, Tanote',
    description: 'Corals, a turtle, and a school of barracudas — perfect',
  },
  {
    id: '8qt0x0oU4hw',
    title: 'Wondering in Chumphon Pinnacle',
    description: 'Calm dive through bright anemones and curious fish.',
  },
  {
    id: 'uq8XEMwVs6I',
    title: 'Wondering in Southwest Pinnacle',
    description: 'Fusiliers and trevally fill the blue around us',
  },
  {
    id: 'OEkEryRDFtM',
    title: 'Wondering around White Rock',
    description: 'Exploring vibrant corals full of tiny marine life',
  },
  {
    id: 'dclxFrsdWVY',
    title: 'Wondering in wreck Sattakut',
    description: 'Wreck, fishes, and divers — Sattakut adventure',
  },
]
