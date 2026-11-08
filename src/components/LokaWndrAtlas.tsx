'use client'
import { useState } from 'react'
import AtlasGlobe from '@/components/AtlasGlobe'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe2, MapPin, RotateCcw, Waves } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ViluReefDiveMap from '@/components/ViluReefDiveMap'
import { diveSites, diveSitesRU } from '@/lib/data/diveSites'

type Destination = 'earth' | 'thailand' | 'maldives'
const markers: Record<string,{x:number;y:number}> = {
 'chumphon-pinnacle':{x:31,y:17},'southwest-pinnacle':{x:18,y:67},
 'white-rock':{x:28,y:60},'twins':{x:28,y:34},
 'sattakut-shipwreck':{x:24,y:48},'313-shipwreck':{x:73,y:43},
}
export default function LokaWndrAtlas({locale}:{locale:'en'|'ru'}) {
 const ru=locale==='ru', base=ru?'/ru':''
 const sites=ru?diveSitesRU:diveSites
 const [destination,setDestination]=useState<Destination>('earth')
 const [selected,setSelected]=useState<string|null>(null)
 const [spin,setSpin]=useState(0)
 const [dragStart,setDragStart]=useState<number|null>(null)
 const site=sites.find(s=>s.slug===selected)
 const t=ru?{
  eyebrow:'LOKAWNDR · ИНТЕРАКТИВНЫЙ АТЛАС',title:'Одна планета. Бесконечный океан.',lead:'Выберите направление и откройте места для дайвинга. Начните с Ко Тао.',
  thailand:'Таиланд',maldives:'Мальдивы',explore:'Исследовать Ко Тао',soon:'Открыть Мальдивы',back:'Назад к Земле',sites:'Места для дайвинга · Ко Тао',
  mapNote:'Интерактивная 3D-иллюстрация Ко Тао: маркеры показывают общие районы погружений, а не точные GPS-координаты.',
  choose:'Выберите маркер, чтобы посмотреть описание и фотографии.',depth:'Глубина',current:'Течение',visibility:'Видимость',photos:'Фотографии',more:'Полная информация',return:'К карте',maldivesText:'Путеводитель по дайвингу и снорклингу на Мальдивах',maldivesLink:'Открыть путеводитель',photoCredit:'Подводные фотографии: Mia @kakadong123',globeNote:'Перетащите Землю, чтобы повернуть её. Выберите направление ниже.',reset:'Сбросить вращение'
 }:{
  eyebrow:'LOKAWNDR · INTERACTIVE ATLAS',title:'One planet. Infinite blue.',lead:'Choose a destination and discover underwater places. Begin with Koh Tao.',
  thailand:'Thailand',maldives:'Maldives',explore:'Explore Koh Tao',soon:'Explore Maldives',back:'Back to Earth',sites:'Koh Tao · Dive Sites',
  mapNote:'Explore a stylized 3D view of Koh Tao. Markers indicate general dive-site areas, not verified GPS positions.',
  choose:'Select a marker to discover dive information and underwater photos.',depth:'Depth',current:'Current',visibility:'Visibility',photos:'Photo gallery',more:'Full dive-site guide',return:'Back to map',maldivesText:'Discover the Maldives scuba diving and snorkeling guide',maldivesLink:'Open Maldives guide',photoCredit:'Underwater photography: Mia @kakadong123',globeNote:'Drag the Earth to rotate it. Choose a destination below.',reset:'Reset rotation'
 }
 return <><Header/><main className='min-h-screen overflow-hidden bg-[#020d1b] text-white'>
 <section className='relative isolate mx-auto max-w-[1480px] px-5 pb-20 pt-14 md:px-10'>
 <div aria-hidden className='pointer-events-none absolute inset-0 -z-10' style={{background:'radial-gradient(ellipse at 50% 43%, #07557966, #021528 45%, #020d1b 76%)'}}/>
 <div className='pointer-events-none absolute inset-0 -z-10 opacity-40' style={{backgroundImage:'radial-gradient(#ffffff77 1px,transparent 1px)',backgroundSize:'47px 53px'}}/>
 <p className='text-xs font-bold tracking-[.25em] text-cyan-300'>{t.eyebrow}</p>
 <h1 className='mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl'>{t.title}</h1>
 <p className='mt-5 max-w-2xl text-lg text-slate-300'>{t.lead}</p>
 {destination==='earth'?<>
 <div className='relative mx-auto mt-7 h-[390px] max-w-[950px] overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-[#020b19] md:h-[570px]'>
 <AtlasGlobe focus='earth'/>
 <div className='pointer-events-none absolute bottom-5 left-0 right-0 text-center text-xs tracking-wider text-cyan-100/70'>{t.globeNote}</div>
 </div>
 <div className='mx-auto mt-3 flex max-w-2xl flex-wrap justify-center gap-4'>
 <button onClick={()=>{setDestination('thailand');setSelected(null)}} className='flex items-center gap-3 rounded-2xl border border-cyan-300/40 bg-cyan-500/20 px-6 py-4 font-bold transition hover:bg-cyan-400/30'><MapPin size={20}/>{t.thailand}<ArrowRight size={17}/></button>
 <button onClick={()=>{setDestination('maldives');setSelected(null)}} className='flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold transition hover:bg-white/20'><Waves size={20}/>{t.maldives}<ArrowRight size={17}/></button>
 <button onClick={()=>setSpin(0)} className='flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm text-slate-300 hover:bg-white/10'><RotateCcw size={16}/>{t.reset}</button>
 </div>
 </>:<>
 <button onClick={()=>{setDestination('earth');setSelected(null)}} className='mt-9 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10'><ArrowLeft size={17}/>{t.back}</button>
 {destination==='thailand'?<>
 <h2 className='mt-7 text-3xl font-extrabold'>{t.sites}</h2>
 <p className='mt-3 max-w-3xl text-sm text-slate-400'>{t.mapNote}</p>
 <div className='mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,1fr)]'>
 <div className='relative aspect-[4/5] max-h-[730px] overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#07334c] md:aspect-[5/4]'>
 <div className='absolute inset-0' style={{background:'radial-gradient(ellipse at 55% 43%,#187b8b 0%,#07506a 38%,#031e37 77%)'}}/>
 <div className='absolute inset-0 opacity-30' style={{backgroundImage:'repeating-radial-gradient(ellipse at 50% 48%,transparent 0px,transparent 23px,#8eeaff44 24px,#8eeaff44 25px)'}}/>
 <svg viewBox='0 0 100 100' preserveAspectRatio='none' className='absolute inset-0 h-full w-full drop-shadow-[12px_18px_16px_#001321]'>
 <defs><linearGradient id='islandLand' x1='0' y1='0' x2='1' y2='1'><stop stopColor='#92bc8b'/><stop offset='.4' stopColor='#377f66'/><stop offset='1' stopColor='#0c473d'/></linearGradient><filter id='islandShadow'><feGaussianBlur stdDeviation='1.5'/></filter></defs>
 <path d='M52 9 C64 12 65 24 63 32 C70 42 65 52 62 60 C63 70 55 80 49 92 C42 96 35 85 36 74 C32 63 34 52 37 44 C32 35 38 24 42 17 Z' fill='#001c28' opacity='.65' transform='translate(2 3)' filter='url(#islandShadow)'/>
 <path d='M52 9 C64 12 65 24 63 32 C70 42 65 52 62 60 C63 70 55 80 49 92 C42 96 35 85 36 74 C32 63 34 52 37 44 C32 35 38 24 42 17 Z' fill='url(#islandLand)' stroke='#a6ead7' strokeWidth='.8'/>
 <path d='M49 17 C54 25 46 32 54 41 S48 54 54 63 S47 79 47 88' fill='none' stroke='#b8dba3' strokeWidth='3' opacity='.36'/>
 <path d='M43 29 Q55 35 43 49 M43 61 Q56 66 44 77' fill='none' stroke='#d2e4b2' strokeWidth='1.5' opacity='.35'/>
 </svg>
 <div className='pointer-events-none absolute left-[51%] top-[52%] -translate-x-1/2 -translate-y-1/2 -rotate-[75deg] text-xl font-black tracking-[.25em] text-white/35 md:text-2xl'>KOH TAO</div>
 <span className='absolute left-5 top-5 rounded-full border border-cyan-200/25 bg-[#06243a]/80 px-4 py-2 text-xs tracking-wider text-cyan-100'>LOKAWNDR · 3D ISLAND CONCEPT</span>
 {sites.filter(s=>markers[s.slug]).map(s=><button key={s.slug} type='button' onClick={()=>setSelected(s.slug)} style={{left:markers[s.slug].x+'%',top:markers[s.slug].y+'%'}} aria-label={s.name} className='group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-cyan-400 p-2 text-[#05233a] shadow-[0_0_22px_#00cfffaa] transition hover:scale-110 focus-visible:z-20'><MapPin size={17}/><span className='pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#031a2c] px-3 py-2 text-xs font-bold text-white shadow-lg group-hover:block group-focus-visible:block'>{s.name}</span></button>)}
 <span className='absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#031a2c]/80 px-3 py-2 text-xs'>{ru?'Иллюстрация · Не для навигации':'Illustration · Not for navigation'}</span>
 </div>
 <aside className='min-w-0 rounded-3xl border border-white/15 bg-white/[.06] p-5 md:p-7'>
 {site?<><div className='relative aspect-[16/9] overflow-hidden rounded-xl'>{site.imageUrl&&<Image src={site.imageUrl} alt={site.name} fill sizes='(max-width:1024px) 100vw, 40vw' className='object-cover'/>}</div>
 <h3 className='mt-5 text-2xl font-bold'>{site.name}</h3><p className='mt-3 text-sm leading-7 text-slate-200'>{site.longDescription}</p>
 <dl className='mt-5 grid grid-cols-3 gap-2 border-y border-white/15 py-4 text-xs'>
 <div><dt className='text-slate-400'>{t.depth}</dt><dd className='mt-1 font-bold'>{site.depth}</dd></div>
 <div><dt className='text-slate-400'>{t.current}</dt><dd className='mt-1 font-bold'>{site.current}</dd></div>
 <div><dt className='text-slate-400'>{t.visibility}</dt><dd className='mt-1 font-bold'>{site.visibility}</dd></div></dl>
 <h4 className='mt-5 font-bold'>{t.photos}</h4><div className='mt-3 grid grid-cols-3 gap-2'>{(site.extraImages||[]).filter(p=>!p.includes('-map.')).slice(0,6).map((p,i)=><a href={p} target='_blank' rel='noopener noreferrer' key={p} className='relative aspect-square overflow-hidden rounded-lg'><Image src={p} alt={site.name+' '+(i+1)} fill sizes='120px' className='object-cover hover:scale-110'/></a>)}</div>
 <Link href={base+'/divesites/'+site.slug} className='mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-100 px-5 py-3 font-bold text-[#03283b]'>{t.more}<ArrowRight size={16}/></Link>
 <p className='mt-5 text-xs text-slate-400'>{t.photoCredit}</p>
 </>:<div className='flex h-full min-h-[250px] flex-col items-center justify-center gap-5 text-center'><Globe2 size={48} className='text-cyan-300'/><p className='max-w-xs text-slate-300'>{t.choose}</p></div>}
 </aside></div>
 </>:<><h2 className='mt-7 text-3xl font-extrabold'>{ru?'Мальдивы · Дайв-сайты Vilu Reef':'Maldives · Vilu Reef Dive Sites'}</h2><p className='mt-3 text-sm text-slate-400'>{ru?'Схематичная карта — не для навигации.':'Illustrative map — not for navigation.'}</p><div className='mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,1fr)]'><div className='overflow-hidden rounded-3xl border border-cyan-300/20'><ViluReefDiveMap locale={locale}/></div><aside className='rounded-3xl border border-white/15 bg-white/[.06] p-5 md:p-7'><div className='grid aspect-video place-items-center rounded-xl bg-gradient-to-br from-cyan-900 to-[#031a2c] text-center font-bold tracking-widest text-cyan-100'>TO BE LOKAWNDRED</div><h3 className='mt-5 text-2xl font-bold'>Azmee Corner</h3><p className='mt-3 text-sm leading-7 text-slate-200'>{ru?'Дайв-сайт в районе Vilu Reef с подводной стеной, навесами и морскими обитателями.':'A dive site in the Vilu Reef area, with a reef wall, overhangs and marine life.'}</p><p className='mt-4 text-sm text-slate-400'>{ru?'Глубина, течение и видимость: уточняйте у местного дайв-центра.':'Depth, current and visibility: check with the local dive centre.'}</p><Link href={base+'/destinations/maldives#azmee-corner'} className='mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-100 px-5 py-3 font-bold text-[#03283b]'>{t.more}<ArrowRight size={16}/></Link></aside></div></>}
 </>}
 </section></main><Footer/></>
}
