'use client'
import {useEffect,useRef,useState} from 'react'
type Props={videos:string[];posters?:string[];ru:boolean}
function VideoCard({src,index,ru}:{src:string;index:number;ru:boolean}){
 const videoRef=useRef<HTMLVideoElement>(null)
 const [ready,setReady]=useState(false)
 useEffect(()=>{
  const video=videoRef.current
  if(!video)return
  let observer:IntersectionObserver|null=null
  const load=()=>{video.preload='metadata';video.load();observer?.disconnect()}
  observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting)load()},{rootMargin:'350px'})
  observer.observe(video)
  return()=>observer?.disconnect()
 },[src])
 return <div className="overflow-hidden rounded-2xl border border-cyan-200/20 bg-[#103246] shadow-lg shadow-black/20">
  <div className="relative aspect-video bg-[#061725]">
   <video ref={videoRef} controls playsInline preload="none" className="h-full w-full object-contain" aria-label={(ru?'Видео погружения ':'Dive highlight ')+(index+1)} onLoadedData={()=>setReady(true)} onLoadedMetadata={e=>{const v=e.currentTarget;if(v.currentTime===0&&Number.isFinite(v.duration)&&v.duration>0.15)v.currentTime=Math.min(0.2,v.duration/2)}}><source src={src} type="video/mp4"/>{ru?'Ваш браузер не поддерживает видео.':'Your browser does not support video.'}</video>
   {!ready&&<div className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#061725]/80 px-3 py-1 text-xs text-white">{ru?'Загрузка кадра видео…':'Loading video preview…'}</div>}
  </div>
  <div className="px-4 py-3 text-sm font-medium text-white">{ru?'Подводное видео ':'Underwater highlight '}{String(index+1).padStart(2,'0')}</div>
 </div>
}
export default function TripVideoGallery({videos,ru}:Props){
 return <div className="mt-6 grid gap-5 md:grid-cols-2">{videos.map((src,i)=><VideoCard key={src} src={src} index={i} ru={ru}/>)}</div>
}
