'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { diveSites, diveSitesRU } from '@/lib/data/diveSites'

const markers: Record<string,{x:number;y:number}> = {
 'chumphon-pinnacle':{x:31,y:17},'southwest-pinnacle':{x:18,y:67},
 'white-rock':{x:28,y:60},'twins':{x:28,y:34},
 'sattakut-shipwreck':{x:24,y:48},'313-shipwreck':{x:73,y:43},
}
export default function KohTaoAtlas({locale}:{locale:'en'|'ru'}) {
 const ru=locale==='ru', base=ru?'/ru':''
 const sites=ru?diveSitesRU:diveSites
 const [selected,setSelected]=useState<string|null>(null)
 const site=sites.find(s=>s.slug===selected)
 const t=ru?{depth:'Глубина',current:'Течение',visibility:'Видимость',photos:'Фотографии',more:'Подробнее о дайв-сайте',photoCredit:'Подводные фотографии: Mia @kakadong123'}:{depth:'Depth',current:'Current',visibility:'Visibility',photos:'Photo gallery',more:'View Full Dive-Site Guide',photoCredit:'Underwater photography: Mia @kakadong123'}
 return <div className='mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,1fr)]'>
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
 <span className='absolute left-5 top-5 rounded-full border border-cyan-200/25 bg-[#06243a]/80 px-4 py-2 text-xs tracking-wider text-cyan-100'>LOKAWNDR · KOH TAO</span>
 {sites.filter(s=>markers[s.slug]).map((s,i)=><button key={s.slug} type='button' onClick={()=>setSelected(s.slug)} style={{left:markers[s.slug].x+'%',top:markers[s.slug].y+'%'}} aria-label={`${i+1}. ${s.name}`} aria-pressed={selected===s.slug} className={'group absolute z-10 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white text-xs font-bold text-[#05233a] shadow-[0_0_22px_#00cfffaa] transition hover:scale-110 focus-visible:z-20 '+(selected===s.slug?'bg-amber-400':'bg-cyan-400')}>{i+1}<span className='pointer-events-none absolute bottom-full left-1/2 mb-3 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#031a2c] px-3 py-2 text-xs font-bold text-white group-hover:block group-focus-visible:block'>{s.name}</span></button>)}
 <span className='absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#031a2c]/80 px-3 py-2 text-xs'>{ru?'Иллюстрация · Не для навигации':'Illustration · Not for navigation'}</span>
 </div>
 <aside aria-live='polite' className='min-w-0 rounded-3xl border border-white/15 bg-white/[.06] p-5 md:p-7'>
 {site?<><div className='relative aspect-[16/9] overflow-hidden rounded-xl'>{site.imageUrl&&<Image src={site.imageUrl} alt={site.name} fill sizes='(max-width:1024px) 100vw, 40vw' className='object-cover'/>}</div>
 <h3 className='mt-5 text-2xl font-bold'>{site.name}</h3><p className='mt-3 text-sm leading-7 text-slate-200'>{site.longDescription}</p>
 <dl className='mt-5 grid grid-cols-3 gap-2 border-y border-white/15 py-4 text-xs'>
 <div><dt className='text-slate-400'>{t.depth}</dt><dd className='mt-1 font-bold'>{site.depth}</dd></div>
 <div><dt className='text-slate-400'>{t.current}</dt><dd className='mt-1 font-bold'>{site.current}</dd></div>
 <div><dt className='text-slate-400'>{t.visibility}</dt><dd className='mt-1 font-bold'>{site.visibility}</dd></div></dl>
 <h4 className='mt-5 font-bold'>{t.photos}</h4><div className='mt-3 grid grid-cols-3 gap-2'>{(site.extraImages||[]).filter(p=>!p.includes('-map.')).slice(0,6).map((p,i)=><a href={p} target='_blank' rel='noopener noreferrer' key={p} className='relative aspect-square overflow-hidden rounded-lg'><Image src={p} alt={site.name+' '+(i+1)} fill sizes='120px' className='object-cover hover:scale-110'/></a>)}</div>
 <Link href={base+'/divesites/'+site.slug} className='mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-100 px-5 py-3 font-bold text-[#03283b]'>{t.more}<ArrowRight size={16}/></Link>
 <p className='mt-5 text-xs text-slate-400'>{t.photoCredit}</p>
 </>:<p className='py-12 text-center text-slate-300'>{ru?'Выберите номер на карте или название ниже.':'Select a number on the map or a site below.'}</p>}
 <div className='mt-6 max-h-72 overflow-y-auto border-t border-white/15 pt-4'><h4 className='mb-3 font-bold'>{ru?'Все дайв-сайты':'All dive sites'}</h4>{sites.filter(s=>markers[s.slug]).map((s,i)=><button key={s.slug} type='button' onClick={()=>setSelected(s.slug)} aria-pressed={selected===s.slug} className={'block min-h-11 w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/10 '+(selected===s.slug?'bg-cyan-200/20 text-white':'text-slate-200')}>{i+1}. {s.name}</button>)}</div>
 </aside></div>
}
