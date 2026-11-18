import MaldivesExperience from '@/components/MaldivesExperience'
export const metadata = {
  title: 'Maldives Diving & Snorkeling | LokaWndr',
  description: 'Discover scuba diving, snorkeling and ocean encounters in the Maldives with LokaWndr.',
  openGraph: { type: 'website', title: 'Maldives Diving & Snorkeling | LokaWndr', description: 'Explore Dhaalu Atoll reefs, dive sites and real underwater videos from LokaWndr.', url: '/destinations/maldives', images: [{ url: '/images/generated/maldives-diving.webp', alt: 'Scuba diver over a Maldives coral reef' }] },
  alternates: { canonical: '/destinations/maldives', languages: { en: '/destinations/maldives', ru: '/ru/destinations/maldives' } },
}
export default function MaldivesPage() { return <MaldivesExperience locale='en' /> }
