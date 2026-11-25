import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import AdminWorkspace from '@/components/AdminWorkspace'

export const metadata = { title: 'Dashboard', robots: { index: false, follow: false } }

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in?redirect_url=%2Fdashboard')
  const user = await currentUser()
  const name = user?.firstName || user?.username || 'Explorer'
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const isAdmin = !!adminEmail && !!user?.emailAddresses.some(e => e.emailAddress.toLowerCase() === adminEmail)

  return <main className='min-h-[65vh] bg-[#031b2d] px-5 py-16 text-white'>
    <div className='mx-auto max-w-6xl'>
      <div className='mb-8 flex items-center justify-between gap-4'>
        <div><p className='mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-300'>LokaWndr</p><h1 className='text-3xl font-bold'>{isAdmin ? 'Admin dashboard' : 'Dashboard'}</h1></div>
        <UserButton />
      </div>
      <p className='text-slate-200'>Welcome, {name}. {isAdmin ? 'Manage bookings and content drafts below.' : 'You are signed in to your LokaWndr account.'}</p>
      {isAdmin ? <AdminWorkspace /> : <div className='mt-8 rounded-2xl border border-cyan-200/20 bg-white/5 p-6'><h2 className='mb-2 text-xl font-semibold'>Your account</h2><p className='mb-5 text-slate-300'>Manage your profile using the account menu above, or return to exploring.</p><Link className='inline-flex rounded-lg bg-cyan-100 px-5 py-3 font-semibold text-[#062536]' href='/activities'>Explore activities</Link></div>}
    </div>
  </main>
}
