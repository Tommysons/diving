export interface CardData {
  id: string
  title: string
  image: string
  shortDesc: string
  fullDesc: string
  videoUrl: string
}

export interface LocalizedCards {
  en: CardData[]
  ru: CardData[]
}

export const cards: LocalizedCards = {
  en: [
    {
      id: 'diveSites',
      title: 'Dive sites',
      image: '/images/cpn/cpn1.jpg',
      shortDesc: 'Explore beautiful and diverse dive sites around the world.',
      fullDesc:
        'Coral Garden is a vibrant reef with amazing corals, tropical fish, and turtles. Visibility up to 30m. Currents are mild. Best to visit in summer.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'divingCourses',
      title: 'Scuba diving courses',
      image: '/images/courses/dsd.jpg',
      shortDesc:
        'Learn scuba diving with professional courses designed for all levels.',
      fullDesc:
        'Our scuba diving courses cover beginner to advanced levels with experienced instructors. Certification upon completion.',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    },
    // {
    //   id: 'freeDivingCourses',
    //   title: 'Freediving courses',
    //   image: '/images/freediving.jpg',
    //   shortDesc: 'Master breath-hold diving with expert freediving courses.',
    //   fullDesc:
    //     'Freediving courses teach breathing techniques and safety for breath-hold diving. Suitable for all skill levels.',
    //   videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    // },
  ],
  ru: [
    {
      id: 'diveSites',
      title: 'Места для дайвинга',
      image: '/images/cpn.jpg',
      shortDesc:
        'Исследуйте красивые и разнообразные места для дайвинга по всему миру.',
      fullDesc:
        'Сад кораллов — это яркий риф с потрясающими кораллами, тропическими рыбами и черепахами. Видимость до 30 м. Течения слабые. Лучше посещать летом.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'divingCourses',
      title: 'Курсы по дайвингу',
      image: '/images/scubadiving.avif',
      shortDesc:
        'Изучайте дайвинг с профессиональными курсами для всех уровней.',
      fullDesc:
        'Наши курсы по дайвингу охватывают от начального до продвинутого уровня с опытными инструкторами. Сертификация по завершении.',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    },
    // {
    //   id: 'freeDivingCourses',
    //   title: 'Курсы по фридайвингу',
    //   image: '/images/freediving.jpg',
    //   shortDesc: 'Освойте задержку дыхания с помощью курсов по фридайвингу.',
    //   fullDesc:
    //     'Курсы по фридайвингу обучают дыхательным техникам и безопасности при нырянии с задержкой дыхания. Подходит для всех уровней подготовки.',
    //   videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    // },
  ],
}

export interface ContactData {
  phone: string
  email: string
  address: string
  socialLinks: {
    platform: string
    url: string
  }[]
}

export const contacts: Record<'en' | 'ru', ContactData> = {
  en: {
    phone: '+66855147167',
    email: 'info@scubadiving.com',
    address: 'Koh Tao, Thailand',
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com/scubadiving' },
      { platform: 'Instagram', url: 'https://instagram.com/scubadiving' },
      { platform: 'YouTube', url: 'https://www.youtube.com/@lokatorist' },
    ],
  },
  ru: {
    phone: '+66855147167',
    email: 'info@scubadiving.ru',
    address: 'Koh Tao, Thailand',
    socialLinks: [
      { platform: 'YouTube', url: 'https://www.youtube.com/@lokatorist' },
      { platform: 'Instagram', url: 'https://instagram.com/scubadiving' },
      { platform: 'Telegram', url: 'https://t.me/scubadiving' },
    ],
  },
}
