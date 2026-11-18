'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const slides=[
 {image:'/images/generated/maldives-diving.webp',en:['FREEDOM','Explore beyond the familiar.'],ru:['СВОБОДА','Исследуй мир за пределами привычного.']},
 {image:'/images/cpn6a.webp',en:['ADVENTURE','Every adventure becomes a story.'],ru:['ПРИКЛЮЧЕНИЯ','Каждое приключение становится историей.']},
 {image:'/images/hero-about-a.webp',en:['CONNECTION','Moments that connect us for life.'],ru:['СВЯЗЬ','Моменты, которые объединяют нас навсегда.']},
 {image:'/images/generated/maldives-diving.webp',en:['MEMORIES','Stories worth telling for generations.'],ru:['ВОСПОМИНАНИЯ','Истории, которые передают поколениям.']},
]
export default function VisionCinema({locale}:{locale:'en'|'ru'}){
 const [active,setActive]=useState(0)
 const [hover,setHover]=useState(false)
 const [reduced,setReduced]=useState(false)
 const [visible,setVisible]=useState(true)
 const root=useRef<HTMLDivElement>(null)
 const track=useRef<HTMLDivElement>(null)
 useEffect(()=>{
  const mq=window.matchMedia('(prefers-reduced-motion: reduce)')
  const sync=()=>setReduced(mq.matches)
  sync();mq.addEventListener('change',sync)
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15})
  if(root.current)observer.observe(root.current)
  return()=>{mq.removeEventListener('change',sync);observer.disconnect()}
 },[])
 useEffect(()=>{
  if(!track.current)return
  let cancelled=false
  if(reduced){track.current.style.transform='translateX(-'+active*100+'%)';return}
  import('gsap').then(({gsap})=>{
   if(cancelled||!track.current)return
   gsap.to(track.current,{xPercent:-active*100,duration:1,ease:'power3.inOut',overwrite:true})
  })
  return()=>{cancelled=true}
 },[active,reduced])
 useEffect(()=>{
  if(hover||!visible||reduced)return
  const timer=window.setInterval(()=>{if(!document.hidden)setActive(n=>(n+1)%slides.length)},4000)
  return()=>window.clearInterval(timer)
 },[hover,visible,reduced])
 return <div ref={root} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={()=>setHover(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setHover(false)}} className='relative z-10 mx-auto w-full max-w-[500px] min-w-0 overflow-hidden rounded-[24px] border-[3px] border-white/90 bg-[#031b2c] shadow-[0_24px_70px_rgba(0,0,0,0.65)] ring-1 ring-cyan-200/50 lg:justify-self-end' aria-label={locale==='ru'?'Истории LokaWndr':'LokaWndr stories'}>
  <div className='overflow-hidden'>
   <div ref={track} className='flex will-change-transform'>
    {slides.map((slide,i)=><article key={i} className='relative h-[300px] min-w-full sm:h-[350px] lg:h-[380px]'>
     <Image src={slide.image} alt='' fill sizes='(max-width: 1024px) 100vw, 45vw' className='object-cover' quality={75}/>
     <div className='absolute inset-0 bg-gradient-to-t from-[#00111f] via-[#00111f]/45 to-[#00111f]/10'/>
     <div className='absolute inset-x-0 bottom-0 p-6 text-white sm:p-8'>
      <p className='mb-2 text-xs font-bold tracking-[.25em] text-cyan-200'>LOKAWNDR · 0{i+1}</p>
      <h2 className='text-3xl font-black tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] sm:text-4xl'>{slide[locale][0]}</h2>
      <p className='mt-2 max-w-sm text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-base'>{slide[locale][1]}</p>
     </div>
    </article>)}
   </div>
  </div>
  <div className='sr-only' aria-live='off'>{slides[active][locale][0]}</div>
 </div>
}
