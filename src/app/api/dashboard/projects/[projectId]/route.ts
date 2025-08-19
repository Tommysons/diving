import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'

const projectCollections: Record<string, string> = {
  scuba: 'bookings',
  freediving: 'bookings',
  dive_trips: 'bookings',
  digital_art: 'bookings',
}

export async function GET(
  req: Request,
  context: { params: Promise<{ projectId: string }> } // 👈 must be a Promise in Next 15
) {
  try {
    const { projectId } = await context.params // 👈 await here

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID missing' }, { status: 400 })
    }

    const collectionName = projectCollections[projectId]
    if (!collectionName) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db('scuba_booking')
    const collection = db.collection(collectionName)

    const items = await collection.find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(items)
  } catch (err) {
    console.error('GET error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}
