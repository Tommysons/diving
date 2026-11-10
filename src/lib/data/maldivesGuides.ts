export const maldivesGuideSites = [
 {slug:'yuki-reef',name:'Yuki Reef',en:'A sloping reef near Udhdhoo Island, with overhangs around 12–15 m and a deeper sandy bottom.',ru:'Риф у острова Уддху со склоном, навесами на глубине около 12–15 м и песчаным дном.',depth:'3–35 m',boat:'13'},
 {slug:'velavaru-thila',name:'Velavaru Thila',en:'An underwater pinnacle with a shallow top, overhangs, sandy bottom and a nearby channel.',ru:'Подводная скала с неглубокой вершиной, навесами, песчаным дном и каналом.',depth:'8–40 m',boat:'20'},
 {slug:'bodu-thila',name:'Bodu Thila',en:'A large thila with a sloping reef, overhangs and a smaller deeper pinnacle.',ru:'Большая подводная скала со склоном, навесами и более глубокой небольшой скалой.',depth:'6–35 m',boat:'25'},
 {slug:'udhdhoo-reef',name:'Udhdhoo Reef',en:'',ru:'',depth:'3–35 m',boat:'10'},
 {slug:'azmee-corner',name:'Azmee Corner',en:'A reef wall in the Vilu Reef area with overhangs and marine life.',ru:'Рифовая стена с навесами и морскими обитателями в районе Vilu Reef.',depth:'—',boat:'—'},
] as const

export function maldivesGuideNeighbors(slug:string, locale:'en'|'ru') {
 const i=maldivesGuideSites.findIndex(site=>site.slug===slug)
 if(i<0) return null
 const base=locale==='ru'?'/ru':''
 const toLink=(site:(typeof maldivesGuideSites)[number])=>({name:site.name,href:`${base}/destinations/maldives/${site.slug}`})
 return {previous:toLink(maldivesGuideSites[(i-1+maldivesGuideSites.length)%maldivesGuideSites.length]),next:toLink(maldivesGuideSites[(i+1)%maldivesGuideSites.length])}
}
