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
 const questions: Record<string, {en:[string,string][],ru:[string,string][]}> = {
  'chumphon-pinnacle': {
   en:[['How deep is Chumphon Pinnacle?','The site is listed at 12–35 m. The main pinnacle rises to around 14 m, with deeper water around its base. Plan your depth with a local dive professional.'],['What marine life might I see?','Look for barracuda, giant grouper, lionfish, scorpionfish and anemonefish. Whale shark encounters are possible but never guaranteed.']],
   ru:[['Какая глубина на Chumphon Pinnacle?','В гиде указана глубина 12–35 м. Вершина основной скалы поднимается примерно до 14 м. Планируйте глубину с местным дайв-профессионалом.'],['Каких животных можно увидеть?','Здесь можно встретить барракуд, крупных груперов, крылаток, скорпен и рыб-клоунов. Встреча с китовой акулой возможна, но не гарантирована.']]
  },
  'white-rock': {
   en:[['What is White Rock like underwater?','White Rock has two large rock formations with coral gardens between them. The site is listed at 5–22 m, with conditions that vary by day.'],['What wildlife is associated with White Rock?','The guide lists sea turtles, angelfish, blue-spotted stingrays, sea snakes and triggerfish among possible sightings. Keep a respectful distance from wildlife.']],
   ru:[['Что представляет собой White Rock?','Дайв-сайт состоит из двух крупных скальных образований с коралловыми садами между ними. В гиде указана глубина 5–22 м; условия меняются.'],['Кого можно увидеть на White Rock?','В гиде упоминаются черепахи, рыбы-ангелы, синепятнистые хвостоколы, морские змеи и спинороги. Соблюдайте дистанцию с морскими животными.']]
  },
  'sattakut-shipwreck': {
   en:[['Can I enter the Sattakut wreck?','Wreck penetration requires appropriate specialist training, equipment and a suitable dive plan. Enjoying the exterior does not require entering enclosed spaces.'],['How should I plan the dive?','Confirm the actual depth, current and visibility with a local dive centre before choosing a profile appropriate to your certification and experience.']],
   ru:[['Можно ли заплывать внутрь затонувшего Sattakut?','Проникновение внутрь затонувшего судна требует специальной подготовки, оборудования и плана погружения. Осматривать судно снаружи можно без входа в закрытые пространства.'],['Как спланировать погружение?','Уточните глубину, течение и видимость у местного дайв-центра и выберите профиль в пределах вашей подготовки и опыта.']]
  }
 }
 const faq=questions[site.slug]?.[locale]?.map(([question,answer])=>({question,answer}))
 const guide:DiveGuide={
  faqs:faq,
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
