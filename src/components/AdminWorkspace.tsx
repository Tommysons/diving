'use client'
import { useEffect, useState } from 'react'
import { youtubeId, videoSlug, validVideoDuration } from '@/lib/videoCmsValidation'
import AdminBookings from '@/components/AdminBookings'

const sections = [['bookings','Bookings'],['country','Countries'],['destination','Destinations'],['dive-site','Dive sites'],['activity','Activities'],['dive-trip','Dive trips'],['blog','Blog posts'],['video','YouTube videos']] as const
type Kind = typeof sections[number][0]
type Draft = Record<string,string>
const common = ['titleEn','titleRu','slug','bodyEn','bodyRu','mediaUrl','seoEn','seoRu']
const extras: Record<string,string[]> = {country:['latitude','longitude'],destination:['country','latitude','longitude'], 'dive-site':['country','destination','depth','depthRu','current','currentRu','visibility','visibilityRu','boat','boatRu'],activity:[], 'dive-trip':['country','destination','activity','price','currency','capacity','dates','itinerary'],blog:['activity','country','destination','excerptEn','excerptRu','articleDate','tagsEn','tagsRu'],video:['youtubeUrl','activity','country','destination','thumbnailUrl','uploadDate','duration']}
const labels: Record<string,string> = {titleEn:'English title',titleRu:'Russian title',bodyEn:'English description / article',bodyRu:'Russian description / article',slug:'URL slug',mediaUrl:'Cover image URL',seoEn:'English SEO description',seoRu:'Russian SEO description',youtubeUrl:'YouTube URL'}
const diveGroups = [
 {title:'General information',fields:['titleEn','titleRu','country','destination','bodyEn','bodyRu']},
 {title:'Diving conditions',fields:['depth','depthRu','current','currentRu','visibility','visibilityRu','boat','boatRu']},
 {title:'SEO settings',fields:['slug','seoEn','seoRu']}
]
const diveLabels: Record<string,string> = {depth:'Chart depth (EN)',depthRu:'Chart depth (RU)',current:'Current (EN)',currentRu:'Current (RU)',visibility:'Visibility (EN)',visibilityRu:'Visibility (RU)',boat:'Boat journey (optional, EN)',boatRu:'Boat journey (optional, RU)',country:'Country',destination:'Destination'}
const tripGroups = [
 {title:'Trip overview',fields:['titleEn','titleRu','country','destination','bodyEn','bodyRu','nights','dives','capacity','dates']},
 {title:'Accommodation',fields:['stayType','stayName','stayLocation','stayEn','stayRu','rooms','mealsEn','mealsRu']},
 {title:'Package and pricing',fields:['currency','doublePrice','singlePrice','price','inclusionsEn','inclusionsRu','extrasEn','extrasRu','itinerary','itineraryRu','faqEn','faqRu']},
 {title:'SEO settings',fields:['slug','seoEn','seoRu']}
]
const tripLabels: Record<string,string> = {excerptEn:'Article excerpt (EN)',excerptRu:'Article excerpt (RU)',articleDate:'Article date',tagsEn:'Tags (EN, comma separated)',tagsRu:'Tags (RU, comma separated)',thumbnailUrl:'Custom thumbnail URL (optional)',stayType:'Accommodation type',stayName:'Property or boat name',stayLocation:'Island / town / departure port',stayEn:'Accommodation description (EN)',stayRu:'Accommodation description (RU)',rooms:'Rooms or cabins',nights:'Nights',dives:'Included dives',capacity:'Maximum guests',dates:'Travel dates / season',mealsEn:'Meal plan (EN)',mealsRu:'Meal plan (RU)',doublePrice:'Double / twin sharing price per person',singlePrice:'Single occupancy price per person',price:'Other / starting price per person',currency:'Currency (e.g. USD)',inclusionsEn:'Package inclusions (EN)',inclusionsRu:'Package inclusions (RU)',extrasEn:'Optional extras and rental prices (EN)',extrasRu:'Optional extras and rental prices (RU)',itinerary:'Itinerary (EN)',itineraryRu:'Itinerary (RU)',faqEn:'Frequently asked questions (EN)',faqRu:'Frequently asked questions (RU)',videoGallery:'Dive video URLs (one per line)'}
const longField = /body|itinerary|^stay(En|Ru)$|inclusions|extras|faq|videoGallery/
const input = 'w-full rounded-lg border border-white/20 bg-[#0b3045] p-3 text-white'
export default function AdminWorkspace() {
 const [section,setSection] = useState<Kind>('bookings')
 const [liveVideos,setLiveVideos]=useState<Draft[]|null>(null)
 const [rows,setRows] = useState<Draft[]>([])
 const [form,setForm] = useState<Draft|null>(null)
 const [busy,setBusy] = useState(false)
 const [notice,setNotice] = useState('')
 const [search,setSearch] = useState('')
 const [sort,setSort] = useState('recent')
 const [preview,setPreview] = useState(false)
 useEffect(()=>{let active=true;fetch('/api/dashboard/videos',{cache:'no-store'}).then(async r=>{if(!r.ok)throw Error('Video catalog unavailable');const data=await r.json();if(active)setLiveVideos(data)}).catch(()=>{});return()=>{active=false}},[])
 async function load() {
  setBusy(true)
  try {const r=await fetch('/api/dashboard/content',{cache:'no-store'}); if(!r.ok) throw Error('Unable to load drafts');setRows(await r.json());const v=await fetch('/api/dashboard/videos',{cache:'no-store'});if(v.ok)setLiveVideos(await v.json())}
  catch(e){setNotice(e instanceof Error?e.message:'Unable to load drafts')}
  finally{setBusy(false)}
 }
 async function publish(status:'published'|'unpublished') {
 if(!form||busy)return
 const region=(form.country||'ocean').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')
 if(status==='published'){
 const required=[['youtubeUrl','YouTube link'],['titleEn','English title'],['titleRu','Russian title'],['bodyEn','English description'],['bodyRu','Russian description'],['slug','URL slug'],['uploadDate','Upload date'],['duration','Duration']]
 const missing=required.filter(([key])=>!form[key]?.trim()).map(([,label])=>label)
 if(missing.length){setNotice('Complete these fields: '+missing.join(', '));return}
 if(!youtubeId(form.youtubeUrl)){setNotice('Enter a valid YouTube watch link, not a Shorts link.');return}
 if(!validVideoDuration(form.duration)){setNotice('Choose a duration between 1 second and 8 hours.');return}
 if(!Number.isFinite(Date.parse(form.uploadDate))||Date.parse(form.uploadDate)>Date.now()){setNotice('Choose a valid upload date, today or earlier.');return}
 }
 if(!window.confirm(status==='published'?'Publish both language pages?':'Remove this video from public pages?'))return
 setBusy(true);setNotice('')
 try{const r=await fetch('/api/dashboard/videos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(status==='unpublished'?{youtubeId:form.youtubeId,status}:{...form,region,status})});const data=await r.json().catch(()=>null);if(!r.ok||!data?.success)throw Error(data?.error||'Publishing request failed (HTTP '+r.status+'). Please sign in again if your session expired.');setNotice(status==='published'?'Video published successfully':'Video unpublished');await load();setForm(null)}catch(e){setNotice(e instanceof Error?e.message:'Operation failed')}finally{setBusy(false)}
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
  if(key==='titleEn' && !form._id && !form.youtubeId && (!form.slug || form.slug===slugify(form.titleEn||''))) next.slug=slugify(value)
  if(key==='youtubeUrl' && section==='video'){const id=youtubeId(value);if(id)next.thumbnailUrl='https://i.ytimg.com/vi/'+id+'/hqdefault.jpg'}
  setForm(next)
 }
 function slugify(value:string){return videoSlug(value)}
 function field(key:string) {
 if(key==='uploadDate')return <label key={key} className='block text-sm'>Upload date<input type='date' className={input+' [color-scheme:dark]'} max={new Date().toISOString().slice(0,10)} value={(form?.uploadDate||'').slice(0,10)} onChange={e=>change(key,e.target.value)} onClick={e=>{try{e.currentTarget.showPicker?.()}catch{}}}/></label>
 if(key==='duration'){
 const m=/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(form?.duration||'')
 const total=Number(m?.[1]||0)*3600+Number(m?.[2]||0)*60+Number(m?.[3]||0)
 const parts=[Math.floor(total/3600),Math.floor(total/60)%60,total%60]
 return <fieldset key={key} className='space-y-1'><legend className='text-sm'>Video duration</legend><div className='grid grid-cols-3 gap-2'>{['Hours','Minutes','Seconds'].map((label,i)=><label key={label} className='text-xs'>{label}<select className={input} value={parts[i]} onChange={e=>{const next=[...parts];next[i]=Number(e.target.value);change(key,'PT'+next[0]+'H'+next[1]+'M'+next[2]+'S')}}>{Array.from({length:i===0?9:60},(_,n)=><option key={n} value={n}>{String(n).padStart(2,'0')}</option>)}</select></label>)}</div></fieldset>
 }
 return <label key={key} className={'block text-sm '+(longField.test(key)?'sm:col-span-2':'')}>{tripLabels[key]||diveLabels[key]||labels[key]||key}{key==='stayType'?<select className={input} value={form?.[key]||''} onChange={e=>change(key,e.target.value)}><option value=''>Choose accommodation type</option>{[['local-island','Local island'],['resort-island','Resort island'],['mainland','Mainland'],['liveaboard','Liveaboard / safari boat'],['other','Other']].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>:longField.test(key)?<textarea rows={6} className={input} value={form?.[key]||''} onChange={e=>change(key,e.target.value)}/>:<input readOnly={!!form?.youtubeId&&(key==='slug'||key==='youtubeUrl')} required={key==='titleEn'||key==='slug'} className={input} value={form?.[key]||''} onChange={e=>change(key,e.target.value)}/>}</label>}
 const gallery=(form?.gallery||form?.mediaUrl||'').split('\n').filter(Boolean)
 function updateGallery(items:string[],cover?:string){if(form)setForm({...form,gallery:items.join('\n'),mediaUrl:cover??(items.includes(form.mediaUrl)?form.mediaUrl:items[0]||'')})}
 function tripGallery(key:string,coverKey:string,title:string) {
  if(!form)return null
  const items=(form[key]||'').split('\n').filter(Boolean)
  const pending=key+'Pending'
  function update(next:string[],cover?:string){setForm(old=>old?{...old,[key]:next.join('\n'),[coverKey]:cover??(next.includes(old[coverKey])?old[coverKey]:next[0]||'')}:old)}
  return <fieldset className='space-y-3 rounded-xl border border-white/15 p-4 sm:col-span-2'><legend className='px-2 font-semibold'>{title}</legend>
  <p className='text-sm text-slate-300'>Use HTTPS image URLs or existing website image paths.</p>
  <div className='grid gap-3 sm:grid-cols-2'>{items.map((url,i)=><div key={i} className='min-w-0 space-y-2 rounded-lg border border-white/15 p-2'>{(/^https:\/\/[^\s]+$/.test(url)||/^\/(?!\/)[^\s]+$/.test(url))&&<img src={url} alt={title+' '+(i+1)} loading='lazy' referrerPolicy='no-referrer' className='aspect-video w-full rounded object-cover'/>}<p className='break-all text-xs'>{url}</p><div className='flex flex-wrap gap-3 text-sm'><button type='button' onClick={()=>update(items,url)}>{(form[coverKey]||items[0])===url?'Cover selected':'Set cover'}</button><button type='button' disabled={i===0} onClick={()=>{const a=[...items];[a[i-1],a[i]]=[a[i],a[i-1]];update(a)}}>Up</button><button type='button' disabled={i===items.length-1} onClick={()=>{const a=[...items];[a[i+1],a[i]]=[a[i],a[i+1]];update(a)}}>Down</button><button type='button' onClick={()=>update(items.filter((_,j)=>j!==i))} className='text-red-200'>Remove</button></div></div>)}</div>
  <label className='block text-sm'>Add photo URL<input className={input} value={form[pending]||''} onChange={e=>change(pending,e.target.value)}/></label><button type='button' disabled={!form[pending]?.trim()} className='rounded-lg border border-white/30 px-4 py-2' onClick={()=>{const url=form[pending].trim();if(!/^https:\/\/[^\s]+$/.test(url)&&!/^\/(?!\/)[^\s]+$/.test(url)){setNotice('Enter an HTTPS URL or local image path');return}setForm({...form,[pending]:'',[key]:[...items,url].join('\n'),[coverKey]:form[coverKey]||url})}}>Add photo</button></fieldset>
 }
 return <div className='mt-8 grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]'>
 <nav aria-label='Admin sections' className='flex flex-wrap gap-2 self-start rounded-xl border border-white/15 p-3 lg:flex-col'>
 {sections.map(([id,label])=><button key={id} disabled={busy} aria-current={section===id?'page':undefined} className={'rounded-lg px-4 py-3 text-left text-sm '+(section===id?'bg-cyan-100 font-semibold text-[#062536]':'hover:bg-white/10')} onClick={()=>{if(form&&!window.confirm('Discard unsaved editor changes?'))return;setSection(id);setForm(null);setNotice('');setSearch('');setPreview(false);if(id!=='bookings')void load()}}>{label}{id!=='bookings'&&<span className='ml-2 text-xs opacity-70'>{id==='video'?(liveVideos===null?'…':liveVideos.filter(v=>v.status==='published').length):rows.filter(r=>r.kind===id).length}</span>}</button>)}
 </nav>
 <div className='min-w-0'>
 {section==='bookings'?<AdminBookings/>:<section className='space-y-4'>
 <div className='flex flex-wrap items-center justify-between gap-3'><h2 className='text-2xl font-bold'>{sections.find(s=>s[0]===section)?.[1]}</h2><button disabled={busy||!!form} onClick={()=>{setForm({});setPreview(false)}} className='rounded-lg bg-cyan-100 px-4 py-2 font-semibold text-[#062536]'>New draft</button></div>
 <p className='rounded-lg border border-cyan-200/30 p-3 text-sm text-cyan-100'>{section==='video'?'Save a draft privately or explicitly publish both languages.':'Draft workspace: saving here does not publish or change existing public pages.'}</p>
 {!form&&<div className='flex flex-wrap gap-3'><input aria-label='Search drafts' placeholder='Search title, slug or destination' className={input+' flex-1'} value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label='Sort drafts' className='rounded-lg bg-[#0b3045] p-3' value={sort} onChange={e=>setSort(e.target.value)}><option value='recent'>Recently updated</option><option value='title'>Title A–Z</option></select><button type='button' disabled={busy} onClick={()=>void load()}>Refresh</button></div>}
 {notice&&<p role='status' className='rounded-lg bg-white/10 p-3'>{notice}</p>}
 {form&&<div className='flex flex-wrap gap-3 text-sm'><span>{form.titleEn?'✓':'○'} English title</span><span>{form.titleRu?'✓':'○'} Russian title</span><span>{form.bodyEn?'✓':'○'} English description</span><span>{form.bodyRu?'✓':'○'} Russian description</span><button type='button' onClick={()=>setPreview(!preview)} className='underline'>{preview?'Hide':'Show'} draft summary</button></div>}
 {form&&preview&&<div className='space-y-3 rounded-xl border border-white/20 p-4'><p className='text-xs uppercase text-cyan-200'>Draft summary — not a public page preview</p><h3 className='text-xl font-bold'>{form.titleEn||'Untitled'}</h3><p className='whitespace-pre-wrap'>{form.bodyEn}</p><h3 className='text-xl font-bold'>{form.titleRu}</h3><p className='whitespace-pre-wrap'>{form.bodyRu}</p><p>{form.country} {form.destination}</p><p>{form.slug}</p></div>}
 {form&&section==='video'&&youtubeId(form.youtubeUrl||'')&&<div className='max-w-xl space-y-2'><p className='text-sm text-cyan-200'>YouTube preview</p><iframe title='Video preview' className='aspect-video w-full rounded-xl' src={'https://www.youtube-nocookie.com/embed/'+youtubeId(form.youtubeUrl||'')} allowFullScreen/></div>}
 {!form&&section==='video'&&<div className='space-y-2'><h3 className='font-bold'>Public video catalog</h3>{(liveVideos||[]).filter(v=>[v.titleEn,v.titleRu,v.slug].join(' ').toLowerCase().includes(search.toLowerCase())).map(v=><button key={v.youtubeId} className='block w-full rounded-xl border border-white/15 p-4 text-left' onClick={()=>{const { _id:ignored,...rest}=v;void ignored;setForm({...rest,country:v.region});setPreview(false)}}><strong>{v.titleEn}</strong><span className='ml-3 text-sm text-cyan-200'>{v.status}</span></button>)}</div>}
 {form?<form className='grid gap-4 rounded-xl border border-white/15 p-4 sm:grid-cols-2' onSubmit={e=>{e.preventDefault();void save()}}>
 {section==='dive-trip'?<>{tripGroups.slice(0,2).map(group=><fieldset key={group.title} className='grid gap-4 rounded-xl border border-white/15 p-4 sm:col-span-2 sm:grid-cols-2'><legend className='px-2 font-semibold'>{group.title}</legend>{group.fields.map(field)}</fieldset>)}{tripGallery('stayGallery','stayCover','Accommodation photo gallery')}{tripGallery('gallery','mediaUrl','Diving photo gallery')}<div className='sm:col-span-2'>{field('videoGallery')}</div>{tripGroups.slice(2).map(group=><fieldset key={group.title} className='grid gap-4 rounded-xl border border-white/15 p-4 sm:col-span-2 sm:grid-cols-2'><legend className='px-2 font-semibold'>{group.title}</legend>{group.fields.map(field)}</fieldset>)}</>:section==='dive-site'?<>
 {diveGroups.slice(0,2).map(group=><fieldset key={group.title} className='grid gap-4 rounded-xl border border-white/15 p-4 sm:col-span-2 sm:grid-cols-2'><legend className='px-2 font-semibold'>{group.title}</legend>{group.fields.map(field)}</fieldset>)}
 <fieldset className='space-y-3 rounded-xl border border-white/15 p-4 sm:col-span-2'><legend className='px-2 font-semibold'>Photo gallery</legend>
 <p className='text-sm text-slate-300'>Add existing image URLs or local website image paths. Select a cover and arrange the gallery. Direct file uploads are not enabled yet.</p>
 {gallery.map((url,i)=><div key={i} className='flex flex-wrap items-center gap-2 rounded-lg border border-white/15 p-2'><input aria-label={'Photo '+(i+1)+' URL'} className={input} value={url} onChange={e=>{const items=[...gallery];items[i]=e.target.value;updateGallery(items,form.mediaUrl===url?e.target.value:undefined)}}/><button type='button' onClick={()=>updateGallery(gallery,url)} className='rounded border border-white/30 px-2 py-1'>{(form.mediaUrl||gallery[0])===url?'Cover selected':'Set cover'}</button><button type='button' disabled={i===0} onClick={()=>{const a=[...gallery];[a[i-1],a[i]]=[a[i],a[i-1]];updateGallery(a)}}>Move up</button><button type='button' disabled={i===gallery.length-1} onClick={()=>{const a=[...gallery];[a[i+1],a[i]]=[a[i],a[i+1]];updateGallery(a)}}>Move down</button><button type='button' onClick={()=>updateGallery(gallery.filter((_,j)=>i!==j))} className='text-red-200'>Remove</button></div>)}
 <label className='block text-sm'>Add photo URL<input className={input} placeholder='https://… or /images/…' value={form.newPhoto||''} onChange={e=>change('newPhoto',e.target.value)}/></label>
 <button type='button' disabled={!form.newPhoto?.trim()} className='rounded-lg border border-white/30 px-4 py-2' onClick={()=>{const a=[...gallery,form.newPhoto.trim()];setForm({...form,newPhoto:'',gallery:a.join('\n'),mediaUrl:form.mediaUrl||a[0]})}}>Add photo</button>
 </fieldset>
 {diveGroups.slice(2).map(group=><fieldset key={group.title} className='grid gap-4 rounded-xl border border-white/15 p-4 sm:col-span-2 sm:grid-cols-2'><legend className='px-2 font-semibold'>{group.title}</legend>{group.fields.map(field)}</fieldset>)}
 </>: (section==='video'?['youtubeUrl','titleEn','titleRu','slug','bodyEn','bodyRu','country','uploadDate','duration']: [...common,...(extras[section]||[])]).map(field)}

 <div className='flex flex-wrap gap-2 sm:col-span-2'><button disabled={busy} className='rounded-lg bg-cyan-100 px-4 py-2 font-semibold text-[#062536]'>Save draft</button>{section==='video'&&<><button type='button' disabled={busy} onClick={()=>void publish('published')} className='rounded-lg bg-emerald-700 px-4 py-2 font-semibold'>Publish / update</button><button type='button' disabled={busy||form.status!=='published'||!form.youtubeId} onClick={()=>void publish('unpublished')} className='rounded-lg border border-white/30 px-4 py-2'>Unpublish</button><p className='w-full text-xs text-slate-300'>Choose the upload date and video duration. Both language titles and descriptions are required to publish. Save a draft to retain editor changes.</p></>}<button type='button' disabled={busy} onClick={()=>setForm(null)} className='rounded-lg border border-white/30 px-4 py-2'>Close</button>{form._id&&<button type='button' disabled={busy} onClick={()=>void save(true)} className='rounded-lg border border-red-400 px-4 py-2 text-red-200'>Delete draft</button>}</div>
 </form>:<div className='space-y-2'>{busy?<p>Loading…</p>:rows.filter(r=>r.kind===section&&[r.titleEn,r.titleRu,r.slug,r.country,r.destination].join(' ').toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sort==='title'?(a.titleEn||'').localeCompare(b.titleEn||''):0).map(r=><div key={r._id} className='flex flex-wrap items-center gap-3 rounded-xl border border-white/15 p-4'><button onClick={()=>{setForm(r);setPreview(false)}} className='flex-1 text-left'><strong>{r.titleEn}</strong><span className='ml-3 text-sm text-slate-300'>{r.slug} · Draft · {r.titleRu&&r.bodyRu?'RU ready':'RU incomplete'}</span></button><button type='button' onClick={()=>{const copy:Draft={...r,titleEn:r.titleEn+' (copy)',slug:r.slug+'-copy'};delete copy._id;setForm(copy);setPreview(false)}} className='rounded border border-white/30 px-3 py-1'>Duplicate</button></div>)}</div>}
 </section>}
 </div></div>
}
