import type { Metadata } from 'next'
import FunDiving from '@/components/FunDiving'
export const metadata: Metadata = { title: 'Фан-дайвинг — Nitrox и аренда снаряжения', description: 'Погружения с гидом, Nitrox и аренда снаряжения. Стоимость по запросу.', alternates: { canonical: '/ru/fun-diving', languages: { en: '/fun-diving', ru: '/ru/fun-diving' } } }
export default function Page() { return <FunDiving locale='ru'/> }
