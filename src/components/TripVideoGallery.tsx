'use client'
import {useEffect,useRef,useState} from 'react'
type Props={videos:string[];posters:string[];ru:boolean}
function ScrollVideo({src,poster,index,ru}:{src:string;poster:string;index:number;ru:boolean}){
 const ref=useRef<HTMLVideoElement>(null)
 const [playing,setPlaying]=useState(false)
 useEffect(()=>{
  const video=ref.current
  if(!video)return
  const observer=new IntersectionObserver(entries=>{
   const visible=entries[0]?.intersectionRatio>=0.65
   if(visible&&document.visibilityState==='visible'){
    video.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false))
   }else{video.pause();setPlaying(false)}
  },{threshold:[0,0.65,1]})
  observer.observe(video)
  const onVisibility=()=>{if(document.hidden){video.pause();setPlaying(false)}}
  document.addEventListener('visibilitychange',onVisibility)
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);video.pause()}
 },[src])
 return <div className="overflow-hidden rounded-2xl border border-cyan-200/20 bg-[#103246] shadow-lg shadow-black/20">
  <video ref={ref} controls playsInline muted loop preload="metadata" poster={poster} className="aspect-video w-full bg-[#061725] object-cover" aria-label={(ru?'Видео погружения ':'Dive highlight ')+(index+1)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}>
   <source src={src} type="video/mp4"/>{ru?'Ваш браузер не поддерживает видео.':'Your browser does not support video.'}
  </video>
  <div className="flex items-center justify-between px-4 py-3"><span className="text-sm font-medium text-white">{ru?'Подводное видео ':'Underwater highlight '}{String(index+1).padStart(2,'0')}</span><span className="text-xs text-cyan-200">{playing?(ru?'Воспроизводится':'Playing'):(ru?'Прокрутите для просмотра':'Scroll to play')}</span></div>
 </div>
}
export default function TripVideoGallery({videos,posters,ru}:Props){
 return <div className="mt-6 grid gap-5 md:grid-cols-2">{videos.map((src,i)=><ScrollVideo key={src} src={src} poster={posters[i%posters.length]} index={i} ru={ru}/>)}</div>
}
