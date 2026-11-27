import 'server-only'
import clientPromise from '@/lib/mongodb'
import { libraryVideos } from '@/lib/data/videoLibrary'
import { videoSeo } from '@/lib/data/videoSeo'
export type PublishedVideo = (typeof libraryVideos)[number] & {titleRu?:string; seo?:{en:string;ru:string;uploadDate:string;duration:string;related?:string}}
export async function videoCollection(){return (await clientPromise).db(process.env.MONGODB_DB||'scuba_booking').collection('published_videos')}
export async function getPublishedVideos():Promise<PublishedVideo[]>{
 const original:PublishedVideo[]=libraryVideos.map(v=>({...v,seo:videoSeo[v.id]}))
 const rows=await (await videoCollection()).find({}).sort({updatedAt:-1}).toArray()
 const added:PublishedVideo[]=rows.filter(r=>r.status==='published').map(r=>({id:String(r.youtubeId),slug:String(r.slug),title:String(r.titleEn),titleRu:String(r.titleRu),region:String(r.region),seo:{en:String(r.bodyEn),ru:String(r.bodyRu),uploadDate:String(r.uploadDate),duration:String(r.duration),related:videoSeo[String(r.youtubeId)]?.related}}))
 return [...added,...original.filter(v=>!rows.some(a=>a.youtubeId===v.id))]
}
