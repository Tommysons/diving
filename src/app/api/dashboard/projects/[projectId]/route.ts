import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'
import { ObjectId } from 'mongodb'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const projectCollections: Record<string, string> = {
  scuba: 'scuba_bookings',
  freediving: 'freediving_bookings',
  dive_trips: 'dive_trips',
  digital_art: 'bookings',
}

function getCollection(projectId: string) {
  return projectCollections[projectId]
}

function isAdminUser(user: any) {
  const email = user?.emailAddresses?.[0]?.emailAddress
  return email === process.env.ADMIN_EMAIL
}

/* =========================
   UPDATE (PUT)
========================= */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params
    const user = await currentUser()

    if (!user || !isAdminUser(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...updates } = body

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    const collectionName = getCollection(projectId)
    const col = db.collection(collectionName)

    const oldBooking = await col.findOne({ _id: new ObjectId(id) })

    await col.updateOne({ _id: new ObjectId(id) }, { $set: updates })

    const updatedBooking = { ...oldBooking, ...updates }

    /* ✅ SEND EMAIL TO USER */
    await resend.emails.send({
      from: 'Bookings <onboarding@resend.dev>',
      to: updatedBooking.email,
      subject: 'Your Booking Has Been Updated',
      html: `
        <h2>Your booking was updated</h2>
        <p><b>Name:</b> ${updatedBooking.name}</p>
        <p><b>Course / Trip:</b> ${
          updatedBooking.course || updatedBooking.site
        }</p>
        <p><b>Date:</b> ${updatedBooking.date}</p>
        <p><b>Time:</b> ${updatedBooking.time}</p>
        <p><b>Status:</b> ${updatedBooking.status}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('PUT error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
