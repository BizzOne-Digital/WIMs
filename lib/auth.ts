import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Single administrator, configured in .env.local: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET.
// Sessions are signed (HMAC-SHA256), httpOnly cookies; no session store needed on serverless.
export const SESSION_COOKIE = 'wims_admin'
const MAX_AGE = 60 * 60 * 8 // 8 hours

export const authConfigured = () => Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32)

const digest = (v: string) => createHash('sha256').update(v).digest()
const safeEqual = (a: string, b: string) => timingSafeEqual(digest(a), digest(b)) // equal-length compare, no early exit
const sign = (payload: string) => createHmac('sha256', process.env.ADMIN_SESSION_SECRET!).update(payload).digest('base64url')

export function checkCredentials(email: string, password: string) {
  if (!authConfigured()) return false
  const okEmail = safeEqual(email.trim().toLowerCase(), process.env.ADMIN_EMAIL!.trim().toLowerCase())
  const okPass = safeEqual(password, process.env.ADMIN_PASSWORD!)
  return okEmail && okPass
}

export function createSessionToken() {
  const payload = Buffer.from(JSON.stringify({ sub: process.env.ADMIN_EMAIL, exp: Date.now() + MAX_AGE * 1000 })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !authConfigured()) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return false
  try {
    const { sub, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return sub === process.env.ADMIN_EMAIL && typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

export const sessionCookie = (value: string, maxAge = MAX_AGE) => ({ name: SESSION_COOKIE, value, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge })

export async function isAdmin() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)
}

// For admin pages: bounce to the login screen when not signed in.
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login')
}

// For admin API routes: 401 unless signed in; mutating requests must also come from this site (CSRF guard).
export async function guardAdminRequest(req: Request) {
  if (req.method !== 'GET') {
    const origin = req.headers.get('origin')
    if (origin && new URL(origin).host !== req.headers.get('host')) return Response.json({ error: 'Cross-site request blocked.' }, { status: 403 })
  }
  if (!(await isAdmin())) return Response.json({ error: 'Sign in to the admin to continue.' }, { status: 401 })
  return null
}
