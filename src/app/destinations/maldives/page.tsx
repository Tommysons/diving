import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Maldives Diving & Snorkeling | LokaWndr',
  description: 'Explore Maldives reefs, snorkeling, manta rays and ocean stories with LokaWndr.',
}

export default function DestinationPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-[#061c2a] text-white'>
        <section className='relative isolate flex min-h-[55vh] items-end overflow-hidden'>
          <Image src='/images/hero-about-a.webp' alt='Maldives underwater adventure' fill priority sizes='100vw' className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-[#061c2a] via-[#061c2a]/50 to-transparent' />
          <div className='relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28'>
            <p className='text-sm font-semibold tracking-[0.25em] text-cyan-200'>LOKAWNDR · CHAPTER 02</p>
            <h1 className='mt-4 text-5xl font-extrabold md:text-7xl'>Maldives</h1>
            <p className='mt-5 max-w-2xl text-xl text-slate-100'>A new ocean adventure: reefs, manta rays, whale sharks, diving and snorkeling.</p>
          </div>
        </section>
        <section className='mx-auto max-w-6xl px-6 py-16'>
          <h2 className='text-3xl font-bold'>Discover the Maldives underwater</h2>
          <p className='mt-5 max-w-3xl leading-8 text-slate-300'>Follow real ocean encounters, underwater footage and stories from the Maldives. More destination guides and verified experiences are coming as LokaWndr grows.</p>
          <div className='mt-8 flex flex-wrap gap-4'>
            <Link href='/blog' className='rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'>Read Ocean Stories</Link>
            <Link href='/contact' className='rounded-xl border border-white/60 px-6 py-3 font-bold'>Contact LokaWndr</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
