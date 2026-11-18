'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'

const frames = [
 { image:'/images/generated/maldives-diving.webp', en:['FREEDOM','The freedom to explore beyond the familiar.'], ru:['СВОБОДА','Свобода исследовать мир за пределами привычного.'] },
 { image:'/images/cpn6a.webp', en:['ADVENTURE','Every adventure becomes a story.'], ru:['ПРИКЛЮЧЕНИЯ','Каждое приключение становится историей.'] },
 { image:'/images/hero-about-a.webp', en:['CONNECTION','Some connections last a lifetime.'], ru:['СВЯЗЬ','Некоторые связи остаются с нами на всю жизнь.'] },
 { image:'/images/generated/maldives-diving.webp', en:['MEMORIES','Stories worth living. Stories worth telling.'], ru:['ВОСПОМИНАНИЯ','Истории, которые стоит прожить и рассказать.'] },
]
export default function VisionCinema({locale}:{locale:'en'|'ru'}) {
 const ru=locale==='ru'
 const [index,setIndex]=useState(0)
 const [paused,setPaused]=useState(false)
 const [hovered,setHovered]=useState(false)
 const [inView,setInView]=useState(false)
 const [reduced,setReduced]=useState(false)
 const root=useRef<HTMLElement>(null)
 const layers=useRef<(HTMLDivElement|null)[]>([])
 const titles=useRef<(HTMLDivElement|null)[]>([])
 const active=useRef(0)
 useEffect(()=>{
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)')
  const sync=()=>setReduced(motion.matches)
  sync();motion.addEventListener('change',sync)
  const observer=new IntersectionObserver(entries=>setInView(entries[0]?.isIntersecting??false),{threshold:.2})
  if(root.current)observer.observe(root.current)
  return()=>{observer.disconnect();motion.removeEventListener('change',sync)}
 },[])
 useEffect(()=>{
  let cancelled=false
  const previous=active.current
  active.current=index
  if(reduced){layers.current.forEach((node,i)=>{if(node)node.style.opacity=i===index?'1':'0'});titles.current.forEach((node,i)=>{if(node)node.style.opacity=i===index?'1':'0'});return}
  import('gsap').then(({gsap})=>{
   if(cancelled)return
   const incoming=layers.current[index],outgoing=layers.current[previous],heading=titles.current[index]
   if(!incoming)return
   gsap.killTweensOf([incoming,outgoing,heading].filter((node):node is HTMLDivElement=>Boolean(node)))
   gsap.set(incoming,{zIndex:2})
   gsap.fromTo(incoming,{autoAlpha:previous===index?1:0,scale:1.08},{autoAlpha:1,scale:1,duration:1.6,ease:'power2.out'})
   if(outgoing&&previous!==index){gsap.set(outgoing,{zIndex:1});gsap.to(outgoing,{autoAlpha:0,duration:1.5,ease:'power2.out'})}
   if(heading)gsap.fromTo(heading,{y:24,autoAlpha:0},{y:0,autoAlpha:1,duration:.9,delay:.35,ease:'power3.out'})
  })
  return()=>{cancelled=true}
 },[index,reduced])
 useEffect(()=>{
  if(paused||hovered||!inView||reduced)return
  const timer=window.setInterval(()=>{if(!document.hidden)setIndex(i=>(i+1)%frames.length)},5000)
  return()=>window.clearInterval(timer)
 },[paused,hovered,inView,reduced])
 return <section ref={root} aria-label={ru?'Видение LokaWndr':'LokaWndr vision'} className='relative'>
  <div className='relative isolate min-h-[620px] overflow-hidden bg-[#031827] md:min-h-[760px]' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setHovered(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setHovered(false)}}>
   {frames.map((frame,i)=><div key={i} ref={el=>{layers.current[i]=el}} aria-hidden='true' className='absolute inset-0' style={{opacity:i===0?1:0,zIndex:i===0?2:0}}>
    <Image src={frame.image} alt='' fill sizes='(max-width: 768px) 100vw, 1400px' quality={60} className='object-cover' priority={i===0} fetchPriority={i===0?'high':undefined}/>
   </div>)}
   <div className='pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-[#021a2c]/90 via-[#021a2c]/50 to-[#021a2c]/15'/>
   <div className='pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-[#021a2c]/80 via-transparent to-transparent'/>
   <div className='relative z-[4] mx-auto flex min-h-[620px] max-w-[1480px] flex-col justify-between px-6 pb-10 pt-20 sm:px-10 md:min-h-[760px] md:px-14 md:pb-14 md:pt-28'>
    <div><p className='text-xs font-bold tracking-[.26em] text-cyan-200'>LOKAWNDR · {ru?'НАША ФИЛОСОФИЯ':'OUR PHILOSOPHY'}</p><h1 className='mt-4 max-w-3xl text-5xl font-black tracking-tight sm:text-7xl'>{ru?'Истории, которые стоит прожить':'Stories Worth Living'}</h1></div>
    <div aria-live='off' className='relative min-h-44'>
     {frames.map((frame,i)=><div key={i} ref={el=>{titles.current[i]=el}} aria-hidden={index!==i} className={'absolute bottom-0 left-0 max-w-2xl '+(index===i?'':'pointer-events-none opacity-0')}>
      <p className='mb-3 text-xs font-bold tracking-[.24em] text-cyan-200'>0{i+1} / 04</p>
      <h3 className='text-4xl font-black tracking-wide sm:text-6xl'>{frame[locale][0]}</h3>
      <p className='mt-4 max-w-xl text-lg text-white/90 sm:text-xl'>{frame[locale][1]}</p>
     </div>)}
    </div>
    <div className='mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/25 pt-5'>
     <div className='flex items-center gap-2' aria-label={ru?'Выбрать слайд':'Choose a slide'}>{frames.map((frame,i)=><button key={i} type='button' onClick={()=>setIndex(i)} aria-label={ru?'Слайд '+(i+1):'Slide '+(i+1)} aria-current={index===i?'true':undefined} className='flex h-11 items-center px-1'><span className={'block h-1 rounded-full transition-all '+(index===i?'w-9 bg-cyan-200':'w-4 bg-white/45')}/></button>)}</div>
     <div className='flex items-center gap-2'>
      <button type='button' onClick={()=>setPaused(p=>!p)} aria-label={paused?(ru?'Продолжить':'Resume autoplay'):(ru?'Пауза':'Pause autoplay')} className='grid h-11 w-11 place-items-center rounded-full border border-white/50 hover:bg-white/15'>{paused?<Play size={18}/>:<Pause size={18}/>}</button>
      <button type='button' onClick={()=>setIndex(i=>(i+frames.length-1)%frames.length)} aria-label={ru?'Назад':'Previous slide'} className='grid h-11 w-11 place-items-center rounded-full border border-white/50 hover:bg-white/15'><ArrowLeft size={18}/></button>
      <button type='button' onClick={()=>setIndex(i=>(i+1)%frames.length)} aria-label={ru?'Вперёд':'Next slide'} className='grid h-11 w-11 place-items-center rounded-full border border-white/50 hover:bg-white/15'><ArrowRight size={18}/></button>
     </div>
    </div>
   </div>
  </div>
  <div className='mx-auto max-w-[1480px] px-6 py-8 text-center md:px-10'><p className='text-lg leading-8 text-slate-200'>{ru?'Живи приключением. Создавай воспоминания. Рассказывай истории.':'Live the adventure. Create the memory. Tell the story.'}</p><Link href={(ru?'/ru':'')+'/about'} className='mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-200 underline underline-offset-4'>{ru?'Наша история':'Discover our story'}<ArrowRight size={16}/></Link></div>
 </section>
}
