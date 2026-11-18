import MaldivesExperience from '@/components/MaldivesExperience'
export const metadata = {
  title: 'Мальдивы — дайвинг и снорклинг | LokaWndr',
  description: 'Откройте дайвинг, снорклинг и подводный мир Мальдив вместе с LokaWndr.',
  alternates: { canonical: '/ru/destinations/maldives', languages: { en: '/destinations/maldives', ru: '/ru/destinations/maldives' } },
}
export default function MaldivesPageRU() { return <MaldivesExperience locale='ru' /> }
