'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(Observer)

export default function HomeSectionSwipe() {
 useEffect(() => {
  const main = document.querySelector<HTMLElement>('[data-home-sections]')
  const footer = document.querySelector<HTMLElement>('footer')
  if (!main || !footer) return
  const media = gsap.matchMedia()
  media.add('(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
   const sections = [...Array.from(main.querySelectorAll<HTMLElement>(':scope > section')), footer]
   if (sections.length < 2) return
   let index = 0
   let animating = false
   let timeline: gsap.core.Timeline | undefined
   const originalOverflow = document.body.style.overflow
   document.body.style.overflow = 'hidden'
   const header = document.querySelector<HTMLElement>('header')
   const headerHeight = header?.getBoundingClientRect().height || 0
   const context = gsap.context(() => {
    gsap.set(sections, { position: 'fixed', top: headerHeight, left: 0, width: '100%', height: `calc(100dvh - ${headerHeight}px)`, overflowY: 'auto', autoAlpha: 0, zIndex: 1 })
    gsap.set(sections[0], { autoAlpha: 1, zIndex: 2 })
   })
   sections.forEach((section, i) => { section.inert = i !== 0 })
   const go = (direction: number) => {
    if (animating) return
    const next = gsap.utils.wrap(0, sections.length, index + direction)
    const from = sections[index], to = sections[next]
    animating = true
    from.inert = true
    to.inert = false
    to.scrollTop = 0
    gsap.set(to, { autoAlpha: 1, zIndex: 3, clipPath: direction > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' })
    timeline = gsap.timeline({ defaults: { duration: 1, ease: 'power2.inOut' }, onComplete: () => {
     gsap.set(from, { autoAlpha: 0, clearProps: 'transform' })
     gsap.set(to, { zIndex: 2, clearProps: 'clipPath,transform' })
     animating = false
    } })
    timeline.to(from, { yPercent: -direction * 12 }, 0)
      .to(to, { clipPath: 'inset(0% 0% 0% 0%)' }, 0)
      .fromTo(to.firstElementChild || to, { y: direction * 45, opacity: 0.75 }, { y: 0, opacity: 1, clearProps: 'transform,opacity' }, 0)
    index = next
   }
   const observer = Observer.create({
    target: window, type: 'wheel,touch', wheelSpeed: -1, tolerance: 35, preventDefault: true,
    ignore: 'header, button, a, input, textarea, select, iframe, [role="carousel"]',
    ignoreCheck: (event) => {
     const panel = sections[index]
     if (!(event instanceof WheelEvent)) return panel.scrollHeight > panel.clientHeight + 2
     return panel.scrollHeight > panel.clientHeight + 2 && (event.deltaY > 0 ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2 : panel.scrollTop > 2)
    },
    onDown: () => go(-1), onUp: () => go(1),
   })
   return () => {
    observer.kill(); timeline?.kill(); sections.forEach(section => { section.inert = false })
    context.revert(); document.body.style.overflow = originalOverflow
   }
  })
  return () => media.revert()
 }, [])
 return null
}
