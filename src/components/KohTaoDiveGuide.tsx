import DiveGuideLayout, { type DiveGuide } from '@/components/DiveGuideLayout'
import { publishedDiveSites, publishedDiveSitesRU, type DiveSite } from '@/lib/data/diveSites'

export default function KohTaoDiveGuide({site,locale}:{site:DiveSite;locale:'en'|'ru'}) {
 const ru=locale==='ru', base=ru?'/ru':'', depthNeedsConfirmation=site.slug==='sattakut-shipwreck'
 const sites=ru?publishedDiveSitesRU:publishedDiveSites, index=sites.findIndex(item=>item.slug===site.slug)
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
  'southwest-pinnacle': {
   en:[['What is the terrain at Southwest Pinnacle?','The dive site consists of a main underwater pinnacle surrounded by smaller rock formations. The listed depth range is 5–30 m.'],['What conditions and wildlife are reported?','The guide lists moderate current and visibility of 10–25 m. Possible sightings include giant grouper, barracuda and whale sharks, but wildlife encounters are not guaranteed.']],
   ru:[['Какой рельеф у Southwest Pinnacle?','Основную подводную скалу окружают более мелкие скальные образования. Указанная глубина составляет 5–30 м.'],['Какие здесь условия и морские обитатели?','В гиде указаны умеренное течение и видимость 10–25 м. Можно встретить крупных груперов, барракуд и китовых акул, но встречи не гарантированы.']]
  },
  'twins': {
   en:[['Is Twins suitable for newer divers?','The guide describes two rock formations in generally calm, shallow water, popular with divers of different experience levels. The listed depth range is 5–18 m.'],['What marine life can I look for?','Possible sightings listed in the guide include gobies, blue-spotted stingrays, moray eels, boxfish and triggerfish. Observe marine life without touching it.']],
   ru:[['Подходит ли Twins начинающим дайверам?','В гиде описаны две скалы в обычно спокойной неглубокой воде. Сайт популярен среди дайверов с разным опытом; указанная глубина 5–18 м.'],['Каких животных можно увидеть?','Среди возможных обитателей указаны бычки, синепятнистые хвостоколы, мурены, рыбы-кузовки и спинороги. Не трогайте морских животных.']]
  },
  '313-shipwreck': {
   en:[['What is the 313 shipwreck?','The guide identifies it as HTMS SUPHAIRIN, a former Royal Thai Navy vessel sunk in September 2023. The wreck is listed as 44.9 m long.'],['How deep is the 313 wreck?','The listed site depth is 11–27 m, with moderate current and 10–20 m visibility. Confirm current conditions locally and do not enter enclosed wreck spaces without specialist training.']],
   ru:[['Что такое затонувший корабль 313?','В гиде он указан как HTMS SUPHAIRIN — бывший корабль ВМС Таиланда, затопленный в сентябре 2023 года. Его длина составляет 44,9 м.'],['Какая глубина на затонувшем корабле 313?','Указанная глубина 11–27 м, течение умеренное, видимость 10–20 м. Уточняйте условия на месте и не проникайте внутрь судна без специальной подготовки.']]
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
