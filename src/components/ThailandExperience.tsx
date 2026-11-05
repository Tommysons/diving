import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Waves, Fish, Mail } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ThailandExperience({ locale }: { locale: 'en' | 'ru' }) {
 const ru=locale==='ru', base=ru?'/ru':''
 const t=ru?{
  label:'ГЛАВА 01 · ТАИЛАНД',title:'Дайвинг в Таиланде',intro:'От рифов Ко Тао до впечатляющих дайв-сайтов Андаманского моря.',
  guide:'Исследовать дайв-сайты',heading:'Где погружаться в Таиланде',intro2:'Таиланд предлагает разные виды дайвинга: спокойные рифы для новичков, подводные скалы, затонувшие корабли и сильные течения для опытных дайверов.',
  koh:'Ко Тао — начало истории LokaWndr',kohText:'Ко Тао занимает особое место в истории LokaWndr. Здесь можно найти как неглубокие учебные рифы, так и более глубокие подводные скалы. Наши существующие статьи помогут познакомиться с местными дайв-сайтами.',
  existing:'Наш гид по дайв-сайтам Ко Тао',courses:'Курсы дайвинга',other:'Другие известные места для дайвинга',
  plan:'Вопросы о дайвинге в Таиланде?',planText:'Напишите нам, чтобы узнать больше. Наличие инструкторов и возможность бронирования не гарантируются.',
  contact:'Связаться',maldives:'Исследовать Мальдивы',sources:'Источники',safety:'Условия и доступность дайв-сайтов зависят от сезона, погоды, течений и подготовки дайвера. Уточняйте информацию у местного оператора.'
 }:{
  label:'CHAPTER 01 · THAILAND',title:'Dive into Thailand',intro:'From Koh Tao’s reefs to the dramatic dive sites of the Andaman Sea.',
  guide:'Explore Dive Sites',heading:'Where to Dive in Thailand',intro2:'Thailand offers everything from calm training reefs to offshore pinnacles, wrecks and current-swept sites for experienced divers.',
  koh:'Koh Tao — Where LokaWndr Began',kohText:'Koh Tao is part of the LokaWndr story. Explore shallow training reefs as well as deeper offshore pinnacles, and discover the island through our existing dive-site guides.',
  existing:'Explore Our Koh Tao Dive Sites',courses:'Scuba Diving Courses',other:'More Famous Thai Dive Destinations',
  plan:'Questions About Diving in Thailand?',planText:'Contact us to learn more. Instructor availability and trip bookings are not guaranteed.',
  contact:'Get in Touch',maldives:'Explore Maldives',sources:'Sources',safety:'Dive conditions and access depend on season, weather, currents and diver experience. Confirm details with a local operator.'
 }
 const spots=ru?[
  {name:'Chumphon Pinnacle · Ко Тао',tag:'Стаи рыб и подводные скалы',body:'Один из самых известных дайв-сайтов Ко Тао с крупными стаями рыб и редкими встречами с китовыми акулами.'},
  {name:'Southwest Pinnacle · Ко Тао',tag:'Скалы и анемоны',body:'Группа подводных скал с анемонами, барракудами и разнообразной рифовой жизнью.'},
  {name:'White Rock и Twins · Ко Тао',tag:'Рифы для разных уровней',body:'Популярные места для обучения и спокойных рифовых погружений при подходящих условиях.'},
  {name:'HTMS Sattakut · Ко Тао',tag:'Затонувший корабль',body:'Искусственный риф на затонувшем корабле, подходящий для дайверов с соответствующей подготовкой. Проникновение внутрь требует специального обучения.'},
  {name:'Sail Rock · Сиамский залив',tag:'Подводная скала и стаи рыб',body:'Известный дайв-сайт между Ко Тао и Ко Пханганом. Глубина и течения требуют внимательного планирования.'},
  {name:'Richelieu Rock · Андаманское море',tag:'Морская жизнь и мягкие кораллы',body:'Известная подводная скала у Суринских островов. Доступность зависит от сезона морского национального парка.'},
  {name:'Симиланские острова · Андаманское море',tag:'Гранитные валуны и рифы',body:'Знаменитый район с подводными скалами и рифами; сезон посещения ограничен правилами национального парка.'}
 ]:[
  {name:'Chumphon Pinnacle · Koh Tao',tag:'Schooling fish & pinnacles',body:'One of Koh Tao’s best-known offshore sites, with large schools of fish and occasional whale shark encounters.'},
  {name:'Southwest Pinnacle · Koh Tao',tag:'Pinnacles & anemones',body:'A group of submerged pinnacles with anemones, barracuda and diverse reef life.'},
  {name:'White Rock & Twins · Koh Tao',tag:'Reefs for varied experience levels',body:'Popular reef sites for training and relaxed dives when conditions are suitable.'},
  {name:'HTMS Sattakut · Koh Tao',tag:'Wreck diving',body:'A sunken naval vessel and artificial reef for suitably trained divers. Wreck penetration requires specialist training.'},
  {name:'Sail Rock · Gulf of Thailand',tag:'Offshore pinnacle & fish schools',body:'A famous site between Koh Tao and Koh Phangan. Depth and currents require careful dive planning.'},
  {name:'Richelieu Rock · Andaman Sea',tag:'Marine life & soft corals',body:'A celebrated pinnacle near the Surin Islands. Access depends on the marine park season.'},
  {name:'Similan Islands · Andaman Sea',tag:'Granite boulders & reefs',body:'A renowned area of underwater rock formations and reefs, with seasonal national park access.'}
 ]
 return <><Header/><main className='bg-[#06283a] text-white'>
  <section className='relative isolate flex min-h-[530px] items-end overflow-hidden'>
   <Image src='/images/cpn6a.webp' alt='Koh Tao underwater scenery photographed for LokaWndr' fill priority sizes='100vw' className='object-cover'/>
   <div className='absolute inset-0 bg-gradient-to-r from-[#032538]/90 via-[#032538]/55 to-[#032538]/20'/>
   <div className='absolute inset-0 bg-gradient-to-t from-[#032538] via-transparent to-transparent'/>
   <div className='relative mx-auto w-full max-w-[1480px] px-6 pb-20 pt-32 md:px-10'>
    <p className='text-xs font-bold tracking-[.24em] text-cyan-100'>{t.label}</p>
    <h1 className='mt-4 max-w-3xl text-5xl font-extrabold md:text-7xl'>{t.title}</h1>
    <p className='mt-5 max-w-2xl text-xl leading-relaxed text-slate-100'>{t.intro}</p>
    <a href='#dive-spots' className='mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'>{t.guide}<ArrowRight size={18}/></a>
   </div>
  </section>
  <section id='dive-spots' className='mx-auto max-w-[1480px] px-6 py-16 md:px-10'>
   <h2 className='text-3xl font-extrabold md:text-4xl'>{t.heading}</h2>
   <p className='mt-4 max-w-3xl leading-8 text-slate-200'>{t.intro2}</p>
   <div className='mt-10 rounded-2xl border border-cyan-200/30 bg-[#0a3c50] p-7 md:p-10'>
    <p className='text-xs font-bold tracking-widest text-cyan-200'>LOKAWNDR · KOH TAO</p>
    <h3 className='mt-3 text-3xl font-bold'>{t.koh}</h3>
    <p className='mt-4 max-w-3xl leading-8 text-slate-200'>{t.kohText}</p>
    <div className='mt-6 flex flex-wrap gap-3'>
     <Link href={base+'/divesites'} className='rounded-xl bg-white px-5 py-3 font-bold text-[#062536]'>{t.existing}</Link>
     <Link href={base+'/scubadivingcourses'} className='rounded-xl border border-white/50 px-5 py-3 font-bold'>{t.courses}</Link>
    </div>
   </div>
   <h3 className='mt-12 text-2xl font-bold'>{t.other}</h3>
   <div className='mt-6 grid gap-5 md:grid-cols-2'>
    {spots.map((spot,i)=><article key={spot.name} className='rounded-2xl border border-white/15 bg-white/[.06] p-7'>
     <span className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-200'>{i%2===0?<Waves size={17}/>:<Fish size={17}/>} {spot.tag}</span>
     <h4 className='mt-3 text-2xl font-bold'>{spot.name}</h4>
     <p className='mt-3 leading-7 text-slate-200'>{spot.body}</p>
    </article>)}
   </div>
   <p className='mt-7 text-sm leading-6 text-slate-400'>{t.safety}</p>
   <p className='mt-4 text-sm text-cyan-100'>{t.sources}: <a href='https://www.padi.com/dive-site/thailand/southwest-pinnacle/' target='_blank' rel='noopener noreferrer' className='underline'>PADI Southwest Pinnacle</a> · <a href='https://www.padi.com/dive-site/thailand/chumphon-pinnacle-2/' target='_blank' rel='noopener noreferrer' className='underline'>PADI Chumphon Pinnacle</a> · <a href='https://www.padi.com/dive-site/thailand/richelieu-rock-3/' target='_blank' rel='noopener noreferrer' className='underline'>PADI Richelieu Rock</a></p>
  </section>
  <section className='bg-[#03283b] px-6 py-16 md:px-10'>
   <div className='mx-auto max-w-[1480px] rounded-2xl border border-white/20 bg-[#0a3c50] p-8 md:p-12'>
    <h2 className='text-3xl font-extrabold'>{t.plan}</h2>
    <p className='mt-4 max-w-2xl leading-7 text-slate-200'>{t.planText}</p>
    <div className='mt-7 flex flex-wrap gap-3'>
     <Link href={base+'/contact'} className='inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'><Mail size={18}/>{t.contact}</Link>
     <Link href={base+'/destinations/maldives'} className='inline-flex items-center gap-2 rounded-xl border border-white/50 px-6 py-3 font-bold'>{t.maldives}<ArrowRight size={18}/></Link>
    </div>
   </div>
  </section>
 </main><Footer/></>
}
