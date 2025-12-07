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

function isAdminUser(user: any) {
  const email = user?.emailAddresses?.[0]?.emailAddress
  return email === process.env.ADMIN_EMAIL
}

export async function GET() {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    let results: any[] = []

    for (const [project, collection] of Object.entries(projectCollections)) {
      const items = await db
        .collection(collection)
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      const tagged = items.map((item) => ({
        ...item,
        project,
      }))

      results = results.concat(tagged)
    }

    results.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json(results)
  } catch (err) {
    console.error('Dashboard GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { id, status, project } = body

    if (!id || !project) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const collection = projectCollections[project]
    if (!collection) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    await db
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Dashboard PUT error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const project = searchParams.get('project')

    if (!id || !project) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const collection = projectCollections[project]
    if (!collection) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    await db.collection(collection).deleteOne({
      _id: new ObjectId(id),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Dashboard DELETE error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
