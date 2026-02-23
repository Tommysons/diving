'use client'

import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/lib/data/blogPosts'
import { blogPostsRU } from '@/lib/data/blogPostsRU'

export default function BlogSection({ locale }: { locale: 'en' | 'ru' }) {
  const posts = locale === 'ru' ? blogPostsRU : blogPosts

  const quotes = {
    en: '“In diving, as in the ocean of life, every descent is followed by a rise—never give up.”',
    ru: '“В дайвинге, как и в океане жизни, за каждым погружением следует подъём — никогда не сдавайся.”',
  }

  return (
    <section className='relative py-20 overflow-hidden'>
      <Image
        src='/images/wr/wr2a.webp'
        alt='Blog background'
        fill
        sizes='100vw'
        loading='lazy'
        className='object-cover'
      />

      <div className='absolute inset-0 bg-black/40' />

      <div className='relative z-10 max-w-5xl mx-auto px-4 text-center'>
        <h2 className='text-4xl font-bold text-white mb-4'>
          {locale === 'ru' ? 'Последние статьи' : 'Latest Articles'}
        </h2>

        <p className='text-white mb-12'>
          {locale === 'ru'
            ? 'Читайте мои советы и истории.'
            : 'Read my underwater stories.'}
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center'>
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.slug}
              className='bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md'
            >
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                loading='lazy'
                sizes='(max-width: 768px) 100vw, 600px'
                className='w-full h-48 object-cover'
              />

              <div className='p-4'>
                <h3 className='text-xl font-semibold text-blue-900 mb-2'>
                  {post.title}
                </h3>

                <p className='text-blue-800 mb-4'>{post.excerpt}</p>

                <Link
                  href={`${locale === 'ru' ? '/ru' : ''}/blog/${post.slug}`}
                  className='inline-block px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded'
                >
                  {locale === 'ru' ? 'Читать далее' : 'Read More'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-12 bg-white/90 p-6 italic shadow rounded-xl max-w-xl mx-auto'>
          “{quotes[locale]}”
        </div>
      </div>
    </section>
  )
}
