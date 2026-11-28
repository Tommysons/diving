import { NextResponse } from 'next/server'
import { getPublishedVideos } from '@/lib/publishedVideos'
export const dynamic='force-dynamic'
export async function GET(){try{const videos=await getPublishedVideos();return NextResponse.json(videos.map(({id,slug,title,titleRu,region})=>({id,slug,title,titleRu,region})),{headers:{'Cache-Control':'no-store'}})}catch{return NextResponse.json({error:'Catalog unavailable'},{status:503})}}
