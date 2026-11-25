import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export const metadata={title:'Дайвинг-туры на Мальдивах | LokaWndr'}
export default function Page(){return <><Header/><main className="min-h-[65vh] bg-[#061725] px-6 py-24 text-white"><div className="mx-auto max-w-5xl"><h1 className="text-4xl font-extrabold">Дайвинг-туры на Мальдивах</h1><p className="my-6 text-lg text-slate-100">7 ночей, 14 погружений, полный пансион. Остров Махибадху, Южный Ари атолл. Только для групп от 12 до 22 сертифицированных дайверов.</p><Link className="inline-block rounded-lg bg-cyan-200 px-6 py-3 font-bold text-[#052331]" href="/ru/dive-trips/maldives-mahibadhoo">Посмотреть программу — от $1,725</Link></div></main><Footer/></>}
