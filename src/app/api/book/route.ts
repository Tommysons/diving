import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}

const collectionMap: Record<string, string> = {
  scuba_course: 'scuba_bookings',
  freediving_course: 'freediving_bookings',
  dive_trip: 'dive_trips',
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    // Avoid logging customers' personal details.

    const { name, email, phone, type, activity, date, time, message } = data

    // Validate required fields
    if (!name || !email || !date || !time || !type || !activity) {
      console.error('Booking request missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof activity !== 'string' || typeof date !== 'string' || typeof time !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      return NextResponse.json({ error: 'Invalid booking details' }, { status: 400 })
    }
    const collectionName = collectionMap[type]
    if (!collectionName) {
      console.error('Invalid type:', type)
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }



    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const collection = db.collection(collectionName)

    // Check for conflicts (2-hour sessions)
    const bookingStart = new Date(`${date}T${time}:00`)
    if (Number.isNaN(bookingStart.getTime()) || bookingStart.toISOString().slice(0, 10) !== date) {
      return NextResponse.json({ error: 'Invalid booking date' }, { status: 400 })
    }
    const bookingEnd = new Date(bookingStart)
    bookingEnd.setHours(bookingEnd.getHours() + 2)

    // Pending enquiries do not reserve availability; check approved bookings for this activity only.
    const activityField = type === 'dive_trip' ? 'site' : 'course'
    const existingBookings = await collection
      .find({ date, status: 'approved', [activityField]: activity })
      .toArray()

    const conflict = existingBookings.find((b) => {
      const existingStart = new Date(`${b.date}T${b.time}:00`)
      const existingEnd = new Date(existingStart)
      existingEnd.setHours(existingEnd.getHours() + 2)
      return (
        (bookingStart >= existingStart && bookingStart < existingEnd) ||
        (bookingEnd > existingStart && bookingEnd <= existingEnd) ||
        (bookingStart <= existingStart && bookingEnd >= existingEnd)
      )
    })

    if (conflict) {
      console.warn('Approved booking conflict detected')
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      )
    }

    // Insert booking
    const doc = {
      name,
      email,
      phone,
      type,
      date,
      time,
      message: message || '',
      status: 'pending',
      createdAt: new Date(),
      ...(type === 'dive_trip' ? { site: activity } : { course: activity }),
    }

    const result = await collection.insertOne(doc)


    const subjectText = `Booking request: ${activity} on ${date} at ${time}`
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeActivity = escapeHtml(activity)
    const safeDate = escapeHtml(date)
    const safeTime = escapeHtml(time)
    const safeType = escapeHtml(type)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // -----------------------------
    // SEND CLIENT CONFIRMATION EMAIL
    // -----------------------------


    try {
      const response = await resend.emails.send({
        from: 'Loka Wonder <contact@lokawndr.com>',
        to: email,
        subject: `Booking request received / Заявка получена: ${safeActivity} on ${safeDate}`,
        html: `
          <p>Hi ${safeName},</p>
          <p>We have received your booking request for <strong>${safeActivity}</strong> on <strong>${safeDate}</strong> at <strong>${safeTime}</strong>. This is not a confirmed reservation; we will contact you after checking availability.</p>
          <p>Ваша заявка получена и ожидает подтверждения оператора: <strong>${safeActivity}</strong> на <strong>${safeDate}</strong> в <strong>${safeTime}</strong>. Это ещё не подтверждённое бронирование. Мы свяжемся с вами после проверки доступности.</p>
          ${
            message
              ? `<p><strong>Your message / Ваше сообщение:</strong><br>${safeMessage}</p>`
              : ''
          }
        `,
      })

      if (response.error) console.error('Booking acknowledgement rejected:', response.error)
    } catch (err) {
      console.error(
        'Resend client email error:',
        err
      )
    }

    // -----------------------------
    // SEND ADMIN EMAIL
    // -----------------------------
    if (process.env.ADMIN_EMAIL) {


      try {
        const response = await resend.emails.send({
          from: 'Loka Wonder <contact@lokawndr.com>',
          to: process.env.ADMIN_EMAIL,
          subject: subjectText,
          html: `
            <h3>New Booking / Новое бронирование</h3>
            <p><strong>Name / Имя:</strong> ${safeName}</p>
            <p><strong>Email / Эл. почта:</strong> ${safeEmail}</p>
            <p><strong>Phone / Телефон:</strong> ${safePhone}</p>
            <p><strong>Type / Тип:</strong> ${safeType}</p>
            <p><strong>Activity / Активность:</strong> ${safeActivity}</p>
            <p><strong>Date / Дата:</strong> ${safeDate}</p>
            <p><strong>Time / Время:</strong> ${safeTime}</p>
            ${
              message
                ? `<p><strong>Message / Сообщение:</strong><br>${safeMessage}</p>`
                : ''
            }
          `,
        })

        if (response.error) console.error('Booking notification rejected:', response.error)
      } catch (err) {
        console.error(
          'Resend admin email error:',
          err
        )
      }
    } else {
      console.warn('ADMIN_EMAIL is not set, skipping admin notification.')
    }

    return NextResponse.json(
      { message: 'Booking request received; awaiting confirmation', status: 'pending', id: result.insertedId },
      { status: 200 }
    )
  } catch (error) {
    console.error('Booking route fatal error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    )
  }
}
