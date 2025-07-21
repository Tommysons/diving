import { contacts } from '../lib/data'

export default function Footer() {
  return (
    <footer className='bg-blue-900 text-white py-8 px-6 mt-16'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8'>
        <div>
          <h3 className='font-bold text-lg mb-2'>Contact Us</h3>
          <p>
            Phone:{' '}
            <a href={`tel:${contacts.phone}`} className='underline'>
              {contacts.phone}
            </a>
          </p>
          <p>
            Email:{' '}
            <a href={`mailto:${contacts.email}`} className='underline'>
              {contacts.email}
            </a>
          </p>
          <p>Address: {contacts.address}</p>
        </div>
        <div>
          <h3 className='font-bold text-lg mb-2'>Follow Us</h3>
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
        <div>
          <h3 className='font-bold text-lg mb-2'>About</h3>
          <p>
            Discover the best diving experiences with us. Safe, professional,
            and fun!
          </p>
        </div>
      </div>
    </footer>
  )
}
