import type { Metadata } from 'next'
import ExploreOverview from '@/components/ExploreOverview'
export const metadata: Metadata = { title: 'Ocean activities', description: 'Explore scuba diving courses and snorkeling with LokaWndr.', alternates: { canonical: '/activities', languages: { en: '/activities', ru: '/ru/activities' } } }
export default function Page() { return <ExploreOverview locale='en' kind='activities'/> }
