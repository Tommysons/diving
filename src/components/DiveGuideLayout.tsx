import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DiveGuideNavigation from '@/components/DiveGuideNavigation'

export type DiveGuide = {
  name: string
  intro: string
  description: string
  cover?: string
  photos: string[]
  conditions: { label: string; value: string }[]
  marineLife?: string[]
  backHref: string
  mapHref: string
  locale: 'en' | 'ru'
  destination?: 'thailand' | 'maldives'
  photoCredit?: string
  depthNeedsConfirmation?: boolean
  previous?: { href: string; name: string }
  next?: { href: string; name: string }
}

export default function DiveGuideLayout({ guide }: { guide: DiveGuide }) {
  const ru = guide.locale === 'ru', base = ru ? '/ru' : '', maldives = guide.destination === 'maldives'
  const t = ru ? {
    previous: 'Предыдущий дайв-сайт', following: 'Следующий дайв-сайт',
    back: maldives?'Все дайв-сайты Мальдив':'Все дайв-сайты Ко Тао', eyebrow: maldives?'МАЛЬДИВЫ · АТОЛЛ ДХААЛУ':'ТАИЛАНД · КО ТАО', about: `О дайв-сайте ${guide.name}`,
    conditions: 'Условия погружения', marine: 'Кого можно увидеть', sightings: 'Встречи с морскими обитателями не гарантированы.',
    note: maldives?'Глубина дна на схеме не является рекомендуемой глубиной погружения. Уточняйте условия у местного дайв-центра.':'Течение и видимость меняются; уточняйте условия у местного дайв-центра и выбирайте погружение в пределах своей подготовки.',
    depthNote: 'Для этого дайв-сайта указаны разные значения глубины. Уточните глубину и условия у местного дайв-центра перед погружением.',
    photos: `Фотографии ${guide.name}`, photoText: 'Нажмите на фотографию, чтобы открыть её.', photo: 'фотография', open: 'открыть фотографию',
    next: maldives?'Исследуйте Мальдивы с LokaWndr':'Исследуйте Ко Тао с LokaWndr', nextText: maldives?'Посмотрите карту дайв-сайтов Vilu Reef или свяжитесь с нами, если хотите узнать больше.':'Посмотрите карту дайв-сайтов Ко Тао или свяжитесь с нами, если хотите узнать больше.', map: 'Посмотреть карту дайв-сайтов', contact: 'Связаться',
  } : {
    previous: 'Previous dive site', following: 'Next dive site',
    back: maldives?'All Maldives dive sites':'All Koh Tao dive sites', eyebrow: maldives?'MALDIVES · DHAALU ATOLL':'THAILAND · KOH TAO', about: `About ${guide.name}`,
    conditions: 'Dive conditions', marine: 'Marine life to look for', sightings: 'Wildlife sightings are never guaranteed.',
    note: maldives?'Charted seabed depth is not a recommended dive depth. Confirm conditions with a local dive centre.':'Current and visibility change; confirm conditions with a local dive centre and dive within your training.',
    depthNote: 'Different depth values are listed for this site. Confirm the depth and conditions with a local dive centre before diving.',
    photos: `${guide.name} photo gallery`, photoText: 'Select a photo to open it.', photo: 'photo', open: 'open photo',
    next: maldives?'Explore the Maldives with LokaWndr':'Explore Koh Tao with LokaWndr', nextText: maldives?'Explore the Vilu Reef dive-site map or get in touch if you would like to know more.':'Explore the Koh Tao dive-site map or get in touch if you would like to know more.', map: 'Explore the dive-site map', contact: 'Get in touch',
  }
  return <><Header/><main lang={guide.locale} className='min-h-screen bg-[#06283a] text-white'>
    <div className='mx-auto max-w-[1200px] px-5 pb-20 pt-10 md:px-10 md:pt-14'>
      <Link href={guide.backHref} className='inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-100 hover:underline'><ArrowLeft size={16}/>{t.back}</Link>
      <div className='mt-7 grid items-center gap-8 lg:grid-cols-2'>
        <div><p className='text-xs font-bold tracking-[.2em] text-cyan-200'>{t.eyebrow}</p><h1 className='mt-4 text-4xl font-extrabold leading-tight md:text-6xl'>{guide.name}</h1><p className='mt-5 max-w-xl text-lg leading-8 text-slate-200'>{guide.intro}</p></div>
        {guide.cover?<div className='relative aspect-video overflow-hidden rounded-xl'><Image src={guide.cover} alt={ru?`${guide.name} — подводная фотография`:`Underwater photo of ${guide.name}`} fill priority sizes='(max-width: 1024px) 100vw, 50vw' className='object-cover'/></div>:<div className='grid aspect-video place-items-center rounded-xl bg-[#073c50] text-center font-bold tracking-widest text-cyan-100'>TO BE LOKAWNDRED</div>}
      </div>
      <div className='mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr]'>
        <section className='rounded-3xl border border-white/15 bg-white/[.06] p-6 md:p-8'><h2 className='text-2xl font-bold'>{t.about}</h2><p className='mt-4 whitespace-pre-line leading-8 text-slate-200'>{guide.description}</p>{guide.marineLife && guide.marineLife.length>0&&<><h2 className='mt-8 text-2xl font-bold'>{t.marine}</h2><p className='mt-4 leading-8 text-slate-200'>{guide.marineLife.join(', ')}. {t.sightings}</p></>}</section>
        <section className='rounded-3xl border border-cyan-200/20 bg-[#0a3c50] p-6 md:p-8'><h2 className='text-2xl font-bold'>{t.conditions}</h2><dl className='mt-5 grid grid-cols-2 gap-x-4 gap-y-6'>{guide.conditions.map(({label,value})=><div key={label}><dt className='text-sm text-cyan-100/80'>{label}</dt><dd className='mt-1 font-semibold'>{value}</dd></div>)}</dl><p className='mt-7 text-sm leading-6 text-slate-300'>{guide.depthNeedsConfirmation?t.depthNote:t.note}</p></section>
      </div>
      {guide.photos.length>0?<section className='mt-14'><h2 className='text-3xl font-bold'>{t.photos}</h2><p className='mt-3 text-slate-300'>{t.photoText}</p><div className='mt-5 grid grid-cols-3 gap-2'>{guide.photos.map((src,i)=><a key={src} href={src} target='_blank' rel='noopener noreferrer' aria-label={`${guide.name} — ${t.photo} ${i+1}, ${t.open}`} className='relative aspect-square overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200'><Image src={src} alt={`${guide.name} — ${t.photo} ${i+1}`} fill sizes='(max-width: 768px) 30vw, 20vw' className='object-cover transition hover:scale-105'/></a>)}</div>{guide.photoCredit&&<p className='mt-4 text-sm text-slate-400'>{guide.photoCredit} <a href='https://www.instagram.com/kakadong123/' target='_blank' rel='noopener noreferrer' className='underline'>@kakadong123</a>.</p>}</section>:<section className='mt-14'><h2 className='text-3xl font-bold'>{t.photos}</h2><div role='img' aria-label='To Be LokaWndred' className='mt-5 grid aspect-square w-36 place-items-center rounded-xl bg-[#073c50] p-3 text-center text-xs font-bold tracking-wider text-cyan-100'>TO BE LOKAWNDRED</div></section>}
      {guide.previous&&guide.next&&<DiveGuideNavigation locale={guide.locale} previous={guide.previous} next={guide.next}/>}
      <section className='mt-14 rounded-3xl border border-white/15 bg-[#0a3c50] p-7 md:p-10'><h2 className='text-2xl font-bold'>{t.next}</h2><p className='mt-3 max-w-2xl leading-7 text-slate-200'>{t.nextText}</p><div className='mt-6 flex flex-wrap gap-3'><Link href={guide.mapHref} className='inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#062536]'>{t.map}<ArrowRight size={16}/></Link><Link href={`${base}/contact`} className='inline-flex min-h-11 items-center rounded-xl border border-white/50 px-5 py-3 font-bold'>{t.contact}</Link></div></section>
    </div>
  </main><Footer/></>
}
