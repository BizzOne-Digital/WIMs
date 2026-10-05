import { connectDb, dbConfigured, Inquiry } from '@/lib/db'

export const runtime = 'nodejs'

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

// Public contact form endpoint. Inquiries appear in /admin/inquiries.
export async function POST(req: Request) {
  if (!dbConfigured()) return Response.json({ error: 'Inquiries are not stored yet.', fallback: 'email' }, { status: 503 })
  const body = await req.json().catch(() => ({}))
  if (clean(body.website, 100)) return Response.json({ ok: true }) // honeypot: silently drop bots

  const data = { name: clean(body.name, 120), email: clean(body.email, 200), organization: clean(body.organization, 160), interest: clean(body.interest, 80), message: clean(body.message, 5000) }
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.message.length < 10) return Response.json({ error: 'Check your name, email and message, then try again.' }, { status: 400 })

  await connectDb()
  await Inquiry.create(data)
  return Response.json({ ok: true }, { status: 201 })
}
