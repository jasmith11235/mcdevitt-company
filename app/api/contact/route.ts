import { NextResponse } from 'next/server'
import { getContact } from '@/lib/content'

interface ContactPayload {
  name: string
  email: string
  company?: string
  subject?: string
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(req: Request) {
  let body: ContactPayload
  try {
    body = (await req.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const name = (body.name || '').trim()
  const from = (body.email || '').trim()
  const company = (body.company || '').trim()
  const subject = (body.subject || 'General Inquiry').trim()
  const message = (body.message || '').trim()

  if (!name || !message || !EMAIL_RE.test(from)) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  const contact = (getContact() as { email?: string }) || {}
  const to = process.env.CONTACT_TO_EMAIL || contact.email || 'info@mcdevitt.com'

  const lines = [
    `Name: ${name}`,
    `Email: ${from}`,
    company ? `Company: ${company}` : null,
    `Subject: ${subject}`,
    '',
    message,
  ].filter((line): line is string => line !== null)

  const apiKey = process.env.RESEND_API_KEY

  // Interim delivery until the Salesforce (CRM) integration lands; accept the
  // submission even without a key so the confirmation still shows.
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY not set — submission not delivered:\n' + lines.join('\n'))
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'McDevitt Website <onboarding@resend.dev>',
        to: [to],
        reply_to: from,
        subject: `[Website] ${subject} — ${name}`,
        text: lines.join('\n'),
        html: `<pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(lines.join('\n'))}</pre>`,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('[contact] Resend delivery failed:', res.status, detail)
      return NextResponse.json({ error: 'Delivery failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Delivery error:', err)
    return NextResponse.json({ error: 'Delivery failed' }, { status: 502 })
  }
}
