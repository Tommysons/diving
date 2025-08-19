import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

const collectionMap: Record<string, string> = {
  scuba_course: 'scuba_bookings',
  freediving_course: 'freediving_bookings',
  dive_trip: 'dive_trips',
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  const type = req.nextUrl.searchParams.get('type') // scuba_course, freediving_course, dive_trip
  const activity = req.nextUrl.searchParams.get('activity') || null

  if (!date || !type)
    return NextResponse.json(
      { error: 'Date and type required' },
      { status: 400 }
    )

  const collectionName = collectionMap[type]
  if (!collectionName)
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

  try {
    const client = await clientPromise
    const db = client.db('scuba_booking')

    const query: any = { date }
    if (activity) query.$or = [{ course: activity }, { site: activity }]

    const bookings = await db.collection(collectionName).find(query).toArray()
    const bookedTimes = bookings.map((b) => b.time)

    return NextResponse.json({ bookedTimes }) // always returns array, even if empty
  } catch (error) {
    console.error('Availability API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
