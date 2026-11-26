import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { bookingDb, collections, notifyBooking, requireAdmin } from '@/lib/adminBookings'

export const dynamic = 'force-dynamic'
const statuses = ['pending', 'approved', 'cancelled'] as const
function validDate(s: unknown) { return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T00:00:00Z')) && new Date(s + 'T00:00:00Z').toISOString().slice(0, 10) === s }
function validTime(s: unknown) { return typeof s === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(s) }
async function conflict(db: Awaited<ReturnType<typeof bookingDb>>, collection: string, original: Record<string, unknown>, date: string, time: string, id: ObjectId) {
  const activityField = collection === 'dive_trips' ? 'site' : 'course'
  const other = await db.collection(collection).find({ _id: { $ne: id }, date, status: 'approved', [activityField]: original[activityField] }).toArray()
  const start = Date.parse(date + 'T' + time + ':00Z')
  return other.some(b => Math.abs(Date.parse(date + 'T' + b.time + ':00Z') - start) < 2 * 60 * 60 * 1000)
}
export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  try {
    const db = await bookingDb()
    const groups = await Promise.all(Object.entries(collections).map(async ([project, collection]) => {
      const rows = await db.collection(collection).find({ status: { $ne: 'deleted' } }).sort({ createdAt: -1 }).limit(300).toArray()
      return rows.map(b => ({ ...b, _id: b._id.toHexString(), project }))
    }))
    return NextResponse.json(groups.flat().sort((a, b) => new Date((b as { createdAt?: Date }).createdAt || 0).getTime() - new Date((a as { createdAt?: Date }).createdAt || 0).getTime()), { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) { console.error('Booking list error', error); return NextResponse.json({ error: 'Unable to load bookings' }, { status: 500 }) }
}
export async function PATCH(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  try {
    const body = await req.json()
    const { project, id, date, time, status } = body
    const collection = collections[project]
    if (!collection || !ObjectId.isValid(id || '') || !validDate(date) || !statuses.includes(status)) return NextResponse.json({ error: 'Invalid booking update' }, { status: 400 })
    const db = await bookingDb()
    const _id = new ObjectId(id)
    const existing = await db.collection(collection).findOne({ _id, status: { $ne: 'deleted' } })
    if (!existing) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    const isGroup=!!existing.departure
    const departure=body.departure ?? existing.departure
    const group=body.group ?? existing.group
    const room=body.room ?? existing.room
    if(isGroup ? (!validDate(departure)||(Date.parse(departure)-Date.parse(date))/86400000<7||!Number.isInteger(group)||group<12||group>22||!['double','single','mixed'].includes(room)) : !validTime(time)) return NextResponse.json({error:'Invalid booking details'},{status:400})
    const changes=isGroup?{date,departure,group,room,status}:{date,time,status}
    if (!isGroup && status === 'approved' && await conflict(db, collection, existing, date, time, _id)) return NextResponse.json({ error: 'Conflicting confirmed booking in this two-hour time slot' }, { status: 409 })
    if (Object.entries(changes).every(([key,value])=>existing[key]===value)) return NextResponse.json({ success: true, unchanged: true })
    const result = await db.collection(collection).updateOne({ _id, status: existing.status }, { $set: { ...changes, updatedAt: new Date() } })
    if (!result.matchedCount) return NextResponse.json({ error: 'Booking changed; reload and try again' }, { status: 409 })
    const action = status === 'cancelled' ? 'cancelled' : status === 'approved' && existing.status !== 'approved' ? 'approved' : 'updated'
    const notifications = await notifyBooking({ ...existing, ...changes }, action, existing)
    return NextResponse.json({ success: true, notifications })
  } catch (error) { console.error('Booking update error', error); return NextResponse.json({ error: 'Unable to update booking' }, { status: 500 }) }
}
export async function DELETE(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  try {
    const { project, id } = await req.json()
    const collection = collections[project]
    if (!collection || !ObjectId.isValid(id || '')) return NextResponse.json({ error: 'Invalid booking' }, { status: 400 })
    const db = await bookingDb()
    const _id = new ObjectId(id)
    const booking = await db.collection(collection).findOneAndUpdate({ _id, status: { $ne: 'deleted' } }, { $set: { status: 'deleted', deletedAt: new Date() } }, { returnDocument: 'before' })
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    const notifications = await notifyBooking({ ...booking, status: 'deleted' }, 'deleted', booking)
    return NextResponse.json({ success: true, notifications })
  } catch (error) { console.error('Booking deletion error', error); return NextResponse.json({ error: 'Unable to delete booking' }, { status: 500 }) }
}
