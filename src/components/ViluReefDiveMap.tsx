'use client'
import { useState } from 'react'
import { MapPin, Compass, Waves } from 'lucide-react'

export default function ViluReefDiveMap({locale}:{locale:'en'|'ru'}) {
 const ru=locale==='ru'
 const [active,setActive]=useState(true)
 return <div className='relative min-h-[410px] overflow-hidden bg-[#05283f] md:min-h-[480px]'>
  <div className='absolute inset-0' style={{background:'radial-gradient(ellipse at 50% 47%,#1b8c9d 0%,#08728c 36%,#07516f 60%,#03263f 100%)'}}/>
  <svg className='absolute inset-0 h-full w-full' viewBox='0 0 600 480' preserveAspectRatio='xMidYMid meet' role='img' aria-label={ru?'Схематичная карта района Vilu Reef и Azmee Corner':'Illustrative map of Vilu Reef area and Azmee Corner'}>
   <defs>
    <linearGradient id='viluSea' x1='0' y1='0' x2='1' y2='1'><stop stopColor='#53d9cb' stopOpacity='.7'/><stop offset='1' stopColor='#0b657f' stopOpacity='.2'/></linearGradient>
    <linearGradient id='viluLand' x1='0' y1='0' x2='1' y2='1'><stop stopColor='#c9d89d'/><stop offset='.55' stopColor='#539b70'/><stop offset='1' stopColor='#246c5b'/></linearGradient>
   </defs>
   {Array.from({length:8},(_,i)=><ellipse key={i} cx='310' cy='240' rx={120+i*23} ry={77+i*19} fill='none' stroke='#a7e6ed' strokeOpacity={.11} strokeWidth='1.5'/>)}
   <path d='M228 170 Q268 123 336 146 T412 211 Q440 269 390 324 T255 329 Q181 282 205 221 Z' fill='url(#viluSea)' stroke='#6de3df' strokeOpacity='.35' strokeWidth='4'/>
   <path d='M290 192 Q317 181 343 202 Q362 228 349 255 Q330 277 303 259 Q277 235 290 192Z' fill='url(#viluLand)' stroke='#d2f5cb' strokeWidth='2'/>
   <path d='M450 290 Q472 270 488 288 Q493 308 470 320 Q446 319 450 290Z' fill='#9bcba0' stroke='#bde8c8' strokeWidth='2'/>
   <path d='M175 120 Q184 108 194 121 Q194 138 183 146 Q172 139 175 120Z' fill='#a6cda1' opacity='.7'/>
   <text x='315' y='237' textAnchor='middle' fill='#f3fff8' fontSize='14' fontWeight='700'>VILU REEF</text>
   <text x='470' y='342' textAnchor='middle' fill='#e2faff' fontSize='12'>Velavaru</text>
   <path d='M183 139 Q215 171 240 196' stroke='#fbbf24' strokeDasharray='5 6' strokeWidth='2' fill='none'/>
   <text x='20' y='457' fill='#c9effa' fontSize='11' opacity='.8'>ILLUSTRATIVE • NOT TO SCALE</text>
   <g transform='translate(555 38)'><path d='M0 18 L8 0 L16 18 L8 14 Z' fill='#d3f7ff'/><text x='8' y='31' fill='#d3f7ff' fontSize='11' textAnchor='middle'>N</text></g>
  </svg>
  <div className='absolute left-5 top-5 rounded-xl border border-cyan-200/20 bg-[#03263f]/90 px-4 py-3 text-xs font-semibold tracking-widest text-cyan-100'><Compass size={15} className='mr-2 inline'/> {ru?'РАЙОН VILU REEF':'VILU REEF AREA'}</div>
  <button type='button' onClick={()=>setActive(v=>!v)} aria-pressed={active} className={`absolute left-[30%] top-[25%] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold shadow-[0_0_25px_#fbbf2477] transition hover:scale-105 ${active?'border-amber-200 bg-amber-400 text-[#07243a]':'border-white/50 bg-[#052c43] text-white'}`}><MapPin size={16}/> Azmee Corner</button>
  {active&&<div className='absolute bottom-16 left-4 right-4 rounded-2xl border border-amber-200/30 bg-[#021e32]/95 p-4 text-white shadow-xl backdrop-blur md:left-auto md:right-5 md:w-[280px]'>
   <div className='flex items-center gap-2 text-sm font-bold text-amber-200'><Waves size={16}/> Azmee Corner</div>
   <p className='mt-2 text-xs leading-5 text-slate-200'>{ru?'Предполагаемый район к северо-западу от Велавару по вашей отметке на скриншоте. Положение не подтверждено GPS.':'Approximate area northwest of Velavaru based on your marked screenshot. Position is not GPS-verified.'}</p>
   </div>}
  <div className='absolute bottom-3 left-4 right-4 text-[11px] text-cyan-100/80'>{ru?'Схема района · Vilu Reef — центр исследования · Не для навигации':'Concept map · Vilu Reef exploration hub · Not for navigation'}</div>
 </div>
}
