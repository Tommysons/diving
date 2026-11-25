'use client'
import {useEffect,useRef,useState} from 'react'
import {ChevronLeft,ChevronRight,Volume2,VolumeX} from 'lucide-react'
type Props={videos:string[];posters?:string[];ru:boolean;labels?:string[]}
export default function TripVideoGallery({videos,posters=[],ru,labels=[]}:Props){
 const [active,setActive]=useState(0)
 const [visible,setVisible]=useState(false)
 const [muted,setMuted]=useState(true)
 const videoRef=useRef<HTMLVideoElement>(null)
 const sectionRef=useRef<HTMLDivElement>(null)
 const reduced=useRef(false)
 useEffect(()=>{reduced.current=window.matchMedia('(prefers-reduced-motion: reduce)').matches},[])
 useEffect(()=>{
  const el=sectionRef.current
  if(!el)return
  const observer=new IntersectionObserver(entries=>setVisible(entries[0]?.intersectionRatio>=0.35),{threshold:[0,0.35,0.65]})
  observer.observe(el)
  return()=>observer.disconnect()
 },[])
 useEffect(()=>{
  const video=videoRef.current
  if(!video)return
  if(visible&&!document.hidden&&!reduced.current){video.play().catch(()=>{})}
  else video.pause()
  const onVisibility=()=>{if(document.hidden)video.pause();else if(visible&&!reduced.current)video.play().catch(()=>{})}
  document.addEventListener('visibilitychange',onVisibility)
  return()=>document.removeEventListener('visibilitychange',onVisibility)
 },[active,visible])
 if(!videos.length)return null
 const move=(direction:number)=>setActive(i=>(i+direction+videos.length)%videos.length)
 return <div ref={sectionRef} className="mx-auto mt-6 max-w-5xl">
  <div className="overflow-hidden rounded-2xl border border-cyan-200/30 bg-[#061725] shadow-xl shadow-black/30">
   <video key={videos[active]} ref={videoRef} src={videos[active]} poster={posters[active]||undefined} autoPlay={visible} muted={muted} playsInline controls preload="metadata" onEnded={()=>move(1)} className="aspect-video w-full bg-black object-contain" aria-label={labels[active]||'Dive highlight'}/>
   <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
    <div><p className="text-lg font-semibold text-white">{labels[active]||'Dive highlight'}</p><p className="text-xs text-slate-300">{active+1} / {videos.length}</p></div>
    <div className="flex items-center gap-2">
     <button type="button" onClick={()=>setMuted(v=>!v)} className="rounded-full border border-cyan-200/40 p-2.5 text-white hover:bg-cyan-900" aria-label={muted?(ru?'Включить звук':'Unmute'):(ru?'Выключить звук':'Mute')}>{muted?<VolumeX size={19}/>:<Volume2 size={19}/>}</button>
     <button type="button" onClick={()=>move(-1)} className="rounded-full border border-cyan-200/40 p-2.5 text-white hover:bg-cyan-900" aria-label={ru?'Предыдущее видео':'Previous video'}><ChevronLeft size={20}/></button>
     <button type="button" onClick={()=>move(1)} className="rounded-full border border-cyan-200/40 p-2.5 text-white hover:bg-cyan-900" aria-label={ru?'Следующее видео':'Next video'}><ChevronRight size={20}/></button>
    </div>
   </div>
  </div>
  <div className="mt-3 flex justify-center gap-2">{videos.map((src,i)=><button key={src} type="button" onClick={()=>setActive(i)} aria-label={(ru?'Выбрать видео ':'Select video ')+(i+1)} aria-current={i===active?'true':undefined} className={`h-2.5 rounded-full transition-all ${i===active?'w-9 bg-cyan-200':'w-2.5 bg-slate-500 hover:bg-cyan-300'}`}/>)}</div>
 </div>
}
