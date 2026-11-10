import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import MaldivesDiveGuide from '@/components/MaldivesDiveGuide'
import { maldivesGuideSites } from '@/lib/data/maldivesGuides'

type Props={params:Promise<{slug:string}>}
export function generateStaticParams(){return maldivesGuideSites.filter(s=>s.slug!=='udhdhoo-reef').map(({slug})=>({slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params,site=maldivesGuideSites.find(s=>s.slug===slug&&s.slug!=='udhdhoo-reef')
 if(!site)return {}
 const path=`/destinations/maldives/${site.slug}`
 return {title:`${site.name} Dive Site | Maldives`,description:site.en,robots:{index:false,follow:true},alternates:{canonical:path,languages:{en:path,ru:`/ru${path}`}}}
}
export default async function Page({params}:Props){
 const {slug}=await params,site=maldivesGuideSites.find(s=>s.slug===slug&&s.slug!=='udhdhoo-reef')
 if(!site)notFound()
 return <MaldivesDiveGuide site={site} locale='en'/>
}
