import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, CircleAlert } from 'lucide-react'
import { authConfigured } from '@/lib/auth'
import { loadContentFresh } from '@/lib/content'
import { sections } from '@/lib/content/schema'
import { connectDb, dbConfigured, Inquiry, StoredUpload } from '@/lib/db'

export const metadata: Metadata = { title: 'Dashboard' }

async function stats() {
  if (!dbConfigured()) return null
  try {
    await connectDb()
    const [total, unread, uploads, latest, { updatedAt }] = await Promise.all([
      Inquiry.countDocuments(), Inquiry.countDocuments({ read: false }),
      StoredUpload.aggregate<{ count: number; bytes: number }>([{ $group: { _id: null, count: { $sum: 1 }, bytes: { $sum: '$size' } } }]),
      Inquiry.find().sort({ createdAt: -1 }).limit(4).select('name interest createdAt read').lean(),
      loadContentFresh(),
    ])
    return { total, unread, uploads: uploads[0] ?? { count: 0, bytes: 0 }, latest, updatedAt }
  } catch (e) {
    return { error: (e as Error).message }
  }
}

const fmt = (d?: Date) => (d ? new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d)) : 'Never')

export default async function Dashboard() {
  const s = await stats()
  const checks = [
    { ok: dbConfigured() && !(s && 'error' in s), label: 'Database connected', help: s && 'error' in s ? `Connection failed: ${s.error}` : 'Set MONGODB_URI in .env.local.' },
    { ok: authConfigured(), label: 'Admin sign-in configured', help: 'Set ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SESSION_SECRET.' },
    { ok: Boolean(process.env.NEXT_PUBLIC_SITE_URL), label: 'Public site URL set', help: 'Set NEXT_PUBLIC_SITE_URL so SEO links use your domain.' },
  ]
  const data = s && !('error' in s) ? s : null
  return (
    <>
      <header className="adm-head">
        <p className="adm-eyebrow">Overview</p>
        <h1>Welcome back.</h1>
        <p>Manage every page of the WIMs website. Changes go live as soon as you save.</p>
      </header>

      <section className="adm-stats" aria-label="Summary">
        <Link className="adm-stat" href="/admin/inquiries"><span>Unread inquiries</span><strong>{data?.unread ?? '—'}</strong><small>{data ? `${data.total} total` : 'Database not connected'}</small></Link>
        <div className="adm-stat"><span>Uploaded images</span><strong>{data?.uploads.count ?? '—'}</strong><small>{data ? `${(data.uploads.bytes / 1024 / 1024).toFixed(1)} MB stored` : '—'}</small></div>
        <div className="adm-stat"><span>Content last saved</span><strong className="adm-stat-sm">{fmt(data?.updatedAt)}</strong><small>{sections.length} editable sections</small></div>
      </section>

      <div className="adm-dash-grid">
        <section className="adm-card">
          <h2>Setup</h2>
          <ul className="adm-checks">
            {checks.map((c) => <li key={c.label} data-ok={c.ok}>{c.ok ? <CheckCircle2 aria-hidden="true" /> : <CircleAlert aria-hidden="true" />}<div><strong>{c.label}</strong>{!c.ok && <span>{c.help}</span>}</div></li>)}
          </ul>
        </section>
        <section className="adm-card">
          <h2>Latest inquiries</h2>
          {data?.latest.length ? (
            <ul className="adm-latest">
              {data.latest.map((q) => <li key={String(q._id)} data-unread={!q.read}><strong>{q.name}</strong><span>{q.interest}</span><time>{fmt(q.createdAt)}</time></li>)}
            </ul>
          ) : <p className="adm-hint">No inquiries yet.</p>}
          <Link className="adm-link" href="/admin/inquiries">Open inbox<ArrowRight aria-hidden="true" /></Link>
        </section>
      </div>

      <section className="adm-card">
        <h2>Edit the website</h2>
        <div className="adm-section-grid">
          {sections.map((sec) => (
            <Link key={sec.id} href={`/admin/content/${sec.id}`} className="adm-section-link">
              <span className="adm-eyebrow">{sec.group}</span>
              <strong>{sec.title}</strong>
              <span>{sec.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
