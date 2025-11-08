'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import MedicalFormModal from './MedicalFormModal'
import { faqsEN, faqsRU, FAQItem } from '@/lib/data/faqs'
import { usePathname } from 'next/navigation'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ------------------ LANGUAGE DETECTION ------------------
  const pathname = usePathname()
  const lang: 'en' | 'ru' = pathname.startsWith('/ru') ? 'ru' : 'en'
  const faqs: FAQItem[] = lang === 'en' ? faqsEN : faqsRU
  // --------------------------------------------------------

  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      <motion.h1
        className='text-3xl font-bold mb-8 text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {lang === 'en'
          ? 'FAQ (Frequently asked questions)'
          : 'FAQ (Вопросы и ответы)'}
      </motion.h1>

      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div key={index} className='border rounded-xl p-4 shadow-sm'>
            <button
              className='w-full flex justify-between text-left text-lg font-semibold'
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>

            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className='mt-2 text-gray-700'
              >
                {faq.answer}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* MEDICAL FORM SECTION */}
      <div className='mt-16'>
        <h2 className='text-2xl font-bold mb-4'>
          {lang === 'en' ? 'Medical Questionnaire' : 'Медицинская анкета'}
        </h2>
        <p className='mb-4 text-gray-700'>
          {lang === 'en'
            ? 'Before signing up for a scuba diving course, please review the medical questionnaire below. If you answer "YES" to any question, you may need a doctor’s approval before diving.'
            : 'Перед записью на курс, пожалуйста, ознакомьтесь с медицинской анкетой. Если вы ответите «ДА» на любой вопрос, может потребоваться одобрение врача.'}
        </p>

        <div className='flex flex-wrap gap-4'>
          <a
            href={
              lang === 'en'
                ? '/forms/medical-form.pdf'
                : '/forms/medical-form-rus.pdf'
            }
            download
            className='inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition'
          >
            {lang === 'en'
              ? 'Download Medical Form (PDF)'
              : 'Скачать медицинскую анкету (PDF)'}
          </a>

          <button
            onClick={() => setIsModalOpen(true)}
            className='inline-block bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition'
          >
            {lang === 'en' ? 'View Fullscreen' : 'Открыть на весь экран'}
          </button>
        </div>
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
  )
}
