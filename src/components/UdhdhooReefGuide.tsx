'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { UdhdhooCover, UdhdhooGallery } from '@/components/UdhdhooGallery'
import { maldivesDetails } from '@/components/ViluAtlas'

export default function UdhdhooReefGuide({ locale }: { locale: 'en' | 'ru' }) {
  const ru = locale === 'ru'
  const base = ru ? '/ru' : ''
  const t = ru ? {
    back: 'Все дайв-сайты Мальдив', eyebrow: 'МАЛЬДИВЫ · АТОЛЛ ДХААЛУ', title: 'Дайвинг на Udhdhoo Reef',
    intro: 'Кораллы, рифовые рыбы и подводные впечатления в районе Vilu Reef.', about: 'О дайв-сайте Udhdhoo Reef',
    conditions: 'Условия погружения', depth: 'Глубина дна на схеме', current: 'Течение', currentValue: 'Слабое–умеренное', visibility: 'Видимость', boat: 'От Vilu Reef на лодке', boatValue: 'Около 10 минут',
    note: 'Глубина дна на схеме не является рекомендуемой глубиной погружения. Течение и видимость меняются; уточняйте условия у местного дайв-центра и выбирайте погружение в пределах своей подготовки.',
    marine: 'Кого можно увидеть', marineText: 'На рифе можно встретить стаи фузилёров и мелких рифовых рыб, а среди кораллов — мурен и лобстеров. Здесь также иногда появляются белопёрые рифовые акулы. Встречи с морскими обитателями не гарантированы.',
    photos: 'Фотографии Udhdhoo Reef', photoText: 'Подводные кадры из коллекции LokaWndr. Нажмите на фотографию, чтобы открыть её.',
    next: 'Исследуйте Мальдивы с LokaWndr', nextText: 'Посмотрите карту дайв-сайтов в районе Vilu Reef или свяжитесь с нами, если хотите узнать больше.', map: 'Посмотреть карту дайв-сайтов', contact: 'Связаться',
  } : {
    back: 'All Maldives dive sites', eyebrow: 'MALDIVES · DHAALU ATOLL', title: 'Diving Udhdhoo Reef',
    intro: 'Corals, reef fish and underwater encounters in the Vilu Reef area.', about: 'About Udhdhoo Reef',
    conditions: 'Dive conditions', depth: 'Charted seabed depth', current: 'Current', currentValue: 'Low–moderate', visibility: 'Visibility', boat: 'Boat from Vilu Reef', boatValue: 'About 10 minutes',
    note: 'Charted seabed depth is not a recommended dive depth. Current and visibility change; confirm conditions with a local dive centre and dive within your training.',
    marine: 'Marine life to look for', marineText: 'Look for schools of fusiliers and small reef fish, as well as moray eels and lobsters among the coral. Whitetip reef sharks may also appear. Wildlife sightings are never guaranteed.',
    photos: 'Udhdhoo Reef photo gallery', photoText: 'Underwater photographs from the LokaWndr collection. Select a photo to open it.',
    next: 'Explore the Maldives with LokaWndr', nextText: 'Explore the Vilu Reef dive-site map or get in touch if you would like to know more.', map: 'Explore the dive-site map', contact: 'Get in touch',
  }
  return <><Header/><main lang={locale} className='min-h-screen bg-[#06283a] text-white'>
    <div className='mx-auto max-w-[1200px] px-5 pb-20 pt-10 md:px-10 md:pt-14'>
      <Link href={`${base}/destinations/maldives#vilu-sites`} className='inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-100 hover:underline'><ArrowLeft size={16}/>{t.back}</Link>
      <div className='mt-7 grid items-center gap-8 lg:grid-cols-2'>
        <div><p className='text-xs font-bold tracking-[.2em] text-cyan-200'>{t.eyebrow}</p><h1 className='mt-4 text-4xl font-extrabold leading-tight md:text-6xl'>{t.title}</h1><p className='mt-5 max-w-xl text-lg leading-8 text-slate-200'>{t.intro}</p></div>
        <UdhdhooCover locale={locale}/>
      </div>
      <div className='mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr]'>
        <section className='rounded-3xl border border-white/15 bg-white/[.06] p-6 md:p-8'><h2 className='text-2xl font-bold'>{t.about}</h2><p className='mt-4 leading-8 text-slate-200'>{maldivesDetails['Udhdhoo Reef'][locale]}</p><h2 className='mt-8 text-2xl font-bold'>{t.marine}</h2><p className='mt-4 leading-8 text-slate-200'>{t.marineText}</p></section>
        <section className='rounded-3xl border border-cyan-200/20 bg-[#0a3c50] p-6 md:p-8'><h2 className='text-2xl font-bold'>{t.conditions}</h2><dl className='mt-5 grid grid-cols-2 gap-x-4 gap-y-6'>
          {[[t.depth, ru?'3–35 м':'3–35 m'],[t.current,t.currentValue],[t.visibility,ru?'10–15+ м':'10–15+ m'],[t.boat,t.boatValue]].map(([label,value])=><div key={label}><dt className='text-sm text-cyan-100/80'>{label}</dt><dd className='mt-1 font-semibold'>{value}</dd></div>)}
        </dl><p className='mt-7 text-sm leading-6 text-slate-300'>{t.note}</p></section>
      </div>
      <section className='mt-14'><h2 className='text-3xl font-bold'>{t.photos}</h2><p className='mt-3 text-slate-300'>{t.photoText}</p><div className='mt-5'><UdhdhooGallery locale={locale}/></div></section>
      <section className='mt-14 rounded-3xl border border-white/15 bg-[#0a3c50] p-7 md:p-10'><h2 className='text-2xl font-bold'>{t.next}</h2><p className='mt-3 max-w-2xl leading-7 text-slate-200'>{t.nextText}</p><div className='mt-6 flex flex-wrap gap-3'><Link href={`${base}/destinations/maldives#vilu-sites`} className='inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#062536]'>{t.map}<ArrowRight size={16}/></Link><Link href={`${base}/contact`} className='inline-flex min-h-11 items-center rounded-xl border border-white/50 px-5 py-3 font-bold'>{t.contact}</Link></div></section>
    </div>
  </main><Footer/></>
}
