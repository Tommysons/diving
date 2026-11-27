import { libraryVideos, thumbnail } from '@/lib/data/videoLibrary'
import { videoSeo } from '@/lib/data/videoSeo'
export const dynamic='force-static'
const escapeXml=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
export function GET(){
 const entries=libraryVideos.flatMap(v=>{
 const seo=videoSeo[v.id];if(!seo)return []
 const match=/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(seo.duration)
 const seconds=match?Number(match[1]||0)*3600+Number(match[2]||0)*60+Number(match[3]||0):0
 return ['','/ru'].map(base=>'<url><loc>'+escapeXml('https://lokawndr.com'+base+'/videos/'+v.slug)+'</loc><video:video><video:thumbnail_loc>'+escapeXml(thumbnail(v.id))+'</video:thumbnail_loc><video:title>'+escapeXml(v.title)+'</video:title><video:description>'+escapeXml(base?seo.ru:seo.en)+'</video:description><video:player_loc>'+escapeXml('https://www.youtube-nocookie.com/embed/'+v.id)+'</video:player_loc>'+(seconds>0&&seconds<=28800?'<video:duration>'+seconds+'</video:duration>':'')+'<video:publication_date>'+seo.uploadDate+'</video:publication_date></video:video></url>')
 }).join('')
 return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'+entries+'</urlset>',{headers:{'Content-Type':'application/xml; charset=utf-8'}})
}
