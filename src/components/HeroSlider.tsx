'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'

const slides = [
 { image: '/images/hero-about-a.webp', en: 'Discover the underwater world', ru: 'Откройте подводный мир' },
 { image: '/images/cpn6a.webp', en: 'Explore Koh Tao', ru: 'Откройте Ко Тао' },
 { image: '/images/generated/maldives-diving.webp', en: 'Dive into the Maldives', ru: 'Погрузитесь на Мальдивах' },
]
export default function HeroSlider({ locale }: { locale: 'en' | 'ru' }) {
 const [index, setIndex] = useState(0)
 const image = useRef<HTMLDivElement>(null)
 const touch = useRef<number | null>(null)
 useEffect(() => {
  if (!image.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const tween = gsap.fromTo(image.current, { opacity: 0.55, scale: 1.035 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' })
  return () => { tween.kill() }
 }, [index])
 const go = (direction: number) => setIndex(i => (i + direction + slides.length) % slides.length)
 return <div className='absolute inset-0' onTouchStart={e => { touch.current = e.touches[0].clientX }} onTouchEnd={e => { if (touch.current !== null) { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 60) go(d < 0 ? 1 : -1); touch.current = null } }}>
  <div ref={image} className='absolute inset-0' key={index}><Image src={slides[index].image} alt='' fill priority={index === 0} sizes='100vw' className='object-cover'/></div>
  <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-[#032538]/95 via-[#034461]/65 to-[#032538]/10'/><div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[#022335]/80 via-transparent to-transparent'/>
  <div className='absolute bottom-5 right-6 z-20 flex items-center gap-2 md:right-10' aria-label={locale === 'ru' ? 'Слайды' : 'Slides'}>
   <button type='button' onClick={() => go(-1)} aria-label={locale === 'ru' ? 'Предыдущий слайд' : 'Previous slide'} className='grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-[#032536]/60 text-white'><ChevronLeft size={20}/></button>
   {slides.map((slide, i) => <button key={slide.image} type='button' onClick={() => setIndex(i)} aria-label={locale === 'ru' ? slide.ru : slide.en} aria-pressed={index === i} className={'h-3 w-3 rounded-full '+(index === i ? 'bg-cyan-300' : 'bg-white/60')}/>)}
   <button type='button' onClick={() => go(1)} aria-label={locale === 'ru' ? 'Следующий слайд' : 'Next slide'} className='grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-[#032536]/60 text-white'><ChevronRight size={20}/></button>
  </div>
 </div>
}
