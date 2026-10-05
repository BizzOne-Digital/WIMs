import { cookies } from 'next/headers'
import { authConfigured, checkCredentials, createSessionToken, sessionCookie } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const origin = req.headers.get('origin')
  if (origin && new URL(origin).host !== req.headers.get('host')) return Response.json({ error: 'Cross-site request blocked.' }, { status: 403 })
  if (!authConfigured()) return Response.json({ error: 'Admin sign-in is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET in .env.local.' }, { status: 503 })

  const body = await req.json().catch(() => ({}))
  const email = typeof body.email === 'string' ? body.email : ''
  const password = typeof body.password === 'string' ? body.password : ''
  if (!checkCredentials(email, password)) {
    // ponytail: fixed delay slows guessing; add a persistent rate limit if the admin URL gets targeted.
    await new Promise((r) => setTimeout(r, 800))
    return Response.json({ error: 'That email and password don’t match.' }, { status: 401 })
  }
  ;(await cookies()).set(sessionCookie(createSessionToken()))
  return Response.json({ ok: true })
}
