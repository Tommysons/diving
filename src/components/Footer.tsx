'use client'
import { contacts } from '../lib/data'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname() || '/'
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en'

  const translations = {
    en: {
      contact: 'Contact Me',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      follow: 'Follow Me',
      about: 'About Me',
      aboutText:
        'Discover the best diving experiences with me. Safe, professional, and fun!',
    },
    ru: {
      contact: 'Свяжитесь со мной',
      phone: 'Телефон',
      email: 'Эл. почта',
      address: 'Адрес',
      follow: 'Я в социальных сетях',
      about: 'Обо мне',
      aboutText:
        'Откройте для себя лучшие дайвинг-приключения со мной. Безопасно, профессионально и весело!',
    },
  }

  const t = translations[locale]
  const currentContacts = contacts[locale] // ✅ pick correct locale

  return (
    <footer className='bg-blue-900 text-white py-8 px-6 mt-16'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8'>
        {/* Contact Section */}
        <div>
          <h3 className='font-bold text-lg mb-2'>{t.contact}</h3>
          <p>
            {t.phone}:{' '}
            <a href={`tel:${currentContacts.phone}`} className='underline'>
              {currentContacts.phone}
            </a>
          </p>
          <p>
            {t.email}:{' '}
            <a href={`mailto:${currentContacts.email}`} className='underline'>
              {currentContacts.email}
            </a>
          </p>
          <p>
            {t.address}: {currentContacts.address}
          </p>
        </div>

        {/* Social Section */}
        <div>
          <h3 className='font-bold text-lg mb-2'>{t.follow}</h3>
          <ul>
            {currentContacts.socialLinks.map(({ platform, url }) => (
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
