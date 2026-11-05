'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  const pathname = usePathname() || '/'
  const ru = pathname.startsWith('/ru')
  const prefix = ru ? '/ru' : ''
  const t = ru
    ? { eyebrow: 'ДАЙВИНГ · СНОРКЛИНГ · ПУТЕШЕСТВИЯ', title: 'Открой подводный мир с LokaWndr', subtitle: 'Дайвинг, снорклинг и истории об океане из удивительных уголков мира.', explore: 'Наши направления', stories: 'Смотреть истории', destinations: 'Направления', destinationText: 'Два места, множество подводных открытий.', thailand: 'Таиланд', thailandText: 'Ко Тао — где началась эта глава. Дайв-сайты, обучение и островная жизнь.', maldives: 'Мальдивы', maldivesText: 'Новая глава: манты, китовые акулы, рифы и снорклинг.', discover: 'Узнать больше', adventures: 'Исследуйте океан', diving: 'Дайвинг', divingText: 'Дайв-сайты, курсы и истории из-под воды.', snorkeling: 'Снорклинг', snorkelingText: 'Морская жизнь, рифы и встречи с океаном.', latest: 'Истории из-под воды', latestText: 'Реальные путешествия, наблюдения и видео.', blog: 'Читать блог', videos: 'Смотреть видео' }
    : { eyebrow: 'DIVING · SNORKELING · OCEAN STORIES', title: 'Explore the Underwater World with LokaWndr', subtitle: 'Scuba diving, snorkeling and real ocean adventures from extraordinary destinations.', explore: 'Explore Destinations', stories: 'Watch Our Stories', destinations: 'Our Destinations', destinationText: 'Two destinations. Countless underwater discoveries.', thailand: 'Thailand', thailandText: 'Koh Tao — where this chapter began. Dive sites, courses and island life.', maldives: 'Maldives', maldivesText: 'A new chapter: manta rays, whale sharks, reefs and snorkeling.', discover: 'Explore Destination', adventures: 'Discover the Ocean', diving: 'Scuba Diving', divingText: 'Dive sites, courses and stories from beneath the surface.', snorkeling: 'Snorkeling', snorkelingText: 'Marine life, reefs and unforgettable ocean encounters.', latest: 'Dive & Snorkel Stories', latestText: 'Real experiences, underwater footage and destination guides.', blog: 'Read the Blog', videos: 'Watch Videos' }

  return (
    <>
      <Header />
      <main className='bg-[#061c2a] text-white'>
        <section className='relative isolate flex min-h-[76vh] items-center overflow-hidden'>
          <Image src='/images/hero-about-a.webp' alt='Underwater scuba diving adventure' fill priority fetchPriority='high' sizes='100vw' className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#031826]/95 via-[#052b40]/75 to-[#031826]/20' />
          <div className='relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10'>
            <p className='mb-5 text-xs font-bold tracking-[0.3em] text-cyan-200'>{t.eyebrow}</p>
            <h1 className='max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl'>{t.title}</h1>
            <p className='mt-6 max-w-xl text-lg leading-relaxed text-slate-100'>{t.subtitle}</p>
            <div className='mt-9 flex flex-wrap gap-4'>
              <Link href='#destinations' className='rounded-xl bg-white px-6 py-3 font-bold text-[#062536] transition hover:bg-cyan-100'>{t.explore}</Link>
              <Link href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='rounded-xl border border-white/80 px-6 py-3 font-bold text-white transition hover:bg-white/15'>{t.stories}</Link>
            </div>
          </div>
        </section>
        <section id='destinations' className='mx-auto max-w-7xl px-6 py-20 md:px-10'>
          <div className='mb-9'>
            <h2 className='text-3xl font-bold md:text-4xl'>{t.destinations}</h2>
            <p className='mt-2 text-slate-300'>{t.destinationText}</p>
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            {[
              { title: t.thailand, text: t.thailandText, image: '/images/cpn6a.webp', href: prefix + '/destinations/thailand', chapter: '01' },
              { title: t.maldives, text: t.maldivesText, image: '/images/hero-about-a.webp', href: prefix + '/destinations/maldives', chapter: '02' },
            ].map((place) => (
              <Link key={place.chapter} href={place.href} className='group relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-white/25 p-8'>
                <Image src={place.image} alt={place.title} fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover transition duration-500 group-hover:scale-105' />
                <div className='absolute inset-0 bg-gradient-to-t from-[#021622]/95 via-[#021622]/45 to-transparent' />
                <div className='relative'>
                  <p className='text-xs font-bold tracking-[0.25em] text-cyan-200'>CHAPTER {place.chapter}</p>
                  <h3 className='mt-2 text-4xl font-extrabold'>{place.title}</h3>
                  <p className='mt-3 max-w-sm text-slate-100'>{place.text}</p>
                  <span className='mt-5 inline-block rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#062536]'>{t.discover} →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className='bg-[#092b3d] px-6 py-20 md:px-10'>
          <div className='mx-auto max-w-7xl'>
            <h2 className='text-3xl font-bold md:text-4xl'>{t.adventures}</h2>
            <div className='mt-8 grid gap-5 md:grid-cols-2'>
              <Link href={prefix + '/scubadivingcourses'} className='rounded-2xl border border-white/15 bg-white/10 p-8 transition hover:bg-white/15'>
                <h3 className='text-2xl font-bold'>{t.diving}</h3><p className='mt-3 text-slate-200'>{t.divingText}</p>
              </Link>
              <Link href={prefix + '/destinations/maldives'} className='rounded-2xl border border-white/15 bg-white/10 p-8 transition hover:bg-white/15'>
                <h3 className='text-2xl font-bold'>{t.snorkeling}</h3><p className='mt-3 text-slate-200'>{t.snorkelingText}</p>
              </Link>
            </div>
          </div>
        </section>
        <section className='mx-auto max-w-7xl px-6 py-20 md:px-10'>
          <h2 className='text-3xl font-bold md:text-4xl'>{t.latest}</h2>
          <p className='mt-3 text-slate-300'>{t.latestText}</p>
          <div className='mt-8 flex flex-wrap gap-4'>
            <Link href={prefix + '/blog'} className='rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'>{t.blog}</Link>
            <Link href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='rounded-xl border border-white/50 px-6 py-3 font-bold'>{t.videos}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
