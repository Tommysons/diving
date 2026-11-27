import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPublishedVideos } from '@/lib/publishedVideos'
import { thumbnail } from '@/lib/data/videoLibrary'
import { WatchVideo } from '@/components/VideoLibrary'
import { cache } from 'react'
export const dynamic='force-dynamic'
const catalog=cache(getPublishedVideos)
type Props={params:Promise<{slug:string}>}
async function findVideo(params:Props['params']){const {slug}=await params;const video=(await catalog()).find(v=>v.slug===slug);if(!video)notFound();return video}
export async function generateMetadata({params}:Props):Promise<Metadata>{const v=await findVideo(params);const path='/videos/'+v.slug;const title=v.titleRu||v.title;const description=v.seo?.ru||title;return {title,description,alternates:{canonical:'/ru'+path,languages:{en:path,ru:'/ru'+path}},openGraph:{title,description,images:[thumbnail(v.id)],url:'/ru'+path}}}
export default async function Page({params}:Props){return <WatchVideo video={await findVideo(params)} videos={await catalog()} ru={true}/>}
