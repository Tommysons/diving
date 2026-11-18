import MaldivesExperience from '@/components/MaldivesExperience'
export const metadata = {
  title: 'Maldives Diving & Snorkeling | LokaWndr',
  description: 'Discover scuba diving, snorkeling and ocean encounters in the Maldives with LokaWndr.',
  alternates: { canonical: '/destinations/maldives', languages: { en: '/destinations/maldives', ru: '/ru/destinations/maldives' } },
}
export default function MaldivesPage() { return <MaldivesExperience locale='en' /> }
