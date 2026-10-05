import { isValidObjectId } from 'mongoose'
import { guardAdminRequest } from '@/lib/auth'
import { connectDb, Inquiry } from '@/lib/db'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

async function target(req: Request, { params }: Ctx) {
  const denied = await guardAdminRequest(req)
  if (denied) return { denied }
  const { id } = await params
  if (!isValidObjectId(id)) return { denied: Response.json({ error: 'Unknown inquiry.' }, { status: 404 }) }
  await connectDb()
  return { id }
}

// Body: { read: boolean }
export async function PATCH(req: Request, ctx: Ctx) {
  const { denied, id } = await target(req, ctx)
  if (denied) return denied
  const { read } = await req.json().catch(() => ({}))
  await Inquiry.updateOne({ _id: id }, { $set: { read: Boolean(read) } })
  return Response.json({ ok: true })
}

export async function DELETE(req: Request, ctx: Ctx) {
  const { denied, id } = await target(req, ctx)
  if (denied) return denied
  await Inquiry.deleteOne({ _id: id })
  return Response.json({ ok: true })
}
