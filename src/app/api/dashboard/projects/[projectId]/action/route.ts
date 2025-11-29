import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'
import nodemailer from 'nodemailer'
import { ObjectId } from 'mongodb'

// ✅ Correct collections
const projectCollections: Record<string, string> = {
  scuba: 'scuba_bookings',
  freediving: 'freediving_bookings',
  dive_trips: 'dive_trips',
  digital_art: 'digital_art_orders',
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params
    const collectionName = projectCollections[projectId]

    if (!collectionName)
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })

    const user = await currentUser()
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id, action, newDate, newTime } = await req.json()

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const collection = db.collection(collectionName)

    // --- APPLY ACTION ---
    if (action === 'edit') {
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { date: newDate, time: newTime } }
      )
    } else {
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: action } }
      )
    }

    // Get updated booking
    const item = await collection.findOne({ _id: new ObjectId(id) })

    // --- EMAIL TO CUSTOMER ---
    if (item?.email) {
      const subject =
        action === 'edit'
          ? `Your booking has been updated`
          : `Your booking has been ${action}`

      const text =
        action === 'edit'
          ? `Hi ${item.name},\n\nYour booking has been updated to:\nDate: ${newDate}\nTime: ${newTime}\n\nBest regards,\nDiving Team`
          : `Hi ${item.name},\n\nYour booking status is now: ${action}.\n\nBest regards,\nDiving Team`

      await transporter.sendMail({
        from: `"Loka Wonder" <${process.env.SMTP_USER}>`,
        to: item.email,
        subject,
        text,
      })
    }

    return NextResponse.json(
      { message: 'Action applied successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Action API error:', error)
    return NextResponse.json(
      { error: 'Failed to apply action' },
      { status: 500 }
    )
  }
}
