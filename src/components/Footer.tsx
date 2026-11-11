'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Mail, ArrowUpRight, MessageCircle } from 'lucide-react'
import { contacts } from '../lib/data'

export default function Footer() {
  const pathname = usePathname() || '/'
  const ru = pathname.startsWith('/ru')
  const locale = ru ? 'ru' : 'en'
  const base = ru ? '/ru' : ''
  const currentContacts = contacts[locale]
  const socialLinks = [{ platform: 'Instagram', url: 'https://www.instagram.com/lokawndr/' }, { platform: 'YouTube', url: 'https://www.youtube.com/@lokawndr' }]
  const t = ru
    ? {
        tagline: 'Открывайте подводный мир вместе с нами.',
        description: 'Дайвинг, снорклинг и настоящие истории об океане из Таиланда, Мальдив и других уголков мира.',
        explore: 'Исследовать',
        thailand: 'Таиланд',
        maldives: 'Мальдивы',
        diveSites: 'Дайв-сайты',
        courses: 'Курсы дайвинга',
        stories: 'Блог',
        about: 'О нас',
        contact: 'Контакты',
        whatsapp: 'WhatsApp',
        follow: 'Мы в соцсетях',
        rights: 'Все права защищены.',
        made: 'Создано для тех, кто любит океан.',
      }
    : {
        tagline: 'Explore the underwater world.',
        description: 'Scuba diving, snorkeling and real ocean stories from Thailand, the Maldives and beyond.',
        explore: 'Explore',
        thailand: 'Thailand',
        maldives: 'Maldives',
        diveSites: 'Dive Sites',
        courses: 'Scuba Courses',
        stories: 'Blog',
        about: 'About',
        contact: 'Contact',
        whatsapp: 'WhatsApp',
        follow: 'Follow the Journey',
        rights: 'All rights reserved.',
        made: 'Made for ocean explorers.',
      }

  const exploreLinks = [
    { label: t.thailand, href: base + '/destinations/thailand' },
    { label: t.maldives, href: base + '/destinations/maldives' },
    { label: t.courses, href: base + '/scubadivingcourses' },
  ]
  const moreLinks = [
    { label: t.stories, href: base + '/blog' },
    { label: t.about, href: base + '/aboutme' },
    { label: t.contact, href: base + '/contact' },
  ]

  return (
    <footer className='border-t border-white/10 bg-[#03283b] text-white'>
      <div className='mx-auto grid max-w-[1480px] gap-10 px-6 pb-12 pt-14 md:grid-cols-2 md:px-10 lg:grid-cols-4'>
        <div className='lg:pr-8'>
          <Link href={base || '/'} className='inline-flex items-center gap-3' aria-label='LokaWndr home'>
            <Image src='/images/logo.png' alt='' width={56} height={48} className='h-12 w-14 object-contain' />
            <span>
              <strong className='block text-2xl font-extrabold leading-none tracking-tight'>LokaWndr</strong>
              <small className='mt-1 block text-[9px] font-bold tracking-[0.18em] text-cyan-100'>EXPLORE · DIVE · SNORKEL</small>
            </span>
          </Link>
          <p className='mt-6 text-lg font-semibold'>{t.tagline}</p>
          <p className='mt-3 max-w-xs text-sm leading-7 text-slate-300'>{t.description}</p>
        </div>

        <div>
          <h2 className='mb-5 text-sm font-bold uppercase tracking-[0.16em] text-cyan-100'>{t.explore}</h2>
          <ul className='space-y-3'>
            {exploreLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href} className='text-sm text-slate-200 transition hover:text-white hover:underline'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='mb-5 text-sm font-bold uppercase tracking-[0.16em] text-cyan-100'>LokaWndr</h2>
          <ul className='space-y-3'>
            {moreLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href} className='text-sm text-slate-200 transition hover:text-white hover:underline'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className='mb-5 text-sm font-bold uppercase tracking-[0.16em] text-cyan-100'>{t.follow}</h2>
          <ul className='space-y-3'>
            {socialLinks.map(({ platform, url }) => (
              <li key={platform}>
                <a href={url} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1 text-sm text-slate-200 transition hover:text-white'>
                  {platform}<ArrowUpRight size={14} aria-hidden='true' />
                </a>
              </li>
            ))}
          </ul>
          <h2 className='mb-3 mt-7 text-sm font-bold uppercase tracking-[0.16em] text-cyan-100'>{t.contact}</h2>
          <a href={`https://wa.me/${currentContacts.phone.replace(/\D/g, '')}`} target='_blank' rel='noopener noreferrer' className='mb-3 inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-white'>
            <MessageCircle size={16} aria-hidden='true' />
            <span>{t.whatsapp}: {currentContacts.phone}</span>
          </a>
          <div />
          <a href={`mailto:${currentContacts.email}`} className='inline-flex items-center gap-2 break-all text-sm text-slate-200 transition hover:text-white'>
            <Mail size={16} aria-hidden='true' />{currentContacts.email}
          </a>
        </div>
      </div>
      <div className='border-t border-white/15'>
        <div className='mx-auto flex max-w-[1480px] flex-col justify-between gap-3 px-6 py-6 text-xs text-slate-300 md:flex-row md:items-center md:px-10'>
          <span>© {new Date().getFullYear()} LokaWndr. {t.rights}</span>
          <span>{t.made}</span>
        </div>
      </div>
    </footer>
  )
}
