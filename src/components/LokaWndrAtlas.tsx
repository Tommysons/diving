'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Globe2, MapPin, RotateCcw, Waves } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { diveSites, diveSitesRU } from '@/lib/data/diveSites'

type Destination = 'earth' | 'thailand' | 'maldives'
const markers: Record<string,{x:number;y:number}> = {
 'chumphon-pinnacle':{x:37,y:25},'southwest-pinnacle':{x:25,y:65},
 'white-rock':{x:53,y:62},'twins':{x:38,y:46},
 'sattakut-shipwreck':{x:57,y:40},'313-shipwreck':{x:65,y:55},
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
  mapNote:'Схематичная карта для знакомства с дайв-сайтами. Положение маркеров приблизительное, не используйте для навигации.',
  choose:'Выберите маркер, чтобы посмотреть описание и фотографии.',depth:'Глубина',current:'Течение',visibility:'Видимость',photos:'Фотографии',more:'Полная информация',return:'К карте',maldivesText:'Путеводитель по дайвингу и снорклингу на Мальдивах',maldivesLink:'Открыть путеводитель',photoCredit:'Подводные фотографии: Mia @kakadong123',globeNote:'Перетащите Землю, чтобы повернуть её. Выберите направление ниже.',reset:'Сбросить вращение'
 }:{
  eyebrow:'LOKAWNDR · INTERACTIVE ATLAS',title:'One planet. Infinite blue.',lead:'Choose a destination and discover underwater places. Begin with Koh Tao.',
  thailand:'Thailand',maldives:'Maldives',explore:'Explore Koh Tao',soon:'Explore Maldives',back:'Back to Earth',sites:'Koh Tao · Dive Sites',
  mapNote:'Illustrative map for exploring dive sites. Marker positions are approximate and must not be used for navigation.',
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
 <div className='relative mx-auto mt-7 flex min-h-[350px] max-w-[850px] items-center justify-center md:min-h-[540px]'>
 <div className='pointer-events-none absolute h-[330px] w-[330px] rounded-full border border-cyan-400/20 md:h-[540px] md:w-[540px]' style={{transform:'rotateX(68deg) rotate(-20deg)'}}/>
 <div className='pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-3xl md:h-[480px] md:w-[480px]'/>
 <div role='img' aria-label={ru?'Вращающаяся Земля':'Rotatable Earth'} className='relative h-[280px] w-[280px] cursor-grab select-none overflow-hidden rounded-full border border-cyan-200/25 shadow-[inset_-40px_-20px_65px_#000d,0_0_35px_#3ecfff55,0_0_120px_#007dff22] active:cursor-grabbing md:h-[470px] md:w-[470px]'
 onPointerDown={e=>{setDragStart(e.clientX);e.currentTarget.setPointerCapture(e.pointerId)}}
 onPointerMove={e=>{if(dragStart!==null){setSpin(v=>v+(e.clientX-dragStart)*.6);setDragStart(e.clientX)}}}
 onPointerUp={()=>setDragStart(null)} onPointerCancel={()=>setDragStart(null)}>
 <div className='absolute inset-0' style={{backgroundImage:'url(https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg)',backgroundSize:'auto 100%',backgroundPosition:`${50+spin/3}% center`,filter:'saturate(1.25) contrast(1.1)'}}/>
 <div className='absolute inset-0 rounded-full' style={{background:'radial-gradient(circle at 30% 27%,#d4f8ff33,transparent 34%),linear-gradient(95deg,transparent 37%,#001223b8 95%)'}}/>
 </div>
 <div className='pointer-events-none absolute bottom-2 text-center text-xs tracking-wider text-cyan-100/70'>{t.globeNote}</div>
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
 <Image src='/images/koh-tao-map.jpg' alt='Koh Tao dive map' fill sizes='(max-width:1024px) 100vw, 60vw' className='object-contain opacity-75'/>
 <div className='absolute inset-0 bg-gradient-to-t from-[#021827]/45 to-transparent'/>
 {sites.filter(s=>markers[s.slug]).map(s=><button key={s.slug} style={{left:markers[s.slug].x+'%',top:markers[s.slug].y+'%'}} onClick={()=>setSelected(s.slug)} aria-label={s.name} title={s.name} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 p-2 shadow-[0_0_22px_#00cfffaa] transition hover:scale-125 ${selected===s.slug?'border-white bg-amber-400 text-[#05233a]':'border-white bg-cyan-400 text-[#05233a]'}`}><MapPin size={17}/></button>)}
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
 </>:<div className='mt-8 max-w-3xl rounded-3xl border border-cyan-300/20 bg-white/[.06] p-8'><h2 className='text-3xl font-bold'>{t.maldives}</h2><p className='mt-4 text-slate-300'>{t.maldivesText}</p><Link href={base+'/destinations/maldives'} className='mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#03283b]'>{t.maldivesLink}<ArrowRight size={17}/></Link></div>}
 </>}
 </section></main><Footer/></>
}
