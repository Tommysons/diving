'use client'
import {useEffect,useRef} from 'react'
type Props={videos:string[];posters?:string[];ru:boolean}
function VideoCard({src,poster,index,ru}:{src:string;poster?:string;index:number;ru:boolean}){
 const videoRef=useRef<HTMLVideoElement>(null)
 useEffect(()=>{
  const video=videoRef.current
  if(!video)return
  const observer=new IntersectionObserver(entries=>{
   if(entries[0]?.isIntersecting){video.preload='metadata';observer.disconnect()}
  },{rootMargin:'350px'})
  observer.observe(video)
  return()=>observer.disconnect()
 },[src])
 return <div className="overflow-hidden rounded-2xl border border-cyan-200/20 bg-[#103246] shadow-lg shadow-black/20">
  <video ref={videoRef} controls playsInline preload="none" poster={poster} className="aspect-video w-full bg-[#061725] object-contain" aria-label={(ru?'Видео погружения ':'Dive highlight ')+(index+1)}><source src={src} type="video/mp4"/>{ru?'Ваш браузер не поддерживает видео.':'Your browser does not support video.'}</video>
  <div className="px-4 py-3 text-sm font-medium text-white">{ru?'Подводное видео ':'Underwater highlight '}{String(index+1).padStart(2,'0')}</div>
 </div>
}
export default function TripVideoGallery({videos,posters=[],ru}:Props){
 return <div className="mt-6 grid gap-5 md:grid-cols-2">{videos.map((src,i)=><VideoCard key={src} src={src} poster={posters[i]} index={i} ru={ru}/>)}</div>
}
