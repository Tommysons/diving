import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'
import { Resend } from 'resend'
import { ObjectId } from 'mongodb'

const resend = new Resend(process.env.RESEND_API_KEY)

const collections: Record<string, string> = {
  scuba: 'scuba_bookings',
  freediving: 'freediving_bookings',
  dive_trips: 'dive_trips',
  digital_art: 'bookings',
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params

    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const email = user.emailAddresses?.[0]?.emailAddress
    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { id, date, time, status } = body

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    const collectionName = collections[projectId]
    if (!collectionName) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const collection = db.collection(collectionName)

    const booking = await collection.findOne({ _id: new ObjectId(id) })
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { date, time, status } }
    )

    // ✅ Send notification email
    if (booking.email) {
      await resend.emails.send({
        from: 'Lokawndr <bookings@lokawndr.com>',
        to: booking.email,
        subject: 'Your booking has been updated',
        html: `
          <h2>Booking Updated ✅</h2>
          <p>New Date: ${date}</p>
          <p>New Time: ${time}</p>
          <p>Status: ${status}</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('PUT error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
