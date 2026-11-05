import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Fish, Waves, Play, Mail } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MaldivesExperience({ locale }: { locale: 'en' | 'ru' }) {
  const ru = locale === 'ru'
  const base = ru ? '/ru' : ''
  const t = ru ? {
    label: 'ГЛАВА 02 · МАЛЬДИВЫ', title: 'Мальдивы под водой', intro: 'Рифы, морские обитатели и встречи, которые остаются в памяти надолго.',
    discover: 'Исследовать океан', videos: 'Смотреть видео', why: 'Откройте Мальдивы с LokaWndr',
    whyText: 'Это новая глава истории LokaWndr: впечатления от дайвинга и снорклинга, подводные съёмки и знакомство с удивительной морской жизнью.',
    diving: 'Дайвинг', divingText: 'Исследуйте рифы и наблюдайте за морскими обитателями. Условия погружений зависят от атолла, сезона и конкретного дайв-сайта.',
    snorkeling: 'Снорклинг', snorkelingText: 'Даже с поверхности можно увидеть рифовых рыб, черепах и других обитателей океана. Всегда выбирайте подходящие условия и местного гида.',
    life: 'Встречи в океане', lifeText: 'Манты, китовые акулы, черепахи и скаты — часть удивительного подводного мира Мальдив. Наблюдения зависят от места и сезона и не гарантированы.',
    story: 'Истории из океана', storyText: 'Смотрите реальные подводные видео и следите за новыми путешествиями LokaWndr.',
    watch: 'YouTube LokaWndr', plan: 'Есть вопросы?', planText: 'Хотите узнать больше о дайвинге и снорклинге на Мальдивах? Напишите нам. Бронирование конкретных поездок пока не доступно.',
    contact: 'Связаться', other: 'Открыть Таиланд', note: 'Фотографии на странице пока взяты из существующей галереи LokaWndr; снимки с Мальдив будут добавлены позже.'
  } : {
    label: 'CHAPTER 02 · MALDIVES', title: 'The Maldives, Beneath the Surface', intro: 'Coral reefs, incredible marine life and ocean encounters worth remembering.',
    discover: 'Discover the Ocean', videos: 'Watch Our Videos', why: 'Discover the Maldives with LokaWndr',
    whyText: 'This is a new chapter in the LokaWndr journey: scuba diving and snorkeling experiences, underwater footage and stories about extraordinary marine life.',
    diving: 'Scuba Diving', divingText: 'Explore reefs and discover marine life. Dive conditions vary by atoll, season and individual dive site.',
    snorkeling: 'Snorkeling', snorkelingText: 'From the surface, you can encounter reef fish, turtles and other ocean life. Choose suitable conditions and local guidance.',
    life: 'Ocean Encounters', lifeText: 'Manta rays, whale sharks, turtles and rays are among the Maldives’ remarkable marine animals. Sightings depend on location and season and are never guaranteed.',
    story: 'Stories from the Ocean', storyText: 'Watch real underwater videos and follow the next LokaWndr adventures.',
    watch: 'LokaWndr on YouTube', plan: 'Questions about the Maldives?', planText: 'Get in touch to learn more about diving and snorkeling. Specific trip bookings are not available here yet.',
    contact: 'Get in Touch', other: 'Explore Thailand', note: 'Images currently use the existing LokaWndr gallery; Maldives-specific photos will be added next.'
  }
  return <><Header/><main className='bg-[#06283a] text-white'>
    <section className='relative isolate flex min-h-[530px] items-end overflow-hidden'>
      <Image src='/images/hero-about-a.webp' alt='LokaWndr underwater ocean photography' fill priority sizes='100vw' className='object-cover'/>
      <div className='absolute inset-0 bg-gradient-to-r from-[#032538]/90 via-[#032538]/55 to-[#032538]/20'/>
      <div className='absolute inset-0 bg-gradient-to-t from-[#032538] via-transparent to-transparent'/>
      <div className='relative mx-auto w-full max-w-[1480px] px-6 pb-20 pt-32 md:px-10'>
        <p className='text-xs font-bold tracking-[0.24em] text-cyan-100'>{t.label}</p>
        <h1 className='mt-4 max-w-3xl text-5xl font-extrabold leading-tight md:text-7xl'>{t.title}</h1>
        <p className='mt-5 max-w-2xl text-xl leading-relaxed text-slate-100'>{t.intro}</p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <a href='#explore' className='rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'>{t.discover}</a>
          <a href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-xl border border-white px-6 py-3 font-bold'><Play size={18}/>{t.videos}</a>
        </div>
      </div>
    </section>
    <section id='explore' className='mx-auto max-w-[1480px] px-6 py-16 md:px-10'>
      <h2 className='text-3xl font-extrabold md:text-4xl'>{t.why}</h2>
      <p className='mt-4 max-w-3xl text-lg leading-8 text-slate-200'>{t.whyText}</p>
      <div className='mt-10 grid gap-5 md:grid-cols-3'>
        {[
          {icon:<Waves size={30}/>,title:t.diving,body:t.divingText},
          {icon:<Fish size={30}/>,title:t.snorkeling,body:t.snorkelingText},
          {icon:<Fish size={30}/>,title:t.life,body:t.lifeText}
        ].map(card=><article key={card.title} className='rounded-2xl border border-white/15 bg-white/[.06] p-7'>
          <span className='text-cyan-200'>{card.icon}</span><h3 className='mt-4 text-2xl font-bold'>{card.title}</h3>
          <p className='mt-3 leading-7 text-slate-200'>{card.body}</p>
        </article>)}
      </div>
    </section>
    <section className='bg-[#03283b] px-6 py-16 md:px-10'>
      <div className='mx-auto grid max-w-[1480px] items-center gap-9 md:grid-cols-2'>
        <div className='relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20'>
          <Image src='/images/scuba-intro.webp' alt='Underwater diving photography from the LokaWndr gallery' fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover'/>
        </div>
        <div><h2 className='text-3xl font-extrabold md:text-4xl'>{t.story}</h2><p className='mt-5 max-w-xl leading-8 text-slate-200'>{t.storyText}</p>
          <a href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'><Play size={18}/>{t.watch}</a>
        </div>
      </div>
    </section>
    <section className='mx-auto max-w-[1480px] px-6 py-16 md:px-10'>
      <div className='rounded-2xl border border-white/20 bg-[#0a3c50] p-8 md:p-12'>
        <h2 className='text-3xl font-extrabold'>{t.plan}</h2><p className='mt-4 max-w-2xl leading-7 text-slate-200'>{t.planText}</p>
        <div className='mt-7 flex flex-wrap gap-4'>
          <Link href={base+'/contact'} className='inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'><Mail size={18}/>{t.contact}</Link>
          <Link href={base+'/destinations/thailand'} className='inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3 font-bold'>{t.other}<ArrowRight size={18}/></Link>
        </div>
      </div>
      <p className='mt-6 text-xs text-slate-400'>{t.note}</p>
    </section>
  </main><Footer/></>
}
