import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'

// ✅ Correct real collections where booking form saves data
const projectCollections: Record<string, string> = {
  scuba: 'scuba_bookings',
  freediving: 'freediving_bookings',
  dive_trips: 'dive_trips',
  digital_art: 'digital_art_orders',
}

export async function GET(
  req: Request,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params

    if (!projectId)
      return NextResponse.json({ error: 'Project ID missing' }, { status: 400 })

    const collectionName = projectCollections[projectId]
    if (!collectionName)
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })

    const user = await currentUser()
    if (!user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
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
