'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export default function HomeSectionSwipe() {
 useEffect(() => {
  const main = document.querySelector<HTMLElement>('[data-home-sections]')
  if (!main) return
  const media = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
  let active = false
  let tween: gsap.core.Tween | null = null
  let releaseTimer: ReturnType<typeof setTimeout> | undefined
  const onWheel = (event: WheelEvent) => {
   if (!media.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || Math.abs(event.deltaY) < 4) return
   const target = event.target as HTMLElement | null
   if (target?.closest('input, textarea, select, iframe, [data-native-scroll]')) return
   const sections = Array.from(main.querySelectorAll<HTMLElement>(':scope > section'))
   if (sections.length < 2) return
   const direction = event.deltaY > 0 ? 1 : -1
   const y = window.scrollY
   const tops = sections.map(el => Math.max(0, el.getBoundingClientRect().top + y - 20))
   const footerTop = main.getBoundingClientRect().bottom + y
   if (y > footerTop - 60 || (direction < 0 && y <= tops[0] + 2)) return
   if (active) { event.preventDefault(); return }
   const current = sections.findIndex((el, i) => y >= tops[i] - 35 && y < (tops[i + 1] ?? footerTop) - 35)
   if (current < 0) return
   const el = sections[current]
   const top = tops[current]
   const bottom = el.getBoundingClientRect().bottom + y
   // Long sections must remain normally scrollable so no content becomes unreachable.
   if (el.offsetHeight > window.innerHeight - 30 &&
       (direction > 0 ? y + window.innerHeight < bottom - 30 : y > top + 35)) return
   const next = current + direction
   if (next < 0 || next >= sections.length) return
   event.preventDefault()
   active = true
   tween = gsap.to(window, {
    scrollTo: { y: tops[next], autoKill: true },
    duration: 0.8, ease: 'power2.inOut',
    onComplete: () => { releaseTimer = setTimeout(() => { active = false }, 180) },
    onInterrupt: () => { active = false },
   })
  }
  window.addEventListener('wheel', onWheel, { passive: false })
  return () => { window.removeEventListener('wheel', onWheel); tween?.kill(); if (releaseTimer) clearTimeout(releaseTimer) }
 }, [])
 return null
}
