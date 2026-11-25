'use client'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import {ChevronLeft, ChevronRight, Pause, Play} from 'lucide-react'

type Props={images:string[];ru:boolean;label:string}
export default function TripPhotoCarousel({images,ru,label}:Props){
 const [index,setIndex]=useState(0)
 const [paused,setPaused]=useState(false)
 const [hovered,setHovered]=useState(false)
 const [focused,setFocused]=useState(false)
 const [reducedMotion,setReducedMotion]=useState(false)
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)')
  const sync=()=>setReducedMotion(media.matches)
  sync()
  media.addEventListener('change',sync)
  return()=>media.removeEventListener('change',sync)
 },[])
 useEffect(()=>{
  if(paused||hovered||focused||reducedMotion||images.length<2)return
  const timer=window.setInterval(()=>setIndex(i=>(i+1)%images.length),3000)
  return()=>window.clearInterval(timer)
 },[paused,hovered,focused,reducedMotion,images.length])
 const move=(direction:number)=>setIndex(i=>(i+direction+images.length)%images.length)
 if(!images.length)return null
 return <div className="relative mt-6" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setFocused(false)}}>
  <div className="relative overflow-hidden rounded-2xl border border-cyan-200/25 bg-[#103246] shadow-xl shadow-black/20" role="region" aria-roledescription="carousel" aria-label={label}>
   <div className="flex" style={{transform:`translateX(-${index*100}%)`,transition:reducedMotion?'none':'transform 700ms cubic-bezier(0.22,1,0.36,1)'}}>
    {images.map((src,i)=><a key={src} href={src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] w-full shrink-0 sm:aspect-[16/8]" tabIndex={i===index?0:-1} aria-hidden={i!==index} aria-label={(ru?'Открыть фото ':'Open photo ')+(i+1)}>
     <Image src={src} alt={label+' '+(i+1)} fill sizes="(max-width: 768px) 100vw, 1100px" className="object-cover" priority={i===0}/>
    </a>)}
   </div>
   <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061725]/85 to-transparent"/>
   <div className="absolute bottom-4 left-4 rounded-full bg-[#061725]/75 px-3 py-1 text-sm font-semibold text-white">{index+1} / {images.length}</div>
   <div className="absolute bottom-3 right-3 flex gap-2">
    <button type="button" onClick={()=>move(-1)} aria-label={ru?'Предыдущее фото':'Previous photo'} className="rounded-full bg-[#061725]/85 p-3 text-white transition hover:bg-cyan-200 hover:text-[#052331] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200"><ChevronLeft size={19}/></button>
    <button type="button" onClick={()=>setPaused(v=>!v)} aria-label={paused?(ru?'Включить автопрокрутку':'Resume slideshow'):(ru?'Остановить автопрокрутку':'Pause slideshow')} className="rounded-full bg-[#061725]/85 p-3 text-white transition hover:bg-cyan-200 hover:text-[#052331] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200">{paused?<Play size={19}/>:<Pause size={19}/>}</button>
    <button type="button" onClick={()=>move(1)} aria-label={ru?'Следующее фото':'Next photo'} className="rounded-full bg-[#061725]/85 p-3 text-white transition hover:bg-cyan-200 hover:text-[#052331] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200"><ChevronRight size={19}/></button>
   </div>
  </div>
 </div>
}
