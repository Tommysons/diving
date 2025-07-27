// lib/data/scubaCourses.ts

export interface ScubaCourse {
  name: string
  description: string
  maxDepth: string
  image: string
  prerequisites?: string
}

export interface SpecialtyCourse {
  name: string
  description: string
  prerequisites: string
  image: string
}

export const scubaCourses: ScubaCourse[] = [
  {
    name: 'Discover Scuba Diving (DSD)',
    description:
      'Experience scuba diving without a certification. Great for beginners wanting to try diving under professional supervision.',
    maxDepth: '12 meters',
    image: '/images/dsd.jpeg',
  },
  {
    name: 'Open Water Diver (OWD)',
    description:
      'Your first full certification. Learn basic diving skills and theory. Dive with a buddy anywhere in the world.',
    maxDepth: '18 meters',
    image: '/images/owd.jpeg',
  },
  {
    name: 'Advanced Open Water Diver (AOWD)',
    description:
      'Improve your skills with navigation, deep dives, and 3 other specialty dives.',
    maxDepth: '30 meters',
    image: '/images/awd.jpeg',
    prerequisites: 'OWD',
  },
  {
    name: 'Rescue Diver',
    description:
      'Learn how to prevent and manage diving emergencies. Builds confidence and leadership.',
    maxDepth: '30 meters',
    image: '/images/rescue.jpeg',
    prerequisites: 'AOWD + EFR/CPR certification',
  },
  {
    name: 'Divemaster',
    description:
      'First professional level. Lead certified divers and assist instructors.',
    maxDepth: '40 meters',
    image: '/images/dm.jpeg',
    prerequisites: 'Rescue Diver + 40 logged dives + medical clearance',
  },
]

export const specialtyCourses: SpecialtyCourse[] = [
  {
    name: 'Peak Performance Buoyancy',
    description: 'Master your buoyancy for better air consumption and control.',
    prerequisites: 'OWD or equivalent',
    image: '/images/buoyancy.jpeg',
  },
  {
    name: 'Deep Diver',
    description:
      'Extend your depth limit safely with proper techniques and planning.',
    prerequisites: 'AOWD or equivalent',
    image: '/images/deep.jpeg',
  },
  {
    name: 'Night Diver',
    description:
      'Experience the underwater world after dark and learn night navigation.',
    prerequisites: 'OWD or equivalent',
    image: '/images/night.jpeg',
  },
  {
    name: 'Enriched Air (Nitrox)',
    description:
      'Dive longer with enriched air while learning safety protocols.',
    prerequisites: 'OWD or equivalent',
    image: '/images/nitrox.jpeg',
  },
  {
    name: 'Wreck Diver',
    description:
      'Explore underwater wrecks while learning safety and navigation inside structures.',
    prerequisites: 'AOWD or equivalent',
    image: '/images/wreck.jpeg',
  },
]
