export type LokaVideo = { id: string; title: string; category?: string }
export const maldivesVideos: LokaVideo[] = [
 { id:'3Ee3Md1R16A', title:'Swimming with a Manta Ray in the Maldives | South Ari Atoll' },
 { id:'Aqj2hctqOFM', title:'One Country, Many Dive Sites | Maldives Marine Life on GoPro' },
 { id:'qMadZd0RqRs', title:'Dolphins, a Reef Shark & a Turtle | A Maldives Dive to Remember' },
 { id:'A83GuC7Rry4', title:'Diving in Dhaalu atoll Maldives' },
 { id:'ZnC4xG3lMlk', title:'Swimming With Mantas & a Whale Shark | Maldives' },
 { id:'v5j3utsgwOo', title:'Snorkeling in the Azmee Corner' },
 { id:'qjmaeHgSXAE', title:'Captured the ocean through my eyes' },
]
export const thailandVideos: LokaVideo[] = [
 { id:'HeblxqUwoEM', title:'My first dives in Koh Tao' },
 { id:'PWU7G37iXtM', title:'Мои первые погружения на Ко Тао' },
 { id:'8qt0x0oU4hw', title:'Wondering in Chumphon Pinnacle' },
 { id:'uq8XEMwVs6I', title:'Wondering in Southwest Pinnacle' },
 { id:'OEkEryRDFtM', title:'Wondering around White Rock' },
 { id:'dclxFrsdWVY', title:'Wondering in wreck Sattakut' },
 { id:'ucQOhcQAPkQ', title:'313 -wreck' },
]
export const featuredVideos: LokaVideo[] = [
 ...maldivesVideos,
 ...thailandVideos,
 { id:'kgGqFdnqAwM', title:'Why do I love teaching scuba diving?' },
 { id:'qcc3i3AIxMw', title:'Why I Chose Scuba Diving as My Profession' },
 { id:'LNj_6UeX8RM', title:'Testing the New GoPro Update on a Scuba Dive' },
 { id:'Kdr_EgOgCkg', title:'1-Minute Dive Highlights' },
]

export const libraryVideos = featuredVideos.map(video=>({...video,slug:video.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || video.id, region:maldivesVideos.some(v=>v.id===video.id)?'maldives':thailandVideos.some(v=>v.id===video.id)?'thailand':'ocean'}))
export type LibraryVideo = typeof libraryVideos[number]
export const thumbnail = (id:string)=>'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'
