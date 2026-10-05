import { unstable_cache } from 'next/cache'
import { connectDb, ContentDoc, dbConfigured } from '../db'
import { deleteUploads } from '../uploads'
import { defaultContent, type Content } from './defaults'
import { getAt, imagesIn, sanitize, sections, setAt, type FieldError } from './schema'

export const CONTENT_TAG = 'content'
const KEY = 'main'

// Saved content is merged over the defaults so new fields always have a value and stray keys are ignored.
function merge<T>(base: T, saved: unknown): T {
  if (Array.isArray(base)) return (Array.isArray(saved) ? saved : base) as T
  if (base && typeof base === 'object') {
    const src = saved && typeof saved === 'object' && !Array.isArray(saved) ? (saved as Record<string, unknown>) : {}
    return Object.fromEntries(Object.entries(base).map(([k, v]) => [k, merge(v, src[k])])) as T
  }
  return (typeof saved === typeof base ? saved : base) as T
}

export async function loadContentFresh(): Promise<{ content: Content; updatedAt?: Date }> {
  if (!dbConfigured()) return { content: defaultContent }
  await connectDb()
  const doc = await ContentDoc.findOne({ key: KEY }).lean()
  return { content: merge(defaultContent, doc?.data), updatedAt: doc?.updatedAt }
}

// Public site reads go through the data cache; admin saves expire the tag so the next request is fresh.
const cached = unstable_cache(async () => {
  try {
    return (await loadContentFresh()).content
  } catch (e) {
    console.error('[content] database unavailable, using defaults:', (e as Error).message)
    return defaultContent
  }
}, ['site-content-v1'], { tags: [CONTENT_TAG] })

export const getContent = () => cached()

export async function saveSection(sectionId: string, data: unknown): Promise<{ ok: true; content: Content } | { ok: false; status: number; errors: FieldError[] }> {
  const section = sections.find((s) => s.id === sectionId)
  if (!section) return { ok: false, status: 404, errors: [{ key: '', message: 'Unknown section.' }] }
  const { value, errors } = sanitize(section.fields, data)
  if (errors.length) return { ok: false, status: 400, errors }

  const { content } = await loadContentFresh()
  const next = structuredClone(content)
  const target = section.path ? getAt(next, section.path) : next
  const before = imagesIn(section.fields, target)
  for (const f of section.fields) setAt(target, f.key, getAt(value, f.key))

  await ContentDoc.updateOne({ key: KEY }, { $set: { data: next } }, { upsert: true })

  // Remove uploads this save dropped, unless another section still uses them.
  const stillUsed = new Set(sections.flatMap((s) => imagesIn(s.fields, s.path ? getAt(next, s.path) : next)))
  await deleteUploads(before.filter((url) => !stillUsed.has(url))).catch((e) => console.error('[uploads] cleanup failed:', e))
  return { ok: true, content: next }
}

export type { Content } from './defaults'
