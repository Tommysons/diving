import { getPublishedVideos } from '@/lib/publishedVideos'
export const dynamic='force-dynamic'
import type { Metadata } from 'next'
import { VideoLibrary } from '@/components/VideoLibrary'
export const metadata:Metadata={title:"Подводные видео",description:"Видео о дайвинге и подводных приключениях LokaWndr.",alternates:{canonical:'/ru/videos',languages:{en:'/videos',ru:'/ru/videos'}}}
export default async function Page(){return <VideoLibrary videos={await getPublishedVideos()} ru={true}/>}
