import { randomBytes } from 'node:crypto'
import { guardAdminRequest } from '@/lib/auth'
import { connectDb, dbConfigured, StoredUpload } from '@/lib/db'
import { imageType, isFolder, MAX_UPLOAD_BYTES, UPLOAD_PREFIX } from '@/lib/uploads'

export const runtime = 'nodejs'

// Admin image upload: stored in MongoDB so files survive redeploys on read-only/serverless hosts.
export async function POST(req: Request) {
  const denied = await guardAdminRequest(req)
  if (denied) return denied
  if (!dbConfigured()) return Response.json({ error: 'Database is not configured. Add MONGODB_URI to .env.local.' }, { status: 503 })

  let form: FormData
  try { form = await req.formData() } catch { return Response.json({ error: 'Send the image as multipart form data.' }, { status: 400 }) }
  const file = form.get('file')
  const folder = form.get('folder')
  if (!isFolder(folder)) return Response.json({ error: 'Unknown upload folder.' }, { status: 400 })
  if (!(file instanceof File)) return Response.json({ error: 'Choose an image to upload.' }, { status: 400 })
  if (file.size > MAX_UPLOAD_BYTES) return Response.json({ error: 'Images must be 8 MB or smaller.' }, { status: 413 })

  const data = Buffer.from(await file.arrayBuffer())
  const ext = imageType(file.type, data)
  if (!ext) return Response.json({ error: 'Upload a JPEG, PNG, WebP or GIF image.' }, { status: 415 })

  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}.${ext}`
  await connectDb()
  await StoredUpload.create({ folder, filename, mimeType: file.type, size: data.length, data })
  return Response.json({ success: true, url: `${UPLOAD_PREFIX}${folder}/${filename}`, filename, size: data.length, folder })
}
