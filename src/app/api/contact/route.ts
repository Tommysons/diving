import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { contactSchema } from '@/lib/validation/contactSchema'

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const timeSent = new Date().toLocaleString()

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
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

    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL,
      to: email,
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
