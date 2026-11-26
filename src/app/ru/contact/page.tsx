'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { contactSchema } from '@/lib/validation/contactSchema'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {formCard,formHeading,formIntro,formInput,formLabel,formButton} from '@/lib/styles/form'

export default function ContactPageRu() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get('subject')
    // Query parameters are only available in the browser after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (subject) setForm(current => ({ ...current, subject: subject.slice(0, 160) }))
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = contactSchema.safeParse(form)
    if (!validation.success) {
      setErrors(validation.error.issues.map((err) => err.message))
      return
    }
    setErrors([])

    setSending(true)
    setStatus('Отправка...')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...form,language:'ru'}),
      })

      if (res.ok) {
        const result = await res.json()
        setStatus(
          result.confirmationSent ? 'Сообщение отправлено! Подтверждение отправлено на почту.' : 'Сообщение отправлено! Подтверждение по почте пока недоступно.',
        )
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await res.json()
        setStatus(
          'Ошибка: ' + (data.error || 'Не удалось отправить сообщение.'),
        )
      }
    } catch {
      setStatus('Ошибка при отправке сообщения.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Header />

      <main className='relative min-h-screen w-full bg-[#06283a] flex items-center justify-center px-4 py-12'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={'max-w-xl '+formCard}
        >
          <h1 className='text-3xl font-bold tracking-tight text-[#075475] text-center mb-2'>
            Связаться с LokaWndr
          </h1>

          <p className={formIntro}>
            Запланируем ваше подводное приключение. Спросите о дайвинге, курсах
            или погружениях.
          </p>

          <motion.form onSubmit={handleSubmit} className='space-y-5'>
            {errors.length > 0 && (
              <ul className='bg-red-50 text-red-600 p-3 rounded-lg text-sm'>
                {errors.map((err, i) => (
                  <li key={i}>• {err}</li>
                ))}
              </ul>
            )}

            <div>
              <label htmlFor='contact-name' className={formLabel}>Имя</label>
              <input
                id='contact-name'
                name='name'
                placeholder='Ваше имя'
                value={form.name}
                onChange={handleChange}
                className={formInput}
              />
            </div>

            <div>
              <label htmlFor='contact-email' className={formLabel}>Email</label>
              <input
                id='contact-email'
                type='email'
                name='email'
                placeholder='you@email.com'
                value={form.email}
                onChange={handleChange}
                className={formInput}
              />
            </div>

            <div>
              <label htmlFor='contact-subject' className={formLabel}>Тема</label>
              <input
                id='contact-subject'
                name='subject'
                placeholder='О чём сообщение?'
                value={form.subject}
                onChange={handleChange}
                className={formInput}
              />
            </div>

            <div>
              <label htmlFor='contact-message' className={formLabel}>Сообщение</label>
              <textarea
                id='contact-message'
                name='message'
                rows={5}
                placeholder='Расскажите о своих планах погружения...'
                value={form.message}
                onChange={handleChange}
                className={formInput+' resize-y'}
              />
            </div>

            <button
              disabled={sending}
              type='submit'
              className={formButton}
            >
              {sending ? 'Отправка...' : 'Отправить сообщение'}
            </button>

            {status && (
              <p className='text-center text-sm text-gray-600 mt-2'>{status}</p>
            )}
          </motion.form>
        </motion.div>
      </main>

      <Footer />
    </>
  )
}
