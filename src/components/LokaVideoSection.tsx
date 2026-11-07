import { Play } from 'lucide-react'

export type LokaVideo = { id: string; title: string; category?: string }
export const maldivesVideos: LokaVideo[] = [
 { id:'ZnC4xG3lMlk', title:'Swimming With Mantas & a Whale Shark | Maldives' },
 { id:'v5j3utsgwOo', title:'Snorkeling in the Azmee Corner' },
 { id:'li5cLk8_I8s', title:'Manta snorkeling' },
 { id:'Q-r-b5iU8Jk', title:'My first freedive in Maldives' },
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
]
export default function LokaVideoSection({locale,videos,title}:{locale:'en'|'ru';videos:LokaVideo[];title?:string}){
 const ru=locale==='ru'
 return <section aria-label={title || (ru?'Видео LokaWndr':'LokaWndr videos')} className='mx-auto w-full max-w-[1480px] px-6 py-14 md:px-10'>
 <div className='mb-7 flex flex-wrap items-center justify-between gap-4'>
 <div><p className='mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-300'><Play size={15}/> LokaWndr · YouTube</p><h2 className='text-3xl font-extrabold text-white'>{title || (ru?'Видео из наших приключений':'Watch Our Ocean Adventures')}</h2></div>
 <a href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='rounded-xl border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10'>{ru?'Все видео на YouTube':'See all on YouTube'} ↗</a>
 </div>
 <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
 {videos.map(video=><article key={video.id} className='overflow-hidden rounded-2xl border border-white/15 bg-white/[.07]'>
 <div className='aspect-video bg-[#031727]'><iframe loading='lazy' className='h-full w-full' src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.title} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerPolicy='strict-origin-when-cross-origin' allowFullScreen/></div>
 <div className='p-4'><h3 className='font-bold leading-6 text-white'>{video.title}</h3></div>
 </article>)}
 </div>
 </section>
}
