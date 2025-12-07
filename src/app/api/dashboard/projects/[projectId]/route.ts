import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'
import { ObjectId } from 'mongodb'

/* =========================
   COLLECTION MAP
========================= */
const projectCollections: Record<string, string> = {
  scuba: 'scuba_bookings',
  freediving: 'freediving_bookings',
  dive_trips: 'dive_trips',
  digital_art: 'bookings',
}

function getCollection(projectId: string) {
  return projectCollections[projectId]
}

/* =========================
   HELPERS
========================= */
function isAdminUser(user: any) {
  const email = user?.emailAddresses?.[0]?.emailAddress
  return email === process.env.ADMIN_EMAIL
}

/* =========================
   READ (GET)
========================= */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const collectionName = getCollection(projectId)
    if (!collectionName) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    const bookings = await db
      .collection(collectionName)
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(bookings)
  } catch (err) {
    console.error('Dashboard GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

/* =========================
   CREATE (POST)
========================= */
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()

    const collectionName = getCollection(projectId)
    if (!collectionName) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    const result = await db.collection(collectionName).insertOne({
      ...body,
      createdAt: new Date(),
    })

    return NextResponse.json({ insertedId: result.insertedId })
  } catch (err) {
    console.error('Dashboard POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
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

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    const collectionName = getCollection(projectId)
    if (!collectionName) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    await db
      .collection(collectionName)
      .updateOne({ _id: new ObjectId(id) }, { $set: updates })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Dashboard PUT error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

/* =========================
   DELETE (DELETE)
========================= */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    const collectionName = getCollection(projectId)
    if (!collectionName) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    await db.collection(collectionName).deleteOne({
      _id: new ObjectId(id),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Dashboard DELETE error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
