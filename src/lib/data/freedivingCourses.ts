// lib/data/freedivingCourses.ts

export interface FreedivingCourse {
  name: string
  description: string
  maxDepth: string
  prerequisites: string
  image: string
}

// English freediving courses
export const freedivingCourses: FreedivingCourse[] = [
  {
    name: 'Freediver',
    description:
      'The entry-level course that teaches basic theory, breathing techniques, and static/dynamic apnea in confined water.',
    maxDepth: 'Up to 16 meters',
    prerequisites: 'Comfortable swimmer, 12 years or older',
    image: '/images/freediver.jpeg',
  },
  {
    name: 'Advanced Freediver',
    description:
      'Builds on Freediver skills, includes training for deeper dives, longer breath holds, and better technique.',
    maxDepth: 'Up to 24-30 meters',
    prerequisites: 'PADI Freediver certification or equivalent',
    image: '/images/advancedfreediver.jpeg',
  },
  {
    name: 'Master Freediver',
    description:
      'Advanced theory and physical conditioning to improve personal performance and support others.',
    maxDepth: 'Up to 40 meters or more',
    prerequisites: 'PADI Advanced Freediver certification or equivalent',
    image: '/images/masterfreediver.jpeg',
  },
]

// Russian freediving courses
export const freedivingCoursesRU: FreedivingCourse[] = [
  {
    name: 'Фридайвер',
    description:
      'Начальный курс, который обучает базовой теории, дыхательным техникам и статической/динамической апноэ в ограниченной воде.',
    maxDepth: 'До 16 метров',
    prerequisites: 'Уверенный пловец, 12 лет и старше',
    image: '/images/freediver.jpeg',
  },
  {
    name: 'Продвинутый Фридайвер',
    description:
      'Развивает навыки фридайвинга, включает тренировки для более глубоких погружений, длинных задержек дыхания и улучшения техники.',
    maxDepth: 'До 24-30 метров',
    prerequisites: 'Сертификат PADI Freediver или эквивалент',
    image: '/images/advancedfreediver.jpeg',
  },
  {
    name: 'Мастер Фридайвера',
    description:
      'Продвинутая теория и физическая подготовка для улучшения личной производительности и поддержки других.',
    maxDepth: 'До 40 метров и более',
    prerequisites: 'Сертификат PADI Advanced Freediver или эквивалент',
    image: '/images/masterfreediver.jpeg',
  },
]
