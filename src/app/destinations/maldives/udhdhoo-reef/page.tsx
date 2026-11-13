import type { Metadata } from 'next'
import UdhdhooReefGuide from '@/components/UdhdhooReefGuide'

const path = '/destinations/maldives/udhdhoo-reef'
export const metadata: Metadata = {
  title: 'Udhdhoo Reef Diving Guide | Maldives',
  description: 'Explore Udhdhoo Reef in the Maldives: coral, marine life, dive conditions and underwater photos from LokaWndr.',
  alternates: { canonical: path, languages: { en: path, ru: `/ru${path}` } },
  openGraph: { type: 'article', title: 'Udhdhoo Reef Diving Guide | LokaWndr', description: 'Discover Udhdhoo Reef, dive conditions and underwater photos from the Maldives.', url: path, images: [{ url: '/images/dive-sites/udhdhoo/reef-1.webp', alt: 'Coral reef and fish at Udhdhoo Reef in the Maldives' }] },
}
export default function UdhdhooReefPage() { return <UdhdhooReefGuide locale='en'/> }
