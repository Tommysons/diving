'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Fish, Waves, Play, Mail } from 'lucide-react'
import LokaVideoSection, { maldivesVideos } from '@/components/LokaVideoSection'
import ViluAtlas, { maldivesSites, maldivesDetails } from '@/components/ViluAtlas'
import { UdhdhooCover, UdhdhooGallery } from '@/components/UdhdhooGallery'
import { maldivesGuideSites } from '@/lib/data/maldivesGuides'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DivingTankIcon, SnorkelMaskIcon } from '@/components/ActivityIcons'

export default function MaldivesExperience({ locale }: { locale: 'en' | 'ru' }) {
  const ru = locale === 'ru'
  const base = ru ? '/ru' : ''
  const t = ru ? {
    label: 'ГЛАВА 02 · МАЛЬДИВЫ', title: 'Мальдивы под водой', intro: 'Рифы, морские обитатели и встречи, которые остаются в памяти надолго.',
    discover: 'Исследовать дайв-сайты', videos: 'Смотреть видео', why: 'Откройте Мальдивы с LokaWndr',
    whyText: 'Это новая глава истории LokaWndr: впечатления от дайвинга и снорклинга, подводные съёмки и знакомство с удивительной морской жизнью.',
    diving: 'Дайвинг', divingText: 'Исследуйте рифы и наблюдайте за морскими обитателями. Условия погружений зависят от атолла, сезона и конкретного дайв-сайта.',
    snorkeling: 'Снорклинг', snorkelingText: 'Даже с поверхности можно увидеть рифовых рыб, черепах и других обитателей океана. Всегда выбирайте подходящие условия и местного гида.',
    life: 'Встречи в океане', lifeText: 'Манты, китовые акулы, черепахи и скаты — часть удивительного подводного мира Мальдив. Наблюдения зависят от места и сезона и не гарантированы.',
    story: 'Истории из океана', storyText: 'Смотрите реальные подводные видео и следите за новыми путешествиями LokaWndr.',
    watch: 'YouTube LokaWndr', plan: 'Есть вопросы?', planText: 'Хотите узнать больше о дайвинге и снорклинге на Мальдивах? Напишите нам. Бронирование конкретных поездок пока не доступно.',
    contact: 'Связаться', other: 'Места для дайвинга на Мальдивах', note: 'Некоторые фотографии на странице взяты из существующей галереи LokaWndr.'
  } : {
    label: 'CHAPTER 02 · MALDIVES', title: 'The Maldives, Beneath the Surface', intro: 'Coral reefs, incredible marine life and ocean encounters worth remembering.',
    discover: 'Explore Dive Sites', videos: 'Watch Our Videos', why: 'Discover the Maldives with LokaWndr',
    whyText: 'This is a new chapter in the LokaWndr journey: scuba diving and snorkeling experiences, underwater footage and stories about extraordinary marine life.',
    diving: 'Scuba Diving', divingText: 'Explore reefs and discover marine life. Dive conditions vary by atoll, season and individual dive site.',
    snorkeling: 'Snorkeling', snorkelingText: 'From the surface, you can encounter reef fish, turtles and other ocean life. Choose suitable conditions and local guidance.',
    life: 'Ocean Encounters', lifeText: 'Manta rays, whale sharks, turtles and rays are among the Maldives’ remarkable marine animals. Sightings depend on location and season and are never guaranteed.',
    story: 'Stories from the Ocean', storyText: 'Watch real underwater videos and follow the next LokaWndr adventures.',
    watch: 'LokaWndr on YouTube', plan: 'Questions about the Maldives?', planText: 'Get in touch to learn more about diving and snorkeling. Specific trip bookings are not available here yet.',
    contact: 'Get in Touch', other: 'Explore Maldives Dive Sites', note: 'Some images on this page are from the existing LokaWndr gallery.'
  }
  return <><Header/><main className='bg-[#06283a] text-white'>
    <section className='relative isolate flex min-h-[530px] items-end overflow-hidden'>
      <Image src='/images/generated/maldives-diving.webp' alt={ru?'Созданная ИИ иллюстрация дайвера на коралловом рифе':'AI-generated illustration of a diver above a coral reef'} fill priority sizes='100vw' className='object-cover'/>
      <div className='absolute inset-0 bg-gradient-to-r from-[#032538]/90 via-[#032538]/55 to-[#032538]/20'/>
      <div className='absolute inset-0 bg-gradient-to-t from-[#032538] via-transparent to-transparent'/>
      <div className='ocean-motion-layer' aria-hidden='true'><div className='ocean-motion-light'/><div className='ocean-motion-bubbles'><i/><i/><i/><i/><i/><i/></div></div>
      <div className='relative mx-auto w-full max-w-[1480px] px-6 pb-20 pt-32 md:px-10'>
        <p className='text-xs font-bold tracking-[0.24em] text-cyan-100'>{t.label}</p><p className='mt-2 text-xs text-white/75'>{ru?'Иллюстрация, созданная с помощью ИИ':'AI-generated illustration'}</p>
        <h1 className='mt-4 max-w-3xl text-5xl font-extrabold leading-tight md:text-7xl'>{t.title}</h1>
        <p className='mt-5 max-w-2xl text-xl leading-relaxed text-slate-100'>{t.intro}</p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <a href='#vilu-sites' className='rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'>{t.discover}</a>
          <a href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-xl border border-white px-6 py-3 font-bold'><Play size={18}/>{t.videos}</a>
        </div>
      </div>
    </section>
    <section id='explore' className='mx-auto max-w-[1480px] px-6 py-16 md:px-10'>
      <h2 className='text-3xl font-extrabold md:text-4xl'>{t.why}</h2>
      <p className='mt-4 max-w-3xl text-lg leading-8 text-slate-200'>{t.whyText}</p>
      <div className='mt-6 flex flex-wrap gap-3'><a href='#vilu-sites' className='inline-flex min-h-11 items-center rounded-xl bg-white px-5 py-3 font-bold text-[#062536]'>{ru?'Исследовать дайв-сайты':'Explore Dive Sites'}</a><Link href={base+'/scubadivingcourses'} className='inline-flex min-h-11 items-center rounded-xl border border-white/50 px-5 py-3 font-bold'>{ru?'Курсы дайвинга':'Scuba Diving Courses'}</Link></div>
      <div className='mt-10 grid gap-5 md:grid-cols-3'>
        {[
          {icon:<DivingTankIcon/>,title:t.diving,body:t.divingText},
          {icon:<SnorkelMaskIcon/>,title:t.snorkeling,body:t.snorkelingText},
          {icon:<Fish size={30}/>,title:t.life,body:t.lifeText}
        ].map(card=><article key={card.title} className='rounded-2xl border border-white/15 bg-white/[.06] p-7'>
          <span className='text-cyan-200'>{card.icon}</span><h3 className='mt-4 text-2xl font-bold'>{card.title}</h3>
          <p className='mt-3 leading-7 text-slate-200'>{card.body}</p>
        </article>)}
      </div>
    </section>
    <section id='vilu-sites' className='scroll-mt-24 mx-auto max-w-[1480px] px-6 py-16 md:px-10'>
      <p className='text-xs font-bold tracking-widest text-cyan-200'>LOKAWNDR · VILU REEF</p>
      <h2 className='mt-3 text-3xl font-extrabold'>{ru?'Дайв-сайты Vilu Reef':'Vilu Reef Dive Sites'}</h2>
      <p className='mt-4 max-w-3xl leading-8 text-slate-200'>{ru?'Sun Siyam Vilu Reef расположен в атолле Дхаалу. Исследуйте местные рифы и подводные скалы вместе с местным дайв-центром.':'Sun Siyam Vilu Reef is located in Dhaalu Atoll. Explore nearby reefs and underwater pinnacles with the local dive centre.'}</p>
      <div className='mt-8'><ViluAtlas locale={locale}/></div>
      <div className='mt-8 grid gap-7 lg:grid-cols-2'>
        {[
          {name:'Yuki Reef',depth:'3–35 m',boat:'13 min',en:'A sloping reef near Udh dhoo Island with overhangs around 12–15 m and a deeper sandy bottom.',ru:'Риф у острова Уддху со склоном, навесами на глубине около 12–15 м и песчаным дном.'},
          {name:'Velavaru Thila',depth:'8–40 m',boat:'20 min',en:'A thila with a shallow top, overhangs, sandy bottom and a nearby channel.',ru:'Подводная скала с неглубокой вершиной, навесами, песчаным дном и каналом.'},
          {name:'Bodu Thila',depth:'6–35 m',boat:'25 min',en:'A large thila with a sloping reef, overhangs and a smaller deeper pinnacle.',ru:'Большая подводная скала со склоном, навесами и более глубокой небольшой скалой.'},
          {name:'Udhdhoo Reef',boat:'10 min',...maldivesDetails['Udhdhoo Reef']},
          {name:'Wella Giri',depth:'10–35 m',boat:'—',en:maldivesGuideSites.find(s=>s.slug==='wella-giri')!.en,ru:maldivesGuideSites.find(s=>s.slug==='wella-giri')!.ru},
          {name:'Lhohi Caves',depth:'7–20 m',boat:'—',en:maldivesGuideSites.find(s=>s.slug==='lhohi-caves')!.en,ru:maldivesGuideSites.find(s=>s.slug==='lhohi-caves')!.ru},
          {name:'Azmee Corner',depth:'—',boat:'—',en:'A reef wall with overhangs and marine life in the Vilu Reef area.',ru:'Рифовая стена с навесами и морскими обитателями в районе Vilu Reef.'},
        ].map(site=><article key={site.name} id={site.name==='Azmee Corner'?'azmee-guide':undefined} className='overflow-hidden rounded-2xl border border-white/15 bg-white/[.06]'>
          {site.name==='Udhdhoo Reef'?<UdhdhooCover locale={locale}/>:site.name==='Lhohi Caves'?<div className='relative aspect-video'><Image src='/images/dive-sites/lhohi-caves/2.png' alt={ru?'Лохи Кейвс — подводный навес':'Lhohi Caves underwater overhang'} fill sizes='(max-width: 1024px) 100vw, 50vw' className='object-cover'/></div>:site.name==='Wella Giri'?<div className='relative aspect-video'><Image src='/images/dive-sites/wella-giri/2.png' alt={ru?'Велла Гири — коралловый риф':'Wella Giri coral reef'} fill sizes='(max-width: 1024px) 100vw, 50vw' className='object-cover'/></div>:<div role='img' aria-label='To Be LokaWndred' className='grid aspect-video place-items-center bg-gradient-to-br from-cyan-800 via-[#064158] to-[#031a2c] p-6 text-center text-xl font-extrabold tracking-[.16em] text-cyan-50'>TO BE LOKAWNDRED</div>}
          <div className='p-6'><h3 className='text-2xl font-bold'>{site.name}</h3><p className='mt-3 leading-7 text-slate-200'>{ru?site.ru:site.en}</p>
            <dl className='mt-5 grid grid-cols-3 gap-3 border-y border-white/15 py-4 text-sm'><div><dt className='text-slate-400'>{ru?'Глубина на схеме':'Chart depth'}</dt><dd className='mt-1 font-semibold'>{site.depth}</dd></div><div><dt className='text-slate-400'>{ru?'Поездка на лодке':'Boat trip'}</dt><dd className='mt-1 font-semibold'>{site.boat}</dd></div><div><dt className='text-slate-400'>{ru?'Течение':'Current'}</dt><dd className='mt-1 font-semibold'>{site.name==='Udhdhoo Reef'?(ru?'Слабое–умеренное':'Low–moderate'):(ru?'Уточняйте':'Check locally')}</dd></div>{site.name==='Udhdhoo Reef'&&<div><dt className='text-slate-400'>{ru?'Видимость':'Visibility'}</dt><dd className='mt-1 font-semibold'>{ru?'10–15+ м':'10–15+ m'}</dd></div>}</dl>
            <h4 className='mt-6 text-sm font-bold uppercase tracking-wider text-cyan-200'>{ru?'Фотогалерея':'Photo gallery'}</h4>{site.name==='Udhdhoo Reef'?<UdhdhooGallery locale={locale}/>:site.name==='Lhohi Caves'?<div className='mt-3 grid grid-cols-3 gap-2'>{[2,7,4,5,3].map(n=><a key={n} href={`/images/dive-sites/lhohi-caves/${n}.png`} target='_blank' rel='noopener noreferrer' className='relative aspect-square overflow-hidden rounded-lg'><Image src={`/images/dive-sites/lhohi-caves/${n}.png`} alt={`Lhohi Caves — ${n}`} fill sizes='(max-width: 768px) 30vw, 16vw' className='object-cover transition hover:scale-105'/></a>)}</div>:site.name==='Wella Giri'?<div className='mt-3 grid grid-cols-3 gap-2'>{[2,4,7,6,1].map(n=><a key={n} href={`/images/dive-sites/wella-giri/${n}.png`} target='_blank' rel='noopener noreferrer' className='relative aspect-square overflow-hidden rounded-lg'><Image src={`/images/dive-sites/wella-giri/${n}.png`} alt={`Wella Giri — ${n}`} fill sizes='(max-width: 768px) 30vw, 16vw' className='object-cover transition hover:scale-105'/></a>)}</div>:<div className='mt-3 grid grid-cols-3 gap-2'><div className='grid aspect-square place-items-center rounded-lg bg-[#073c50] p-2 text-center text-xs font-bold text-cyan-100'>TO BE LOKAWNDRED</div></div>}
            <Link href={base+'/destinations/maldives/'+maldivesGuideSites.find(item=>item.name===site.name)!.slug} className='mt-6 inline-flex items-center gap-2 rounded-xl border border-white/50 px-5 py-3 font-semibold hover:bg-white/10'>{ru?'Подробнее о дайв-сайте':'View Full Dive-Site Guide'}<ArrowRight size={18}/></Link>
          </div></article>)}
        {maldivesSites.filter(([name])=>!maldivesDetails[name]).map(([name],i)=><article key={name} className='overflow-hidden rounded-2xl border border-white/15 bg-white/[.06]'><div role='img' aria-label='To Be LokaWndred' className='grid aspect-video place-items-center bg-gradient-to-br from-cyan-800 via-[#064158] to-[#031a2c] p-6 text-center text-xl font-extrabold tracking-[.16em] text-cyan-50'>TO BE LOKAWNDRED</div><div className='p-6'><h3 className='text-2xl font-bold'>{name}</h3><p className='mt-3 leading-7 text-slate-200'>{ru?'Это место показано на карте дайв-центра. Подробная информация появится позже.':'This site is shown on the dive-centre map. More details will be added later.'}</p><dl className='mt-5 grid grid-cols-3 gap-3 border-y border-white/15 py-4 text-sm'>{(ru?['Глубина','Течение','Видимость']:['Depth','Current','Visibility']).map(label=><div key={label}><dt className='text-slate-400'>{label}</dt><dd className='mt-1 font-semibold'>{ru?'Уточняйте':'Check locally'}</dd></div>)}</dl><h4 className='mt-6 text-sm font-bold uppercase tracking-wider text-cyan-200'>{ru?'Фотогалерея':'Photo gallery'}</h4><div className='mt-3 grid grid-cols-3 gap-2'><div role='img' aria-label='To Be LokaWndred' className='grid aspect-square place-items-center rounded-lg bg-[#073c50] p-2 text-center text-xs font-bold text-cyan-100'>TO BE LOKAWNDRED</div></div></div></article>)}
      </div><p className='mt-6 text-sm leading-6 text-slate-400'>{ru?'Данные взяты с предоставленных схем. Глубина дна не является рекомендуемой глубиной погружения; уточняйте условия у местного дайв-центра.':'Details are taken from the supplied site diagrams. The seabed depth is not a recommended dive depth; confirm conditions with the local dive centre.'}</p>
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
