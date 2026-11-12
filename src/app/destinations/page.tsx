import type { Metadata } from 'next'
import ExploreOverview from '@/components/ExploreOverview'
export const metadata: Metadata = { title: 'Diving destinations', description: 'Explore diving and snorkeling in Thailand and the Maldives.', alternates: { canonical: '/destinations', languages: { en: '/destinations', ru: '/ru/destinations' } } }
export default function Page() { return <ExploreOverview locale='en' kind='destinations'/> }
