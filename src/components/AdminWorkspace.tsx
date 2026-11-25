'use client'
import { useState } from 'react'
import AdminBookings from '@/components/AdminBookings'

const sections = [['bookings','Bookings'],['country','Countries'],['destination','Destinations'],['dive-site','Dive sites'],['activity','Activities'],['dive-trip','Dive trips'],['blog','Blog posts'],['video','YouTube videos']] as const
type Kind = typeof sections[number][0]
type Draft = Record<string,string>
const common = ['titleEn','titleRu','slug','bodyEn','bodyRu','mediaUrl','seoEn','seoRu']
const extras: Record<string,string[]> = {country:['latitude','longitude'],destination:['country','latitude','longitude'], 'dive-site':['country','destination','depth','depthRu','current','currentRu','visibility','visibilityRu','boat','boatRu'],activity:[], 'dive-trip':['country','destination','activity','price','currency','capacity','dates','itinerary'],blog:['activity','country','destination'],video:['youtubeUrl','activity','country','destination']}
const labels: Record<string,string> = {titleEn:'English title',titleRu:'Russian title',bodyEn:'English description / article',bodyRu:'Russian description / article',slug:'URL slug',mediaUrl:'Cover image URL',seoEn:'English SEO description',seoRu:'Russian SEO description',youtubeUrl:'YouTube URL'}
const diveGroups = [
 {title:'General information',fields:['titleEn','titleRu','country','destination','bodyEn','bodyRu']},
 {title:'Diving conditions',fields:['depth','depthRu','current','currentRu','visibility','visibilityRu','boat','boatRu']},
 {title:'SEO settings',fields:['slug','seoEn','seoRu']}
]
const diveLabels: Record<string,string> = {depth:'Chart depth (EN)',depthRu:'Chart depth (RU)',current:'Current (EN)',currentRu:'Current (RU)',visibility:'Visibility (EN)',visibilityRu:'Visibility (RU)',boat:'Boat journey (optional, EN)',boatRu:'Boat journey (optional, RU)',country:'Country',destination:'Destination'}
const input = 'w-full rounded-lg border border-white/20 bg-[#0b3045] p-3 text-white'
export default function AdminWorkspace() {
 const [section,setSection] = useState<Kind>('bookings')
 const [rows,setRows] = useState<Draft[]>([])
 const [form,setForm] = useState<Draft|null>(null)
 const [busy,setBusy] = useState(false)
 const [notice,setNotice] = useState('')
 async function load() {
  setBusy(true)
  try {const r=await fetch('/api/dashboard/content',{cache:'no-store'}); if(!r.ok) throw Error('Unable to load drafts');setRows(await r.json())}
  catch(e){setNotice(e instanceof Error?e.message:'Unable to load drafts')}
  finally{setBusy(false)}
 }
 async function save(remove=false) {
  if(!form || busy) return
  if(remove && !window.confirm('Delete this draft?')) return
  setBusy(true);setNotice('')
  try {
   const r=await fetch('/api/dashboard/content',{method:remove?'DELETE':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,kind:section,id:form._id})})
   const data=await r.json();if(!r.ok)throw Error(data.error||'Unable to save')
   setForm(null);setNotice(remove?'Draft deleted':'Draft saved');await load()
  }catch(e){setNotice(e instanceof Error?e.message:'Operation failed')}
  finally{setBusy(false)}
 }
 function change(key:string,value:string) {
  if(!form)return
  const next={...form,[key]:value}
  if(key==='titleEn' && !form._id && (!form.slug || form.slug===slugify(form.titleEn||''))) next.slug=slugify(value)
  setForm(next)
 }
 function slugify(value:string){return value.toLowerCase().normalize('NFKD').replace(/[\\u0300-\\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
 function field(key:string) {return <label key={key} className={'block text-sm '+(/body|itinerary/.test(key)?'sm:col-span-2':'')}>{diveLabels[key]||labels[key]||key}{/body|itinerary/.test(key)?<textarea rows={6} className={input} value={form?.[key]||''} onChange={e=>change(key,e.target.value)}/>:<input required={key==='titleEn'||key==='slug'} className={input} value={form?.[key]||''} onChange={e=>change(key,e.target.value)}/>}</label>}
 const gallery=(form?.gallery||form?.mediaUrl||'').split('\n').filter(Boolean)
 function updateGallery(items:string[],cover?:string){if(form)setForm({...form,gallery:items.join('\n'),mediaUrl:cover??(items.includes(form.mediaUrl)?form.mediaUrl:items[0]||'')})}
 return <div className='mt-8 grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]'>
 <nav aria-label='Admin sections' className='flex flex-wrap gap-2 self-start rounded-xl border border-white/15 p-3 lg:flex-col'>
 {sections.map(([id,label])=><button key={id} disabled={busy} aria-current={section===id?'page':undefined} className={'rounded-lg px-4 py-3 text-left text-sm '+(section===id?'bg-cyan-100 font-semibold text-[#062536]':'hover:bg-white/10')} onClick={()=>{if(form&&!window.confirm('Discard unsaved editor changes?'))return;setSection(id);setForm(null);setNotice('');if(id!=='bookings')void load()}}>{label}</button>)}
 </nav>
 <div className='min-w-0'>
 {section==='bookings'?<AdminBookings/>:<section className='space-y-4'>
 <div className='flex flex-wrap items-center justify-between gap-3'><h2 className='text-2xl font-bold'>{sections.find(s=>s[0]===section)?.[1]}</h2><button disabled={busy||!!form} onClick={()=>setForm({})} className='rounded-lg bg-cyan-100 px-4 py-2 font-semibold text-[#062536]'>New draft</button></div>
 <p className='rounded-lg border border-cyan-200/30 p-3 text-sm text-cyan-100'>Draft workspace: saving here does not publish or change existing public pages.</p>
 {notice&&<p role='status' className='rounded-lg bg-white/10 p-3'>{notice}</p>}
 {form?<form className='grid gap-4 rounded-xl border border-white/15 p-4 sm:grid-cols-2' onSubmit={e=>{e.preventDefault();void save()}}>
 {section==='dive-site'?<>
 {diveGroups.slice(0,2).map(group=><fieldset key={group.title} className='grid gap-4 rounded-xl border border-white/15 p-4 sm:col-span-2 sm:grid-cols-2'><legend className='px-2 font-semibold'>{group.title}</legend>{group.fields.map(field)}</fieldset>)}
 <fieldset className='space-y-3 rounded-xl border border-white/15 p-4 sm:col-span-2'><legend className='px-2 font-semibold'>Photo gallery</legend>
 <p className='text-sm text-slate-300'>Add existing image URLs or local website image paths. Select a cover and arrange the gallery. Direct file uploads are not enabled yet.</p>
 {gallery.map((url,i)=><div key={i} className='flex flex-wrap items-center gap-2 rounded-lg border border-white/15 p-2'><input aria-label={'Photo '+(i+1)+' URL'} className={input} value={url} onChange={e=>{const items=[...gallery];items[i]=e.target.value;updateGallery(items,form.mediaUrl===url?e.target.value:undefined)}}/><button type='button' onClick={()=>updateGallery(gallery,url)} className='rounded border border-white/30 px-2 py-1'>{(form.mediaUrl||gallery[0])===url?'Cover selected':'Set cover'}</button><button type='button' disabled={i===0} onClick={()=>{const a=[...gallery];[a[i-1],a[i]]=[a[i],a[i-1]];updateGallery(a)}}>Move up</button><button type='button' disabled={i===gallery.length-1} onClick={()=>{const a=[...gallery];[a[i+1],a[i]]=[a[i],a[i+1]];updateGallery(a)}}>Move down</button><button type='button' onClick={()=>updateGallery(gallery.filter((_,j)=>i!==j))} className='text-red-200'>Remove</button></div>)}
 <label className='block text-sm'>Add photo URL<input className={input} placeholder='https://… or /images/…' value={form.newPhoto||''} onChange={e=>change('newPhoto',e.target.value)}/></label>
 <button type='button' disabled={!form.newPhoto?.trim()} className='rounded-lg border border-white/30 px-4 py-2' onClick={()=>{const a=[...gallery,form.newPhoto.trim()];setForm({...form,newPhoto:'',gallery:a.join('\n'),mediaUrl:form.mediaUrl||a[0]})}}>Add photo</button>
 </fieldset>
 {diveGroups.slice(2).map(group=><fieldset key={group.title} className='grid gap-4 rounded-xl border border-white/15 p-4 sm:col-span-2 sm:grid-cols-2'><legend className='px-2 font-semibold'>{group.title}</legend>{group.fields.map(field)}</fieldset>)}
 </>: [...common,...(extras[section]||[])].map(field)}

 <div className='flex flex-wrap gap-2 sm:col-span-2'><button disabled={busy} className='rounded-lg bg-cyan-100 px-4 py-2 font-semibold text-[#062536]'>Save draft</button><button type='button' disabled={busy} onClick={()=>setForm(null)} className='rounded-lg border border-white/30 px-4 py-2'>Close</button>{form._id&&<button type='button' disabled={busy} onClick={()=>void save(true)} className='rounded-lg border border-red-400 px-4 py-2 text-red-200'>Delete draft</button>}</div>
 </form>:<div className='space-y-2'>{busy?<p>Loading…</p>:rows.filter(r=>r.kind===section).length===0?<p>No drafts yet.</p>:rows.filter(r=>r.kind===section).map(r=><button key={r._id} onClick={()=>setForm(r)} className='block w-full rounded-xl border border-white/15 p-4 text-left hover:bg-white/10'><strong>{r.titleEn}</strong><span className='ml-3 text-sm text-slate-300'>{r.slug} · Draft</span></button>)}</div>}
 </section>}
 </div></div>
}
