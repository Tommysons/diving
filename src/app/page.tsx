'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Waves, Fish, Play, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { blogPosts } from '@/lib/data/blogPosts'
import { blogPostsRU } from '@/lib/data/blogPostsRU'

const stories = [
 { title:'Swimming With Mantas & a Whale Shark | Maldives', type:'snorkeling', id:'ZnC4xG3lMlk' },
 { title:'Snorkeling in the Azmee Corner', type:'snorkeling', id:'v5j3utsgwOo' },
 { title:'Wondering in Chumphon Pinnacle', type:'diving', id:'8qt0x0oU4hw' },
 { title:'Wondering in wreck Sattakut', type:'diving', id:'dclxFrsdWVY' },
]
export default function HomePage() {
 const pathname=usePathname()||'/'
 const ru=pathname.startsWith('/ru')
 const base=ru?'/ru':''
 const [filter,setFilter]=useState('all')
 const t=ru?{
  eyebrow:'L O K A W N D R',title:'Открой подводный мир с LokaWndr',subtitle:'Дайвинг, снорклинг и приключения в удивительных уголках океана.',
  plan:'Исследовать дайвинг',watch:'Наши видео',diving:'Дайвинг',diveInfo:'Курсы · Дайв-сайты · Погружения',snorkel:'Снорклинг',snorkelInfo:'Рифы · Морская жизнь · Океан',
  destinations:'Наши направления',destInfo:'Невероятные погружения, яркая морская жизнь и впечатления.',thailand:'Таиланд',thaiLead:'Ко Тао — где всё началось.',thaiInfo:'Дайвинг, коралловые рифы и островная жизнь.',maldives:'Мальдивы',malLead:'Новое океанское приключение.',malInfo:'Манты, китовые акулы, рифы и снорклинг.',explore:'Исследовать',stories:'Истории дайвинга и снорклинга',all:'Все',marine:'Морская жизнь',view:'Все истории'
 }:{
  eyebrow:'L O K A W N D R',title:'Explore the Underwater World with LokaWndr',subtitle:'Scuba diving, snorkeling and ocean adventures in extraordinary destinations.',
  plan:'Explore Diving',watch:'Watch Our Videos',diving:'Scuba Diving',diveInfo:'Courses · Dive Sites · Ocean Stories',snorkel:'Snorkeling',snorkelInfo:'Reefs · Marine Life · Ocean Trips',
  destinations:'Our Destinations',destInfo:'Chosen for incredible diving, vibrant marine life, and unforgettable ocean experiences.',thailand:'Thailand',thaiLead:'Koh Tao — where the journey began.',thaiInfo:'Scuba diving, vibrant reefs and a true dive community.',maldives:'Maldives',malLead:'A new ocean adventure.',malInfo:'Pristine reefs, manta rays, whale sharks and exceptional snorkeling.',explore:'Explore',stories:'Latest Dive & Snorkel Stories',all:'All',marine:'Marine Life',view:'View All Stories'
 }
 const destinations=[
  {id:'01',title:t.thailand,lead:t.thaiLead,info:t.thaiInfo,img:'/images/cpn6a.webp',href:base+'/destinations/thailand'},
  {id:'02',title:t.maldives,lead:t.malLead,info:t.malInfo,img:'/images/hero-about-a.webp',href:base+'/destinations/maldives'}
 ]
 const tabs=[{id:'all',label:t.all},{id:'diving',label:t.diving},{id:'snorkeling',label:t.snorkel}]
 const posts=[...(ru?blogPostsRU:blogPosts)].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3)
 return <><Header/><main className='bg-[#06283a] text-white'>
  <section className='relative isolate overflow-hidden'>
   <div className='absolute inset-0'><Image src='/images/hero-about-a.webp' alt='Scuba diver exploring the underwater world' fill priority fetchPriority='high' sizes='100vw' className='object-cover'/><div className='absolute inset-0 bg-gradient-to-r from-[#032538]/95 via-[#034461]/65 to-[#032538]/10'/><div className='absolute inset-0 bg-gradient-to-t from-[#022335]/80 via-transparent to-transparent'/></div>
   <div className='relative mx-auto flex min-h-[460px] max-w-[1480px] items-center px-6 py-16 md:min-h-[540px] md:px-10'>
    <div className='max-w-[710px]'>
     <p className='mb-4 text-xs font-bold tracking-[.25em]'>{t.eyebrow}</p>
     <h1 className='text-4xl font-extrabold leading-[1.09] tracking-tight md:text-6xl'>{t.title}</h1>
     <p className='mt-5 max-w-xl text-lg leading-snug text-white/95 md:text-xl'>{t.subtitle}</p>
     <div className='mt-7 flex flex-wrap gap-3'><Link href={base+'/divesites'} className='rounded-xl bg-white px-7 py-3.5 font-bold text-[#062536] hover:bg-cyan-100'>{t.plan}</Link><Link href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-xl border border-white px-6 py-3.5 font-semibold hover:bg-white/15'><Play size={18}/>{t.watch}</Link></div>
    </div>
   </div>
   <div className='relative border-t border-white/15 bg-[#062b3c]/65 backdrop-blur-sm'><div className='mx-auto grid max-w-[1480px] gap-5 px-6 py-5 md:grid-cols-2 md:px-10'>
    <Link href={base+'/scubadivingcourses'} className='flex items-center gap-4'><Waves className='shrink-0' size={32}/><span><strong className='block text-lg'>{t.diving}</strong><small className='text-white/85'>{t.diveInfo}</small></span></Link>
    <Link href={base+'/destinations/maldives'} className='flex items-center gap-4'><Fish className='shrink-0' size={32}/><span><strong className='block text-lg'>{t.snorkel}</strong><small className='text-white/85'>{t.snorkelInfo}</small></span></Link>
   </div></div>
  </section>
  <section className='mx-auto max-w-[1480px] px-6 pb-8 pt-10 md:px-10'>
   <div className='mb-5 flex flex-wrap items-end justify-between gap-3'><h2 className='text-3xl font-extrabold tracking-tight md:text-4xl'>{t.destinations}</h2><p className='max-w-xl text-sm text-slate-200'>{t.destInfo}</p></div>
   <div className='grid gap-5 md:grid-cols-2'>{destinations.map(d=><Link href={d.href} key={d.id} className='group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl border border-white/60 p-7 md:min-h-[300px] md:p-9'>
    <Image src={d.img} alt={d.title} fill sizes='(max-width: 768px) 100vw, 50vw' className='object-cover transition duration-500 group-hover:scale-105'/>
    <div className='absolute inset-0 bg-gradient-to-r from-[#03283c]/95 via-[#03283c]/65 to-transparent'/>
    <div className='relative'><p className='text-xs font-bold tracking-[.2em]'>CHAPTER {d.id}</p><h3 className='mt-1 text-4xl font-extrabold md:text-5xl'>{d.title}</h3><p className='mt-1 font-semibold'>{d.lead}</p><p className='mt-2 max-w-[290px] text-sm text-slate-100'>{d.info}</p><span className='mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#062536]'>{t.explore} {d.title}<ArrowRight size={16}/></span></div>
   </Link>)}</div>
  </section>
  <section className='mx-auto max-w-[1480px] px-6 pb-20 pt-5 md:px-10'>
   <div className='mb-5 flex flex-wrap items-center justify-between gap-4'><h2 className='text-3xl font-extrabold tracking-tight md:text-4xl'>{ru?'Видео о дайвинге и снорклинге':'Dive & Snorkel Videos'}</h2><a href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 text-sm font-semibold'>{ru?'Все видео на YouTube':'All videos on YouTube'}<ArrowRight size={17}/></a></div>
   <div className='mb-5 flex flex-wrap gap-2' aria-label={ru?'Фильтр видео':'Filter videos'}>{tabs.map(tab=><button key={tab.id} onClick={()=>setFilter(tab.id)} aria-pressed={filter===tab.id} className={'min-h-11 rounded-full px-5 py-2 text-sm font-semibold transition '+(filter===tab.id?'bg-white text-[#062536]':'text-white hover:bg-white/15')}>{tab.label}</button>)}</div>
   <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>{stories.filter(s=>filter==='all'||s.type===filter).map(s=><a key={s.id} href={'https://www.youtube.com/watch?v='+s.id} target='_blank' rel='noopener noreferrer' className='group overflow-hidden rounded-2xl border border-white/20 bg-white/[.06]'><div className='relative aspect-video overflow-hidden'><img src={'https://i.ytimg.com/vi/'+s.id+'/hqdefault.jpg'} alt='' loading='lazy' className='h-full w-full object-cover'/><div className='absolute inset-0 flex items-center justify-center'><span className='rounded-full border-2 border-white bg-black/40 p-4'><Play size={24} fill='white'/></span></div></div><span className='block p-4 text-sm font-bold'>{s.title}</span></a>)}</div>
  </section>
  <section className='mx-auto max-w-[1480px] px-6 pb-20 md:px-10'>
   <div className='mb-6 flex flex-wrap items-center justify-between gap-4'><h2 className='text-3xl font-extrabold tracking-tight md:text-4xl'>{ru?'Последние статьи блога':'Latest from the Blog'}</h2><Link href={base+'/blog'} className='inline-flex items-center gap-2 text-sm font-semibold'>{ru?'Все статьи':'View all articles'}<ArrowRight size={17}/></Link></div>
   <div className='grid gap-5 md:grid-cols-3'>{posts.map(post=><Link key={post.slug} href={base+'/blog/'+post.slug} className='group overflow-hidden rounded-2xl border border-white/15 bg-white/[.06]'><div className='relative aspect-video bg-[#031b2d]'><Image src={post.image} alt='' fill sizes='(max-width: 768px) 100vw, 33vw' className={post.slug==='maldives-manta-rays-dolphins-snorkeling'?'object-contain':'object-cover transition duration-500 group-hover:scale-105'}/></div><div className='p-5'><p className='text-xs text-cyan-200'>{post.date}</p><h3 className='mt-2 text-lg font-bold'>{post.title}</h3><p className='mt-2 text-sm leading-6 text-slate-200'>{post.excerpt}</p></div></Link>)}</div>
  </section>
 </main><Footer/></>
}
