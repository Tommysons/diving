import { Play } from 'lucide-react'
import Link from 'next/link'
import StoryCarousel from '@/components/StoryCarousel'

export type LokaVideo = { id: string; title: string; category?: string }
export const maldivesVideos: LokaVideo[] = [
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
]
export default function LokaVideoSection({locale,videos,title}:{locale:'en'|'ru';videos:LokaVideo[];title?:string}){
 const ru=locale==='ru'
 return <section aria-label={title || (ru?'Видео LokaWndr':'LokaWndr videos')} className='mx-auto w-full max-w-[1480px] px-6 py-14 md:px-10'>
 <div className='mb-7 flex flex-wrap items-center justify-between gap-4'>
 <div><p className='mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-300'><Play size={15}/> LokaWndr · YouTube</p><h2 className='text-3xl font-extrabold text-white'>{title || (ru?'Видео из наших приключений':'Watch Our Ocean Adventures')}</h2></div>
 <a href='https://www.youtube.com/@lokawndr' target='_blank' rel='noopener noreferrer' className='rounded-xl border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10'>{ru?'Все видео на YouTube':'See all on YouTube'} ↗</a>
 </div>
 <StoryCarousel autoPlay={false} locale={locale} label={title || (ru?'Видео LokaWndr':'LokaWndr videos')}>
 {videos.map(video=><article key={video.id} className='overflow-hidden rounded-2xl border border-white/15 bg-white/[.07]'>
 <div className='aspect-video bg-[#031727]'><iframe loading='lazy' className='h-full w-full' src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.title} allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerPolicy='strict-origin-when-cross-origin' allowFullScreen/></div>
 <div className='p-4'><h3 className='font-bold leading-6 text-white'>{video.title}</h3><a href={`https://www.youtube.com/watch?v=${video.id}`} target='_blank' rel='noopener noreferrer' className='mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-cyan-200 underline underline-offset-4 hover:text-white'>{ru?'Смотреть на YouTube':'Watch on YouTube'}<span className='sr-only'>: {video.title}</span></a></div>
 </article>)}
 </StoryCarousel>
 {videos === maldivesVideos && <div className='mt-7 rounded-2xl border border-cyan-200/20 bg-white/[.05] p-6'><h3 className='text-xl font-bold text-white'>{ru?'Узнайте больше о дайвинге на атолле Даалу':'Explore the dive sites behind the footage'}</h3><p className='mt-3 max-w-3xl leading-7 text-slate-200'>{ru?'Эти видео дополняют наши рассказы о рифах и морских обитателях Мальдив. Читайте практический гид по атоллу Даалу и изучайте отдельные дайв-сайты.':'These underwater videos complement our first-hand guides to Dhaalu Atoll. Learn about reef conditions, overhangs and marine life before exploring individual dive sites.'}</p><div className='mt-4 flex flex-wrap gap-4'><Link className='font-semibold text-cyan-200 underline underline-offset-4 hover:text-white' href={`${ru?'/ru':''}/blog/diving-in-dhaalu-atoll`}>{ru?'Гид по дайвингу на атолле Даалу':'Read the Dhaalu Atoll diving guide'}</Link><Link className='font-semibold text-cyan-200 underline underline-offset-4 hover:text-white' href={`${ru?'/ru':''}/destinations/maldives/wella-giri`}>Wella Giri</Link><Link className='font-semibold text-cyan-200 underline underline-offset-4 hover:text-white' href={`${ru?'/ru':''}/destinations/maldives/lhohi-caves`}>Lhohi Caves</Link></div></div>}
 </section>
}
