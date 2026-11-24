'use client'
import {useRef, useState} from 'react'
import Image from 'next/image'
import {ChevronLeft, ChevronRight} from 'lucide-react'

type Props={images:string[];ru:boolean;label:string}
export default function TripPhotoCarousel({images,ru,label}:Props){
 const track=useRef<HTMLDivElement>(null)
 const [index,setIndex]=useState(0)
 const move=(next:number)=>{
  const target=Math.max(0,Math.min(images.length-1,next))
  const el=track.current?.children.item(target) as HTMLElement|null
  el?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest',inline:'start'})
  setIndex(target)
 }
 return <div className="relative mt-5">
  <div className="mb-3 flex items-center justify-between gap-4"><p className="text-sm text-slate-200" aria-live="polite">{index+1} / {images.length}</p><div className="flex gap-2">
   <button type="button" onClick={()=>move(index-1)} disabled={index===0} aria-label={ru?'Предыдущее фото':'Previous photo'} className="rounded-full border border-cyan-200/50 bg-[#103246] p-3 text-white transition hover:bg-cyan-200 hover:text-[#052331] disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft size={20}/></button>
   <button type="button" onClick={()=>move(index+1)} disabled={index===images.length-1} aria-label={ru?'Следующее фото':'Next photo'} className="rounded-full border border-cyan-200/50 bg-[#103246] p-3 text-white transition hover:bg-cyan-200 hover:text-[#052331] disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight size={20}/></button>
  </div></div>
  <div ref={track} role="region" aria-roledescription="carousel" aria-label={label} onScroll={e=>{const container=e.currentTarget;const child=container.firstElementChild as HTMLElement|null;if(child){const width=child.getBoundingClientRect().width+12;setIndex(Math.min(images.length-1,Math.max(0,Math.round(container.scrollLeft/width))))}}} className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin] [scrollbar-color:#67e8f9_transparent]">
   {images.map((src,i)=><a key={src} href={src} target="_blank" rel="noopener noreferrer" className="group relative block aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl border border-cyan-200/25 bg-[#103246] sm:w-[48%] lg:w-[32%]" aria-label={(ru?'Открыть фото ':'Open photo ')+(i+1)}><Image src={src} alt={label+' '+(i+1)} fill sizes="(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 32vw" className="object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute bottom-3 right-3 rounded-full bg-[#061725]/80 px-3 py-1 text-xs font-semibold text-white">{i+1} / {images.length}</span></a>)}
  </div>
  <p className="mt-1 text-xs text-slate-300">{ru?'Листайте фотографии влево или вправо':'Swipe left or right to explore the photos'}</p>
 </div>
}
