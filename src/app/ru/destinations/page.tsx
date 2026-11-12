import type { Metadata } from 'next'
import ExploreOverview from '@/components/ExploreOverview'
export const metadata: Metadata = { title: 'Направления для дайвинга', description: 'Дайвинг и снорклинг в Таиланде и на Мальдивах.', alternates: { canonical: '/ru/destinations', languages: { en: '/destinations', ru: '/ru/destinations' } } }
export default function Page() { return <ExploreOverview locale='ru' kind='destinations'/> }
