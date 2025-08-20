import { Resend } from 'resend'

const resend = new Resend('re_eVrc3fXN_NHX4ecsK8qWYswTDQ32DaQd9')

async function testEmail() {
  try {
    const res = await resend.emails.send({
      from: 'hello@resend.dev',
      to: 'vermiona15@gmail.com',
      subject: 'Test Email from Resend',
      text: 'This is a test email sent via Resend.',
    })
    console.log('Email sent:', res)
  } catch (err) {
    console.error('Resend error:', err)
  }
}

testEmail()
