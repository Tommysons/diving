import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validation/contactSchema'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const timeSent = new Date().toLocaleString()

    // Ensure email is present
    if (!email) {
      return NextResponse.json({ error: 'No email provided' }, { status: 400 })
    }

    // 1️⃣ Send email to your inbox (admin)
    await resend.emails.send({
      from: 'Diving Website <contact@lokawndr.com>',
      to: process.env.ADMIN_EMAIL!, // your email
      subject: subject || 'New Contact Message from website',
      html: `
        <h3>New message from your website contact form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '(no subject)'}</p>
        <p><strong>Time Sent:</strong> ${timeSent}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // 2️⃣ Send confirmation email to the user
    await resend.emails.send({
      from: 'Diving Website <contact@lokawndr.com>',
      to: email!, // TypeScript-safe
      subject: 'We received your email',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! We have received your message and will get back to you shortly.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>Best regards, <br/> Your Scuba Diving Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
