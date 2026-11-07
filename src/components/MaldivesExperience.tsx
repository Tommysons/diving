import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Fish, Waves, Play, Mail } from 'lucide-react'
import LokaVideoSection, { maldivesVideos } from '@/components/LokaVideoSection'
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
    contact: 'Связаться', other: 'Места для дайвинга на Мальдивах', note: 'Фотографии на странице пока взяты из существующей галереи LokaWndr; снимки с Мальдив будут добавлены позже.'
  } : {
    label: 'CHAPTER 02 · MALDIVES', title: 'The Maldives, Beneath the Surface', intro: 'Coral reefs, incredible marine life and ocean encounters worth remembering.',
    discover: 'Discover the Ocean', videos: 'Watch Our Videos', why: 'Discover the Maldives with LokaWndr',
    whyText: 'This is a new chapter in the LokaWndr journey: scuba diving and snorkeling experiences, underwater footage and stories about extraordinary marine life.',
    diving: 'Scuba Diving', divingText: 'Explore reefs and discover marine life. Dive conditions vary by atoll, season and individual dive site.',
    snorkeling: 'Snorkeling', snorkelingText: 'From the surface, you can encounter reef fish, turtles and other ocean life. Choose suitable conditions and local guidance.',
    life: 'Ocean Encounters', lifeText: 'Manta rays, whale sharks, turtles and rays are among the Maldives’ remarkable marine animals. Sightings depend on location and season and are never guaranteed.',
    story: 'Stories from the Ocean', storyText: 'Watch real underwater videos and follow the next LokaWndr adventures.',
    watch: 'LokaWndr on YouTube', plan: 'Questions about the Maldives?', planText: 'Get in touch to learn more about diving and snorkeling. Specific trip bookings are not available here yet.',
    contact: 'Get in Touch', other: 'Explore Maldives Dive Sites', note: 'Images currently use the existing LokaWndr gallery; Maldives-specific photos will be added next.'
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
    <section id='azmee-corner' className='mx-auto max-w-[1480px] px-6 py-14 md:px-10'>
      <div className='overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#0a354b]'>
        <div className='grid gap-0 lg:grid-cols-2'>
          <div className='p-7 md:p-10'>
            <p className='text-xs font-bold uppercase tracking-[.2em] text-cyan-200'>{ru?'ПЕРВЫЙ ДАЙВ-САЙТ МАЛЬДИВ · DHAALU ATOLL':'FIRST MALDIVES DIVE SITE · DHAALU ATOLL'}</p>
            <h2 className='mt-4 text-4xl font-extrabold'>Azmee Corner</h2>
            <p className='mt-5 leading-8 text-slate-200'>{ru?'Азми Корнер — место для погружений у района Vilu Reef в атолле Дхаалу. Подводная стена, навесы и небольшие пещеры создают укрытия для скатов, мурен, скорпен и рифовых рыб.':'Azmee Corner is a wall dive in the Vilu Reef area of Dhaalu Atoll. Its reef wall, overhangs and caves provide habitat for stingrays, moray eels, scorpionfish and reef fish.'}</p>
            <p className='mt-4 leading-7 text-slate-300'>{ru?'Точные GPS-координаты дайв-сайта пока не подтверждены. Карта показывает расположенный поблизости остров Велавару (2,979702° с. ш., 73,015684° в. д.), а не точные координаты Азми Корнер.':'The dive site’s exact GPS coordinates have not yet been independently verified. The map is centered on nearby Velavaru Island (2.979702° N, 73.015684° E), not an exact Azmee Corner dive-site pin.'}</p>
            <a href='https://sundiving.com/sun-siyam-vilu-reef/' target='_blank' rel='noopener noreferrer' className='mt-6 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 underline underline-offset-4'>{ru?'Описание дайв-сайта от Sun Diving':'Dive-site description by Sun Diving'} <ArrowRight size={16}/></a>
          </div>
          <div className='relative min-h-[340px] bg-[#06283a]'>
            <iframe title={ru?'Карта района атолла Дхаалу':'Dhaalu Atoll region map'} loading='lazy' referrerPolicy='no-referrer-when-downgrade' className='absolute inset-0 h-full w-full border-0' src='https://www.openstreetmap.org/export/embed.html?bbox=72.975%2C2.956%2C73.041%2C3.025&layer=mapnik&marker=2.979702%2C73.015684'/>
            <span className='pointer-events-none absolute bottom-4 left-4 right-4 rounded-xl bg-[#03283b]/90 p-3 text-xs text-white'>{ru?'Маркер острова Велавару · Координаты Азми Корнер не подтверждены · Не для навигации':'Velavaru island reference pin · Azmee Corner position unverified · Not for navigation'}</span>
          </div>
        </div>
      </div>
    </section>
    <section id='dive-spots' className='mx-auto max-w-[1480px] px-6 py-16 md:px-10'>
      <p className='text-xs font-bold uppercase tracking-[.2em] text-cyan-200'>{ru ? 'ГИД ПО ДАЙВ-САЙТАМ' : 'DIVE DESTINATION GUIDE'}</p>
      <h2 className='mt-3 text-3xl font-extrabold md:text-4xl'>{ru ? 'Скоро на LokaWndr · Места для дайвинга на Мальдивах' : 'Coming to LokaWndr · Maldives Dive Destinations'}</h2>
      <p className='mt-4 max-w-3xl leading-8 text-slate-200'>{ru ? 'На Мальдивах множество атоллов: от спокойных рифов до каналов с сильным течением. Вот несколько известных районов для начала планирования.' : 'From sheltered reefs to current-swept channels, the Maldives offers different kinds of diving across its atolls. Start with these well-known areas.'}</p>
      <div className='mt-9 grid gap-5 md:grid-cols-2'>
        {[
          {name:ru?'Южный Ари (South Ari Atoll)':'South Ari Atoll',tag:ru?'Китовые акулы и рифы':'Whale sharks & reefs',detail:ru?'Известен встречами с китовыми акулами и разнообразными рифами. Наблюдения не гарантированы.':'Known for whale shark encounters and varied reef dives. Sightings are never guaranteed.'},
          {name:ru?'Северный Мале (North Malé Atoll)':'North Malé Atoll',tag:ru?'Рифы и затонувшие суда':'Reefs & wrecks',detail:ru?'Популярный район с рифами, затонувшими объектами и разнообразной морской жизнью.':'An accessible, popular area with reefs, wrecks and diverse marine life.'},
          {name:ru?'Южный Мале (South Malé Atoll)':'South Malé Atoll',tag:ru?'Каналы и дрейфовые погружения':'Channels & drift dives',detail:ru?'Канду и тила привлекают опытных дайверов. На некоторых сайтах бывает сильное течение.':'Channels and thilas appeal to experienced divers; some sites have strong currents.'},
          {name:ru?'Баа (Baa Atoll)':'Baa Atoll',tag:ru?'Манты и снорклинг':'Mantas & snorkeling',detail:ru?'Залив Ханифару известен сезонными скоплениями мант. В самом заливе дайвинг запрещён — посещение для снорклинга регулируется.':'Hanifaru Bay is known for seasonal manta gatherings. Scuba diving is prohibited inside the bay; regulated snorkeling visits are available.'},
          {name:ru?'Северный Ари (North Ari Atoll)':'North Ari Atoll',tag:ru?'Тила и рифовые акулы':'Thilas & reef sharks',detail:ru?'Fish Head — известный подводный риф с акулами и стаями рыб. Учитывайте глубину и течение.':'Fish Head is a well-known pinnacle for reef sharks and schooling fish; consider depth and currents.'}
        ].map((spot)=><article key={spot.name} className='rounded-2xl border border-white/15 bg-white/[.06] p-7'>
          <p className='text-xs font-bold uppercase tracking-widest text-cyan-200'>{spot.tag}</p><h3 className='mt-3 text-2xl font-bold'>{spot.name}</h3><p className='mt-3 leading-7 text-slate-200'>{spot.detail}</p>
        </article>)}
      </div>
      <p className='mt-7 max-w-4xl text-sm leading-6 text-slate-400'>{ru?'Сезон, погода и течения влияют на выбор дайв-сайта. Выбирайте погружения в рамках своей подготовки и с местным оператором.':'Season, weather and currents affect site selection. Dive within your training and follow a qualified local operator.'}</p>
      <p className='mt-4 text-sm text-cyan-100'>{ru?'Источники:':'Sources:'} <a className='underline' href='https://www.padi.com/diving-in/maldives/' target='_blank' rel='noopener noreferrer'>PADI Maldives</a> · <a className='underline' href='https://blog.padi.com/best-maldives-atolls-scuba-diving/' target='_blank' rel='noopener noreferrer'>PADI Atoll Guide</a> · <a className='underline' href='https://www.padi.com/dive-site/maldives/hanifaru-bay/' target='_blank' rel='noopener noreferrer'>Hanifaru Bay</a></p>
    </section>
    <LokaVideoSection locale={locale} videos={maldivesVideos} title={ru?'Видео о Мальдивах':'Snorkeling & Diving Videos from the Maldives'}/>
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
          <a href={base+'/destinations/thailand'} className='inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3 font-bold'>{ru?'Исследовать Таиланд':'Explore Thailand'}<ArrowRight size={18}/></a>
        </div>
      </div>
      <p className='mt-6 text-xs text-slate-400'>{t.note}</p>
    </section>
  </main><Footer/></>
}
