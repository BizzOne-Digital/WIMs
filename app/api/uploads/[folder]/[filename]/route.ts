import { findUpload } from '@/lib/uploads'

export const runtime = 'nodejs'

// Serves an uploaded image from MongoDB. Filenames are unique and never reused, so responses cache forever.
export async function GET(_req: Request, { params }: { params: Promise<{ folder: string; filename: string }> }) {
  const { folder, filename } = await params
  if (filename.includes('..') || filename.includes('/') || folder.includes('..') || folder.includes('/')) return new Response('Bad request', { status: 400 })
  const doc = await findUpload(folder, filename).catch(() => null)
  if (!doc) return new Response('Not found', { status: 404 })
  const body = new Uint8Array(doc.data.buffer, doc.data.byteOffset, doc.data.byteLength)
  return new Response(body, {
    headers: {
      'Content-Type': doc.mimeType,
      'Content-Length': String(body.byteLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
