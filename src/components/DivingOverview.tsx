import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DivingOverview({locale}:{locale:'en'|'ru'}) {
  const ru=locale==='ru', base=ru?'/ru':''
  const cards=[
    {title:ru?'Фан-дайвинг':'Fun diving',image:'/images/generated/thailand-diving.webp',alt:ru?'Дайверы исследуют коралловый риф':'Divers exploring a coral reef',intro:ru?'Для тех, кто уже имеет сертификат дайвера и хочет исследовать новые рифы и дайв-сайты.':'For certified divers who want to explore reefs, marine life and new dive sites.',details:ru?'Погружения с гидом, возможность использования Nitrox при наличии соответствующей сертификации и аренда снаряжения. Цены зависят от направления — Таиланд или Мальдивы.':'Guided recreational dives, Nitrox options for suitably certified divers and equipment rental. Pricing depends on whether you choose Thailand or the Maldives.',href:base+'/fun-diving',cta:ru?'Выбрать фан-дайвинг':'Explore fun diving'},
    {title:ru?'Курсы дайвинга':'Scuba courses',image:'/images/courses/owd.webp',alt:ru?'Обучение подводному плаванию':'Scuba diving training',intro:ru?'Для новичков, желающих попробовать дайвинг, и для дайверов, которые хотят продолжить обучение.':'For first-time divers who want to try scuba and certified divers who want to develop their skills.',details:ru?'Discover Scuba Diving (DSD) — вводная программа с инструктором для тех, у кого ещё нет сертификата. Это не полноценный сертификационный курс. Open Water Diver — обучение для получения первого сертификата; также доступны продвинутые курсы и специализации.':'Discover Scuba Diving (DSD) is a supervised introductory experience for people without a diving certification; it is not a certification course. Open Water Diver is training toward your first certification, with advanced courses and specialties available afterward.',href:base+'/scubadivingcourses',cta:ru?'Посмотреть курсы':'Explore scuba courses'}
  ]
  return <><Header/><main lang={locale} className='min-h-screen bg-[#06283a] text-white'>
    <section className='relative isolate flex min-h-[390px] items-center overflow-hidden'>
      <Image src='/images/generated/thailand-diving.webp' alt='' fill priority sizes='100vw' className='-z-20 object-cover'/>
      <div className='absolute inset-0 -z-10 bg-gradient-to-r from-[#021d30]/95 via-[#03273a]/75 to-[#03273a]/35'/>
      <div className='mx-auto w-full max-w-[1200px] px-6 py-20'>
        <p className='text-sm font-bold uppercase tracking-[.2em] text-cyan-200'>{ru?'Активности · Дайвинг':'Activities · Diving'}</p>
        <h1 className='mt-5 text-4xl font-extrabold md:text-6xl'>{ru?'Выберите свой формат дайвинга':'Choose your diving experience'}</h1>
        <p className='mt-5 max-w-2xl text-lg leading-8 text-slate-100'>{ru?'Уже есть сертификат? Выбирайте фан-дайвинг. Хотите впервые попробовать погружение или научиться нырять? Начните с наших программ обучения.':'Already certified? Explore fun diving. New to scuba or looking to improve your skills? Start with our training options.'}</p>
      </div>
    </section>
    <section className='mx-auto max-w-[1200px] px-6 py-16'>
      <div className='grid gap-8 md:grid-cols-2'>{cards.map(card=><article key={card.href} className='overflow-hidden rounded-3xl border border-white/15 bg-white/[.06]'>
        <div className='relative h-64 sm:h-72'><Image src={card.image} alt={card.alt} fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover'/></div>
        <div className='flex h-full flex-col p-7'><h2 className='text-3xl font-bold'>{card.title}</h2><p className='mt-4 text-lg font-medium leading-7 text-cyan-100'>{card.intro}</p><p className='mt-4 leading-7 text-slate-200'>{card.details}</p><div className='mt-7'><Link href={card.href} className='inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-500'>{card.cta}</Link></div></div>
      </article>)}</div>
    </section>
  </main><Footer/></>
}
