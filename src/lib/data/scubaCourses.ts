// lib/data/scubaCourses.ts

export interface ScubaCourse {
  name: string
  slug: string
  description: string
  maxDepth: string
  image: string
  prerequisites?: string
  duration?: string
  program?: string[]
  price?: string
}

export interface SpecialtyCourse {
  name: string
  slug: string
  description: string
  prerequisites: string
  image: string
  duration?: string
  program?: string[]
  price?: string
}

// =======================
// English scuba courses
// =======================
export const scubaCourses: ScubaCourse[] = [
  {
    name: 'Discover Scuba Diving (DSD)',
    slug: 'discover-scuba-diving-dsd',
    description:
      'Try scuba diving for the first time under the guidance of professional instructors. Perfect for curious beginners.',
    maxDepth: '12 meters',
    image: '/images/courses/dsd.jpg',
    price: '2,500฿',
    duration: '1 day',
    program: [
      'Introduction and theory session',
      'Equipment briefing and practice in shallow water',
      'Supervised open water dive with instructor',
      'Debrief and certification of participation',
    ],
  },
  {
    name: 'Open Water Diver (OWD)',
    slug: 'open-water-diver-owd',
    description:
      'Complete your first full scuba certification. Learn essential skills, safety protocols, and dive theory.',
    maxDepth: '18 meters',
    image: '/images/owd.jpg',
    price: '11,000฿ ',
    duration: '3-4 days',
    program: [
      'Knowledge development (online or classroom)',
      'Confined water skills practice',
      'Open water dives under instructor supervision',
      'Final evaluation and certification',
    ],
  },
  {
    name: 'Advanced Open Water Diver (AOWD)',
    slug: 'advanced-open-water-diver-aowd',
    description:
      'Take your diving to the next level with deep dives, navigation skills, and specialty dives.',
    maxDepth: '30 meters',
    image: '/images/awd.jpg',
    price: '10,000฿',
    prerequisites: 'OWD',
    duration: '2-3 days',
    program: [
      'Deep dive adventure',
      'Underwater navigation',
      'Night or wreck dive (specialty)',
      'Skill review and certification',
    ],
  },
  {
    name: 'Rescue Diver',
    slug: 'rescue-diver',
    description:
      'Learn how to prevent and handle diving emergencies. Develop leadership and problem-solving skills.',
    maxDepth: '30 meters',
    image: '/images/rescue.jpeg',
    price: '11,000฿',
    prerequisites: 'AOWD + EFR/CPR certification',
    duration: '3 days',
    program: [
      'Self-rescue techniques',
      'Assisting other divers',
      'Emergency management scenarios',
      'Practical rescue exercises and final evaluation',
    ],
  },
  {
    name: 'Divemaster',
    slug: 'divemaster',
    description:
      'First professional level for leading certified divers and assisting instructors. Develop professional skills and experience guiding divers safely.',
    maxDepth: '40 meters',
    image: '/images/ddd.jpg',
    price: '33,000฿',
    prerequisites: 'Rescue Diver + 40 logged dives + medical clearance',
    duration: '2-4 weeks',
    program: [
      'Leadership and supervision training',
      'Dive site management and planning',
      'Assisting instructors during courses',
      'Evaluations and professional certification',
    ],
  },
]

// =======================
// English specialty courses
// =======================
export const specialtyCourses: SpecialtyCourse[] = [
  {
    name: 'Peak Performance Buoyancy',
    slug: 'peak-performance-buoyancy',
    description:
      'Master your buoyancy for better air consumption, smoother dives, and precise underwater control.',
    prerequisites: 'OWD or equivalent',
    image: '/images/buoyancy.jpg',
    price: '฿5,500',
    duration: '1 day',
    program: [
      'Buoyancy theory',
      'Practical skills in confined water',
      'Open water exercises',
      'Performance review and certification',
    ],
  },
  {
    name: 'Deep Diver',
    slug: 'deep-diver',
    description:
      'Safely extend your depth limit while learning proper planning, gas management, and emergency procedures.',
    prerequisites: 'AOWD or equivalent',
    image: '/images/eee.jpg',
    price: '฿8,500',
    duration: '1-2 days',
    program: [
      'Dive planning for deep dives',
      'Deep dive in open water',
      'Safety procedures for deep diving',
      'Certification and evaluation',
    ],
  },
  {
    name: 'Night Diver',
    slug: 'night-diver',
    description:
      'Experience the underwater world after dark and learn night diving navigation and safety.',
    prerequisites: 'OWD or equivalent',
    image: '/images/night.jpg',
    price: '฿฿7,000',
    duration: '1 day',
    program: [
      'Night dive preparation',
      'Underwater navigation in low light',
      'Safety procedures and buddy checks',
      'Certification of completion',
    ],
  },
  {
    name: 'Enriched Air (Nitrox)',
    slug: 'enriched-air-nitrox',
    description:
      'Dive longer and safer using enriched air while learning proper planning and safety protocols.',
    prerequisites: 'OWD or equivalent',
    image: '/images/nitrox.jpg',
    price: '7,500฿',
    duration: '1 day',
    program: [
      'Nitrox theory and calculations',
      'Dive planning with enriched air',
      'Open water dive with Nitrox',
      'Certification and practical review',
    ],
  },
  {
    name: 'Wreck Diver',
    slug: 'wreck-diver',
    description:
      'Explore underwater wrecks while learning safety, navigation, and penetration techniques.',
    prerequisites: 'AOWD or equivalent',
    image: '/images/wreck.jpg',
    price: '฿8,500',
    duration: '1-2 days',
    program: [
      'Wreck dive planning',
      'Safety and navigation techniques',
      'Wreck penetration exercises',
      'Certification and evaluation',
    ],
  },
]

// =======================
// Russian scuba courses
// =======================
export const scubaCoursesRU: ScubaCourse[] = [
  {
    name: 'Открой Подводное Плавание (DSD)',
    slug: 'otkroy-podvodnoe-plavanie-dsd',
    description:
      'Попробуйте дайвинг впервые под руководством профессиональных инструкторов. Отлично для начинающих.',
    maxDepth: '12 метров',
    image: '/images/courses/dsd.jpg',
    price: '2,500฿',
    duration: '1 день',
    program: [
      'Введение и теория',
      'Знакомство с оборудованием и практика в мелкой воде',
      'Контролируемое погружение с инструктором',
      'Обсуждение и сертификат участия',
    ],
  },
  {
    name: 'Open Water Diver (OWD)',
    slug: 'open-water-diver-owd',
    description:
      'Получите вашу первую полную сертификацию дайвера. Изучите навыки, правила безопасности и теорию погружений.',
    maxDepth: '18 метров',
    image: '/images/owd.jpg',
    price: '11,000฿ ',
    duration: '3-4 дня',
    program: [
      'Теория (онлайн или класс)',
      'Практика в мелкой воде',
      'Погружения под руководством инструктора',
      'Итоговая проверка и сертификация',
    ],
  },
  {
    name: 'Advanced Open Water Diver (AOWD)',
    slug: 'advanced-open-water-diver-aowd',
    description:
      'Поднимите свои навыки дайвинга на новый уровень: глубокие погружения, навигация и специальные погружения.',
    maxDepth: '30 метров',
    image: '/images/awd.jpg',
    price: '10,000฿',
    prerequisites: 'OWD',
    duration: '2-3 дня',
    program: [
      'Глубокое погружение',
      'Подводная навигация',
      'Ночное или специальное погружение',
      'Проверка навыков и сертификат',
    ],
  },
  {
    name: 'Rescue Diver',
    slug: 'rescue-diver',
    description:
      'Научитесь предотвращать и управлять аварийными ситуациями при дайвинге. Развивайте лидерские навыки.',
    maxDepth: '30 метров',
    image: '/images/rescue.jpeg',
    price: '11,000฿',
    prerequisites: 'AOWD + сертификация EFR/CPR',
    duration: '3 дня',
    program: [
      'Техника самоспасения',
      'Помощь другим дайверам',
      'Сценарии управления авариями',
      'Практические упражнения и итоговая проверка',
    ],
  },
  {
    name: 'Divemaster',
    slug: 'divemaster',
    description:
      'Первый профессиональный уровень: руководите сертифицированными дайверами и помогайте инструкторам.',
    maxDepth: '40 метров',
    image: '/images/ddd.jpg',
    price: '33,000฿',
    prerequisites: 'Rescue Diver + 40 погружений + медицинское разрешение',
    duration: '2-4 недели',
    program: [
      'Обучение лидерству и контролю',
      'Планирование и управление погружениями',
      'Помощь инструкторам на курсах',
      'Итоговая проверка и профессиональная сертификация',
    ],
  },
]

// =======================
// Russian specialty courses
// =======================
export const specialtyCoursesRU: SpecialtyCourse[] = [
  {
    name: 'Совершенная Буйность (Peak Performance Buoyancy)',
    slug: 'sovershennaya-buynost',
    description:
      'Освойте контроль плавучести для экономии воздуха и точного управления под водой.',
    prerequisites: 'OWD или эквивалент',
    image: '/images/buoyancy.jpg',
    price: '฿5,500',
    duration: '1 день',
    program: [
      'Теория контроля плавучести',
      'Практика в мелкой воде',
      'Погружение в открытой воде',
      'Проверка навыков и сертификация',
    ],
  },
  {
    name: 'Глубоководный Дайвинг (Deep Diver)',
    slug: 'glubokovodnyy-dyving',
    description:
      'Безопасно увеличьте предел глубины с правильными техниками и планированием погружений.',
    prerequisites: 'AOWD или эквивалент',
    image: '/images/eee.jpg',
    price: '฿8,500',
    duration: '1-2 дня',
    program: [
      'Планирование глубоких погружений',
      'Глубокое погружение',
      'Безопасность и процедуры',
      'Сертификация и проверка',
    ],
  },
  {
    name: 'Ночное Погружение (Night Diver)',
    slug: 'nochnoye-pogruzheniye',
    description:
      'Исследуйте подводный мир ночью и изучите ночную навигацию и правила безопасности.',
    prerequisites: 'OWD или эквивалент',
    image: '/images/night.jpg',
    price: '฿฿7,000',
    duration: '1 день',
    program: [
      'Подготовка к ночному погружению',
      'Навигация в условиях низкой освещенности',
      'Проверка безопасности и напарника',
      'Сертификация',
    ],
  },
  {
    name: 'Обогащенный Воздух (Nitrox)',
    slug: 'obogashchennyy-vozdukh-nitrox',
    description:
      'Погружайтесь дольше и безопаснее с обогащенным воздухом, изучая правильное планирование и безопасность.',
    prerequisites: 'OWD или эквивалент',
    image: '/images/nitrox.jpg',
    price: '7,500฿',
    duration: '1 день',
    program: [
      'Теория Nitrox и расчеты',
      'Планирование погружения с Nitrox',
      'Открытое водное погружение с Nitrox',
      'Сертификация и проверка',
    ],
  },
  {
    name: 'Исследование Кораблекрушений (Wreck Diver)',
    slug: 'issledovaniye-korablekrusheniy',
    description:
      'Изучайте подводные кораблекрушения с безопасностью и навигацией внутри конструкций.',
    prerequisites: 'AOWD или эквивалент',
    image: '/images/wreck.jpg',
    price: '฿8,500',
    duration: '1-2 дня',
    program: [
      'Планирование погружения к кораблекрушению',
      'Навигация и безопасность',
      'Практика проникновения внутрь',
      'Сертификация и проверка',
    ],
  },
]
