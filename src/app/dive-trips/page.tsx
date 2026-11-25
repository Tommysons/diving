import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { diveTrip } from '@/lib/data/diveTrip'

export const metadata = {title:'Maldives Group Dive Trips | LokaWndr',description:'7 nights and 14 dives in Mahibadhoo, South Ari Atoll, Maldives. Groups of 12–22 divers only. Explore certified-diver group packages with Scuba Therapy Maldives.'}

export default function DiveTripsPage({params}:{params?:never}) {
 return <><Header/><main className="min-h-screen bg-[#061725] text-white">
 <section className="relative isolate flex min-h-[65vh] items-center overflow-hidden px-6 py-24 md:px-12">
 <Image src="/images/hero-about.webp" alt="Maldives underwater adventure" fill priority className="object-cover" sizes="100vw"/>
 <div className="absolute inset-0 bg-gradient-to-r from-[#031522] via-[#031522]/90 to-[#031522]/55"/>
 <div className="relative mx-auto w-full max-w-6xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-cyan-200">Maldives · South Ari Atoll · Mahibadhoo Island</p><h1 className="my-5 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">Your next underwater <span className="text-cyan-200">adventure.</span></h1><p className="max-w-xl text-lg text-white">7 nights. 14 dives. Island living and unforgettable diving with Scuba Therapy Maldives. Group bookings only: 12–22 divers.</p><Link href="/dive-trips/maldives-mahibadhoo" className="mt-8 inline-block rounded-lg bg-cyan-200 px-6 py-3 font-bold text-[#052331] hover:bg-white">Explore the package</Link></div>
 </section>
 <section className="mx-auto grid max-w-6xl gap-5 px-6 py-16 md:grid-cols-2"><div className="rounded-2xl border border-cyan-200/25 bg-[#103246] p-7"><h2 className="text-2xl font-bold text-white">Maldives Group Diving Holiday</h2><p className="mt-3 text-slate-100">Groups of 12–22 certified divers · Full board · Dhoni diving · Airport speedboat transfers</p><p className="mt-5 text-3xl font-extrabold text-white">From $1,725 <span className="text-sm font-normal text-slate-200">per person</span></p><Link href="/dive-trips/maldives-mahibadhoo" className="mt-5 inline-block rounded-lg border border-cyan-200 px-5 py-3 font-semibold text-white hover:bg-white/10">View trip details →</Link></div></section>
 </main><Footer/></>
}
