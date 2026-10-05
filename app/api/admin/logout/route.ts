import { cookies } from 'next/headers'
import { sessionCookie } from '@/lib/auth'

export async function POST() {
  ;(await cookies()).set(sessionCookie('', 0))
  return Response.json({ ok: true })
}
