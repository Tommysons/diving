'use client'
import { useState } from 'react'
import { maldivesReefSites } from '@/lib/data/maldivesReefSites'
export default function MaldivesReefExplorer({ru}:{ru:boolean}) {
 const [selected,setSelected]=useState(maldivesReefSites[0].slug)
 const site=maldivesReefSites.find(s=>s.slug===selected)!
 return <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
  <div className="max-h-[460px] space-y-2 overflow-y-auto rounded-2xl border border-white/15 bg-white/5 p-3" aria-label={ru?'Список дайв-сайтов':'Dive site list'}>
   {maldivesReefSites.map(s=><button type="button" key={s.slug} onClick={()=>setSelected(s.slug)} aria-pressed={selected===s.slug} className={`flex w-full items-center justify-between gap-3 rounded-xl p-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${selected===s.slug?'bg-cyan-300 text-slate-950':'bg-white/5 text-white hover:bg-white/15'}`}><span className="font-semibold">{s.name}</span><span className="shrink-0">{s.minDepthM}–{s.maxDepthM} m</span></button>)}
  </div>
  <div aria-live="polite" className="rounded-2xl border border-cyan-300/20 bg-white/5 p-5">
   <p className="text-xs uppercase tracking-widest text-cyan-300">{ru?'Схема рифа':'Reef briefing diagram'}</p>
   <h3 className="mt-2 text-2xl font-bold">{site.name}</h3>
   <p className="mt-3 text-slate-200">{ru?'Диапазон глубин по схеме':'Depth range shown on diagram'}: <strong>{site.minDepthM}–{site.maxDepthM} m</strong></p>
   {site.boatMinutes&&<p className="mt-2 text-sm text-slate-300">{ru?'Время на лодке по схеме':'Boat trip shown on diagram'}: {site.boatMinutes} min</p>}
   {site.surfaceIsland&&<p className="mt-2 text-sm text-slate-300">{ru?'Остров':'Island'}: {site.surfaceIsland}</p>}
   <div className="mt-5 flex flex-wrap gap-2">{site.features.map(f=><span key={f} className="rounded-full border border-white/20 px-3 py-1 text-xs capitalize text-cyan-100">{f.replaceAll('-',' ')}</span>)}</div>
   <p className="mt-6 text-xs leading-6 text-slate-400">{ru?'Предварительные данные по фотографиям схем. Не является навигационной или батиметрической картой. Течения и условия необходимо проверять на месте.':'Preliminary data transcribed from photographed briefing diagrams. Not a navigation or surveyed bathymetry chart. Verify depths, currents and conditions locally.'}</p>
  </div>
 </div>
}
