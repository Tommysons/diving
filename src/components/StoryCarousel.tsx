'use client'

import { Children, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'

export default function StoryCarousel({ children, locale, label, resetKey }: {
 children: ReactNode; locale: 'en' | 'ru'; label: string; resetKey?: string
}) {
 const items = Children.toArray(children)
 const [index, setIndex] = useState(0)
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
 const ordered = items.map((_, i) => items[(i + index) % items.length])
 const ru = locale === 'ru'
 return <div role='region' aria-label={label} aria-roledescription={ru ? 'карусель' : 'carousel'}>
  <div className='mb-4 flex justify-end gap-2'>
   <button type='button' onClick={() => move(-1)} disabled={items.length < 2} aria-label={ru ? 'Предыдущие' : 'Previous'} className='grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white hover:bg-white/15 disabled:opacity-35'><ChevronLeft size={20}/></button>
   <button type='button' onClick={() => move(1)} disabled={items.length < 2} aria-label={ru ? 'Следующие' : 'Next'} className='grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white hover:bg-white/15 disabled:opacity-35'><ChevronRight size={20}/></button>
  </div>
  <div className='overflow-hidden' onTouchStart={e => { start.current = e.touches[0].clientX }} onTouchEnd={e => { if (start.current !== null) { const delta = e.changedTouches[0].clientX - start.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1); start.current = null } }}>
   <div ref={track} className='flex gap-5'>{ordered.map((item, i) => <div key={i} className='w-full shrink-0 sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] [&>*]:!w-full [&>*]:block'>{item}</div>)}</div>
  </div>
 </div>
}
