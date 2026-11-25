'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type Booking = { _id: string; project: string; name: string; email: string; phone?: string; course?: string; site?: string; date: string; time: string; status: string; createdAt?: string }
export default function AdminBookings() {
  const [rows, setRows] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [bulkEdit, setBulkEdit] = useState(false)
  const [bulkForm, setBulkForm] = useState({ date: '', time: '', status: '' })
  const [editing, setEditing] = useState<Booking | null>(null)
  const [form, setForm] = useState({ date: '', time: '', status: 'pending' })
  const load = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/dashboard/projects', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to load bookings')
      setRows(data)
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to load bookings') }
    finally { setLoading(false) }
  }, [])
  // Initial loading state and the fetch must start together on mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load() }, [load])
  const visible = useMemo(() => rows.filter(b => (filter === 'all' || b.status === filter) && [b.name, b.email, b.course, b.site, b.project].join(' ').toLowerCase().includes(search.toLowerCase())), [rows, filter, search])
  const keyOf = (b: Booking) => b.project + ':' + b._id
  const chosen = visible.filter(b => selected.includes(keyOf(b)))
  async function bulk(action: 'approved' | 'cancelled' | 'delete' | 'edit') {
    if (!chosen.length || busy) return
    if (action === 'edit' && !bulkForm.date && !bulkForm.time && !bulkForm.status) return
    if (!window.confirm(action + ' ' + chosen.length + ' selected bookings? Guests may receive notifications.')) return
    setBusy(true); setError(''); setMessage('')
    let saved = 0, warnings = 0
    const failed: string[] = []
    for (const b of chosen) {
      try {
        const updates = action === 'delete' ? {} : { date: action === 'edit' ? bulkForm.date || b.date : b.date, time: action === 'edit' ? bulkForm.time || b.time : b.time, status: action === 'edit' ? bulkForm.status || b.status || 'pending' : action }
        const res = await fetch('/api/dashboard/projects', { method: action === 'delete' ? 'DELETE' : 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ project: b.project, id: b._id, ...updates }) })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Operation failed')
        saved++
        if (data.notifications && (!data.notifications.customer || !data.notifications.admin)) warnings++
      } catch (err) { failed.push(keyOf(b)); setError(e => e + (e ? '\\n' : '') + b.name + ': ' + (err instanceof Error ? err.message : 'Operation failed')) }
    }
    setSelected(failed); setBulkEdit(false); setMessage(saved + ' processed; ' + failed.length + ' failed; ' + warnings + ' notification warnings.')
    await load(); setBusy(false)
  }
  async function mutate(method: 'PATCH' | 'DELETE', booking: Booking, updates?: typeof form) {
    setBusy(true); setError(''); setMessage('')
    try {
      const res = await fetch('/api/dashboard/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ project: booking.project, id: booking._id, ...updates }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Operation failed')
      const sent = data.notifications
      setMessage(data.unchanged ? 'No changes were needed.' : sent && (!sent.customer || !sent.admin) ? 'Booking saved, but one or more emails could not be sent. Check your Resend configuration and contact the recipient manually.' : 'Booking saved. Notifications sent to customer and admin.')
      setEditing(null)
      await load()
    } catch (err) { setError(err instanceof Error ? err.message : 'Operation failed') }
    finally { setBusy(false) }
  }
  function openEdit(b: Booking) { setEditing(b); setForm({ date: b.date, time: b.time, status: b.status || 'pending' }) }
  const inputClass = 'w-full rounded-lg border border-white/20 bg-[#0b3045] p-3 text-white'
  return <section className='mt-10'>
    <div className='mb-5 flex flex-wrap items-center justify-between gap-4'><div><h2 className='text-2xl font-bold'>Bookings</h2><p className='text-sm text-slate-300'>{rows.length} active booking requests · scuba courses, freediving and dive trips</p></div><button onClick={() => void load()} disabled={busy || loading} className='rounded-lg border border-cyan-200/40 px-4 py-2 text-sm hover:bg-white/10'>Refresh</button></div>
    <div className='mb-5 grid gap-3 sm:grid-cols-2'><input aria-label='Search bookings' className={inputClass} placeholder='Search guest, email or activity' value={search} onChange={e => setSearch(e.target.value)} /><select aria-label='Filter booking status' className={inputClass} value={filter} onChange={e => setFilter(e.target.value)}><option value='all'>All statuses</option><option value='pending'>Pending</option><option value='approved'>Confirmed</option><option value='cancelled'>Cancelled</option></select></div>
    {error && <p role='alert' className='mb-4 rounded-lg bg-red-950 p-3 text-red-200'>{error}</p>}
    {message && <p role='status' className='mb-4 rounded-lg bg-cyan-950 p-3 text-cyan-100'>{message}</p>}
    <div className='mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-white/15 p-3'>
      <span className='mr-2 text-sm'>{chosen.length} selected</span>
      {(['approved','cancelled','delete'] as const).map((action,i)=><button key={action} disabled={busy || !chosen.length} onClick={()=>void bulk(action)} className='rounded-lg border border-cyan-200/40 px-3 py-2 disabled:opacity-40'>{['Confirm selected','Cancel selected','Delete selected'][i]}</button>)}
      <button disabled={busy || !chosen.length} onClick={()=>{setBulkForm({date:'',time:'',status:''});setBulkEdit(v=>!v)}} className='rounded-lg border border-cyan-200/40 px-3 py-2 disabled:opacity-40'>Edit selected</button>
      <button disabled={busy} onClick={()=>setSelected([])} className='px-3 py-2 text-sm'>Clear selection</button>
    </div>
    {bulkEdit && <form className='mb-4 grid gap-3 rounded-xl border border-white/20 p-4 sm:grid-cols-3' onSubmit={e=>{e.preventDefault();void bulk('edit')}}>
      <p className='sm:col-span-3 text-sm'>Leave fields blank to keep existing values.</p>
      <label>Date<input type='date' className={inputClass} value={bulkForm.date} onChange={e=>setBulkForm({...bulkForm,date:e.target.value})}/></label>
      <label>Time<input type='time' className={inputClass} value={bulkForm.time} onChange={e=>setBulkForm({...bulkForm,time:e.target.value})}/></label>
      <label>Status<select className={inputClass} value={bulkForm.status} onChange={e=>setBulkForm({...bulkForm,status:e.target.value})}><option value=''>Keep unchanged</option><option value='pending'>Pending</option><option value='approved'>Confirmed</option><option value='cancelled'>Cancelled</option></select></label>
      <button disabled={busy || !chosen.length} className='rounded-lg bg-cyan-100 p-3 text-[#062536]'>Apply changes</button>
    </form>}
    {loading ? <p>Loading bookings…</p> : visible.length === 0 ? <p className='rounded-xl border border-white/15 p-6 text-slate-300'>No bookings match your filters.</p> :
    <div className='overflow-x-auto rounded-xl border border-white/15'><table className='w-full min-w-[900px] text-left text-sm'><thead className='bg-white/10'><tr><th className='p-4'><input type='checkbox' aria-label='Select all visible bookings' disabled={busy} checked={visible.length>0 && chosen.length===visible.length} onChange={e=>setSelected(e.target.checked?visible.map(keyOf):[])}/></th>{['Activity','Guest','Date','Time','Status','Actions'].map(h => <th key={h} className='p-4'>{h}</th>)}</tr></thead><tbody>{visible.map(b => <tr key={b.project + b._id} className='border-t border-white/10'><td className='p-4'><input type='checkbox' aria-label={'Select booking for '+b.name} disabled={busy} checked={selected.includes(keyOf(b))} onChange={e=>setSelected(s=>e.target.checked?[...s,keyOf(b)]:s.filter(k=>k!==keyOf(b)))}/></td><td className='p-4'><strong className='block'>{b.course || b.site || b.project}</strong><span className='text-xs text-slate-400'>{b.project}</span></td><td className='p-4'><strong className='block'>{b.name}</strong><a className='text-cyan-200 underline' href={'mailto:' + b.email}>{b.email}</a></td><td className='p-4'>{b.date}</td><td className='p-4'>{b.time}</td><td className='p-4 capitalize'>{b.status || 'pending'}</td><td className='p-4'><div className='flex flex-wrap gap-2'><button disabled={busy || b.status === 'approved'} className='rounded-lg bg-emerald-700 px-3 py-2 disabled:opacity-40' onClick={() => void mutate('PATCH', b, { date: b.date, time: b.time, status: 'approved' })}>Confirm</button><button disabled={busy} className='rounded-lg bg-sky-700 px-3 py-2 disabled:opacity-40' onClick={() => openEdit(b)}>Edit</button><button disabled={busy || b.status === 'cancelled'} className='rounded-lg bg-amber-700 px-3 py-2 disabled:opacity-40' onClick={() => { if (window.confirm('Cancel this booking and notify the guest?')) void mutate('PATCH', b, { date: b.date, time: b.time, status: 'cancelled' }) }}>Cancel</button><button disabled={busy} className='rounded-lg border border-red-400 px-3 py-2 text-red-200 disabled:opacity-40' onClick={() => { if (window.confirm('Remove this booking from the active list and notify the guest?')) void mutate('DELETE', b) }}>Delete</button></div></td></tr>)}</tbody></table></div>}
    {editing && <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4' role='dialog' aria-modal='true' aria-label='Edit booking'><form className='w-full max-w-md space-y-4 rounded-2xl border border-cyan-200/20 bg-[#05283e] p-6' onSubmit={e => { e.preventDefault(); void mutate('PATCH', editing, form) }}><h3 className='text-xl font-bold'>Edit booking — {editing.name}</h3><label className='block'>Date<input required type='date' className={inputClass} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}/></label><label className='block'>Time<input required type='time' className={inputClass} value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}/></label><label className='block'>Status<select className={inputClass} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option value='pending'>Pending</option><option value='approved'>Confirmed</option><option value='cancelled'>Cancelled</option></select></label><div className='flex justify-end gap-3'><button type='button' disabled={busy} className='rounded-lg border border-white/30 px-4 py-2' onClick={() => setEditing(null)}>Close</button><button disabled={busy} className='rounded-lg bg-cyan-100 px-4 py-2 font-semibold text-[#062536]' type='submit'>{busy ? 'Saving…' : 'Save changes'}</button></div></form></div>}
  </section>
}
