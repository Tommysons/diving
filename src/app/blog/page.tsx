'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { blogPosts } from '@/lib/data/blogPosts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function BlogPage() {
  return (
    <>
      <Navbar />

      <main className='min-h-screen bg-[#06283a] text-white px-6 py-16 md:px-10'>
        {/* Header */}
        <div className='mx-auto mb-12 max-w-4xl text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-center text-cyan-100 mb-2'>
            Blog
          </h1>
          <p className='text-cyan-100 text-lg'>
            Read my stories from the underwater world.
          </p>
        </div>

        {/* Blog Grid */}
        <div className='mx-auto grid max-w-[1480px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.map((post) => (
            <motion.div
              key={post.slug}
              className='bg-[#0a354b] rounded-2xl border border-white/15 shadow-xl overflow-hidden hover:border-cyan-300/50 hover:-translate-y-1 transition duration-300'
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
                  className={post.slug === 'maldives-manta-rays-dolphins-snorkeling' ? 'object-contain rounded-t-2xl bg-[#031b2d]' : 'object-cover rounded-t-2xl'}
                />
              </div>

              <div className='p-6'>
                <h2 className='mb-3 text-xl font-bold leading-snug text-white'>
                  {post.title}
                </h2>
                <p className='mb-6 line-clamp-3 text-sm leading-7 text-slate-200'>{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className='inline-block px-4 py-2 bg-cyan-100 text-[#03283b] font-semibold rounded hover:bg-white transition'
                >
                  Read More
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
