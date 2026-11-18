import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validation/contactSchema'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: validation.error.format(),
        },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = validation.data
    const timeSent = new Date().toISOString()
    if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 })
    }
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject || '(no subject / без темы)')
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    if (!email) {
      return NextResponse.json({ error: 'No email provided' }, { status: 400 })
    }

    // 1️⃣ Send email to admin
    const adminResult = await resend.emails.send({
      from: 'Loka Wonder <contact@lokawndr.com>',
      to: process.env.ADMIN_EMAIL!, // Vercel variable
      subject: subject || 'New Contact Message from website',
      html: `
        <h3>New message from your website contact form / Новое сообщение с формы контакта</h3>
        <p><strong>Name / Имя:</strong> ${safeName}</p>
        <p><strong>Email / Эл. почта:</strong> ${safeEmail}</p>
        <p><strong>Subject / Тема:</strong> ${
          safeSubject
        }</p>
        <p><strong>Time Sent / Время отправки:</strong> ${timeSent}</p>
        <p><strong>Message / Сообщение:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    if (adminResult.error) {
      console.error('Admin email delivery failed:', adminResult.error)
      return NextResponse.json({ error: 'Unable to deliver enquiry' }, { status: 502 })
    }

    // 2️⃣ Send confirmation email to user (English + Russian)
    const confirmationResult = await resend.emails.send({
      from: 'Loka Wonder <contact@lokawndr.com>',
      to: email!,
      subject: subject
        ? `Re: ${subject}`
        : 'We received your email / Мы получили ваше письмо',
      html: `
        <p>Hi ${safeName},</p>
        <p>Thank you for reaching out! We have received your message and will get back to you shortly.</p>
        <p>Спасибо за ваше обращение! Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>

        <p><strong>Your message / Ваше сообщение:</strong></p>
        <p>${safeMessage}</p>
        <br/>
        <p>Best regards / С уважением, <br/> Your Scuba Diving Team / Ваша команда по дайвингу</p>
      `,
    })

    if (confirmationResult.error) {
      console.error('Customer acknowledgement failed:', confirmationResult.error)
    }
    return NextResponse.json({ success: true, confirmationSent: !confirmationResult.error })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
