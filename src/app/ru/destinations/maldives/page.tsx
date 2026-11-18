import MaldivesExperience from '@/components/MaldivesExperience'
export const metadata = {
  title: 'Дайвинг на атолле Даалу — дайв-сайты Мальдив | LokaWndr',
  description: 'Исследуйте дайв-сайты атолла Даалу: Wella Giri, Lhohi Caves, Yuki Reef, Udhdhoo Reef, условия погружений и фотографии.',
  openGraph: { type: 'website', title: 'Дайвинг и снорклинг на Мальдивах | LokaWndr', description: 'Рифы атолла Даалу, дайв-сайты и настоящие подводные видео LokaWndr.', url: '/ru/destinations/maldives', images: [{ url: '/images/generated/maldives-diving.webp', alt: 'Дайвер над коралловым рифом на Мальдивах' }] },
  alternates: { canonical: '/ru/destinations/maldives', languages: { en: '/destinations/maldives', ru: '/ru/destinations/maldives' } },
}
export default function MaldivesPageRU() { return <MaldivesExperience locale='ru' /> }
