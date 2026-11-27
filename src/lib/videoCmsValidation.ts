export function youtubeId(value:string):string|null {
 const raw=value.trim()
 if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw
 try {
  const u=new URL(raw)
  if(u.protocol!=='https:')return null
  const host=u.hostname.toLowerCase()
  const id=host==='youtu.be'?u.pathname.split('/')[1]:['youtube.com','www.youtube.com','m.youtube.com','www.youtube-nocookie.com'].includes(host)?(u.pathname==='/watch'?u.searchParams.get('v'):u.pathname.startsWith('/embed/')?u.pathname.split('/')[2]:null):null
  return id&&/^[A-Za-z0-9_-]{11}$/.test(id)?id:null
 }catch{return null}
}
export function videoSlug(value:string){return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')}
export function validVideoDuration(value:string){const m=/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(value);if(!m)return false;const n=Number(m[1]||0)*3600+Number(m[2]||0)*60+Number(m[3]||0);return n>0&&n<=28800}
