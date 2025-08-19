import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

const collectionMap: Record<string, string> = {
  scuba_course: 'scuba_bookings',
  freediving_course: 'freediving_bookings',
  dive_trip: 'dive_trips',
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  const type = req.nextUrl.searchParams.get('type')
  const activity = req.nextUrl.searchParams.get('activity') || null

  console.log('Availability API called')
  console.log('Params:', { date, type, activity })

  if (!date || !type) {
    console.warn('Missing date or type')
    return NextResponse.json(
      { error: 'Date and type required' },
      { status: 400 }
    )
  }

  const collectionName = collectionMap[type]
  if (!collectionName) {
    console.warn('Invalid type:', type)
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db('scuba_booking')

    const query: any = { date }
    if (activity) query.$or = [{ course: activity }, { site: activity }]

    console.log('Mongo query:', query)
    const bookings = await db.collection(collectionName).find(query).toArray()
    const bookedTimes = bookings.map((b) => b.time)

    console.log('Booked times:', bookedTimes)
    return NextResponse.json({ bookedTimes })
  } catch (error) {
    console.error('Availability API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
