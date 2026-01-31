'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { contactSchema } from '@/lib/validation/contactSchema'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState<string[]>([])

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

    setStatus('Sending...')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus(
          'Message sent successfully! Check your email for confirmation.',
        )
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await res.json()
        setStatus('Error: ' + (data.error || 'Failed to send message.'))
      }
    } catch {
      setStatus('Error sending message.')
    }
  }

  return (
    <>
      <Header />

      <main className='mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 overflow-hidden'>
        {/* HERO */}
        <section className='relative min-h-[35vh] flex items-center justify-center text-center mt-6'>
          <div className='absolute inset-0 rounded-2xl overflow-hidden'>
            <img
              src='/images/hero-about.jpg'
              alt='Contact LokaWndr'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black/45' />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className='relative z-10 px-6'
          >
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3'>
              Contact LokaWndr
            </h1>
            <p className='text-white/90 max-w-xl mx-auto'>
              Let’s plan your underwater adventure. Ask anything about diving,
              courses, or experiences.
            </p>
          </motion.div>
        </section>

        {/* FORM */}
        <section className='mt-16 mb-24 flex justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='w-full max-w-xl bg-white/80 backdrop-blur p-6 sm:p-8 rounded-2xl shadow-lg'
          >
            <h2 className='text-2xl font-semibold mb-6 text-center'>
              Send a Message
            </h2>

            <motion.form onSubmit={handleSubmit} className='space-y-5'>
              {errors.length > 0 && (
                <ul className='bg-red-50 text-red-600 p-3 rounded-lg text-sm'>
                  {errors.map((err, i) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              )}

              <div>
                <label className='text-sm font-medium'>Name</label>
                <input
                  name='name'
                  placeholder='Your name'
                  value={form.name}
                  onChange={handleChange}
                  className='mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none'
                />
              </div>

              <div>
                <label className='text-sm font-medium'>Email</label>
                <input
                  name='email'
                  placeholder='you@email.com'
                  value={form.email}
                  onChange={handleChange}
                  className='mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none'
                />
              </div>

              <div>
                <label className='text-sm font-medium'>Subject</label>
                <input
                  name='subject'
                  placeholder='What is this about?'
                  value={form.subject}
                  onChange={handleChange}
                  className='mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none'
                />
              </div>

              <div>
                <label className='text-sm font-medium'>Message</label>
                <textarea
                  name='message'
                  rows={5}
                  placeholder='Tell me about your diving plans...'
                  value={form.message}
                  onChange={handleChange}
                  className='mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none resize-none'
                />
              </div>

              <button
                type='submit'
                className='w-full py-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white active:scale-95 transition'
              >
                {status || 'Send Message'}
              </button>

              {status && (
                <p className='text-center text-sm text-gray-600 mt-2'>
                  {status}
                </p>
              )}
            </motion.form>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  )
}
