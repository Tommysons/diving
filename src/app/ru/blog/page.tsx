'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { blogPostsRU } from '@/lib/data/blogPostsRU'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function BlogPageRU() {
  return (
    <>
      <Navbar />

      <main className='min-h-screen bg-blue-200 px-6 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-blue-900 mb-4'>Блог</h1>
          <p className='text-blue-800'>
            Читайте мои истории из подводного мира.
          </p>
        </div>

        {/* Blog Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPostsRU.map((post) => (
            <motion.div
              key={post.slug}
              className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className='relative w-full h-48'>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className='object-cover rounded-t-xl'
                />
              </div>

              <div className='p-4'>
                <h2 className='text-xl font-semibold text-blue-900 mb-2'>
                  {post.title}
                </h2>
                <p className='text-blue-800 mb-4'>{post.excerpt}</p>
                <Link
                  href={`/ru/blog/${post.slug}`}
                  className='inline-block px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded hover:bg-yellow-300 transition'
                >
                  Читать далее
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
