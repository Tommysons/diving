'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StoryCarousel({ children, locale, label, resetKey }: {
 children: ReactNode
 locale: 'en' | 'ru'
 label: string
 resetKey?: string
}) {
 const rail = useRef<HTMLDivElement>(null)
 const section = useRef<HTMLDivElement>(null)
 const trigger = useRef<ScrollTrigger | null>(null)
 const [edges, setEdges] = useState({ start: true, end: true })
 useEffect(() => {
  const el = rail.current
  if (!el) return
  const update = () => setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 })
  el.scrollLeft = 0
  update()
  el.addEventListener('scroll', update, { passive: true })
  const observer = new ResizeObserver(update)
  observer.observe(el)
  return () => { el.removeEventListener('scroll', update); observer.disconnect(); gsap.killTweensOf(el) }
 }, [resetKey, children])
 useEffect(() => {
  const el = rail.current
  const container = section.current
  if (!el || !container) return
  const media = gsap.matchMedia()
  media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
   const distance = () => Math.max(0, el.scrollWidth - el.clientWidth)
   if (distance() <= 1) return
   const tween = gsap.to(el, {
    scrollLeft: distance,
    ease: 'none',
    scrollTrigger: {
     trigger: container,
     start: 'center center',
     end: () => '+=' + distance(),
     scrub: 0.5,
     pin: true,
     anticipatePin: 1,
     invalidateOnRefresh: true,
    },
   })
   trigger.current = tween.scrollTrigger ?? null
   return () => { trigger.current = null; tween.scrollTrigger?.kill(); tween.kill() }
  })
  return () => { media.revert(); trigger.current = null }
 }, [resetKey, children])
 const move = (direction: number) => {
  const el = rail.current
  if (!el) return
  const card = el.firstElementChild as HTMLElement | null
  const step = card ? card.offsetWidth + 20 : el.clientWidth
  const destination = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + direction * step))
  const currentTrigger = trigger.current
  if (currentTrigger?.isActive && el.scrollWidth > el.clientWidth) {
   const progress = destination / (el.scrollWidth - el.clientWidth)
   window.scrollTo({ top: currentTrigger.start + progress * (currentTrigger.end - currentTrigger.start), behavior: 'smooth' })
   return
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) el.scrollLeft = destination
  else gsap.to(el, { scrollLeft: destination, duration: 0.55, ease: 'power2.out', overwrite: true })
 }
 const ru = locale === 'ru'
 return <div ref={section} role='region' aria-label={label} aria-roledescription={ru ? 'карусель' : 'carousel'}>
  <div className='mb-4 flex justify-end gap-2'>
   <button type='button' onClick={() => move(-1)} disabled={edges.start} aria-label={ru ? 'Предыдущие' : 'Previous'} className='grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white hover:bg-white/15 disabled:opacity-35 disabled:cursor-not-allowed'><ChevronLeft size={20}/></button>
   <button type='button' onClick={() => move(1)} disabled={edges.end} aria-label={ru ? 'Следующие' : 'Next'} className='grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white hover:bg-white/15 disabled:opacity-35 disabled:cursor-not-allowed'><ChevronRight size={20}/></button>
  </div>
  <div ref={rail} tabIndex={0} aria-label={label} className='flex gap-5 overflow-x-auto pb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300'>{children}</div>
 </div>
}
