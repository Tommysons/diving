export interface CardData {
  id: string
  title: string
  image: string
  shortDesc: string
  fullDesc: string
  videoUrl: string
}

export const cards: CardData[] = [
  {
    id: 'diveSites',
    title: 'Dive sites',
    image: '/images/cpn.jpg',
    shortDesc: 'Explore beautiful and diverse dive sites around the world.',
    fullDesc:
      'Coral Garden is a vibrant reef with amazing corals, tropical fish, and turtles. Visibility up to 30m. Currents are mild. Best to visit in summer.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 'divingCourses',
    title: 'Scuba diving courses',
    image: '/images/scubadiving.avif',
    shortDesc:
      'Learn scuba diving with professional courses designed for all levels.',
    fullDesc:
      'Our scuba diving courses cover beginner to advanced levels with experienced instructors. Certification upon completion.',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    id: 'freeDivingCourses',
    title: 'FreeDiving courses',
    image: '/images/freediving.jpg',
    shortDesc: 'Master breath-hold diving with expert freediving courses.',
    fullDesc:
      'FreeDiving courses teach breathing techniques and safety for breath-hold diving. Suitable for all skill levels.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
]

export interface ContactData {
  phone: string
  email: string
  address: string
  socialLinks: {
    platform: string
    url: string
  }[]
}

export const contacts: ContactData = {
  phone: '+1 234 567 890',
  email: 'info@scubadiving.com',
  address: '123 Ocean Drive, Dive City, Atlantis',
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/scubadiving' },
    { platform: 'Instagram', url: 'https://instagram.com/scubadiving' },
    { platform: 'Twitter', url: 'https://twitter.com/scubadiving' },
  ],
}
