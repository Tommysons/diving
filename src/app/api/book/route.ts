import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import nodemailer from 'nodemailer'
import { ObjectId } from 'mongodb'

const projectCollections: Record<string, string> = {
  scuba: 'bookings',
  freediving: 'bookings',
  dive_trips: 'bookings',
}

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Helper: format date object as HH:mm
function formatTime(date: Date) {
  return date.toTimeString().slice(0, 5)
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, phone, type, activity, date, time, message } = data

    if (!name || !email || !date || !time || !type || !activity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('scuba_booking')
    const collection = db.collection('bookings')

    // --- Check for conflicts (2-hour sessions) ---
    const bookingStart = new Date(`${date}T${time}:00`)
    const bookingEnd = new Date(bookingStart)
    bookingEnd.setHours(bookingEnd.getHours() + 2)

    const existingBookings = await collection
      .find({
        date,
        status: { $ne: 'cancelled' },
      })
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
    const result = await collection.insertOne({
      name,
      email,
      phone,
      type,
      activity,
      date,
      time,
      message: message || '',
      status: 'pending',
      createdAt: new Date(),
    })

    // --- Send email notification ---
    await transporter.sendMail({
      from: `"Admin Dashboard" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Booking received: ${activity}`,
      text: `Hi ${name},\n\nYour booking for ${activity} on ${date} at ${time} has been received!\n\nThank you.`,
    })

    return NextResponse.json(
      { message: 'Booking received successfully!', id: result.insertedId },
      { status: 200 }
    )
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Failed to book' }, { status: 500 })
  }
}
