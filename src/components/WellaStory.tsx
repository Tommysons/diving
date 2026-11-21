'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Props = { locale: 'en' | 'ru' }

export default function WellaStory({ locale }: Props) {
  const root = useRef<HTMLElement>(null)
  const ru = locale === 'ru'
  useEffect(() => {
    const section = root.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!section || preference.matches || !('IntersectionObserver' in window)) return
    let disposed = false
    let animation: { revert: () => void } | undefined
    const observer = new IntersectionObserver(async entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      const { gsap } = await import('gsap')
      if (disposed) return
      animation = gsap.context(() => {
        gsap.fromTo(section.querySelectorAll('[data-story-reveal]'),
          { y: 18 }, { y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', clearProps: 'transform' })
      }, section)
    }, { rootMargin: '0px 0px -5% 0px' })
    observer.observe(section)
    return () => { disposed = true; observer.disconnect(); animation?.revert() }
  }, [])

  const t = ru ? {
    eyebrow: 'ВЕЛЛА ГИРИ · МАЛЬДИВЫ',
    title: 'Взгляд на риф',
    lead: 'Подводная вершина, кораллы и жизнь открытого океана — узнайте, что делает этот дайв-сайт особенным.',
    top: 'ПОД ПОВЕРХНОСТЬЮ',
    first: 'Подводная гора',
    firstText: 'Велла Гири — подводная вершина, которая уходит примерно на 30–35 метров. Течение вокруг неё может менять направление.',
    middle: 'САМАЯ ЯРКАЯ ЧАСТЬ',
    second: 'Жизнь на 10–20 метрах',
    secondText: 'Здесь часто встречаются красивые коралловые образования и богатая рифовая жизнь. Глубину погружения выбирайте в пределах своей подготовки.',
    wildlife: 'ОБРАТИТЕ ВНИМАНИЕ',
    third: 'Встречи в голубой воде',
    thirdText: 'Среди возможных встреч — орляковые скаты, черепахи, мурены, рифовые акулы и стаи рыб. Морская жизнь непредсказуема, поэтому встречи не гарантированы.',
    image1: 'Подводный риф на Wella Giri', image2: 'Морская жизнь на Wella Giri',
    link: 'Посмотреть условия погружения',
  } : {
    eyebrow: 'WELLA GIRI · MALDIVES',
    title: 'A closer look at the reef',
    lead: 'An underwater pinnacle, coral and ocean life — discover what makes this dive site special.',
    top: 'BENEATH THE SURFACE',
    first: 'An underwater mountain',
    firstText: 'Wella Giri is a submerged pinnacle descending to approximately 30–35 metres. Currents can change direction around it.',
    middle: 'THE VIBRANT ZONE',
    second: 'Life at 10–20 metres',
    secondText: 'Coral formations and reef life are often most vibrant at these depths. Choose a depth that is within your training.',
    wildlife: 'LOOK INTO THE BLUE',
    third: 'Ocean encounters',
    thirdText: 'You may encounter eagle rays, turtles, moray eels, reef sharks and schools of fish. Ocean life is unpredictable, so sightings are never guaranteed.',
    image1: 'Underwater reef at Wella Giri', image2: 'Marine life at Wella Giri',
    link: 'See dive conditions',
  }

  return <section ref={root} className='mt-16 overflow-hidden rounded-3xl border border-cyan-100/15 bg-[#032333] md:mt-20' aria-labelledby='wella-story-title'>
    <div className='px-6 pb-9 pt-9 md:px-10 md:pb-12 md:pt-12' data-story-reveal>
      <p className='text-xs font-bold tracking-[.2em] text-cyan-200'>{t.eyebrow}</p>
      <h2 id='wella-story-title' className='mt-3 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl'>{t.title}</h2>
      <p className='mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-lg'>{t.lead}</p>
      <a href='#dive-conditions' className='mt-6 inline-flex min-h-11 items-center rounded-xl border border-cyan-100/50 px-5 py-2.5 font-semibold text-cyan-50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200'>{t.link}</a>
    </div>
    <div className='grid border-t border-white/10 lg:grid-cols-2'>
      <div className='relative min-h-[260px] md:min-h-[380px]' data-story-reveal><Image src='/images/dive-sites/wella-giri/4.png' alt={t.image1} fill sizes='(max-width: 1024px) 100vw, 600px' className='object-cover'/></div>
      <div className='flex flex-col justify-center px-6 py-10 md:px-10 md:py-14' data-story-reveal><p className='text-xs font-bold tracking-[.18em] text-cyan-200'>{t.top}</p><h3 className='mt-3 text-2xl font-bold md:text-3xl'>{t.first}</h3><p className='mt-4 max-w-xl text-base leading-8 text-slate-200'>{t.firstText}</p></div>
    </div>
    <div className='grid border-t border-white/10 lg:grid-cols-2'>
      <div className='relative min-h-[260px] lg:order-2 md:min-h-[380px]' data-story-reveal><Image src='/images/dive-sites/wella-giri/7.png' alt={t.image2} fill sizes='(max-width: 1024px) 100vw, 600px' className='object-cover'/></div>
      <div className='flex flex-col justify-center px-6 py-10 md:px-10 md:py-14' data-story-reveal><p className='text-xs font-bold tracking-[.18em] text-cyan-200'>{t.middle}</p><h3 className='mt-3 text-2xl font-bold md:text-3xl'>{t.second}</h3><p className='mt-4 max-w-xl text-base leading-8 text-slate-200'>{t.secondText}</p></div>
    </div>
    <div className='border-t border-white/10 bg-[#0a3b4d] px-6 py-10 md:px-10 md:py-12' data-story-reveal><p className='text-xs font-bold tracking-[.18em] text-cyan-200'>{t.wildlife}</p><h3 className='mt-3 text-2xl font-bold md:text-3xl'>{t.third}</h3><p className='mt-4 max-w-3xl text-base leading-8 text-slate-200'>{t.thirdText}</p></div>
  </section>
}
