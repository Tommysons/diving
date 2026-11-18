import DiveGuideLayout, { type DiveGuide } from '@/components/DiveGuideLayout'
import { maldivesGuideSites, maldivesGuideNeighbors } from '@/lib/data/maldivesGuides'

type Site = (typeof maldivesGuideSites)[number]
export default function MaldivesDiveGuide({site,locale}:{site:Site;locale:'en'|'ru'}) {
 const ru=locale==='ru',base=ru?'/ru':'',neighbors=maldivesGuideNeighbors(site.slug,locale)!
 const wella=site.slug==='wella-giri'
 const lhohi=site.slug==='lhohi-caves'
 const yuki=site.slug==='yuki-reef'
 const photos=yuki?[4,1,2,3,5].map(n=>`/images/dive-sites/yuki-reef/${n}.webp`):wella?[2,4,7,6,1].map(n=>`/images/dive-sites/wella-giri/${n}.png`):lhohi?[2,7,4,5,3].map(n=>`/images/dive-sites/lhohi-caves/${n}.png`):[]
 const questions: Record<string, {en:[string,string][],ru:[string,string][]}> = {
  'wella-giri': {
   en:[['What depths are most interesting at Wella Giri?','The pinnacle extends to approximately 30–35 m, while the guide highlights coral formations and reef life around 10–20 m. Choose a depth within your training.'],['What conditions should I expect?','Reported visibility is around 10–15 m and currents range from slow to strong. The boat ride from Vilu Reef is approximately 25 minutes; confirm conditions before departure.']],
   ru:[['На какой глубине интереснее всего Wella Giri?','Подводная вершина уходит примерно до 30–35 м, а кораллы и рифовая жизнь особенно интересны на 10–20 м. Выбирайте глубину по уровню подготовки.'],['Какие условия на дайв-сайте?','Видимость обычно около 10–15 м, течение от слабого до сильного. Путь на лодке от Vilu Reef занимает примерно 25 минут; уточняйте условия перед выходом.']]
  },
  'lhohi-caves': {
   en:[['At what depth are the overhangs?','Lhohi Caves has overhangs at approximately 7–20 m. Some run a considerable distance along the reef.'],['Is it safe to swim inside the caves?','Do not enter enclosed spaces without appropriate training, equipment and guidance. Currents are reported as slow to moderate, but conditions can change.']],
   ru:[['На какой глубине находятся навесы?','На Lhohi Caves навесы расположены примерно на 7–20 м. Некоторые тянутся вдоль рифа на значительное расстояние.'],['Можно ли заплывать внутрь пещер?','Не входите в замкнутые пространства без специальной подготовки, оборудования и сопровождения. Течение обычно слабое или умеренное, но условия меняются.']]
  },
  'yuki-reef': {
   en:[['What is the underwater terrain at Yuki Reef?','Yuki Reef features a wall, sloping sections and overhangs, with a listed maximum depth of approximately 30–35 m.'],['What marine life might I see?','The guide mentions lobsters, reef fish and schools of fusiliers, with occasional turtles or reef sharks. Sightings are not guaranteed.']],
   ru:[['Какой рельеф у Yuki Reef?','Здесь есть рифовая стена, склоны и навесы. Указанная максимальная глубина составляет примерно 30–35 м.'],['Каких морских обитателей можно увидеть?','В гиде упоминаются лобстеры, рифовые рыбы и стаи фузилёров, иногда черепахи и рифовые акулы. Встречи не гарантированы.']]
  }
 }
 const faq=questions[site.slug]?.[locale]?.map(([question,answer])=>({question,answer}))
 const guide:DiveGuide={
  faqs:faq,
  video: site.slug === 'azmee-corner' ? { href: 'https://www.youtube.com/watch?v=v5j3utsgwOo', title: 'Snorkeling in the Azmee Corner' } : undefined,
  name:site.name,intro:yuki?(ru?'Рифовая стена со склонами, навесами и морской жизнью.':'A reef wall with slopes, overhangs and marine life.'):lhohi?(ru?'Риф с длинными навесами на глубинах от 7 до 20 метров.':'A reef with long overhangs between 7 and 20 metres.'):wella?(ru?'Подводная гора с яркой жизнью на глубине 10–20 метров.':'An underwater mountain with vibrant reef life at 10–20 metres.'):(ru?'Дайв-сайт в районе Vilu Reef на Мальдивах.':'A dive site in the Vilu Reef area of the Maldives.'),description:site[locale],cover:(wella||lhohi||yuki)?photos[0]:undefined,photos,destination:'maldives',locale,
  conditions:[{label:yuki?(ru?'Максимальная глубина':'Maximum depth'):(ru?'Глубина дна на схеме':'Charted seabed depth'),value:yuki?'30–35 m':site.depth},{label:ru?'Течение':'Current',value:(lhohi||yuki)?(ru?'Слабое–умеренное':'Slow–moderate'):wella?(ru?'Слабое–сильное':'Slow–strong'):(ru?'Уточняйте':'Check locally')},{label:ru?'Видимость':'Visibility',value:(wella||lhohi)?(ru?'10–15 м':'10–15 m'):(ru?'Уточняйте':'Check locally')},...(site.boat==='—'?[]:[{label:ru?'От Vilu Reef на лодке':'Boat from Vilu Reef',value:ru?`Около ${site.boat} минут`:`About ${site.boat} minutes`}])],
  backHref:`${base}/destinations/maldives#vilu-sites`,mapHref:`${base}/destinations/maldives#vilu-sites`,...neighbors,
 }
 return <DiveGuideLayout guide={guide}/>
}
