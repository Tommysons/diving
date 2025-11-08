'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface MedicalFormModalProps {
  isOpen: boolean
  onClose: () => void
  filePath?: string // optional, default to English
  lang?: 'en' | 'ru' // optional, default to 'en'
}

export default function MedicalFormModal({
  isOpen,
  onClose,
  filePath = '/forms/medical-form.pdf',
  lang = 'en',
}: MedicalFormModalProps) {
  // Localized texts
  const texts = {
    en: {
      header: 'Medical Questionnaire',
      close: 'Close',
      download: 'Download PDF',
    },
    ru: {
      header: 'Медицинская анкета',
      close: 'Закрыть',
      download: 'Скачать PDF',
    },
  }

  const t = texts[lang] // current language

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='relative w-full h-full md:w-5/6 md:h-5/6 bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col'
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header with Close Button */}
            <div className='flex justify-between items-center bg-gray-100 px-4 py-2 border-b shadow-sm'>
              <h2 className='text-lg font-semibold text-gray-800'>
                {t.header}
              </h2>
              <button
                onClick={onClose}
                className='ml-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-md'
              >
                ✕ {t.close}
              </button>
            </div>

            {/* PDF Viewer */}
            <iframe
              src={filePath}
              width='100%'
              height='100%'
              className='flex-grow'
            ></iframe>

            {/* Footer with Download */}
            <div className='bg-gray-100 px-4 py-3 text-right border-t'>
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
