import type { Metadata } from 'next'
import UdhdhooReefGuide from '@/components/UdhdhooReefGuide'

const path = '/destinations/maldives/udhdhoo-reef'
export const metadata: Metadata = {
  title: 'Дайвинг на Udhdhoo Reef | Мальдивы',
  description: 'Дайв-сайт Udhdhoo Reef на Мальдивах: кораллы, морские обитатели, условия погружения и подводные фотографии LokaWndr.',
  alternates: { canonical: `/ru${path}`, languages: { en: path, ru: `/ru${path}` } },
  openGraph: { type: 'article', title: 'Дайвинг на Udhdhoo Reef | LokaWndr', description: 'Узнайте об Udhdhoo Reef, условиях погружения и посмотрите подводные фотографии.', url: `/ru${path}`, images: [{ url: '/images/dive-sites/udhdhoo/reef-1.webp', alt: 'Коралловый риф и рыбы на Udhdhoo Reef на Мальдивах' }] },
}
export default function UdhdhooReefPageRU() { return <UdhdhooReefGuide locale='ru'/> }
