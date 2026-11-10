import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { diveSitesRU } from '@/lib/data/diveSites'
import KohTaoDiveGuide from '@/components/KohTaoDiveGuide'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return diveSitesRU.map(({slug})=>({slug})) }
export async function generateMetadata({params}:Props):Promise<Metadata> {
 const {slug}=await params, site=diveSitesRU.find(s=>s.slug===slug)
 if(!site) return {}
 const path=`/divesites/${site.slug}`
 return {title:`${site.name} — дайв-сайт Ко Тао`,description:site.shortDescription,alternates:{canonical:`/ru${path}`,languages:{en:path,ru:`/ru${path}`}},openGraph:{type:'article',title:`${site.name} — дайв-сайт | LokaWndr`,description:site.shortDescription,url:`/ru${path}`,...(site.imageUrl?{images:[{url:site.imageUrl,alt:`${site.name} — дайв-сайт на Ко Тао`}]}:{})}}
}
export default async function Page({params}:Props) {
 const {slug}=await params, site=diveSitesRU.find(s=>s.slug===slug)
 if(!site) notFound()
 return <KohTaoDiveGuide site={site} locale='ru'/>
}
