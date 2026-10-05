import { revalidateTag } from 'next/cache'
import { guardAdminRequest } from '@/lib/auth'
import { CONTENT_TAG, saveSection } from '@/lib/content'
import { dbConfigured } from '@/lib/db'

export const runtime = 'nodejs'

// Save one admin section. Body: { section: string, data: object }.
export async function PUT(req: Request) {
  const denied = await guardAdminRequest(req)
  if (denied) return denied
  if (!dbConfigured()) return Response.json({ error: 'Database is not configured. Add MONGODB_URI to .env.local to save changes.' }, { status: 503 })

  const body = await req.json().catch(() => null)
  if (!body || typeof body.section !== 'string') return Response.json({ error: 'Invalid request.' }, { status: 400 })

  const result = await saveSection(body.section, body.data)
  if (!result.ok) return Response.json({ error: result.errors[0]?.message ?? 'Could not save.', errors: result.errors }, { status: result.status })

  revalidateTag(CONTENT_TAG, { expire: 0 }) // live on the next request
  return Response.json({ ok: true })
}
