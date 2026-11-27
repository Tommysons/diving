import { videoSeo } from '@/lib/data/videoSeo'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { libraryVideos, thumbnail } from '@/lib/data/videoLibrary'
import { WatchVideo } from '@/components/VideoLibrary'
type Props={params:Promise<{slug:string}>}
export function generateStaticParams(){return libraryVideos.map(v=>({slug:v.slug}))}
async function findVideo(params:Props['params']){const {slug}=await params;const video=libraryVideos.find(v=>v.slug===slug);if(!video)notFound();return video}
export async function generateMetadata({params}:Props):Promise<Metadata>{const v=await findVideo(params);const path='/videos/'+v.slug;return {title:v.title,description:videoSeo[v.id]?.ru ?? v.title,alternates:{canonical:'/ru'+path,languages:{en:path,ru:'/ru'+path}},openGraph:{title:v.title,images:[thumbnail(v.id)],url:'/ru'+path}}}
export default async function Page({params}:Props){return <WatchVideo video={await findVideo(params)} ru={true}/>}
