import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { currentUser } from '@clerk/nextjs/server'
import { ObjectId } from 'mongodb'

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
   READ (GET)
========================= */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const collectionName = getCollection(projectId)
  if (!collectionName) {
    return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db('appointments')

  const bookings = await db
    .collection(collectionName)
    .find({ userId: user.id })
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json(bookings)
}

/* =========================
   CREATE (POST)
========================= */
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  const collectionName = getCollection(projectId)
  if (!collectionName) {
    return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db('appointments')

  const result = await db.collection(collectionName).insertOne({
    ...body,
    userId: user.id,
    status: 'pending',
    createdAt: new Date(),
  })

  return NextResponse.json({ insertedId: result.insertedId })
}

/* =========================
   UPDATE (PUT)
========================= */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
  const db = client.db('appointments')

  await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id), userId: user.id }, { $set: updates })

  return NextResponse.json({ success: true })
}

/* =========================
   DELETE (DELETE)
========================= */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  const { projectId } = await context.params
  const user = await currentUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
  const db = client.db('appointments')

  await db.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
    userId: user.id,
  })

  return NextResponse.json({ success: true })
}
