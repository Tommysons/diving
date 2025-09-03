'use client'
import { contacts } from '../lib/data'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  const translations = {
    en: {
      contact: 'Contact Us',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      follow: 'Follow Us',
      about: 'About',
      aboutText:
        'Discover the best diving experiences with us. Safe, professional, and fun!',
    },
    ru: {
      contact: 'Свяжитесь с нами',
      phone: 'Телефон',
      email: 'Эл. почта',
      address: 'Адрес',
      follow: 'Мы в социальных сетях',
      about: 'О нас',
      aboutText:
        'Откройте для себя лучшие дайвинг-приключения с нами. Безопасно, профессионально и весело!',
    },
  }

  const t = translations[locale]

  return (
    <footer className='bg-blue-900 text-white py-8 px-6 mt-16'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8'>
        {/* Contact Section */}
        <div>
          <h3 className='font-bold text-lg mb-2'>{t.contact}</h3>
          <p>
            {t.phone}:{' '}
            <a href={`tel:${contacts.phone}`} className='underline'>
              {contacts.phone}
            </a>
          </p>
          <p>
            {t.email}:{' '}
            <a href={`mailto:${contacts.email}`} className='underline'>
              {contacts.email}
            </a>
          </p>
          <p>
            {t.address}: {contacts.address}
          </p>
        </div>

        {/* Social Section */}
        <div>
          <h3 className='font-bold text-lg mb-2'>{t.follow}</h3>
          <ul>
            {contacts.socialLinks.map(({ platform, url }) => (
              <li key={platform}>
                <a
                  href={url}
                  target='_blank'
                  rel='noreferrer'
                  className='underline hover:text-yellow-400'
                >
                  {platform}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className='font-bold text-lg mb-2'>{t.about}</h3>
          <p>{t.aboutText}</p>
        </div>
      </div>
    </footer>
  )
}
