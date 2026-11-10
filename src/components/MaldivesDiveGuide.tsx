import DiveGuideLayout, { type DiveGuide } from '@/components/DiveGuideLayout'
import { maldivesGuideSites, maldivesGuideNeighbors } from '@/lib/data/maldivesGuides'

type Site = (typeof maldivesGuideSites)[number]
export default function MaldivesDiveGuide({site,locale}:{site:Site;locale:'en'|'ru'}) {
 const ru=locale==='ru',base=ru?'/ru':'',neighbors=maldivesGuideNeighbors(site.slug,locale)!
 const guide:DiveGuide={
  name:site.name,intro:ru?'Дайв-сайт в районе Vilu Reef на Мальдивах.':'A dive site in the Vilu Reef area of the Maldives.',description:site[locale],photos:[],destination:'maldives',locale,
  conditions:[{label:ru?'Глубина дна на схеме':'Charted seabed depth',value:site.depth},{label:ru?'Течение':'Current',value:ru?'Уточняйте':'Check locally'},{label:ru?'Видимость':'Visibility',value:ru?'Уточняйте':'Check locally'},...(site.boat==='—'?[]:[{label:ru?'От Vilu Reef на лодке':'Boat from Vilu Reef',value:ru?`Около ${site.boat} минут`:`About ${site.boat} minutes`}])],
  backHref:`${base}/destinations/maldives#vilu-sites`,mapHref:`${base}/destinations/maldives#vilu-sites`,...neighbors,
 }
 return <DiveGuideLayout guide={guide}/>
}
