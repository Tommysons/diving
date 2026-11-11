'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Progressive enhancement: never hide content before JS is ready. */
export function HomeMotion() {
 useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.registerPlugin(ScrollTrigger)
  const motionLayer = document.querySelector<HTMLElement>('.ocean-motion-layer')
  let heroVisible = true
  const syncLayer = () => motionLayer?.classList.toggle('is-paused', !heroVisible || document.hidden)
  const layerObserver = new IntersectionObserver(entries => { heroVisible = !!entries[0]?.isIntersecting; syncLayer() })
  if (motionLayer) layerObserver.observe(motionLayer)
  document.addEventListener('visibilitychange', syncLayer)
  const ctx = gsap.context(() => {
   gsap.fromTo('[data-hero-motion]', { opacity: 0, y: 26 }, {
    opacity: 1, y: 0, duration: 0.85, stagger: 0.13, ease: 'power2.out', clearProps: 'transform,opacity'
   })
   gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
     opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
     scrollTrigger: { trigger: el, start: 'top 92%', once: true },
     clearProps: 'transform,opacity'
    })
   })
   gsap.utils.toArray<HTMLElement>('[data-card-motion]').forEach(el => {
    gsap.fromTo(el, { y: 18 }, { y: 0, duration: 0.7, ease: 'power2.out',
     scrollTrigger: { trigger: el, start: 'top 96%', once: true }, clearProps: 'transform' })
   })
  })
  return () => { layerObserver.disconnect(); document.removeEventListener('visibilitychange', syncLayer); ctx.revert() }
 }, [])
 return null
}

/** A low-cost underwater particle field behind the hero content. */
export function UnderwaterParticles() {
 const host = useRef<HTMLDivElement>(null)
 useEffect(() => {
  const element = host.current
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 767px)').matches || connection?.saveData ||
      connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return
  let cancelled = false
  let cleanup: (() => void) | undefined
  import('three').then(THREE => {
   if (cancelled || !element) return
   const width = element.clientWidth, height = element.clientHeight
   if (!width || !height) return
   let renderer: InstanceType<typeof THREE.WebGLRenderer>
   try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
   } catch { return }
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
   renderer.setSize(width, height)
   renderer.setClearColor(0x000000, 0)
   renderer.domElement.setAttribute('aria-hidden', 'true')
   element.appendChild(renderer.domElement)
   const scene = new THREE.Scene()
   const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
   camera.position.z = 14
   const count = 90
   const coords = new Float32Array(count * 3)
   for (let i = 0; i < count; i++) {
    coords[i * 3] = (Math.random() - .5) * 27
    coords[i * 3 + 1] = (Math.random() - .5) * 15
    coords[i * 3 + 2] = (Math.random() - .5) * 8
   }
   const geometry = new THREE.BufferGeometry()
   geometry.setAttribute('position', new THREE.BufferAttribute(coords, 3))
   const material = new THREE.PointsMaterial({ color: 0xb4eaff, size: .045, transparent: true, opacity: .48, depthWrite: false })
   const particles = new THREE.Points(geometry, material)
   scene.add(particles)
   let frame = 0
   let elapsed = 0
   let lastTime = 0
   let inView = false
   const tick = (time: number) => {
    if (lastTime) elapsed += Math.min((time - lastTime) / 1000, .1)
    lastTime = time
    particles.rotation.y += .00015
    particles.position.y = Math.sin(elapsed * .18) * .22
    renderer.render(scene, camera)
    frame = window.requestAnimationFrame(tick)
   }
   const syncAnimation = () => {
    if (inView && !document.hidden) {
     if (!frame) frame = window.requestAnimationFrame(tick)
    } else {
     if (frame) cancelAnimationFrame(frame)
     frame = 0
     lastTime = 0
    }
   }
   const observer = new IntersectionObserver(entries => { inView = !!entries[0]?.isIntersecting; syncAnimation() }, { threshold: 0 })
   observer.observe(element)
   document.addEventListener('visibilitychange', syncAnimation)
   const onResize = () => {
    const w = element.clientWidth, h = element.clientHeight
    if (!w || !h) return
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h)
   }
   window.addEventListener('resize', onResize, { passive: true })
   cleanup = () => {
    cancelAnimationFrame(frame); observer.disconnect()
    document.removeEventListener('visibilitychange', syncAnimation)
    window.removeEventListener('resize', onResize)
    geometry.dispose(); material.dispose(); renderer.dispose()
    renderer.domElement.remove()
   }
  }).catch(() => { /* WebGL enhancement is optional */ })
  return () => { cancelled = true; cleanup?.() }
 }, [])
 return <div ref={host} className='pointer-events-none absolute inset-0 z-[1] hidden md:block' aria-hidden='true' />
}
