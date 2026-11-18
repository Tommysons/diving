import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FunDiving({ locale }: { locale: 'en' | 'ru' }) {
  const ru = locale === 'ru'
  const base = ru ? '/ru' : ''
  const options = [
    { title: ru ? 'Фан-дайвинг' : 'Guided fun dives', description: ru ? 'Погружения для сертифицированных дайверов. Расскажите нам о вашем уровне и желаемом месте погружения.' : 'Explore reefs and dive sites with guided dives for certified divers. Tell us your certification level and preferred destination.', subject: 'Fun diving', image: '/images/generated/thailand-diving.webp', alt: ru ? 'Дайвер исследует подводный мир' : 'Scuba diver exploring the ocean' },
    { title: ru ? 'Погружения с Nitrox' : 'Diving with Nitrox', description: ru ? 'Уточните доступность обогащённого воздуха и требования к сертификации для выбранного погружения.' : 'Ask about enriched-air availability and certification requirements for your dive.', subject: 'Nitrox diving', image: '/images/scuba-intro.webp', alt: ru ? 'Подводное плавание с аквалангом' : 'Scuba diving equipment and training' },
    { title: ru ? 'Аренда снаряжения' : 'Equipment rental', description: ru ? 'Уточните доступность комплекта или отдельных элементов снаряжения и стоимость аренды.' : 'Enquire about full-kit or individual equipment rental, availability and rates.', subject: 'Diving equipment rental', image: '/images/generated/maldives-diving.webp', alt: ru ? 'Дайвинг на Мальдивах' : 'Diving in the Maldives' },
  ]
  return <><Header/><main lang={locale} className='min-h-screen bg-[#06283a] text-white'>
    <section className='relative isolate flex min-h-[420px] items-center overflow-hidden'>
      <Image src='/images/generated/thailand-diving.webp' alt='' fill priority sizes='100vw' className='-z-20 object-cover'/>
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-[#021d30]/95 via-[#03273a]/75 to-[#03273a]/40'/>
      <div className='mx-auto w-full max-w-[1200px] px-6 py-20'>
        <p className='text-sm font-bold uppercase tracking-[.2em] text-cyan-200'>{ru ? 'Активности · Дайвинг' : 'Activities · Scuba diving'}</p>
        <h1 className='mt-5 text-4xl font-extrabold md:text-6xl'>{ru ? 'Фан-дайвинг' : 'Fun diving'}</h1>
        <p className='mt-5 max-w-2xl text-lg text-slate-100'>{ru ? 'Исследуйте подводный мир: погружения с гидом, Nitrox и аренда снаряжения. Напишите нам, чтобы уточнить стоимость и доступность.' : 'Explore the underwater world with guided dives, Nitrox options and equipment rental. Contact us for current pricing and availability.'}</p>
      </div>
    </section>
    <section className='mx-auto max-w-[1200px] px-6 py-16'>
      <h2 className='text-3xl font-bold'>{ru ? 'Варианты погружений и услуги' : 'Diving options and services'}</h2>
      <p className='mt-4 max-w-3xl leading-7 text-slate-200'>{ru ? 'Стоимость зависит от выбранного направления — Таиланд или Мальдивы. Укажите страну в запросе, и мы сообщим актуальные цены и доступность услуг.' : 'Prices vary depending on your chosen destination — Thailand or the Maldives. Tell us where you want to dive and we will share current rates and availability.'}</p>
      <div className='mt-8 grid gap-6 md:grid-cols-3'>{options.map(item=><article key={item.subject} className='overflow-hidden rounded-3xl border border-white/15 bg-white/[.06]'>
        <div className='relative h-52 w-full'><Image src={item.image} alt={item.alt} fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover'/></div>
        <div className='p-7'><h3 className='text-2xl font-bold'>{item.title}</h3>
        <p className='mt-4 min-h-32 leading-7 text-slate-200'>{item.description}</p></div>
      </article>)}</div>
      <div className='mt-10 flex justify-center'><Link href={base+'/contact?subject='+encodeURIComponent('Fun diving, Nitrox and equipment rental — Thailand or Maldives')} className='inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-600 px-8 py-3 text-lg font-bold text-white transition hover:bg-cyan-500'>{ru ? 'Узнать стоимость' : 'Ask for pricing'}</Link></div>
      <p className='mt-8 text-sm text-slate-300'>{ru ? 'Услуги зависят от направления, условий и доступности. Отправка запроса не является подтверждённым бронированием.' : 'Services depend on destination, conditions and availability. An enquiry is not a confirmed reservation.'}</p>
      <div className='mt-10'><Link href={base+'/scubadivingcourses'} className='font-semibold text-cyan-200 underline underline-offset-4'>{ru ? 'Ищете обучение? Посмотреть курсы дайвинга' : 'Looking for training? Explore scuba courses'}</Link></div>
    </section>
  </main><Footer/></>
}
