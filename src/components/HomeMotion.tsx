'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Progressive enhancement: never hide content before JS is ready. */
export function HomeMotion() {
 useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.registerPlugin(ScrollTrigger)
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
  })
  return () => ctx.revert()
 }, [])
 return null
}

/** A low-cost underwater particle field behind the hero content. */
export function UnderwaterParticles() {
 const host = useRef<HTMLDivElement>(null)
 useEffect(() => {
  const element = host.current
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 767px)').matches) return
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
   const clock = new THREE.Clock()
   let frame = 0
   let visible = !document.hidden
   const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting && !document.hidden }, { threshold: 0 })
   observer.observe(element)
   const onVisibility = () => { visible = !document.hidden }
   document.addEventListener('visibilitychange', onVisibility)
   const onResize = () => {
    const w = element.clientWidth, h = element.clientHeight
    if (!w || !h) return
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h)
   }
   window.addEventListener('resize', onResize, { passive: true })
   const tick = () => {
    frame = window.requestAnimationFrame(tick)
    if (!visible) { clock.getDelta(); return }
    particles.rotation.y += .00015
    particles.position.y = Math.sin(clock.getElapsedTime() * .18) * .22
    renderer.render(scene, camera)
   }
   tick()
   cleanup = () => {
    cancelAnimationFrame(frame); observer.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('resize', onResize)
    geometry.dispose(); material.dispose(); renderer.dispose()
    renderer.domElement.remove()
   }
  }).catch(() => { /* WebGL enhancement is optional */ })
  return () => { cancelled = true; cleanup?.() }
 }, [])
 return <div ref={host} className='pointer-events-none absolute inset-0 z-[1] hidden md:block' aria-hidden='true' />
}
