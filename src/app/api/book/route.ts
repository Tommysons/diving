import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { notifyBooking } from '@/lib/adminBookings'

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
      language: data.language === 'ru' ? 'ru' : 'en',
      status: 'pending',
      createdAt: new Date(),
      ...(type === 'dive_trip' ? { site: activity } : { course: activity }),
    }

    const result = await collection.insertOne(doc)


    const notifications = await notifyBooking(doc, 'received')
    return NextResponse.json(
      { message: 'Booking request received; awaiting confirmation', status: 'pending', id: result.insertedId, notifications },
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
