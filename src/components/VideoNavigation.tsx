'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { videoRegionName } from '@/lib/data/videoLibrary'
import type { PublishedVideo } from '@/lib/publishedVideos'
export default function VideoNavigation({video,ru,videos}:{video:PublishedVideo;ru:boolean;videos:PublishedVideo[]}){
 const router=useRouter()
 const base=(ru?'/ru':'')+'/videos/'
 const [region,setRegion]=useState<string>(video.region)
 const regions=Array.from(new Set(videos.map(v=>v.region)))
 const options=videos.filter(v=>v.region===region)
 const index=videos.findIndex(v=>v.id===video.id)
 const prev=videos[(index+videos.length-1)%videos.length]
 const next=videos[(index+1)%videos.length]
 const selectClass='mt-2 min-h-12 w-full rounded-xl border border-cyan-200/30 bg-[#062536] px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200'
 return <nav aria-label={ru?'Навигация по видео':'Video navigation'} className='my-6 rounded-2xl border border-white/15 bg-white/5 p-4 md:p-6'>
 <div className='grid grid-cols-2 gap-3'>
 {([[prev,ru?'Предыдущее видео':'Previous video','←'],[next,ru?'Следующее видео':'Next video','→']] as const).map(([item,label,arrow],i)=>{const v=item;return <Link key={i} href={base+v.slug} className={'min-w-0 rounded-xl border border-white/20 p-3 hover:bg-white/10 '+(i?'text-right':'')}><span className='block text-sm font-bold text-cyan-200'>{i?label+' '+arrow:arrow+' '+label}</span><span className='mt-1 block break-words text-sm'>{ru?(v.titleRu||v.title):v.title}</span></Link>})}
 </div>
 <p className='mt-3 text-center text-xs text-slate-300'>{index+1} / {videos.length}</p>
 <div className='mt-5 grid gap-4 md:grid-cols-[1fr_2fr]'>
 <label className='min-w-0 text-sm font-semibold'>{ru?'Выберите направление':'Select destination'}<select className={selectClass} value={region} onChange={e=>setRegion(e.target.value)}>{regions.map(r=><option key={r} value={r}>{videoRegionName(r,ru)}</option>)}</select></label>
 <label className='min-w-0 text-sm font-semibold'>{ru?'Выберите видео':'Select video'}<select className={selectClass} value={region===video.region?video.slug:''} onChange={e=>{if(e.target.value)router.push(base+e.target.value)}}><option value='' disabled>{ru?'Выберите видео':'Choose a video'}</option>{options.map(v=><option key={v.id} value={v.slug}>{ru?(v.titleRu||v.title):v.title}</option>)}</select></label>
 </div></nav>
}
