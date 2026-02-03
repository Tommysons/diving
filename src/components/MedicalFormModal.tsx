'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface MedicalFormModalProps {
  isOpen: boolean
  onClose: () => void
  filePath?: string
  lang?: 'en' | 'ru'
}

export default function MedicalFormModal({
  isOpen,
  onClose,
  filePath = '/forms/medical-form.pdf',
  lang = 'en',
}: MedicalFormModalProps) {
  const texts = {
    en: {
      header: 'Medical Questionnaire',
      download: 'Download PDF',
    },
    ru: {
      header: 'Медицинская анкета',
      download: 'Скачать PDF',
    },
  }

  const t = texts[lang]

  // ✅ Close on ESC
  useEffect(() => {
    if (!isOpen) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // ✅ click outside
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className='relative w-full h-full md:w-5/6 md:h-5/6 bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col'
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            {/* ✅ HEADER */}
            <div className='sticky top-0 z-20 bg-white px-4 py-3 border-b flex justify-between items-center'>
              <h2 className='text-lg font-semibold text-gray-800'>
                {t.header}
              </h2>

              <button
                onClick={onClose}
                aria-label='Close'
                className='p-2 rounded-full hover:bg-gray-200 transition text-gray-700 text-xl leading-none'
              >
                ✕
              </button>
            </div>

            {/* ✅ PDF */}
            <iframe
              src={filePath}
              className='flex-grow w-full'
              title='Medical Form'
            />

            {/* ✅ FOOTER */}
            <div className='bg-white px-4 py-3 border-t text-right'>
              <a
                href={filePath}
                download
                className='inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
              >
                {t.download}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
