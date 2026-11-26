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
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) return { customer: false, admin: false }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const name = escapeHtml(booking.name)
  const activity = escapeHtml(booking.course || booking.site || booking.type || 'activity')
  const date = escapeHtml(booking.date)
  const time = escapeHtml(booking.time)
  const status = escapeHtml(booking.status)
  const groupDetails = booking.departure ? `<p>Departure / Выезд: ${escapeHtml(booking.departure)}</p><p>Divers / Дайверы: ${escapeHtml(booking.group)}</p><p>Accommodation / Размещение: ${escapeHtml(booking.room)}</p><p>Notes / Комментарии: ${escapeHtml(booking.message)}</p>` : ""
  const details = `<p>Guest / Гость: ${name} (${escapeHtml(booking.email)})</p><p><strong>Activity / Активность:</strong> ${activity}</p><p><strong>Date / Дата:</strong> ${date}</p>${booking.departure ? groupDetails : `<p><strong>Time / Время:</strong> ${time}</p>`}<p><strong>Status / Статус:</strong> ${status}</p>`
  const old = previous?.departure ? `<p>Previous arrival/departure: ${escapeHtml(previous.date)} – ${escapeHtml(previous.departure)}</p>` : previous ? `<p>Previous date/time / Предыдущая дата и время: ${escapeHtml(previous.date)} ${escapeHtml(previous.time)}</p>` : ''
  const subject = action === 'received' ? 'Booking request received / Заявка получена' : action === 'deleted' ? 'Booking removed / Бронирование удалено' : action === 'cancelled' ? 'Booking cancelled / Бронирование отменено' : action === 'approved' ? 'Booking confirmed / Бронирование подтверждено' : 'Booking updated / Бронирование изменено'
  const html = `<p>Hello ${name},</p><p>${action==='received'?'Your request is pending partner confirmation; it is not a confirmed booking.':'Your LokaWndr booking has been '+escapeHtml(action)+'.'}</p><p>Ваше бронирование LokaWndr: ${escapeHtml(action === 'received' ? 'заявка получена, ожидает подтверждения' : action === 'approved' ? 'подтверждено' : action === 'cancelled' ? 'отменено' : action === 'deleted' ? 'удалено' : 'изменено')}.</p>${details}${old}<p>Contact contact@lokawndr.com if you have questions.</p>`
  const recipients = [String(booking.email || ''), process.env.ADMIN_EMAIL]
  const results = await Promise.all(recipients.map(async (to, index) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return false
    try {
      const result = await resend.emails.send({ from: 'LokaWndr <contact@lokawndr.com>', to, subject: index ? `Admin: ${subject}` : subject, html })
      if (result.error) { console.error('Booking notification failed', { recipient: index ? 'admin' : 'customer', error: result.error }); return false }
      return true
    } catch (error) { console.error('Booking notification exception', error); return false }
  }))
  return { customer: results[0], admin: results[1] }
}
