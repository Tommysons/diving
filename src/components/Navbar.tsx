'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open,setOpen] = useState(false)
  const pathname = usePathname() || '/'
  const ru = pathname.startsWith('/ru')
  const base = ru ? '/ru' : ''
  const path = ru ? pathname.replace(/^\/ru/, '') || '/' : pathname
  const items = [
    { label:ru?'Атлас Земли':'Explore Earth',href:base+'/atlas' },
    { label:ru?'Направления':'Destinations',href:base+'/destinations/thailand', children:[{label:ru?'Таиланд':'Thailand',href:base+'/destinations/thailand'},{label:ru?'Мальдивы':'Maldives',href:base+'/destinations/maldives'}] },
    { label:ru?'Дайвинг':'Diving',href:base+'/divesites',children:[{label:ru?'Дайв-сайты':'Dive Sites',href:base+'/divesites'},{label:ru?'Курсы':'Courses',href:base+'/scubadivingcourses'}] },
    { label:ru?'Снорклинг':'Snorkeling',href:base+'/destinations/maldives' },
    { label:ru?'Истории':'Stories',href:base+'/blog' },
    { label:ru?'О нас':'About',href:base+'/aboutme' },
    { label:ru?'Контакты':'Contact',href:base+'/contact' },
  ]
  const localePath = (target:'en'|'ru') => target==='ru' ? '/ru'+(path==='/'?'':path) : path
  return <nav className='relative z-50 border-b border-white/10 bg-[#03283b] text-white'>
    <div className='mx-auto flex min-h-[74px] max-w-[1480px] items-center justify-between gap-5 px-5 md:px-8'>
      <Link href={base||'/'} className='flex shrink-0 items-center gap-3' aria-label='LokaWndr home'>
        <Image src='/images/logo.png' alt='' width={56} height={48} className='h-12 w-14 object-contain' />
        <span><strong className='block text-2xl font-extrabold leading-none tracking-tight'>LokaWndr</strong><small className='mt-1 block text-[9px] font-bold tracking-[0.18em] text-cyan-100'>EXPLORE · DIVE · SNORKEL</small></span>
      </Link>
      <div className='hidden items-center gap-6 xl:flex'>
        <Link href={base||'/'} className='border-b-2 border-white pb-1 text-sm font-semibold'>{ru?'Главная':'Home'}</Link>
        {items.map(item=><div key={item.label} className='group relative'>
          <Link href={item.href} className='flex items-center gap-1 py-3 text-sm font-semibold hover:text-cyan-200'>{item.label}{item.children&&<ChevronDown size={14}/>}</Link>
          {item.children&&<div className='invisible absolute left-0 top-full min-w-44 rounded-lg border border-white/15 bg-[#06374d] p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100'>{item.children.map(child=><Link key={child.href} href={child.href} className='block rounded-md px-3 py-2 text-sm hover:bg-white/10'>{child.label}</Link>)}</div>}
        </div>)}
      </div>
      <div className='hidden shrink-0 items-center gap-3 md:flex'>
        <Link href={localePath('en')} className={!ru?'font-bold':'text-slate-300'}>EN</Link><span className='text-white/40'>|</span><Link href={localePath('ru')} className={ru?'font-bold':'text-slate-300'}>RU</Link>
        <Link href={base+'/contact'} className='ml-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#062536] hover:bg-cyan-100'>{ru?'Связаться':'Plan Your Experience'}</Link>
      </div>
      <button className='rounded-md p-2 xl:hidden' aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<div className='absolute left-0 right-0 top-full max-h-[80vh] overflow-auto border-t border-white/15 bg-[#03283b] px-6 py-5 shadow-2xl xl:hidden'>
      <Link onClick={()=>setOpen(false)} href={base||'/'} className='block py-2 font-semibold'>{ru?'Главная':'Home'}</Link>
      {items.map(item=><div key={item.label}><Link onClick={()=>setOpen(false)} href={item.href} className='block py-2 font-semibold'>{item.label}</Link>{item.children?.map(child=><Link onClick={()=>setOpen(false)} key={child.href} href={child.href} className='block py-1 pl-5 text-sm text-cyan-100'>{child.label}</Link>)}</div>)}
      <div className='mt-4 flex gap-5 border-t border-white/15 pt-4'><Link href={localePath('en')} onClick={()=>setOpen(false)}>EN</Link><Link href={localePath('ru')} onClick={()=>setOpen(false)}>RU</Link><Link href={base+'/contact'} onClick={()=>setOpen(false)}>{ru?'Связаться':'Contact'}</Link></div>
    </div>}
  </nav>
}