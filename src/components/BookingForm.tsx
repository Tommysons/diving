'use client'
import { useState, useEffect } from 'react'

interface BookingFormProps {
  type: 'scuba_course' | 'freediving_course' | 'dive_trip'
  activity: string // course name or dive site
}

export default function BookingForm({ type, activity }: BookingFormProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

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
      setStatus('Please fill all required fields')
      return
    }

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
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus('Booking received successfully!')
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
        setDate('')
        setTime('')
      } else {
        setStatus(data.error || 'Failed to book')
      }
    } catch (err) {
      console.error(err)
      setStatus('Failed to book')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded max-w-md'>
      <h2 className='font-bold mb-2'>{activity} Booking</h2>

      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='mb-2 block w-full'
      />
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='mb-2 block w-full'
      />
      <input
        type='tel'
        placeholder='Phone'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className='mb-2 block w-full'
      />

      <label className='block mb-2'>Date:</label>
      <input
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className='mb-2 block w-full'
      />

      <label className='block mb-2'>Time:</label>
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        className='mb-2 block w-full'
      >
        <option value=''>Select a time</option>
        {allTimes.map((t) => (
          <option key={t} value={t} disabled={bookedTimes.includes(t)}>
            {t} {bookedTimes.includes(t) ? '(Booked)' : ''}
          </option>
        ))}
      </select>

      <textarea
        placeholder='Message (optional)'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='mb-2 block w-full'
      />

      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Book Appointment
      </button>
      {status && <p className='mt-2'>{status}</p>}
    </form>
  )
}
