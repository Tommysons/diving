import type { Metadata } from 'next'
import FunDiving from '@/components/FunDiving'
export const metadata: Metadata = { title: 'Fun diving — Nitrox & equipment rental', description: 'Guided fun dives, Nitrox and equipment rental. Contact us for pricing.', alternates: { canonical: '/fun-diving', languages: { en: '/fun-diving', ru: '/ru/fun-diving' } } }
export default function Page() { return <FunDiving locale='en'/> }
