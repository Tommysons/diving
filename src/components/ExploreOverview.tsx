import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Kind = 'activities' | 'destinations'
export default function ExploreOverview({ locale, kind }: { locale: 'en' | 'ru'; kind: Kind }) {
  const ru = locale === 'ru', base = ru ? '/ru' : '', activities = kind === 'activities'
  const title = activities ? (ru ? 'Выберите своё приключение' : 'Find your ocean adventure') : (ru ? 'Куда приведёт вас океан?' : 'Where will the ocean take you?')
  const intro = activities ? (ru ? 'От первого вдоха через трубку до погружений с аквалангом — откройте океан в своём ритме.' : 'From your first breath through a snorkel to diving beneath the surface, explore the ocean your way.') : (ru ? 'Исследуйте подводный мир Таиланда и Мальдив вместе с LokaWndr.' : 'Explore the underwater worlds of Thailand and the Maldives with LokaWndr.')
  const cards = activities ? [
    { title: ru ? 'Дайвинг' : 'Scuba diving', description: ru ? 'Откройте подводный мир и найдите курс по своему уровню.' : 'Discover the underwater world and find a course for your level.', href: base + '/scubadivingcourses', image: '/images/generated/thailand-diving.webp' },
    { title: ru ? 'Снорклинг' : 'Snorkeling', description: ru ? 'Учитесь снорклингу и исследуйте океан у поверхности.' : 'Learn to snorkel and discover the ocean from the surface.', href: base + '/snorkeling', image: '/images/generated/snorkeling-ocean.webp' },
  ] : [
    { title: ru ? 'Таиланд · Ко Тао' : 'Thailand · Koh Tao', description: ru ? 'Узнайте больше о рифах и дайв-сайтах Ко Тао.' : 'Discover Koh Tao’s reefs and dive sites.', href: base + '/destinations/thailand', image: '/images/generated/thailand-diving.webp' },
    { title: ru ? 'Мальдивы · Vilu Reef' : 'Maldives · Vilu Reef', description: ru ? 'Исследуйте дайв-сайты и морскую жизнь атолла Дхаалу.' : 'Explore dive sites and marine life in Dhaalu Atoll.', href: base + '/destinations/maldives', image: '/images/generated/maldives-diving.webp' },
  ]
  return <><Header/><main lang={locale} className='bg-[#06283a] text-white'>
    <section className='relative isolate flex min-h-[440px] items-center overflow-hidden md:min-h-[520px]'><Image src={activities?'/images/generated/thailand-diving.webp':'/images/generated/contact-ocean.webp'} alt='' fill priority sizes='100vw' className='-z-20 object-cover'/><div className='absolute inset-0 -z-10 bg-gradient-to-r from-[#021d30]/95 via-[#03273a]/75 to-[#03273a]/30'/><div className='ocean-motion-layer' aria-hidden='true'><div className='ocean-motion-light'/><div className='ocean-motion-bubbles'><i/><i/><i/><i/><i/><i/></div></div><div className='relative z-[2] mx-auto w-full max-w-[1480px] px-6 py-20 md:px-10'><p className='text-xs font-bold tracking-[.2em] text-cyan-200'>LOKAWNDR · {activities ? (ru?'АКТИВНОСТИ':'ACTIVITIES') : (ru?'НАПРАВЛЕНИЯ':'DESTINATIONS')}</p><h1 className='mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl'>{title}</h1><p className='mt-6 max-w-xl text-lg leading-8 text-slate-100'>{intro}</p><p className='mt-5 text-xs text-white/75'>{ru?'Иллюстрация, созданная с помощью ИИ':'AI-generated illustration'}</p></div></section>
    <section className='mx-auto max-w-[1480px] px-6 py-16 md:px-10 md:py-20'><h2 className='text-3xl font-bold md:text-4xl'>{activities?(ru?'Выберите активность':'Choose an activity'):(ru?'Выберите направление':'Choose a destination')}</h2><div className='mt-8 grid gap-6 md:grid-cols-2'>{cards.map(card=><Link key={card.href} href={card.href} className='ocean-motion-card group relative flex min-h-[280px] items-end overflow-hidden rounded-3xl border border-white/20 p-7 md:min-h-[360px]'><Image src={card.image} alt='' fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover'/><div className='absolute inset-0 bg-gradient-to-t from-[#021d30]/95 via-[#021d30]/25 to-transparent'/><div className='relative'><h3 className='text-3xl font-bold'>{card.title}</h3><p className='mt-3 max-w-md leading-7 text-slate-100'>{card.description}</p><span className='mt-4 inline-flex items-center gap-2 font-bold text-cyan-100'>{ru?'Подробнее':'Explore'} <ArrowRight size={18}/></span></div></Link>)}</div><p className='mt-5 text-xs text-slate-400'>{ru?'Изображения созданы с помощью ИИ и служат иллюстрациями.':'Images are AI-generated illustrations.'}</p></section>
  </main><Footer/></>
}
