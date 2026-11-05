import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Thailand Diving & Snorkeling | LokaWndr',
  description: 'Discover Koh Tao dive sites, scuba diving courses and ocean stories with LokaWndr.',
}

export default function DestinationPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-[#061c2a] text-white'>
        <section className='relative isolate flex min-h-[55vh] items-end overflow-hidden'>
          <Image src='/images/cpn6a.webp' alt='Thailand ocean adventure' fill priority sizes='100vw' className='object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-[#061c2a] via-[#061c2a]/50 to-transparent' />
          <div className='relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28'>
            <p className='text-sm font-semibold tracking-[0.25em] text-cyan-200'>LOKAWNDR · CHAPTER 01</p>
            <h1 className='mt-4 text-5xl font-extrabold md:text-7xl'>Thailand</h1>
            <p className='mt-5 max-w-2xl text-xl text-slate-100'>Koh Tao: island life, dive sites and the underwater experiences that shaped LokaWndr.</p>
          </div>
        </section>
        <section className='mx-auto max-w-6xl px-6 py-16'>
          <h2 className='text-3xl font-bold'>Explore diving in Koh Tao</h2>
          <p className='mt-5 max-w-3xl leading-8 text-slate-300'>Explore our existing Koh Tao dive-site guides and scuba course information. Contact us to ask about current opportunities; published content does not guarantee instructor availability.</p>
          <div className='mt-8 flex flex-wrap gap-4'>
            <Link href='/divesites' className='rounded-xl bg-white px-6 py-3 font-bold text-[#062536]'>Explore Dive Sites</Link>
            <Link href='/contact' className='rounded-xl border border-white/60 px-6 py-3 font-bold'>Contact LokaWndr</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
