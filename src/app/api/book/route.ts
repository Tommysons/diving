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
    const db = client.db(process.env.MONGODB_DB) // Use env DB
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

    // --- Send email to client ---
    await resend.emails.send({
      from: 'Scuba Diving <noreply@yourdomain.com>',
      to: email,
      subject: `Booking received: ${activity}`,
      text: `Hi ${name},\n\nYour booking for ${activity} on ${date} at ${time} has been received!\n\nThank you.`,
    })

    // --- Send email to admin ---
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'Scuba Diving <noreply@yourdomain.com>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Booking: ${activity} (${name})`,
        text: `New booking received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${type}\nActivity: ${activity}\nDate: ${date}\nTime: ${time}\nMessage: ${
          message || 'N/A'
        }`,
      })
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
