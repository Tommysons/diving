'use client'
import {useState} from 'react'
import Image from 'next/image'
import {ChevronLeft,ChevronRight,Play} from 'lucide-react'
type Props={videos:string[];posters:string[];ru:boolean}
export default function TripVideoGallery({videos,posters,ru}:Props){
 const [active,setActive]=useState(0)
 const [playing,setPlaying]=useState(false)
 const choose=(i:number)=>{setActive((i+videos.length)%videos.length);setPlaying(false)}
 if(!videos.length)return null
 return <div className="mt-5">
  <div className="relative overflow-hidden rounded-2xl border border-cyan-200/25 bg-[#061725] shadow-xl shadow-black/30">
   {playing?<video key={videos[active]} autoPlay controls playsInline preload="metadata" poster={posters[active%posters.length]} className="aspect-video w-full bg-black object-contain" aria-label={(ru?'Видео погружения ':'Dive video ')+(active+1)}><source src={videos[active]} type="video/mp4"/>{ru?'Видео не поддерживается вашим браузером.':'Your browser does not support video.'}</video>:<button type="button" onClick={()=>setPlaying(true)} className="group relative block aspect-video w-full overflow-hidden" aria-label={(ru?'Воспроизвести видео ':'Play dive video ')+(active+1)}><Image src={posters[active%posters.length]} alt={(ru?'Обложка видео ':'Dive video thumbnail ')+(active+1)} fill sizes="(max-width: 768px) 100vw, 1100px" className="object-cover transition-transform duration-700 group-hover:scale-105"/><span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10"/><span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-[#061725]/80 text-white shadow-xl transition-transform group-hover:scale-110"><Play size={32} fill="currentColor"/></span></button>}
   <div className="absolute left-4 top-4 rounded-full bg-[#061725]/80 px-3 py-1 text-sm font-semibold text-white">{active+1} / {videos.length}</div>
  </div>
  <div className="mt-4 flex items-center justify-between gap-3"><p className="text-sm text-slate-200">{ru?'Выберите видео для просмотра':'Choose a video to watch'}</p><div className="flex gap-2"><button type="button" onClick={()=>choose(active-1)} aria-label={ru?'Предыдущее видео':'Previous video'} className="rounded-full border border-cyan-200/40 bg-[#103246] p-3 text-white hover:bg-cyan-200 hover:text-[#052331]"><ChevronLeft size={19}/></button><button type="button" onClick={()=>choose(active+1)} aria-label={ru?'Следующее видео':'Next video'} className="rounded-full border border-cyan-200/40 bg-[#103246] p-3 text-white hover:bg-cyan-200 hover:text-[#052331]"><ChevronRight size={19}/></button></div></div>
  <div className="mt-3 grid grid-cols-4 gap-2">{videos.map((src,i)=><button key={src} type="button" onClick={()=>choose(i)} aria-label={(ru?'Выбрать видео ':'Select video ')+(i+1)} aria-pressed={i===active} className={`group relative aspect-video overflow-hidden rounded-lg border-2 transition ${i===active?'border-cyan-200':'border-transparent hover:border-cyan-200/50'}`}><Image src={posters[i%posters.length]} alt={(ru?'Превью видео ':'Video preview ')+(i+1)} fill sizes="(max-width: 768px) 25vw, 220px" className="object-cover"/><span className="absolute inset-0 bg-black/20"/><Play size={20} fill="currentColor" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg"/></button>)}</div>
 </div>
}
