'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface BookingFormProps {
  type: 'scuba_course' | 'freediving_course' | 'dive_trip'
  activity: string // course name or dive site
}

export default function BookingForm({ type, activity }: BookingFormProps) {
  const pathname = usePathname()
  const ru = pathname === '/ru' || pathname?.startsWith('/ru/')
  const text = ru ? { booking: 'Запись', name: 'Имя', email: 'Эл. почта', phone: 'Телефон', date: 'Дата:', time: 'Время:', select: 'Выберите время', booked: '(Занято)', message: 'Сообщение (необязательно)', submit: 'Отправить заявку', sending: 'Отправка…', required: 'Заполните все обязательные поля', success: 'Заявка получена. Запись будет подтверждена после того, как мы свяжемся с вами.', failure: 'Не удалось отправить заявку. Попробуйте ещё раз.', conflict: 'Это время уже занято. Выберите другое время.' } : { booking: 'Booking', name: 'Name', email: 'Email', phone: 'Phone', date: 'Date:', time: 'Time:', select: 'Select a time', booked: '(Booked)', message: 'Message (optional)', submit: 'Book Appointment', sending: 'Submitting…', required: 'Please fill all required fields', success: 'Booking request received. This is not confirmed until we contact you.', failure: 'Failed to book', conflict: 'This time slot is already booked' }
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const allTimes = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ]

  // Fetch booked times for selected date and type
  useEffect(() => {
    if (!date) return
    fetch(
      `/api/availability?date=${date}&type=${type}&activity=${encodeURIComponent(
        activity
      )}`
    )
      .then((res) => res.json())
      .then((data) => setBookedTimes(data.bookedTimes || []))
      .catch((err) => console.error(err))
  }, [date, type, activity])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !date || !time) {
      setStatus(text.required)
      return
    }

    if (submitting || submitted) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          date,
          time,
          type,
          activity,
          message,
          language: ru ? 'ru' : 'en',
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
        setStatus(text.success)
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
        setDate('')
        setTime('')
      } else {
        setStatus(ru ? (data.error === 'This time slot is already booked' ? text.conflict : text.failure) : (data.error || text.failure))
      }
    } catch (err) {
      console.error(err)
      setStatus(text.failure)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return (
    <div role='status' aria-live='polite' className='max-w-md rounded border border-emerald-300/40 bg-emerald-950/30 p-4 text-white'>
      {text.success}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded max-w-md'>
      <h2 className='font-bold mb-2'>{activity} {text.booking}</h2>

      <input
        type='text'
        placeholder={text.name}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='mb-2 block w-full'
      />
      <input
        type='email'
        placeholder={text.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='mb-2 block w-full'
      />
      <input
        type='tel'
        placeholder={text.phone}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className='mb-2 block w-full'
      />

      <label className='block mb-2'>{text.date}</label>
      <input
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className='mb-2 block w-full'
      />

      <label className='block mb-2'>{text.time}</label>
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        className='mb-2 block w-full'
      >
        <option value=''>{text.select}</option>
        {allTimes.map((t) => (
          <option key={t} value={t} disabled={bookedTimes.includes(t)}>
            {t} {bookedTimes.includes(t) ? text.booked : ''}
          </option>
        ))}
      </select>

      <textarea
        placeholder={text.message}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='mb-2 block w-full'
      />

      <button
        type='submit'
        disabled={submitting}
        className='bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50'
      >
        {submitting ? text.sending : text.submit}
      </button>
      {status && <p className='mt-2'>{status}</p>}
    </form>
  )
}
