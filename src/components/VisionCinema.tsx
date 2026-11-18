'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'

const slides = [
 {image:'/images/generated/maldives-diving.webp',en:['FREEDOM','The freedom to explore beyond the familiar.'],ru:['СВОБОДА','Свобода исследовать мир за пределами привычного.']},
 {image:'/images/cpn6a.webp',en:['ADVENTURE','Every adventure becomes a story.'],ru:['ПРИКЛЮЧЕНИЯ','Каждое приключение становится историей.']},
 {image:'/images/hero-about-a.webp',en:['CONNECTION','Some connections last a lifetime.'],ru:['СВЯЗЬ','Некоторые связи остаются с нами на всю жизнь.']},
 {image:'/images/generated/maldives-diving.webp',en:['MEMORIES','Stories worth living. Stories worth telling.'],ru:['ВОСПОМИНАНИЯ','Истории, которые стоит прожить и рассказать.']},
]
export default function VisionCinema({locale}:{locale:'en'|'ru'}) {
 const ru=locale==='ru'
 const [index,setIndex]=useState(0)
 const [paused,setPaused]=useState(false)
 const [hovered,setHovered]=useState(false)
 const [visible,setVisible]=useState(true)
 const [reduced,setReduced]=useState(false)
 const root=useRef<HTMLElement>(null)
 const imageLayers=useRef<(HTMLDivElement|null)[]>([])
 const cardLayers=useRef<(HTMLButtonElement|null)[]>([])
 const heading=useRef<HTMLDivElement>(null)
 const previous=useRef(0)
 useEffect(()=>{
  const mq=window.matchMedia('(prefers-reduced-motion: reduce)')
  const update=()=>setReduced(mq.matches)
  update();mq.addEventListener('change',update)
  const io=new IntersectionObserver(entries=>setVisible(entries[0]?.isIntersecting??false),{threshold:.1})
  if(root.current)io.observe(root.current)
  return()=>{mq.removeEventListener('change',update);io.disconnect()}
 },[])
 useEffect(()=>{
  const old=previous.current
  previous.current=index
  let canceled=false
  if(reduced){
   imageLayers.current.forEach((node,i)=>{if(node){node.style.opacity=i===index?'1':'0';node.style.visibility=i===index?'visible':'hidden'}})
   return
  }
  import('gsap').then(({gsap})=>{
   if(canceled)return
   const incoming=imageLayers.current[index]
   const outgoing=imageLayers.current[old]
   if(!incoming)return
   gsap.killTweensOf([incoming,outgoing,heading.current,...cardLayers.current].filter(Boolean))
   gsap.set(incoming,{zIndex:2})
   gsap.fromTo(incoming,{autoAlpha:old===index?1:0,scale:1.07},{autoAlpha:1,scale:1,duration:1.1,ease:'power2.inOut',overwrite:true})
   if(outgoing&&old!==index){gsap.set(outgoing,{zIndex:1});gsap.to(outgoing,{autoAlpha:0,duration:1.05,ease:'power2.inOut',overwrite:true})}
   if(heading.current)gsap.fromTo(heading.current,{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.7,delay:.2,ease:'power3.out',overwrite:true})
   cardLayers.current.forEach((card,i)=>{
    if(!card)return
    const distance=(i-index+slides.length)%slides.length
    gsap.to(card,{x:-112+distance*62,y:-distance*12,rotation:distance*5,scale:1-distance*.045,zIndex:slides.length-distance,duration:.75,ease:'power3.inOut',overwrite:true})
   })
  })
  return()=>{canceled=true}
 },[index,reduced])
 useEffect(()=>{
  if(paused||hovered||!visible||reduced)return
  const timer=window.setInterval(()=>{if(!document.hidden)setIndex(i=>(i+1)%slides.length)},4000)
  return()=>window.clearInterval(timer)
 },[paused,hovered,visible,reduced])
 const current=slides[index]
 return <section ref={root} aria-label={ru?'Видение LokaWndr':'LokaWndr vision'} className='relative'>
  <div className='relative isolate min-h-[600px] overflow-hidden bg-[#031827] md:min-h-[660px]'>
   {slides.map((slide,i)=><div key={i} ref={el=>{imageLayers.current[i]=el}} aria-hidden='true' className='absolute inset-0' style={{opacity:i===0?1:0,visibility:i===0?'visible':'hidden',zIndex:i===0?2:0}}>
    <Image src={slide.image} alt='' fill priority={i===0} sizes='100vw' quality={65} className='object-cover'/>
   </div>)}
   <div className='pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-[#021a2c]/95 via-[#021a2c]/55 to-[#021a2c]/10'/>
   <div className='pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-[#021a2c]/80 via-transparent to-transparent'/>
   <div className='relative z-[4] mx-auto flex min-h-[600px] max-w-[1480px] flex-col justify-between px-6 pb-8 pt-12 md:min-h-[660px] md:px-14 md:pb-10 md:pt-16'>
    <div>
     <p className='text-xs font-bold tracking-[.25em] text-cyan-200'>LOKAWNDR · {ru?'НАША ФИЛОСОФИЯ':'OUR PHILOSOPHY'}</p>
     <h1 className='mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl'>{ru?'Истории, которые стоит прожить':'Stories Worth Living'}</h1>
    </div>
    <div className='grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(350px,1fr)] lg:gap-10'>
     <div ref={heading} key={index} className='relative max-w-2xl self-center' aria-live='polite' aria-atomic='true'>
      <p className='mb-3 text-xs font-bold tracking-[.24em] text-cyan-200'>0{index+1} / 04</p>
      <h2 className='text-4xl font-black tracking-wide sm:text-6xl'>{current[locale][0]}</h2>
      <p className='mt-4 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl'>{current[locale][1]}</p>
     </div>
     <div className='relative mx-auto hidden h-[340px] w-[430px] shrink-0 lg:block' aria-label={ru?'Выбор кадра':'Select a frame'}>
      {slides.map((slide,i)=><button type='button' key={i} ref={el=>{cardLayers.current[i]=el}} onClick={()=>setIndex(i)} aria-label={ru?'Показать кадр '+(i+1):'Show frame '+(i+1)} aria-pressed={index===i} className='absolute bottom-4 left-1/2 h-[310px] w-[225px] overflow-hidden rounded-2xl border-2 border-white/70 bg-[#12394b] shadow-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-cyan-200' style={{transform:'translate('+(-112+((i-index+slides.length)%slides.length)*62)+'px,'+(-((i-index+slides.length)%slides.length)*12)+'px) rotate('+(((i-index+slides.length)%slides.length)*5)+'deg)',zIndex:slides.length-((i-index+slides.length)%slides.length)}}>
       <Image src={slide.image} alt='' fill sizes='225px' className='object-cover'/>
       <span className='absolute inset-x-0 bottom-0 bg-black/60 px-2 py-2 text-center text-[10px] font-bold tracking-wider'>{slide[locale][0]}</span>
      </button>)}
     </div>
    </div>
    <div className='mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/25 pt-5'>
     <div className='flex items-center gap-1' aria-label={ru?'Выбрать слайд':'Choose a slide'}>{slides.map((_,i)=><button key={i} type='button' onClick={()=>setIndex(i)} aria-label={ru?'Слайд '+(i+1):'Slide '+(i+1)} aria-current={index===i?'true':undefined} className='flex h-11 items-center px-1'><span className={'block h-1 rounded-full transition-all '+(index===i?'w-9 bg-cyan-200':'w-4 bg-white/45')}/></button>)}</div>
     <div className='flex gap-2'>
      <button type='button' onClick={()=>setPaused(p=>!p)} aria-label={paused?(ru?'Продолжить':'Resume autoplay'):(ru?'Пауза':'Pause autoplay')} className='grid h-11 w-11 place-items-center rounded-full border border-white/50 hover:bg-white/15'>{paused?<Play size={18}/>:<Pause size={18}/>}</button>
      <button type='button' onClick={()=>setIndex(i=>(i+slides.length-1)%slides.length)} aria-label={ru?'Назад':'Previous slide'} className='grid h-11 w-11 place-items-center rounded-full border border-white/50 hover:bg-white/15'><ArrowLeft size={18}/></button>
      <button type='button' onClick={()=>setIndex(i=>(i+1)%slides.length)} aria-label={ru?'Вперёд':'Next slide'} className='grid h-11 w-11 place-items-center rounded-full border border-white/50 hover:bg-white/15'><ArrowRight size={18}/></button>
     </div>
    </div>
   </div>
  </div>
  <div className='mx-auto max-w-[1480px] px-6 py-8 text-center md:px-10'>
   <p className='text-lg leading-8 text-slate-200'>{ru?'Живи приключением. Создавай воспоминания. Рассказывай истории.':'Live the adventure. Create the memory. Tell the story.'}</p>
   <Link href={(ru?'/ru':'')+'/about'} className='mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-cyan-200 underline underline-offset-4'>{ru?'Наша история':'Discover our story'}<ArrowRight size={16}/></Link>
  </div>
 </section>
}
