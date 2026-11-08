import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SnorkelMaskIcon } from '@/components/ActivityIcons'

export default function SnorkelingExperience({locale}:{locale:'en'|'ru'}) {
 const ru=locale==='ru',base=ru?'/ru':''
 const cards=ru?[
  {title:'Уроки снорклинга',body:'Никогда не занимались снорклингом? Научитесь пользоваться маской, трубкой и ластами и почувствуйте себя увереннее в воде.'},
  {title:'Экскурсии к мантам и китовым акулам',body:'Отправляйтесь на встречу с удивительными обитателями океана. Встречи с дикими животными зависят от условий и не гарантированы.'},
  {title:'Ночной снорклинг с синим светом',body:'Откройте для себя ночной риф во время снорклинга с синим светом. Подробности и доступность уточняйте заранее.'},
 ]:[
  {title:'Snorkeling lessons',body:'New to snorkeling? Learn to use a mask, snorkel and fins and build confidence in the water.'},
  {title:'Manta ray & whale shark excursions',body:'Join an ocean excursion in search of remarkable marine life. Wildlife encounters depend on conditions and are never guaranteed.'},
  {title:'Night snorkeling with blue light',body:'Discover the reef after dark on a blue-light snorkeling experience. Contact us for details and availability.'},
 ]
 return <><Header/><main className='min-h-screen bg-[#06283a] text-white'><div className='mx-auto max-w-[1480px] px-5 py-14 sm:px-6 md:px-10 md:py-20'><p className='text-xs font-bold tracking-[.2em] text-cyan-200'>LOKAWNDR · {ru?'СНОРКЛИНГ':'SNORKELING'}</p><div className='mt-4 text-cyan-200'><SnorkelMaskIcon/></div><h1 className='mt-4 text-4xl font-extrabold tracking-tight md:text-6xl'>{ru?'Откройте океан со снорклингом':'Discover the Ocean Snorkeling'}</h1><p className='mt-5 max-w-3xl text-lg leading-8 text-slate-200'>{ru?'От первого вдоха через трубку до незабываемых встреч с морскими обитателями — найдите своё приключение вместе с LokaWndr.':'From your first breath through a snorkel to unforgettable marine encounters, find your next ocean experience with LokaWndr.'}</p><div className='mt-10 grid gap-5 md:grid-cols-3'>{cards.map(card=><article key={card.title} className='rounded-2xl border border-white/15 bg-white/[.06] p-7'><h2 className='text-2xl font-bold'>{card.title}</h2><p className='mt-4 leading-7 text-slate-200'>{card.body}</p></article>)}</div><div className='mt-10 rounded-2xl border border-cyan-200/20 bg-[#0a3c50] p-7 md:p-10'><h2 className='text-2xl font-bold'>{ru?'Готовы узнать больше?':'Ready to explore?'}</h2><p className='mt-3 max-w-2xl leading-7 text-slate-200'>{ru?'Напишите нам, чтобы узнать о месте проведения, условиях и доступности.':'Contact us for locations, conditions and availability.'}</p><Link href={base+'/contact'} className='mt-6 inline-flex min-h-11 items-center rounded-xl bg-cyan-100 px-5 py-3 font-bold text-[#062536]'>{ru?'Связаться':'Contact us'}</Link></div></div></main><Footer/></>
}
