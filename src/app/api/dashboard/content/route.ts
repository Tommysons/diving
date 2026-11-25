import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { bookingDb, requireAdmin } from '@/lib/adminBookings'

export const dynamic = 'force-dynamic'
const kinds = ['country','destination','dive-site','activity','dive-trip','blog','video']
const fields = ['titleEn','titleRu','bodyEn','bodyRu','slug','country','destination','activity','mediaUrl','youtubeUrl','price','currency','depth','visibility','current','latitude','longitude','capacity','dates','itinerary','seoEn','seoRu'] as const
async function collection() { return (await bookingDb()).collection('cms_drafts') }
export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({error:'Forbidden'},{status:403})
  const rows = await (await collection()).find({}).sort({updatedAt:-1}).limit(500).toArray()
  return NextResponse.json(rows,{headers:{'Cache-Control':'no-store'}})
}
export async function POST(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({error:'Forbidden'},{status:403})
  const b = await req.json()
  if (!kinds.includes(b.kind) || typeof b.titleEn !== 'string' || !b.titleEn.trim() || typeof b.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(b.slug)) return NextResponse.json({error:'Valid English title, type and slug required'},{status:400})
  const values: Record<string,string> = {}
  for (const key of fields) {
    if (b[key] !== undefined && (typeof b[key] !== 'string' || b[key].length > 30000)) return NextResponse.json({error:'Invalid field: '+key},{status:400})
    values[key] = (b[key] || '').trim()
  }
  const c = await collection()
  const id = b.id
  if (id && (typeof id !== 'string' || !ObjectId.isValid(id))) return NextResponse.json({error:'Invalid ID'},{status:400})
  const existing = await c.findOne({kind:b.kind,slug:values.slug,...(id?{_id:{$ne:new ObjectId(id)}}:{})})
  if(existing) return NextResponse.json({error:'Slug already exists for this type'},{status:409})
  const doc = {...values,kind:b.kind,status:'draft',updatedAt:new Date()}
  if(id) {
    const r = await c.updateOne({_id:new ObjectId(id)},{$set:doc})
    if(!r.matchedCount) return NextResponse.json({error:'Draft not found'},{status:404})
  } else await c.insertOne({...doc,createdAt:new Date()})
  return NextResponse.json({success:true})
}
export async function DELETE(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({error:'Forbidden'},{status:403})
  const {id} = await req.json()
  if(typeof id !== 'string' || !ObjectId.isValid(id)) return NextResponse.json({error:'Invalid ID'},{status:400})
  await (await collection()).deleteOne({_id:new ObjectId(id)})
  return NextResponse.json({success:true})
}
