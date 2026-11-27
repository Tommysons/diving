import { getPublishedVideos } from '@/lib/publishedVideos'
export const dynamic='force-dynamic'
import type { Metadata } from 'next'
import { VideoLibrary } from '@/components/VideoLibrary'
export const metadata:Metadata={title:"Ocean Adventure Videos",description:"Watch original LokaWndr diving and underwater adventure videos.",alternates:{canonical:'/videos',languages:{en:'/videos',ru:'/ru/videos'}}}
export default async function Page(){return <VideoLibrary videos={await getPublishedVideos()} ru={false}/>}
