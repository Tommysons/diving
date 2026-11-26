import { NextRequest, NextResponse } from 'next/server'
import { bookingDb, notifyBooking } from '@/lib/adminBookings'
import { diveTrip as trip } from '@/lib/data/diveTrip'
export async function POST(req: NextRequest) {
 try {
 const {name,email,arrival,departure,group,room,message,language}=await req.json()
 const valid=(s:unknown):s is string=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s
 if(typeof name!=='string'||!name.trim()||name.length>200||typeof email!=='string'||email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||!valid(arrival)||!valid(departure)||arrival<new Date().toISOString().slice(0,10)|| (Date.parse(departure)-Date.parse(arrival))/86400000<trip.nights||!Number.isInteger(group)||group<trip.minGroup||group>trip.maxGroup||!['double','single','mixed'].includes(room)||typeof message!=='string'||message.length>5000)return NextResponse.json({error:'Invalid trip details'},{status:400})
 const db=await bookingDb()
 const doc={name:name.trim(),email:email.trim(),date:arrival,departure,group,room,message,language:language==='ru'?'ru':'en',type:'dive_trip',site:'Maldives – Mahibadhoo group dive trip',status:'pending',createdAt:new Date()}
 const result=await db.collection('dive_trips').insertOne(doc)
 const notifications=await notifyBooking(doc,'received')
 return NextResponse.json({id:result.insertedId,status:'pending',notifications})
 }catch(error){console.error('Trip booking failed',error);return NextResponse.json({error:'Unable to submit booking'},{status:500})}
}
