import { currentUser } from '@clerk/nextjs/server'
import { Resend } from 'resend'
import clientPromise from '@/lib/mongodb'

export const collections: Record<string, string> = {
  scuba: 'scuba_bookings',
  freediving: 'freediving_bookings',
  dive_trips: 'dive_trips',
}
export async function requireAdmin() {
  const user = await currentUser()
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  return !!user && !!adminEmail && user.emailAddresses.some(e => e.emailAddress.toLowerCase() === adminEmail)
}
export async function bookingDb() {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DB || 'scuba_booking')
}
function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))
}
export async function notifyBooking(booking: Record<string, unknown>, action: string, previous?: Record<string, unknown>) {
 if (!process.env.RESEND_API_KEY) return {customer:false,admin:false}
 const resend=new Resend(process.env.RESEND_API_KEY)
 const recipients=[String(booking.email||''),process.env.ADMIN_EMAIL||'']
 const results=await Promise.all(recipients.map(async(to,index)=>{
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to))return false
 const ru=index===0&&booking.language==='ru'
 const t=(en:string,rus:string)=>ru?rus:en
 const subjects:Record<string,string>={received:t('Booking request received','Заявка получена'),approved:t('Booking confirmed','Бронирование подтверждено'),cancelled:t('Booking cancelled','Бронирование отменено'),deleted:t('Booking removed','Бронирование удалено'),updated:t('Booking updated','Бронирование изменено')}
 const statuses:Record<string,string>={pending:t('Pending confirmation','Ожидает подтверждения'),approved:t('Confirmed','Подтверждено'),cancelled:t('Cancelled','Отменено'),deleted:t('Removed','Удалено')}
 const rooms:Record<string,string>={double:t('Double sharing','Двухместное размещение'),single:t('Single occupancy','Одноместное размещение'),mixed:t('Mixed','Смешанное размещение')}
 const line=(label:string,value:unknown)=>'<p><strong>'+label+':</strong> '+escapeHtml(value)+'</p>'
 const activity=booking.departure?t('Maldives – Mahibadhoo group dive trip','Мальдивы — групповой дайвинг-тур на Махибадху'):booking.course||booking.site||booking.type
 const subject=subjects[action]||subjects.updated
 const intro=action==='received'?t('Thank you for submitting your booking request to LokaWndr. Your booking is pending confirmation. We will contact you after checking availability. This is not a confirmed reservation.','Спасибо за заявку в LokaWndr! Ваше бронирование ожидает подтверждения. Мы свяжемся с вами после проверки наличия мест. Это ещё не подтверждённое бронирование.'):subject+'.'
 const details=line(t('Guest','Гость'),booking.name)+line(t('Email','Эл. почта'),booking.email)+(booking.phone?line(t('Phone','Телефон'),booking.phone):'')+line(t('Activity','Активность'),activity)+line(booking.departure?t('Arrival','Заезд'):t('Date','Дата'),booking.date)+(booking.departure?line(t('Departure','Выезд'),booking.departure)+line(t('Duration (nights)','Продолжительность (ночей)'),Math.round((Date.parse(String(booking.departure))-Date.parse(String(booking.date)))/86400000))+line(t('Divers','Дайверы'),booking.group)+line(t('Accommodation','Размещение'),rooms[String(booking.room)]||booking.room):line(t('Time','Время'),booking.time))+line(t('Notes','Комментарии'),booking.message)+line(t('Status','Статус'),statuses[String(booking.status)]||booking.status)
 const old=previous?line(previous.departure?t('Previous arrival / departure','Предыдущие даты заезда / выезда'):t('Previous date / time','Предыдущие дата / время'),String(previous.date)+' / '+String(previous.departure||previous.time||'')):''
 const html='<p>'+t('Hello','Здравствуйте')+' '+escapeHtml(booking.name)+',</p><p>'+intro+'</p>'+details+old+(index?line('Customer language',booking.language==='ru'?'Russian':'English'):'')+'<p>'+t('If you have questions, contact','Если у вас есть вопросы, напишите на')+' contact@lokawndr.com.</p><p>'+t('Best regards','С уважением')+',<br>LokaWndr</p>'
 try{const result=await resend.emails.send({from:'LokaWndr <contact@lokawndr.com>',to,subject:index?'Admin: '+subject:subject,html});return !result.error}catch(error){console.error('Booking notification failed',error);return false}
 }))
 return {customer:results[0],admin:results[1]}
}
