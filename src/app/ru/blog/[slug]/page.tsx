'use client'

import { use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { BlogPost, BlogContentBlock } from '@/lib/data/blogPosts'
import { blogPostsRU } from '@/lib/data/blogPostsRU'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Motion variants
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.42, 0, 0.58, 1] },
  },
}

// Render content blocks
const RenderBlock = ({ block }: { block: BlogContentBlock }) => {
  switch (block.type) {
    case 'heading':
      return block.level === 3 ? (
        <h3 className='text-2xl font-semibold text-gray-800 mb-3'>
          {block.value || ''}
        </h3>
      ) : (
        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
          {block.value || ''}
        </h2>
      )

    case 'paragraph':
      return (
        <p className='text-gray-800 text-lg leading-relaxed'>
          {block.value || ''}
        </p>
      )

    case 'quote':
      return (
        <blockquote className='pl-6 border-l-4 border-blue-500 italic text-gray-700 bg-blue-50 p-4 rounded-md shadow-inner my-4'>
          {block.value || ''}
        </blockquote>
      )

    case 'list':
      if (!block.items || block.items.length === 0) return null
      return (
        <ul className='list-disc pl-6 space-y-2 text-gray-800'>
          {block.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )

    case 'image':
      if (!block.image) return null
      return (
        <div className='rounded-md overflow-hidden shadow-md'>
          <Image
            src={block.image}
            alt={block.caption || 'Изображение статьи'}
            width={800}
            height={500}
            className='w-full h-auto object-cover transition-transform duration-300 hover:scale-105'
          />
          {block.caption && (
            <p className='text-sm text-gray-500 mt-2 italic'>{block.caption}</p>
          )}
        </div>
      )

    default:
      return null
  }
}

export default function BlogPostPageRU({ params }: BlogPostPageProps) {
  const { slug } = use(params)
  const router = useRouter()

  const post: BlogPost | undefined = blogPostsRU.find((p) => p.slug === slug)
  if (!post) notFound()

  const currentIndex = blogPostsRU.findIndex((p) => p.slug === slug)

  const goToPrev = () => {
    const prevIndex =
      (currentIndex - 1 + blogPostsRU.length) % blogPostsRU.length
    router.push(`/ru/blog/${blogPostsRU[prevIndex].slug}`)
  }

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % blogPostsRU.length
    router.push(`/ru/blog/${blogPostsRU[nextIndex].slug}`)
  }

  return (
    <>
      <Header />

      <main className='bg-blue-200 min-h-screen w-full px-4 sm:px-6 py-12'>
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='max-w-4xl mx-auto space-y-10'
        >
          {/* Title + Navigation */}
          <motion.div
            variants={item}
            className='bg-white p-8 rounded-xl shadow-lg text-center'
          >
            <div className='flex items-center justify-center gap-6'>
              <NavButton onClick={goToPrev} ariaLabel='Previous post'>
                <ChevronLeft className='w-6 h-6' />
              </NavButton>

              <h1 className='text-5xl sm:text-6xl font-extrabold text-gray-900 mb-2 leading-tight'>
                {post.title}
              </h1>

              <NavButton onClick={goToNext} ariaLabel='Next post'>
                <ChevronRight className='w-6 h-6' />
              </NavButton>
            </div>

            <p className='text-gray-600 text-sm sm:text-base mt-3'>
              {new Date(post.date).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </motion.div>

          {/* Featured Image */}
          {post.image && (
            <motion.div
              variants={item}
              className='rounded-xl overflow-hidden shadow-2xl'
            >
              <Image
                src={post.image}
                alt={post.title}
                width={900}
                height={500}
                className='w-full h-auto object-cover transition-transform duration-300 hover:scale-105'
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div className='space-y-8'>
            {post.content.map((block, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className='bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition'
              >
                <RenderBlock block={block} />
              </motion.div>
            ))}
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div variants={item} className='mt-10 flex flex-wrap gap-3'>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className='bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition'
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </>
  )
}

function NavButton({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void
  ariaLabel: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className='bg-cyan-700 hover:bg-cyan-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition'
    >
      {children}
    </button>
  )
}
