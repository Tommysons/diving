import MaldivesExperience from '@/components/MaldivesExperience'
export const metadata = {
  title: 'Dhaalu Atoll Diving Guide | Maldives Dive Sites',
  description: 'Explore diving in Dhaalu Atoll, Maldives: Wella Giri, Lhohi Caves, Yuki Reef, Udhdhoo Reef, conditions and underwater photos.',
  openGraph: { type: 'website', title: 'Dhaalu Atoll Diving Guide | Maldives Dive Sites', description: 'Explore Dhaalu Atoll reefs, dive sites and real underwater videos from LokaWndr.', url: '/destinations/maldives', images: [{ url: '/images/generated/maldives-diving.webp', alt: 'Scuba diver over a Maldives coral reef' }] },
  alternates: { canonical: '/destinations/maldives', languages: { en: '/destinations/maldives', ru: '/ru/destinations/maldives' } },
}
export default function MaldivesPage() { return <MaldivesExperience locale='en' /> }
