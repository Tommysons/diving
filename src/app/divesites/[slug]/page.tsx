import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { diveSites } from '@/lib/data/diveSites'
import KohTaoDiveGuide from '@/components/KohTaoDiveGuide'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return diveSites.map(({slug})=>({slug})) }
export async function generateMetadata({params}:Props):Promise<Metadata> {
 const {slug}=await params, site=diveSites.find(s=>s.slug===slug)
 if(!site) return {}
 const path=`/divesites/${site.slug}`
 return {title:`${site.name} Dive Site | Koh Tao`,description:site.shortDescription,alternates:{canonical:path,languages:{en:path,ru:`/ru${path}`}},openGraph:{type:'article',title:`${site.name} Dive Site | LokaWndr`,description:site.shortDescription,url:path,...(site.imageUrl?{images:[{url:site.imageUrl,alt:`${site.name} dive site in Koh Tao`}]}:{})}}
}
export default async function Page({params}:Props) {
 const {slug}=await params, site=diveSites.find(s=>s.slug===slug)
 if(!site) notFound()
 return <KohTaoDiveGuide site={site} locale='en'/>
}
