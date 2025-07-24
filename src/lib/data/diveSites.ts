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
    slug: 'shark-bay',
    name: 'Shark Bay',
    shortDescription:
      'A popular dive site with mild currents and abundant marine life.',
    longDescription: `Shark Bay in Koh Tao offers calm to moderate currents and excellent visibility during the dry season. 
    Divers can explore vibrant coral reefs, swim-throughs, and spot reef sharks along with a diverse range of tropical fish. 
    Ideal for beginner to intermediate divers, it’s a must-visit site throughout the best diving months from March to September.`,
    imageUrl: '/images/shark-bay.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=DI5bXLjZkzU',
    depth: '5m - 25m',
    current: 'Mild in dry season, stronger during monsoon',
    visibility: '5m to 20m(seasonal)',
    bestSeason: ['Dry Season (Mar-Sep)'],
    seaLife: {
      Spring: ['Blacktip Reef Sharks', 'Parrotfish'],
      Summer: ['Turtles', 'Reef Sharks'],
      Fall: ['Barracuda', 'Snapper'],
      Winter: ['Triggerfish', 'Surgeonfish'],
    },
  },
  {
    slug: 'cpn',
    name: 'Chumphon Pinnacle',
    shortDescription: `One of Koh Tao’s most iconic dive sites, 
    Chumphon Pinnacle features deep granite formations teeming with pelagic life and occasional whale sharks.`,
    longDescription: `Chumphon Pinnacle is a world-class dive site northwest of Koh Tao, 
    featuring dramatic submerged granite formations that descend beyond 36 meters. 
    The area is covered in sea anemones, soft corals, and is home to schools of trevally, batfish, and barracuda. 
    Whale sharks are often seen between March and June. Due to its depth and strong currents, it is ideal for advanced divers.`,
    imageUrl: '/images/cpn.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=DI5bXLjZkzU',
    depth: '14–36+ meters',
    current: 'Moderate to strong',
    visibility: '10–30 meters',
    bestSeason: ['March', 'April', 'May', 'June'],
    seaLife: {
      Spring: ['Whale Shark', 'Trevally', 'Batfish'],
      Summer: ['Barracuda', 'Scorpionfish'],
      Fall: ['Tuna', 'Grouper'],
      Winter: ['Batfish', 'Fusiliers'],
    },
  },
  // add more dive sites here if needed
]
