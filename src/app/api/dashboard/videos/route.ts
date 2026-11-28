import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminBookings'
import { videoCollection } from '@/lib/publishedVideos'
import { videoSeo } from '@/lib/data/videoSeo'
import { libraryVideos } from '@/lib/data/videoLibrary'
import { youtubeId, validVideoDuration } from '@/lib/videoCmsValidation'
export const dynamic='force-dynamic'
export async function GET(){
 if(!await requireAdmin())return NextResponse.json({error:'Forbidden'},{status:403})
 const rows=await (await videoCollection()).find({}).sort({updatedAt:-1}).toArray()
 return NextResponse.json([...rows,...libraryVideos.filter(v=>!rows.some(r=>r.youtubeId===v.id)).map(v=>({youtubeId:v.id,youtubeUrl:'https://www.youtube.com/watch?v='+v.id,slug:v.slug,titleEn:v.title,titleRu:v.title,bodyEn:videoSeo[v.id]?.en||'',bodyRu:videoSeo[v.id]?.ru||'',region:v.region,uploadDate:videoSeo[v.id]?.uploadDate||'',duration:videoSeo[v.id]?.duration||'',status:'published'}))])
}
export async function POST(req:NextRequest){
 if(!await requireAdmin())return NextResponse.json({error:'Forbidden'},{status:403})
 const b=await req.json().catch(()=>null)
 if(!b||!['published','unpublished'].includes(b.status))return NextResponse.json({error:'Invalid action'},{status:400})
 if(b.status==='unpublished'){
 const id=typeof b.youtubeId==='string'&&/^[A-Za-z0-9_-]{11}$/.test(b.youtubeId)?b.youtubeId:typeof b.youtubeUrl==='string'?youtubeId(b.youtubeUrl):null
 if(!id)return NextResponse.json({error:'Select an existing published video'},{status:400})
 try{
 const c=await videoCollection()
 const existing=await c.findOne({youtubeId:id})
 if(existing){await c.updateOne({youtubeId:id},{$set:{status:'unpublished',updatedAt:new Date()}});return NextResponse.json({success:true})}
 const legacy=libraryVideos.find(v=>v.id===id)
 if(!legacy)return NextResponse.json({error:'Published video not found'},{status:404})
 const seo=videoSeo[id]
 await c.updateOne({youtubeId:id},{$set:{status:'unpublished',updatedAt:new Date()},$setOnInsert:{youtubeId:id,youtubeUrl:'https://www.youtube.com/watch?v='+id,slug:legacy.slug,titleEn:legacy.title,titleRu:legacy.title,bodyEn:seo?.en||'',bodyRu:seo?.ru||'',region:legacy.region,uploadDate:seo?.uploadDate||'',duration:seo?.duration||'',createdAt:new Date()}},{upsert:true})
 return NextResponse.json({success:true})
 }catch(e){console.error('Video unpublish failed',e);return NextResponse.json({error:'Unable to unpublish video. Please retry.'},{status:500})}
 }
 const keys=['youtubeUrl','slug','titleEn','titleRu','bodyEn','bodyRu','region','uploadDate','duration'] as const
 for(const k of keys)if(typeof b[k]!=='string'||!b[k].trim()||b[k].length>5000)return NextResponse.json({error:'Invalid '+k},{status:400})
 const id=youtubeId(b.youtubeUrl)
 if(!id||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(b.slug)||libraryVideos.some(v=>v.id===id&&v.slug===b.slug))||!(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(b.region))||!validVideoDuration(b.duration)||!Number.isFinite(Date.parse(b.uploadDate))||Date.parse(b.uploadDate)>Date.now())return NextResponse.json({error:'Check video URL, slug, region, date and ISO duration'},{status:400})
 if(libraryVideos.some(v=>(v.id===id&&v.slug!==b.slug)||(v.id!==id&&v.slug===b.slug)))return NextResponse.json({error:'Existing video URL cannot change or slug is already in use'},{status:409})
 try{
 const c=await videoCollection()
 await c.createIndex({youtubeId:1},{unique:true})
 await c.createIndex({slug:1},{unique:true})
 const values=Object.fromEntries(keys.map(k=>[k,b[k].trim()]))
 const old=await c.findOne({youtubeId:id})
 if(old&&old.slug!==b.slug)return NextResponse.json({error:'Published URL slug cannot be changed'},{status:409})
 await c.updateOne({youtubeId:id,slug:b.slug},{$set:{...values,youtubeId:id,uploadDate:new Date(b.uploadDate).toISOString(),status:b.status==='unpublished'?'unpublished':'published',updatedAt:new Date()},$setOnInsert:{createdAt:new Date()}},{upsert:true})
 return NextResponse.json({success:true})
 }catch(e){if((e as {code?:number}).code===11000)return NextResponse.json({error:'Duplicate video or slug'},{status:409});console.error('Video publication failed',e);return NextResponse.json({error:'Unable to save video to the database. Please retry or contact the administrator.'},{status:500})}
}
