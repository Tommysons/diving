import DiveGuideLayout, { type DiveGuide } from '@/components/DiveGuideLayout'
import { maldivesGuideSites, maldivesGuideNeighbors } from '@/lib/data/maldivesGuides'

type Site = (typeof maldivesGuideSites)[number]
export default function MaldivesDiveGuide({site,locale}:{site:Site;locale:'en'|'ru'}) {
 const ru=locale==='ru',base=ru?'/ru':'',neighbors=maldivesGuideNeighbors(site.slug,locale)!
 const wella=site.slug==='wella-giri'
 const photos=wella?[2,4,7,6,1].map(n=>`/images/dive-sites/wella-giri/${n}.png`):[]
 const guide:DiveGuide={
  video: site.slug === 'azmee-corner' ? { href: 'https://www.youtube.com/watch?v=v5j3utsgwOo', title: 'Snorkeling in the Azmee Corner' } : undefined,
  name:site.name,intro:wella?(ru?'Подводная гора с яркой жизнью на глубине 10–20 метров.':'An underwater mountain with vibrant reef life at 10–20 metres.'):(ru?'Дайв-сайт в районе Vilu Reef на Мальдивах.':'A dive site in the Vilu Reef area of the Maldives.'),description:site[locale],cover:wella?photos[0]:undefined,photos,destination:'maldives',locale,
  conditions:[{label:ru?'Глубина дна на схеме':'Charted seabed depth',value:site.depth},{label:ru?'Течение':'Current',value:wella?(ru?'Переменное, возможны разные направления':'Variable; direction may change'):(ru?'Уточняйте':'Check locally')},{label:ru?'Видимость':'Visibility',value:ru?'Уточняйте':'Check locally'},...(site.boat==='—'?[]:[{label:ru?'От Vilu Reef на лодке':'Boat from Vilu Reef',value:ru?`Около ${site.boat} минут`:`About ${site.boat} minutes`}])],
  backHref:`${base}/destinations/maldives#vilu-sites`,mapHref:`${base}/destinations/maldives#vilu-sites`,...neighbors,
 }
 return <DiveGuideLayout guide={guide}/>
}
