'use client'
import { useState } from 'react'
import AtlasGlobe from '@/components/AtlasGlobe'
import { ArrowLeft, ArrowRight, Globe2, MapPin, RotateCcw, Waves } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ViluAtlas from '@/components/ViluAtlas'
import KohTaoAtlas from '@/components/KohTaoAtlas'

type Destination = 'earth' | 'thailand' | 'maldives'
export default function LokaWndrAtlas({locale}:{locale:'en'|'ru'}) {
 const ru=locale==='ru', base=ru?'/ru':''
 const [destination,setDestination]=useState<Destination>('earth')
 const [selected,setSelected]=useState<string|null>(null)
 const [spin,setSpin]=useState(0)
 const [dragStart,setDragStart]=useState<number|null>(null)
 const t=ru?{
  eyebrow:'LOKAWNDR · ИНТЕРАКТИВНЫЙ АТЛАС',title:'Одна планета. Бесконечный океан.',lead:'Выберите направление и откройте места для дайвинга.',
  thailand:'Таиланд',maldives:'Мальдивы',explore:'Исследовать Ко Тао',soon:'Открыть Мальдивы',back:'Назад к Земле',sites:'Места для дайвинга · Ко Тао',
  mapNote:'Схематичная карта Ко Тао: маркеры показывают примерные районы погружений, а не точные GPS-координаты.',
  choose:'Выберите маркер, чтобы посмотреть описание и фотографии.',depth:'Глубина',current:'Течение',visibility:'Видимость',photos:'Фотографии',more:'Полная информация',return:'К карте',maldivesText:'Путеводитель по дайвингу и снорклингу на Мальдивах',maldivesLink:'Открыть путеводитель',photoCredit:'Подводные фотографии: Mia @kakadong123',globeNote:'Перетащите Землю, чтобы повернуть её. Выберите направление ниже.',reset:'Сбросить вращение'
 }:{
  eyebrow:'LOKAWNDR · INTERACTIVE ATLAS',title:'One planet. Infinite blue.',lead:'Choose a destination and discover underwater places.',
  thailand:'Thailand',maldives:'Maldives',explore:'Explore Koh Tao',soon:'Explore Maldives',back:'Back to Earth',sites:'Koh Tao · Dive Sites',
  mapNote:'Explore an illustrated map of Koh Tao. Markers indicate general dive-site areas, not verified GPS positions.',
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
 <AtlasGlobe focus='earth' locale={locale} onSelect={(target)=>{setDestination(target);setSelected(null)}}/>
 <div className='pointer-events-none absolute bottom-5 left-0 right-0 text-center text-xs tracking-wider text-cyan-100/70'>{t.globeNote}</div>
 </div>
 <div className='mx-auto mt-3 flex max-w-2xl flex-wrap justify-center gap-4'>
 <button onClick={()=>{setDestination('thailand');setSelected(null)}} className='flex items-center gap-3 rounded-2xl border border-cyan-300/40 bg-cyan-500/20 px-6 py-4 font-bold transition hover:bg-cyan-400/30'>{t.thailand}<ArrowRight size={17}/></button>
 <button onClick={()=>{setDestination('maldives');setSelected(null)}} className='flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-bold transition hover:bg-white/20'>{t.maldives}<ArrowRight size={17}/></button>
 <button onClick={()=>setSpin(0)} className='flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm text-slate-300 hover:bg-white/10'><RotateCcw size={16}/>{t.reset}</button>
 </div>
 </>:<>
 <button onClick={()=>{setDestination('earth');setSelected(null)}} className='mt-9 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10'><ArrowLeft size={17}/>{t.back}</button>
 {destination==='thailand'?<>
 <h2 className='mt-7 text-3xl font-extrabold'>{t.sites}</h2>
 <p className='mt-3 max-w-3xl text-sm text-slate-400'>{t.mapNote}</p>
 <KohTaoAtlas locale={locale}/>
 </>:<><h2 className='mt-7 text-3xl font-extrabold'>{ru?'Мальдивы · Дайв-сайты Vilu Reef':'Maldives · Vilu Reef Dive Sites'}</h2><p className='mb-7 mt-3 text-sm text-slate-400'>{ru?'Схематичная карта — не для навигации.':'Illustrative map — not for navigation.'}</p><ViluAtlas locale={locale}/></>}
 </>}
 </section></main><Footer/></>
}
