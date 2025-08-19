import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

const collections = ['bookings'] // now all bookings are in one collection

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  const activity = req.nextUrl.searchParams.get('activity') || null

  if (!date) {
    return NextResponse.json({ error: 'Date required' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('scuba_booking')
    const collection = db.collection(collections[0])

    // Fetch all bookings for that date
    const query: any = { date, status: { $ne: 'cancelled' } }
    if (activity) {
      query.$or = [{ activity }]
    }

    const bookings = await collection.find(query).toArray()

    // All times already booked (2-hour sessions)
    const bookedTimes: string[] = []

    bookings.forEach((b) => {
      const start = new Date(`${b.date}T${b.time}:00`)
      for (let i = 0; i < 2; i++) {
        // push each hour as booked
        const hour = start.getHours() + i
        const hStr = hour.toString().padStart(2, '0') + ':00'
        bookedTimes.push(hStr)
      }
    })

    return NextResponse.json({ bookedTimes })
  } catch (error) {
    console.error('Availability API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
