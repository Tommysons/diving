import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminBookings'
import { videoCollection } from '@/lib/publishedVideos'
import { libraryVideos } from '@/lib/data/videoLibrary'
import { youtubeId, validVideoDuration } from '@/lib/videoCmsValidation'
export const dynamic='force-dynamic'
export async function GET(){
 if(!await requireAdmin())return NextResponse.json({error:'Forbidden'},{status:403})
 return NextResponse.json(await (await videoCollection()).find({}).sort({updatedAt:-1}).toArray())
}
export async function POST(req:NextRequest){
 if(!await requireAdmin())return NextResponse.json({error:'Forbidden'},{status:403})
 const b=await req.json()
 const keys=['youtubeUrl','slug','titleEn','titleRu','bodyEn','bodyRu','region','uploadDate','duration'] as const
 for(const k of keys)if(typeof b[k]!=='string'||!b[k].trim()||b[k].length>5000)return NextResponse.json({error:'Invalid '+k},{status:400})
 const id=youtubeId(b.youtubeUrl)
 if(!id||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(b.slug))||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(b.region))||!validVideoDuration(b.duration)||!Number.isFinite(Date.parse(b.uploadDate))||Date.parse(b.uploadDate)>Date.now())return NextResponse.json({error:'Check video URL, slug, region, date and ISO duration'},{status:400})
 if(libraryVideos.some(v=>v.id===id||v.slug===b.slug))return NextResponse.json({error:'Existing library video or slug; legacy editing is not enabled yet'},{status:409})
 const c=await videoCollection()
 await c.createIndex({youtubeId:1},{unique:true})
 await c.createIndex({slug:1},{unique:true})
 const values=Object.fromEntries(keys.map(k=>[k,b[k].trim()]))
 try{
 const old=await c.findOne({youtubeId:id})
 if(old&&old.slug!==b.slug)return NextResponse.json({error:'Published URL slug cannot be changed'},{status:409})
 await c.updateOne({youtubeId:id,slug:b.slug},{$set:{...values,youtubeId:id,uploadDate:new Date(b.uploadDate).toISOString(),status:b.status==='unpublished'?'unpublished':'published',updatedAt:new Date()},$setOnInsert:{createdAt:new Date()}},{upsert:true})
 return NextResponse.json({success:true})
 }catch(e){if((e as {code?:number}).code===11000)return NextResponse.json({error:'Duplicate video or slug'},{status:409});throw e}
}
