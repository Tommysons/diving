// app/divesites/page.tsx

import Link from 'next/link'
import { diveSites } from '@/lib/data/diveSites'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DiveSitesPage() {
  return (
    <>
      <Header />
      <div className='p-6 max-w-4xl mx-auto space-y-4'>
        <h1 className='text-4xl font-bold mb-6'>All Dive Sites</h1>
        <ul className='space-y-4'>
          {diveSites.map((site) => (
            <li key={site.slug} className='border rounded p-4 hover:shadow-lg'>
              <Link
                href={`/divesites/${site.slug}`}
                className='flex items-center space-x-4 cursor-pointer'
              >
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className='w-24 h-24 object-cover rounded'
                />
                <div>
                  <h2 className='text-2xl font-semibold'>{site.name}</h2>
                  <p className='text-gray-600'>{site.shortDescription}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  )
}
