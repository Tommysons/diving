'use client'

import { Children, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { gsap } from 'gsap'

export default function StoryCarousel({ children, locale, label, resetKey, autoPlay = true }: {
 children: ReactNode; locale: 'en' | 'ru'; label: string; resetKey?: string; autoPlay?: boolean
}) {
 const items = Children.toArray(children)
 const [index, setIndex] = useState(0)
 const [paused, setPaused] = useState(false)
 const [interacting, setInteracting] = useState(false)
 const [inView, setInView] = useState(false)
 const container = useRef<HTMLDivElement>(null)
 const advance = useRef<() => void>(() => {})
 const [visible, setVisible] = useState(1)
 useEffect(() => {
  const resize = () => setVisible(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
  resize()
  window.addEventListener('resize', resize)
  return () => window.removeEventListener('resize', resize)
 }, [])
 const track = useRef<HTMLDivElement>(null)
 const start = useRef<number | null>(null)
 const locked = useRef(false)
 useEffect(() => { setIndex(0) }, [resetKey])
 useEffect(() => () => { if (track.current) gsap.killTweensOf(track.current) }, [])
 const move = (direction: number) => {
  if (items.length < 2 || locked.current) return
  const el = track.current
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
   setIndex(i => (i + direction + items.length) % items.length)
   return
  }
  locked.current = true
  gsap.to(el, { x: -direction * 35, opacity: 0, duration: 0.16, onComplete: () => {
   setIndex(i => (i + direction + items.length) % items.length)
   gsap.fromTo(el, { x: direction * 35, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, onComplete: () => { locked.current = false } })
  } })
 }
 advance.current = () => move(1)
 useEffect(() => {
  const el = container.current
  if (!el) return
  const observer = new IntersectionObserver(entries => setInView(entries[0].isIntersecting), { threshold: 0.25 })
  observer.observe(el)
  return () => observer.disconnect()
 }, [])
 useEffect(() => {
  if (!autoPlay || paused || interacting || !inView || items.length <= visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const timer = window.setInterval(() => { if (!document.hidden) advance.current() }, 5000)
  return () => window.clearInterval(timer)
 }, [autoPlay, paused, interacting, inView, items.length, visible])
 const ordered = items.slice(0, visible).map((_, i) => items[(i + index) % items.length])
 const ru = locale === 'ru'
 return <div ref={container} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false) }} role='region' aria-label={label} aria-roledescription={ru ? 'карусель' : 'carousel'}>
  <div className='mb-4 flex justify-end gap-2'>
   {autoPlay && items.length > visible && <button type='button' onClick={() => setPaused(p => !p)} aria-label={paused ? (ru ? 'Возобновить автоматическую прокрутку' : 'Resume automatic slides') : (ru ? 'Приостановить автоматическую прокрутку' : 'Pause automatic slides')} className='grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white hover:bg-white/15'>{paused ? <Play size={18}/> : <Pause size={18}/>}</button>}
   <button type='button' onClick={() => move(-1)} disabled={items.length < 2} aria-label={ru ? 'Предыдущие' : 'Previous'} className='grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white hover:bg-white/15 disabled:opacity-35'><ChevronLeft size={20}/></button>
   <button type='button' onClick={() => move(1)} disabled={items.length < 2} aria-label={ru ? 'Следующие' : 'Next'} className='grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white hover:bg-white/15 disabled:opacity-35'><ChevronRight size={20}/></button>
  </div>
  <div className='overflow-hidden' onTouchStart={e => { start.current = e.touches[0].clientX }} onTouchEnd={e => { if (start.current !== null) { const delta = e.changedTouches[0].clientX - start.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1); start.current = null } }}>
   <div ref={track} className='flex gap-5'>{ordered.map((item, i) => <div key={i} className='w-full shrink-0 sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] [&>*]:!w-full [&>*]:block'>{item}</div>)}</div>
  </div>
 </div>
}
