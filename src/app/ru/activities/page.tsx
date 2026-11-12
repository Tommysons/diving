import type { Metadata } from 'next'
import ExploreOverview from '@/components/ExploreOverview'
export const metadata: Metadata = { title: 'Океанские активности', description: 'Курсы дайвинга и снорклинг вместе с LokaWndr.', alternates: { canonical: '/ru/activities', languages: { en: '/activities', ru: '/ru/activities' } } }
export default function Page() { return <ExploreOverview locale='ru' kind='activities'/> }
