'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MedicalFormModal from './MedicalFormModal'
import { faqsEN, faqsRU, FAQItem } from '@/lib/data/faqs'
import { usePathname } from 'next/navigation'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pathname = usePathname()
  const lang: 'en' | 'ru' = pathname.startsWith('/ru') ? 'ru' : 'en'
  const faqs: FAQItem[] = lang === 'en' ? faqsEN : faqsRU

  return (
    <section className='relative bg-blue-200 py-16'>
      <div className='relative z-10 max-w-4xl mx-auto px-4 text-gray-900'>
        <motion.h1
          className='text-3xl font-bold mb-8 text-center text-gray-800'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {lang === 'en'
            ? 'FAQ (Frequently Asked Questions)'
            : 'FAQ (Вопросы и ответы)'}
        </motion.h1>

        <div className='space-y-4'>
          {faqs.map((faq, index) => {
            const isMedical =
              faq.question.toLowerCase().includes('medical') ||
              faq.question.toLowerCase().includes('медицин')

            return (
              <div
                key={index}
                className='bg-white/90 border rounded-xl p-4 shadow-sm'
              >
                <button
                  aria-expanded={openIndex === index}
                  className='w-full flex justify-between text-left text-lg font-semibold'
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {faq.question}
                  <span>{openIndex === index ? '−' : '+'}</span>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='mt-3 text-gray-700 space-y-4'
                    >
                      <p>{faq.answer}</p>

                      {isMedical && (
                        <div className='flex flex-wrap gap-3 pt-2'>
                          <a
                            href={
                              lang === 'en'
                                ? '/forms/medical-form.pdf'
                                : '/forms/medical-form-rus.pdf'
                            }
                            download
                            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
                          >
                            {lang === 'en'
                              ? 'Download Medical Form'
                              : 'Скачать анкету'}
                          </a>

                          <button
                            onClick={() => setIsModalOpen(true)}
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition'
                          >
                            {lang === 'en'
                              ? 'View Fullscreen'
                              : 'Открыть полностью'}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <MedicalFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          filePath={
            lang === 'en'
              ? '/forms/medical-form.pdf'
              : '/forms/medical-form-rus.pdf'
          }
          lang={lang}
        />
      </div>
    </section>
  )
}
