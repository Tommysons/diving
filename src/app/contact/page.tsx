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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    //Validate client-side
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
          'Message sent successfully! Check your email for confirmation.'
        )
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await res.json()
        setStatus('Error: ' + (data.error || 'Failed to send mesage.'))
      }
    } catch {
      setStatus('Error sending message.')
    }
  }

  return (
    <>
      <Header />
      <div className='max-w-3xl mx-auto p-6'>
        <h1>Contact Me</h1>
        <motion.form onSubmit={handleSubmit} className='space-y-4'>
          {errors.length > 0 && (
            <ul className='text-red-600'>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
          <input
            name='name'
            placeholder='Name'
            value={form.name}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
          />
          <input
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
          />
          <input
            name='subject'
            placeholder='Subject'
            value={form.subject}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
          />
          <textarea
            name='message'
            placeholder='Message'
            value={form.message}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded'
          />
          <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
            {status || 'Send'}
          </button>
        </motion.form>
      </div>
      <Footer />
    </>
  )
}
