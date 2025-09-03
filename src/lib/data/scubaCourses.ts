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

// English scuba courses
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

// Russian scuba courses
export const scubaCoursesRU: ScubaCourse[] = [
  {
    name: 'Открой Подводное Плавание (DSD)',
    description:
      'Попробуйте дайвинг без сертификации. Отлично для новичков, желающих испытать погружение под профессиональным наблюдением.',
    maxDepth: '12 метров',
    image: '/images/dsd.jpeg',
  },
  {
    name: 'Open Water Diver (OWD)',
    description:
      'Ваша первая полная сертификация. Изучите базовые навыки и теорию дайвинга. Погружайтесь с напарником в любой точке мира.',
    maxDepth: '18 метров',
    image: '/images/owd.jpeg',
  },
  {
    name: 'Advanced Open Water Diver (AOWD)',
    description:
      'Улучшите свои навыки с навигацией, глубокими погружениями и 3 другими специальными погружениями.',
    maxDepth: '30 метров',
    image: '/images/awd.jpeg',
    prerequisites: 'OWD',
  },
  {
    name: 'Rescue Diver',
    description:
      'Научитесь предотвращать и управлять аварийными ситуациями при дайвинге. Развивает уверенность и лидерство.',
    maxDepth: '30 метров',
    image: '/images/rescue.jpeg',
    prerequisites: 'AOWD + сертификация EFR/CPR',
  },
  {
    name: 'Divemaster',
    description:
      'Первый профессиональный уровень. Руководите сертифицированными дайверами и помогайте инструкторам.',
    maxDepth: '40 метров',
    image: '/images/dm.jpeg',
    prerequisites:
      'Rescue Diver + 40 погружений в журнале + медицинское разрешение',
  },
]

// English specialty courses
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

// Russian specialty courses
export const specialtyCoursesRU: SpecialtyCourse[] = [
  {
    name: 'Совершенная Буйность (Peak Performance Buoyancy)',
    description:
      'Освойте контроль плавучести для лучшего расхода воздуха и управления телом под водой.',
    prerequisites: 'OWD или эквивалент',
    image: '/images/buoyancy.jpeg',
  },
  {
    name: 'Глубоководный Дайвинг (Deep Diver)',
    description:
      'Безопасно увеличьте предел глубины с правильными техниками и планированием.',
    prerequisites: 'AOWD или эквивалент',
    image: '/images/deep.jpeg',
  },
  {
    name: 'Ночное Погружение (Night Diver)',
    description: 'Исследуйте подводный мир ночью и изучите ночную навигацию.',
    prerequisites: 'OWD или эквивалент',
    image: '/images/night.jpeg',
  },
  {
    name: 'Обогащенный Воздух (Nitrox)',
    description:
      'Погружайтесь дольше с обогащенным воздухом, изучая протоколы безопасности.',
    prerequisites: 'OWD или эквивалент',
    image: '/images/nitrox.jpeg',
  },
  {
    name: 'Исследование Кораблекрушений (Wreck Diver)',
    description:
      'Изучайте подводные кораблекрушения, осваивая безопасность и навигацию внутри конструкций.',
    prerequisites: 'AOWD или эквивалент',
    image: '/images/wreck.jpeg',
  },
]
