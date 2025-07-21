export interface DiveSite {
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  imageUrl: string
  videoUrl: string
  depth: string
  current: string
  visibility: string
  bestSeason: string[]
  seaLife: Record<string, string[]>
}

export const diveSites: DiveSite[] = [
  {
    slug: 'blue-hole',
    name: 'Blue Hole',
    shortDescription: 'A stunning vertical drop-off in crystal clear waters.',
    longDescription:
      'The Blue Hole offers an unforgettable wall dive with depths beyond 100 meters. Ideal for experienced divers.',
    imageUrl: '/images/blue-hole.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=DI5bXLjZkzU', // <-- Cleaned URL here
    depth: '100m+',
    current: 'Mild to Strong',
    visibility: '30m+',
    bestSeason: ['Spring', 'Summer'],
    seaLife: {
      Spring: ['Barracuda', 'Snapper'],
      Summer: ['Turtles', 'Manta Rays'],
      Fall: ['Groupers', 'Moray Eels'],
      Winter: ['Reef Sharks'],
    },
  },
  // add more dive sites here if needed
]
