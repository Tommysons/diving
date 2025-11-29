import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const collectionMap: Record<string, string> = {
  scuba_course: 'scuba_bookings',
  freediving_course: 'freediving_bookings',
  dive_trip: 'dive_trips',
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, phone, type, activity, date, time, message } = data

    // --- Validate required fields ---
    if (!name || !email || !date || !time || !type || !activity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const collectionName = collectionMap[type]
    if (!collectionName)
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const collection = db.collection(collectionName)

    // --- Check for conflicts (2-hour sessions) ---
    const bookingStart = new Date(`${date}T${time}:00`)
    const bookingEnd = new Date(bookingStart)
    bookingEnd.setHours(bookingEnd.getHours() + 2)

    const existingBookings = await collection
      .find({ date, status: { $ne: 'cancelled' } })
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
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      )
    }

    // --- Insert new booking ---
    const doc: any = {
      name,
      email,
      phone,
      type,
      date,
      time,
      message: message || '',
      status: 'pending',
      createdAt: new Date(),
    }

    if (type === 'scuba_course' || type === 'freediving_course')
      doc.course = activity
    if (type === 'dive_trip') doc.site = activity

    const result = await collection.insertOne(doc)
    console.log('Booking inserted with id:', result.insertedId)

    const subjectText = `Booking: ${activity} on ${date} at ${time}`

    // --- Send confirmation email to client (English + Russian) ---
    try {
      await resend.emails.send({
        from: 'Loka Wonder <contact@lokawndr.com>',
        to: email!,
        subject: `Booking Confirmation / Подтверждение бронирования: ${activity} on ${date}`,
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for booking with us! We have received your booking for <strong>${activity}</strong> on <strong>${date}</strong> at <strong>${time}</strong>.</p>
          <p>Спасибо за бронирование! Мы получили вашу заявку на <strong>${activity}</strong> на <strong>${date}</strong> в <strong>${time}</strong>.</p>
          ${
            message
              ? `<p><strong>Your message / Ваше сообщение:</strong><br>${message}</p>`
              : ''
          }
          <br/>
          <p>Best regards / С уважением,<br/>Your Scuba Diving Team / Ваша команда по дайвингу</p>
        `,
      })
      console.log('Resend email sent to client:', email)
    } catch (err) {
      console.error('Resend client email error:', err)
    }

    // --- Send email to admin ---
    if (process.env.ADMIN_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Loka Wonder <contact@lokawndr.com>',
          to: process.env.ADMIN_EMAIL!,
          subject: subjectText,
          html: `
            <h3>New Booking / Новое бронирование</h3>
            <p><strong>Name / Имя:</strong> ${name}</p>
            <p><strong>Email / Эл. почта:</strong> ${email}</p>
            <p><strong>Phone / Телефон:</strong> ${phone}</p>
            <p><strong>Type / Тип:</strong> ${type}</p>
            <p><strong>Activity / Активность:</strong> ${activity}</p>
            <p><strong>Date / Дата:</strong> ${date}</p>
            <p><strong>Time / Время:</strong> ${time}</p>
            ${
              message
                ? `<p><strong>Message / Сообщение:</strong><br>${message}</p>`
                : ''
            }
          `,
        })
        console.log('Resend email sent to admin:', process.env.ADMIN_EMAIL)
      } catch (err) {
        console.error('Resend admin email error:', err)
      }
    }

    return NextResponse.json(
      { message: 'Booking received successfully!', id: result.insertedId },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Booking error full:', error)
    return NextResponse.json(
      { error: error?.message || JSON.stringify(error) },
      { status: 500 }
    )
  }
}
