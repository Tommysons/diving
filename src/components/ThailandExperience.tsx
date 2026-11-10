import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Waves, Fish, Mail } from 'lucide-react'
import { diveSites, diveSitesRU } from '@/lib/data/diveSites'
import LokaVideoSection, { thailandVideos } from '@/components/LokaVideoSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import KohTaoAtlas from '@/components/KohTaoAtlas'

export default function ThailandExperience({ locale }: { locale: 'en' | 'ru' }) {
 const ru=locale==='ru', base=ru?'/ru':''
 const t=ru?{
  label:'ГЛАВА 01 · ТАИЛАНД',title:'Дайвинг в Таиланде',intro:'От рифов Ко Тао до впечатляющих дайв-сайтов Андаманского моря.',
  guide:'Исследовать дайв-сайты',heading:'Где погружаться в Таиланде',intro2:'Таиланд предлагает разные виды дайвинга: спокойные рифы для новичков, подводные скалы, затонувшие корабли и сильные течения для опытных дайверов.',
  koh:'Ко Тао — начало истории LokaWndr',kohText:'Ко Тао занимает особое место в истории LokaWndr. Здесь можно найти как неглубокие учебные рифы, так и более глубокие подводные скалы. Наши существующие статьи помогут познакомиться с местными дайв-сайтами.',
  gallery:'Дайв-сайты Ко Тао — фотографии и подробности',depth:'Глубина',current:'Течение',visibility:'Видимость',see:'Морские обитатели',details:'Подробнее о дайв-сайте',photos:'Фотогалерея',credit:'Фотографии предоставлены Mia',existing:'Наш гид по дайв-сайтам Ко Тао',courses:'Курсы дайвинга',other:'Скоро на LokaWndr · Другие места для дайвинга',
  plan:'Вопросы о дайвинге в Таиланде?',planText:'Напишите нам, чтобы узнать больше. Наличие инструкторов и возможность бронирования не гарантируются.',
  contact:'Связаться',maldives:'Исследовать Мальдивы',sources:'Источники',safety:'Условия и доступность дайв-сайтов зависят от сезона, погоды, течений и подготовки дайвера. Уточняйте информацию у местного оператора.'
 }:{
  label:'CHAPTER 01 · THAILAND',title:'Dive into Thailand',intro:'From Koh Tao’s reefs to the dramatic dive sites of the Andaman Sea.',
  guide:'Explore Dive Sites',heading:'Where to Dive in Thailand',intro2:'Thailand offers everything from calm training reefs to offshore pinnacles, wrecks and current-swept sites for experienced divers.',
  koh:'Koh Tao — Where LokaWndr Began',kohText:'Koh Tao is part of the LokaWndr story. Explore shallow training reefs as well as deeper offshore pinnacles, and discover the island through our existing dive-site guides.',
  gallery:'Koh Tao Dive Sites — Photos & Details',depth:'Depth',current:'Current',visibility:'Visibility',see:'Marine life',details:'View Full Dive-Site Guide',photos:'Photo Gallery',credit:'Photography by Mia',existing:'Explore Our Koh Tao Dive Sites',courses:'Scuba Diving Courses',other:'Coming to LokaWndr · More Thai Dive Destinations',
  plan:'Questions About Diving in Thailand?',planText:'Contact us to learn more. Instructor availability and trip bookings are not guaranteed.',
  contact:'Get in Touch',maldives:'Explore Maldives',sources:'Sources',safety:'Dive conditions and access depend on season, weather, currents and diver experience. Confirm details with a local operator.'
 }
 const spots=ru?[
  {name:'Sail Rock · Сиамский залив',tag:'Подводная скала и стаи рыб',body:'Известный дайв-сайт между Ко Тао и Ко Пханганом. Глубина и течения требуют внимательного планирования.'},
  {name:'Richelieu Rock · Андаманское море',tag:'Морская жизнь и мягкие кораллы',body:'Известная подводная скала у Суринских островов. Доступность зависит от сезона морского национального парка.'},
  {name:'Симиланские острова · Андаманское море',tag:'Гранитные валуны и рифы',body:'Знаменитый район с подводными скалами и рифами; сезон посещения ограничен правилами национального парка.'}
 ]:[
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
     <a href='#koh-tao-sites' className='rounded-xl bg-white px-5 py-3 font-bold text-[#062536]'>{t.existing}</a>
     <Link href={base+'/scubadivingcourses'} className='rounded-xl border border-white/50 px-5 py-3 font-bold'>{t.courses}</Link>
    </div>
   </div>
   <div id='koh-tao-sites' className='mt-12 scroll-mt-24'>
    <h3 className='text-3xl font-extrabold'>{ru?'Карта дайв-сайтов Ко Тао':'Koh Tao Dive Site Map'}</h3>
    <p className='mt-3 max-w-3xl text-sm leading-6 text-slate-300'>{ru?'Выберите номер на карте или название в списке, чтобы узнать больше. Расположение дайв-сайтов приблизительное; карта не предназначена для навигации.':'Select a number on the map or a site in the list to learn more. Dive-site locations are approximate; this illustration is not for navigation.'}</p>
    <KohTaoAtlas locale={locale}/>
    <h3 className='mt-12 text-3xl font-extrabold'>{t.gallery}</h3>
    <div className='mt-7 grid gap-7 lg:grid-cols-2'>
     {(ru ? diveSitesRU : diveSites).filter(site => site.imageUrl).map(site => (
      <article key={site.slug} className='overflow-hidden rounded-2xl border border-white/15 bg-white/[.06]'>
       <Link href={base+'/divesites/'+site.slug} className='block'>
        <div className='relative aspect-[16/9] overflow-hidden'>
         <Image src={site.imageUrl!} alt={site.name} fill sizes='(max-width: 1024px) 100vw, 50vw' className='object-cover transition-transform duration-500 hover:scale-105'/>
        </div>
       </Link>
       <div className='p-6'>
        <h4 className='text-2xl font-bold'>{site.name}</h4>
        <p className='mt-3 leading-7 text-slate-200'>{site.longDescription}</p>
        <dl className='mt-5 grid grid-cols-3 gap-3 border-y border-white/15 py-4 text-sm'>
         <div><dt className='text-slate-400'>{t.depth}</dt><dd className='mt-1 font-semibold'>{site.depth}</dd></div>
         <div><dt className='text-slate-400'>{t.current}</dt><dd className='mt-1 font-semibold'>{site.current}</dd></div>
         <div><dt className='text-slate-400'>{t.visibility}</dt><dd className='mt-1 font-semibold'>{site.visibility}</dd></div>
        </dl>
        {site.thingsToSee && site.thingsToSee.length>0 && <p className='mt-4 text-sm leading-6 text-slate-200'><strong>{t.see}: </strong>{site.thingsToSee.join(', ')}</p>}
        {site.extraImages && site.extraImages.filter(url=>/\.(webp|jpg|jpeg|png)$/i.test(url) && !url.includes('-map.')).length>0 && <>
         <h5 className='mt-6 text-sm font-bold uppercase tracking-wider text-cyan-200'>{t.photos}</h5>
         <div className='mt-3 grid grid-cols-3 gap-2'>
          {site.extraImages.filter(url=>/\.(webp|jpg|jpeg|png)$/i.test(url) && !url.includes('-map.')).slice(0,6).map((url,i)=>(
           <a key={url} href={url} target='_blank' rel='noopener noreferrer' aria-label={site.name+' photo '+(i+1)} className='relative aspect-square overflow-hidden rounded-lg'>
            <Image src={url} alt={site.name+' underwater photo '+(i+1)} fill sizes='(max-width: 768px) 33vw, 16vw' className='object-cover transition hover:scale-110'/>
           </a>
          ))}
         </div>
        </>}
        <Link href={base+'/divesites/'+site.slug} className='mt-6 inline-flex items-center gap-2 rounded-xl border border-white/50 px-5 py-3 font-semibold hover:bg-white/10'>{t.details}<ArrowRight size={18}/></Link>
       </div>
      </article>
     ))}
    </div>
    <p className='mt-5 text-sm text-slate-400'>{t.credit} <a href='https://www.instagram.com/kakadong123/' target='_blank' rel='noopener noreferrer' className='underline'>@kakadong123</a>.</p>
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
  <LokaVideoSection locale={locale} videos={thailandVideos} title={ru?'Видео о дайвинге в Таиланде':'Scuba Diving Videos from Thailand'}/>
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
