'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Animate visible content without hiding it before JavaScript loads. */
export default function SiteMotion() {
  const pathname = usePathname()
  useEffect(() => {
    // The homepage has its own animation; administrative and sign-in pages stay still.
    if (!pathname || pathname === '/' || pathname === '/ru' || /^\/(ru\/)?(dashboard|sign-in|sign-up)(\/|$)/.test(pathname)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    let active: Animation[] = []
    let frame = 0
    let disposed = false
    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
      observer?.disconnect()
      observer = undefined
      active.forEach(animation => animation.cancel())
      active = []
    }
    const start = () => {
      stop()
      if (disposed || preference.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return
      // Wait for the route to commit before observing its content.
      frame = requestAnimationFrame(() => {
        frame = 0
        const main = document.querySelector('main')
        if (!main) return
        const seen = new WeakSet<Element>()
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting || seen.has(entry.target)) return
            seen.add(entry.target)
            observer?.unobserve(entry.target)
            const element = entry.target as HTMLElement
            const animation = element.animate(
              [{ opacity: 0.75, translate: '0 18px' }, { opacity: 1, translate: '0 0' }],
              { duration: 650, easing: 'cubic-bezier(.22, 1, .36, 1)' },
            )
            active.push(animation)
            animation.onfinish = () => { active = active.filter(item => item !== animation) }
          })
        }, { threshold: 0.08 })
        main.querySelectorAll('h1, h2, article').forEach(element => observer?.observe(element))
      })
    }
    start()
    preference.addEventListener('change', start)
    return () => { disposed = true; preference.removeEventListener('change', start); stop() }
  }, [pathname])
  return null
}
