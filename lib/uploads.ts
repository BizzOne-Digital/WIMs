import { connectDb, dbConfigured, StoredUpload } from './db'
import { uploadFolders, type UploadFolder } from './content/schema'

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024
export const UPLOAD_PREFIX = '/api/uploads/'

// Allowed types, checked against the file's real signature, not just the browser-reported type.
const signatures: Record<string, { ext: string; test: (b: Buffer) => boolean }> = {
  'image/jpeg': { ext: 'jpg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  'image/png': { ext: 'png', test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  'image/webp': { ext: 'webp', test: (b) => b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP' },
  'image/gif': { ext: 'gif', test: (b) => b.subarray(0, 4).toString() === 'GIF8' },
}
export const isFolder = (f: unknown): f is UploadFolder => uploadFolders.includes(f as UploadFolder)
export const imageType = (mime: string, buf: Buffer) => (signatures[mime]?.test(buf) ? signatures[mime].ext : null)

const SAFE_NAME = /^[0-9]+-[0-9a-f]+\.(jpg|png|webp|gif)$/

export function parseUploadUrl(url: string) {
  if (!url.startsWith(UPLOAD_PREFIX)) return null
  const [folder, filename, extra] = url.slice(UPLOAD_PREFIX.length).split('/')
  return isFolder(folder) && filename && !extra && SAFE_NAME.test(filename) ? { folder, filename } : null
}

export async function findUpload(folder: string, filename: string) {
  if (!dbConfigured() || !isFolder(folder) || !SAFE_NAME.test(filename)) return null
  await connectDb()
  return StoredUpload.findOne({ folder, filename }).lean()
}

// Delete stored uploads that are no longer referenced (called after content saves).
export async function deleteUploads(urls: string[]) {
  const targets = urls.map(parseUploadUrl).filter((t): t is NonNullable<typeof t> => t !== null)
  if (!targets.length) return
  await connectDb()
  await StoredUpload.deleteMany({ $or: targets })
}
