import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminBookings'
import { youtubeId, validVideoDuration } from '@/lib/videoCmsValidation'
export const dynamic='force-dynamic'
export async function POST(req:NextRequest){
 if(!await requireAdmin())return NextResponse.json({error:'Forbidden'},{status:403})
 const body=await req.json().catch(()=>null)
 const id=typeof body?.url==='string'?youtubeId(body.url):null
 if(!id)return NextResponse.json({error:'Enter a valid YouTube watch URL, not a Shorts URL.'},{status:400})
 const key=process.env.YOUTUBE_API_KEY
 if(!key)return NextResponse.json({error:'YouTube import is not configured. You can still enter metadata manually.'},{status:503})
 try{
 const query=new URLSearchParams({part:'snippet,contentDetails,status',id,key})
 const r=await fetch('https://www.googleapis.com/youtube/v3/videos?'+query,{cache:'no-store',signal:AbortSignal.timeout(10000)})
 if(!r.ok)return NextResponse.json({error:'YouTube metadata request failed. Check API access and quota or enter metadata manually.'},{status:502})
 const data=await r.json()
 const v=data.items?.[0]
 if(!v)return NextResponse.json({error:'Video not found or not accessible.'},{status:404})
 if(v.snippet?.channelId!=='UC8Er8hR44kzt0voCdRovRAQ')return NextResponse.json({error:'Select a video from the LokaWndr channel.'},{status:400})
 if(v.status?.privacyStatus!=='public'||v.status?.embeddable!==true||v.snippet?.liveBroadcastContent!=='none')return NextResponse.json({error:'Select a public, embeddable, completed video.'},{status:400})
 if(!validVideoDuration(v.contentDetails?.duration||''))return NextResponse.json({error:'Video duration is unsupported.'},{status:400})
 return NextResponse.json({title:v.snippet.title,description:v.snippet.description,uploadDate:v.snippet.publishedAt,duration:v.contentDetails.duration,thumbnailUrl:v.snippet.thumbnails?.high?.url||'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg',language:v.snippet.defaultLanguage||v.snippet.defaultAudioLanguage||''},{headers:{'Cache-Control':'no-store'}})
 }catch{return NextResponse.json({error:'Unable to retrieve YouTube metadata. Please retry or enter it manually.'},{status:502})}
}
