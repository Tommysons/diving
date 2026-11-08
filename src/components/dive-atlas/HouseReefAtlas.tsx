'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Point = { x: number; y: number; z: number }
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const reefHeight = (x: number, z: number) => {
  // Illustrative profile, not surveyed bathymetry. Y is metres below sea level.
  const coast = 6 + 1.7 * Math.sin(z * 0.09)
  const edge = 18 + 3 * Math.sin(z * 0.065)
  const t = clamp((x - coast) / (edge - coast), 0, 1)
  const wall = t * t * (3 - 2 * t)
  const shelf = 4 + 2 * Math.sin(z * 0.07)
  const depth = shelf + 18 * wall + Math.max(0, x - edge) * 0.31
  const coral = 0.55 * Math.sin(x * 0.35) * Math.cos(z * 0.24)
  return -clamp(depth + coral, 3, 35)
}
const terrain: Point[][] = Array.from({ length: 47 }, (_, i) =>
  Array.from({ length: 65 }, (_, j) => {
    const x = -2 + i * 0.85
    const z = -27 + j * 0.85
    return { x, y: reefHeight(x, z), z }
  })
)

export default function HouseReefAtlas({ russian = false }: { russian?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const view = useRef({ yaw: -0.65, pitch: 0.49, zoom: 1 })
  const [readout, setReadout] = useState({ yaw: -37, zoom: 100 })
  const [labels, setLabels] = useState(true)
  const [motion, setMotion] = useState(false)
  const [fallback, setFallback] = useState(false)

  const changeView = useCallback((yawDelta: number, pitchDelta: number, scale = 1) => {
    const v = view.current
    v.yaw += yawDelta
    v.pitch = clamp(v.pitch + pitchDelta, 0.15, 1.3)
    v.zoom = clamp(v.zoom * scale, 0.55, 2.4)
    setReadout({ yaw: Math.round(v.yaw * 180 / Math.PI), zoom: Math.round(v.zoom * 100) })
  }, [])

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) { setFallback(true); return }
    let frame = 0
    let raf = 0
    let width = 0
    let height = 0
    const resize = () => {
      const rect = el.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      el.width = Math.round(width * dpr)
      el.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    resize()
    const draw = () => {
      if (motion) view.current.yaw += 0.002
      ctx.clearRect(0, 0, width, height)
      const bg = ctx.createLinearGradient(0, 0, 0, height)
      bg.addColorStop(0, '#042b43')
      bg.addColorStop(1, '#011420')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)
      const v = view.current
      const scale = Math.min(width / 68, height / 55) * v.zoom
      const cy = Math.cos(v.yaw), sy = Math.sin(v.yaw)
      const cp = Math.cos(v.pitch), sp = Math.sin(v.pitch)
      const project = (p: Point) => {
        const xx = p.x - 17
        const yy = p.y + 16
        const rx = xx * cy - p.z * sy
        const rz = xx * sy + p.z * cy
        return { x: width * 0.5 + rx * scale, y: height * 0.53 + (rz * sp - yy * cp) * scale, depth: rz * cp + yy * sp }
      }
      const polygons: { pts: ReturnType<typeof project>[]; depth: number; shade: number }[] = []
      for (let i = 0; i < terrain.length - 1; i++) {
        for (let j = 0; j < terrain[i].length - 1; j++) {
          const a = terrain[i][j], b = terrain[i + 1][j], c = terrain[i + 1][j + 1], d = terrain[i][j + 1]
          const pts = [a, b, c, d].map(project)
          const shade = Math.abs((a.y - b.y) * 0.5) + Math.abs((a.y - d.y) * 0.35)
          polygons.push({ pts, depth: pts.reduce((s, p) => s + p.depth, 0) / 4, shade })
        }
      }
      polygons.sort((a, b) => b.depth - a.depth)
      for (const poly of polygons) {
        const k = clamp(poly.shade, 0, 5)
        ctx.fillStyle = `hsl(${188 - k * 3}  ${40 + k * 3}% ${27 + k * 3}%)`
        ctx.strokeStyle = 'rgba(97, 204, 214, 0.13)'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        poly.pts.forEach((p, idx) => idx ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y))
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
      if (labels) {
        const markers = [
          { p: { x: 0, y: -4, z: -12 }, text: russian ? 'Мелководье · 3–5 м' : 'Shallow reef · 3–5 m' },
          { p: { x: 13, y: -13, z: 5 }, text: russian ? 'Склон рифа · ~15 м' : 'Reef slope · ~15 m' },
          { p: { x: 22, y: -24, z: -8 }, text: russian ? 'Рифовая стена · ~25 м' : 'Reef wall · ~25 m' },
          { p: { x: 34, y: -33, z: 12 }, text: russian ? 'Песчаное дно · ~35 м' : 'Sandy bottom · ~35 m' }
        ]
        ctx.font = '600 12px system-ui, sans-serif'
        ctx.textBaseline = 'middle'
        for (const marker of markers) {
          const p = project(marker.p)
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue
          const tw = ctx.measureText(marker.text).width
          const lx = clamp(p.x + 9, 4, width - tw - 17)
          ctx.fillStyle = 'rgba(0, 20, 33, .88)'
          ctx.fillRect(lx, p.y - 13, tw + 14, 26)
          ctx.fillStyle = '#c9f8ff'
          ctx.fillText(marker.text, lx + 7, p.y)
          ctx.beginPath()
          ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2)
          ctx.fillStyle = '#7de6ea'
          ctx.fill()
        }
      }
      frame++
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); observer.disconnect() }
  }, [labels, motion, russian])

  const t = russian ? {
    title: 'Vilu House Reef · 3D-модель', intro: 'Интерактивная иллюстрация рельефа рифа по схематической карте. Не является точной батиметрией.',
    reset: 'Сбросить вид', labels: 'Подписи глубин', spin: 'Автовращение', controls: 'Перетаскивайте для поворота · Колесо или кнопки для масштаба',
    note: 'Примерная модель для знакомства с рифом, не для навигации или планирования погружения.',
    error: '3D-вид недоступен в этом браузере.'
  } : {
    title: 'Vilu House Reef · 3D preview', intro: 'Explore an illustrative underwater reef profile based on a schematic map, not surveyed bathymetry.',
    reset: 'Reset view', labels: 'Depth labels', spin: 'Auto rotate', controls: 'Drag to orbit · Scroll or use buttons to zoom',
    note: 'Approximate educational visualization only. Not for navigation or dive planning.',
    error: 'The 3D view is unavailable in this browser.'
  }
  return <>
    <Header />
    <main className="min-h-screen bg-[#031c2b] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-300">LokaWndr · Dive Atlas</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{t.title}</h1>
        <p className="mt-3 max-w-3xl text-slate-300">{t.intro}</p>
        <div className="mt-7 overflow-hidden rounded-2xl border border-cyan-700/40 bg-[#04283d]">
          <canvas
            ref={canvas}
            role="img"
            aria-label={t.title}
            className="block h-[390px] w-full cursor-grab touch-none active:cursor-grabbing sm:h-[590px]"
            onPointerDown={e => { drag.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId) }}
            onPointerMove={e => {
              if (!drag.current) return
              changeView((e.clientX - drag.current.x) * 0.009, (e.clientY - drag.current.y) * 0.006)
              drag.current = { x: e.clientX, y: e.clientY }
            }}
            onPointerUp={() => { drag.current = null }}
            onPointerCancel={() => { drag.current = null }}
            onWheel={e => { changeView(0, 0, e.deltaY > 0 ? 0.92 : 1.08) }}
          />
          {fallback && <p className="p-4">{t.error}</p>}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-4">
            <p className="text-sm text-cyan-100">{t.controls}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-label="Zoom in" onClick={() => changeView(0, 0, 1.15)} className="rounded-lg border border-white/30 px-4 py-2 hover:bg-white/10">+</button>
              <button type="button" aria-label="Zoom out" onClick={() => changeView(0, 0, 0.85)} className="rounded-lg border border-white/30 px-4 py-2 hover:bg-white/10">−</button>
              <button type="button" onClick={() => { view.current = { yaw: -0.65, pitch: 0.49, zoom: 1 }; setReadout({ yaw: -37, zoom: 100 }) }} className="rounded-lg border border-white/30 px-3 py-2 hover:bg-white/10">{t.reset}</button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-200">
          <label className="flex items-center gap-2"><input type="checkbox" checked={labels} onChange={e => setLabels(e.target.checked)} />{t.labels}</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={motion} onChange={e => setMotion(e.target.checked)} />{t.spin}</label>
          <span>Zoom: {readout.zoom}%</span>
        </div>
        <p className="mt-5 rounded-xl border border-amber-300/30 bg-amber-900/15 p-4 text-sm text-amber-100">{t.note}</p>
      </div>
    </main>
    <Footer />
  </>
}
