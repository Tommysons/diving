export const scubaCourses = [
  {
    name: 'Discover Scuba Diving (DSD)',
    description:
      'An introductory experience for beginners. Not a certification course.',
    maxDepth: '12m / 40ft',
  },
  {
    name: 'Open Water Diver',
    description:
      'First full certification allowing independent diving with a buddy.',
    maxDepth: '18m / 60ft',
  },
  {
    name: 'Advanced Open Water Diver',
    description: 'Builds experience with deep and navigation dives.',
    maxDepth: '30m / 100ft',
  },
  {
    name: 'Rescue Diver',
    description:
      'Teaches self-rescue and how to assist others in emergency situations.',
    maxDepth: '30m / 100ft',
  },
  {
    name: 'Divemaster',
    description:
      'First professional level. Allows supervising divers and assisting instructors.',
    maxDepth: '40m / 130ft',
  },
]

export const specialtyCourses = [
  {
    name: 'Deep Diver',
    description: 'Learn to dive to depths of up to 40 meters.',
    prerequisites: 'Advanced Open Water Diver',
  },
  {
    name: 'Nitrox / Enriched Air Diver',
    description: 'Stay down longer with enriched air (nitrox).',
    prerequisites: 'Open Water Diver',
  },
  {
    name: 'Wreck Diver',
    description: 'Explore sunken ships and other structures safely.',
    prerequisites: 'Advanced Open Water Diver',
  },
  {
    name: 'Night Diver',
    description: 'Dive safely after dark using lights and signals.',
    prerequisites: 'Open Water Diver',
  },
  {
    name: 'Peak Performance Buoyancy',
    description: 'Refine your buoyancy skills for better control underwater.',
    prerequisites: 'Open Water Diver',
  },
  {
    name: 'Underwater Naturalist',
    description: 'Learn more about marine life and ecosystems.',
    prerequisites: 'Open Water Diver',
  },
]
