'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Props = {
  name: string
  locale: 'en' | 'ru'
  destination: 'thailand' | 'maldives'
  intro: string
  description: string
  photos: string[]
  conditions: { label: string; value: string }[]
  marineLife?: string[]
  marineText?: string
  photoCredit?: string
  note: string
}

export default function DiveStory({ name, locale, destination, intro, description, photos, conditions, marineLife, marineText, photoCredit, note }: Props) {
  const root = useRef<HTMLElement>(null)
  const ru = locale === 'ru'
  useEffect(() => {
    const section = root.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!section || preference.matches || !('IntersectionObserver' in window)) return
    let disposed = false
    const animations: { revert: () => void }[] = []
    const observer = new IntersectionObserver(entries => {
      entries.forEach(async entry => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        const { gsap } = await import('gsap')
        if (disposed || preference.matches) return
        animations.push(gsap.context(() => {
          gsap.fromTo(entry.target, { y: 18 }, { y: 0, duration: 0.7, ease: 'power2.out', clearProps: 'transform' })
        }, section))
      })
    }, { rootMargin: '0px 0px -5% 0px' })
    section.querySelectorAll('[data-story-reveal]').forEach(element => observer.observe(element))
    const stopForReducedMotion = () => { if (preference.matches) { observer.disconnect(); animations.forEach(animation => animation.revert()) } }
    preference.addEventListener('change', stopForReducedMotion)
    return () => { disposed = true; preference.removeEventListener('change', stopForReducedMotion); observer.disconnect(); animations.forEach(animation => animation.revert()) }
  }, [])
  const t = ru ? {
    eyebrow: destination === 'thailand' ? 'ТАИЛАНД · КО ТАО' : 'МАЛЬДИВЫ · АТОЛЛ ДХААЛУ',
    title: 'Взгляд на дайв-сайт', label: 'ПОД ПОВЕРХНОСТЬЮ', about: `Знакомство с ${name}`,
    details: 'ПЛАНИРОВАНИЕ ПОГРУЖЕНИЯ', conditions: 'Условия погружения',
    wildlife: 'ОБРАТИТЕ ВНИМАНИЕ', marine: 'Кого можно увидеть',
    sightings: 'Встречи с морскими обитателями не гарантированы.', link: 'Посмотреть условия погружения',
    image: 'подводная фотография',
  } : {
    eyebrow: destination === 'thailand' ? 'THAILAND · KOH TAO' : 'MALDIVES · DHAALU ATOLL',
    title: 'A closer look at the dive site', label: 'BENEATH THE SURFACE', about: `Discover ${name}`,
    details: 'PLAN YOUR DIVE', conditions: 'Dive conditions',
    wildlife: 'LOOK INTO THE BLUE', marine: 'Marine life to look for',
    sightings: 'Wildlife sightings are never guaranteed.', link: 'See dive conditions',
    image: 'underwater photograph',
  }
  const selected = [...new Set(photos.filter(Boolean))].slice(0, 2)
  return <section ref={root} className='mt-16 overflow-hidden rounded-3xl border border-cyan-100/15 bg-[#032333] md:mt-20' aria-labelledby='dive-story-title'>
    <div className='px-6 pb-9 pt-9 md:px-10 md:pb-12 md:pt-12' data-story-reveal>
      <p className='text-xs font-bold tracking-[.2em] text-cyan-200'>{name.toUpperCase()} · {t.eyebrow}</p>
      <h2 id='dive-story-title' className='mt-3 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl'>{t.title}</h2>
      <p className='mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-lg'>{intro}</p>
      <a href='#dive-conditions' className='mt-6 inline-flex min-h-11 items-center rounded-xl border border-cyan-100/50 px-5 py-2.5 font-semibold text-cyan-50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200'>{t.link}</a>
    </div>
    <div className={'grid border-t border-white/10 ' + (selected[0] ? 'lg:grid-cols-2' : '')}>
      {selected[0] && <div className='relative min-h-[260px] md:min-h-[380px]' data-story-reveal><Image src={selected[0]} alt={`${name} — ${t.image}`} fill sizes='(max-width: 1024px) 100vw, 600px' className='object-cover'/></div>}
      <div className='flex flex-col justify-center px-6 py-10 md:px-10 md:py-14' data-story-reveal><p className='text-xs font-bold tracking-[.18em] text-cyan-200'>{t.label}</p><h3 className='mt-3 text-2xl font-bold md:text-3xl'>{t.about}</h3><p className='mt-4 max-w-xl whitespace-pre-line text-base leading-8 text-slate-200'>{description}</p></div>
    </div>
    <div className={'grid border-t border-white/10 ' + (selected[1] ? 'lg:grid-cols-2' : '')}>
      {selected[1] && <div className='relative min-h-[260px] lg:order-2 md:min-h-[380px]' data-story-reveal><Image src={selected[1]} alt={`${name} — ${t.image}`} fill sizes='(max-width: 1024px) 100vw, 600px' className='object-cover'/></div>}
      <div className='flex flex-col justify-center px-6 py-10 md:px-10 md:py-14' data-story-reveal><p className='text-xs font-bold tracking-[.18em] text-cyan-200'>{t.details}</p><h3 className='mt-3 text-2xl font-bold md:text-3xl'>{t.conditions}</h3><dl className='mt-6 grid grid-cols-2 gap-5'>{conditions.map(({label,value})=><div key={label}><dt className='text-sm text-cyan-100/80'>{label}</dt><dd className='mt-1 font-semibold'>{value}</dd></div>)}</dl><p className='mt-5 max-w-xl text-sm leading-6 text-slate-300'>{note}</p></div>
    </div>
    {(marineText || !!marineLife?.length) && <div className='border-t border-white/10 bg-[#0a3b4d] px-6 py-10 md:px-10 md:py-12' data-story-reveal><p className='text-xs font-bold tracking-[.18em] text-cyan-200'>{t.wildlife}</p><h3 className='mt-3 text-2xl font-bold md:text-3xl'>{t.marine}</h3><p className='mt-4 max-w-3xl text-base leading-8 text-slate-200'>{marineText || `${marineLife?.join(', ')}. ${t.sightings}`}</p></div>}
    {photoCredit && selected.length > 0 && <p className='px-6 pb-6 pt-2 text-sm text-slate-300 md:px-10'>{photoCredit} <a className='underline' href='https://www.instagram.com/kakadong123/' target='_blank' rel='noopener noreferrer'>@kakadong123</a>.</p>}
  </section>
}
