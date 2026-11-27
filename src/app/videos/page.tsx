import type { Metadata } from 'next'
import { VideoLibrary } from '@/components/VideoLibrary'
export const metadata:Metadata={title:"Ocean Adventure Videos",description:"Watch original LokaWndr diving and underwater adventure videos.",alternates:{canonical:'/videos',languages:{en:'/videos',ru:'/ru/videos'}}}
export default function Page(){return <VideoLibrary ru={false}/>}
