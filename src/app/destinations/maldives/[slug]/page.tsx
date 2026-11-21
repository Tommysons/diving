import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MaldivesDiveGuide from '@/components/MaldivesDiveGuide'
import { publishedMaldivesGuideSites } from '@/lib/data/maldivesGuides'

type Props={params:Promise<{slug:string}>}
export function generateStaticParams(){return publishedMaldivesGuideSites.filter(s=>s.slug!=='udhdhoo-reef').map(({slug})=>({slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params,site=publishedMaldivesGuideSites.find(s=>s.slug===slug&&s.slug!=='udhdhoo-reef')
 if(!site)return {}
 const path=`/destinations/maldives/${site.slug}`
 const indexable=['wella-giri','lhohi-caves','yuki-reef'].includes(site.slug)
 const description=site.en
 const canonical=path
 const image=indexable?site.slug==='yuki-reef'?'/images/dive-sites/yuki-reef/4.webp':site.slug==='wella-giri'?'/images/dive-sites/wella-giri/2.png':'/images/dive-sites/lhohi-caves/2.png':undefined
 return {title:`${site.name} Dive Site Guide | Dhaalu Atoll, Maldives`,description,robots:{index:indexable,follow:true},alternates:{canonical,languages:{en:path,ru:`/ru${path}`}},openGraph:{type:'article',title:`${site.name} Diving Guide | Maldives`,description,url:canonical,...(image?{images:[{url:image,alt:`${site.name} underwater reef in Dhaalu Atoll` }]}:{})}}
}
export default async function Page({params}:Props){
 const {slug}=await params,site=publishedMaldivesGuideSites.find(s=>s.slug===slug&&s.slug!=='udhdhoo-reef')
 if(!site)notFound()
 return <MaldivesDiveGuide site={site} locale='en'/>
}
