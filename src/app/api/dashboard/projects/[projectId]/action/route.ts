import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'
import nodemailer from 'nodemailer'
import { ObjectId } from 'mongodb'

const projectCollections: Record<string, string> = {
  scuba: 'bookings',
  freediving: 'bookings',
  dive_trips: 'bookings',
  digital_art: 'bookings',
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

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> } // ✅ must await
) {
  try {
    const { projectId } = await context.params
    const collectionName = projectCollections[projectId]
    if (!collectionName)
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })

    const user = await currentUser()
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await req.json()
    const { id, action, newDate, newTime } = data

    const client = await clientPromise
    const db = client.db('scuba_booking')
    const collection = db.collection(collectionName)

    // Handle edit
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

    // Fetch updated document
    const item = await collection.findOne({ _id: new ObjectId(id) })

    // Send notification email
    if (item?.email) {
      const subject =
        action === 'edit'
          ? `Your ${projectId} booking has been updated`
          : `Your ${projectId} has been ${action}`

      const text =
        action === 'edit'
          ? `Hi ${item.name},\n\nYour booking has been updated to ${newDate} at ${newTime}.\n\nCheers,\nAdmin Team`
          : `Hi ${item.name},\n\nYour booking/order has been ${action}.\n\nCheers,\nAdmin Team`

      await transporter.sendMail({
        from: `"Admin Dashboard" <${process.env.SMTP_USER}>`,
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
