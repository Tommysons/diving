import DiveGuideLayout, { type DiveGuide } from '@/components/DiveGuideLayout'
import { diveSites, diveSitesRU, type DiveSite } from '@/lib/data/diveSites'

export default function KohTaoDiveGuide({site,locale}:{site:DiveSite;locale:'en'|'ru'}) {
 const ru=locale==='ru', base=ru?'/ru':'', depthNeedsConfirmation=site.slug==='sattakut-shipwreck'
 const sites=ru?diveSitesRU:diveSites, index=sites.findIndex(item=>item.slug===site.slug)
 const previous=sites[(index-1+sites.length)%sites.length], next=sites[(index+1)%sites.length]
 const videos: Record<string, { href: string; title: string }> = {
  'chumphon-pinnacle': { href: 'https://www.youtube.com/watch?v=8qt0x0oU4hw', title: 'Wondering in Chumphon Pinnacle' },
  'sattakut-shipwreck': { href: 'https://www.youtube.com/watch?v=dclxFrsdWVY', title: 'Wondering in wreck Sattakut' },
 }
 const guide:DiveGuide={
  video:videos[site.slug],
  name:site.name, intro:site.shortDescription, description:site.longDescription, cover:site.imageUrl,
  photos:(site.extraImages??[]).filter(src=>/\.(webp|jpg|jpeg|png)$/i.test(src)&&!src.includes('-map.')),
  conditions:[{label:ru?'Глубина':'Depth',value:depthNeedsConfirmation?(ru?'Уточняйте':'Check locally'):site.depth},{label:ru?'Течение':'Current',value:site.current},{label:ru?'Видимость':'Visibility',value:site.visibility}],
  marineLife:site.thingsToSee,backHref:`${base}/destinations/thailand#koh-tao-sites`,mapHref:`${base}/destinations/thailand#koh-tao-sites`,locale,
  photoCredit:ru?'Подводные фотографии: Mia':'Underwater photography: Mia',depthNeedsConfirmation,
  previous:{href:`${base}/divesites/${previous.slug}`,name:previous.name},next:{href:`${base}/divesites/${next.slug}`,name:next.name},
 }
 return <DiveGuideLayout guide={guide}/>
}
