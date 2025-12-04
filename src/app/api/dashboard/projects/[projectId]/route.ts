import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params

  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projectCollections: Record<string, string> = {
    scuba: 'scuba_bookings',
    freediving: 'freediving_bookings',
    dive_trips: 'dive_trips',
    digital_art: 'digital_art_orders',
  }

  const collectionName = projectCollections[projectId]
  if (!collectionName) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)

  const items = await db
    .collection(collectionName)
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json(items)
}
