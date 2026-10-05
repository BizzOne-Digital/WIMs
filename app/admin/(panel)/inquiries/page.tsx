import type { Metadata } from 'next'
import { Reply } from 'lucide-react'
import { InquiryActions } from '@/components/admin/inquiry-actions'
import { connectDb, dbConfigured, Inquiry } from '@/lib/db'

export const metadata: Metadata = { title: 'Inquiries' }

const fmt = (d: Date) => new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d))

export default async function Inquiries() {
  // ponytail: newest 200 in one list; add paging if inquiries grow past that.
  const list = dbConfigured() ? await connectDb().then(() => Inquiry.find().sort({ createdAt: -1 }).limit(200).lean()).catch(() => null) : null
  return (
    <>
      <header className="adm-head">
        <p className="adm-eyebrow">Inbox</p>
        <h1>Inquiries</h1>
        <p>Messages sent through the contact form, newest first.</p>
      </header>
      {!list ? <p className="adm-notice">Inquiries are stored once the database is connected (<code>MONGODB_URI</code> in <code>.env.local</code>). Until then, the contact form opens the visitor’s email app instead.</p>
        : !list.length ? <div className="adm-card adm-empty"><p>No inquiries yet. New messages from the contact form will appear here.</p></div>
        : (
          <ul className="adm-inquiries">
            {list.map((q) => (
              <li key={String(q._id)} className="adm-card adm-inquiry" data-unread={!q.read}>
                <div className="adm-inq-head">
                  <div>
                    <strong>{q.name}</strong>
                    <a href={`mailto:${q.email}`}>{q.email}</a>
                    {q.organization && <span>{q.organization}</span>}
                  </div>
                  <div className="adm-inq-meta">
                    {!q.read && <span className="adm-badge">New</span>}
                    <span className="adm-tag">{q.interest}</span>
                    <time>{fmt(q.createdAt)}</time>
                  </div>
                </div>
                <p className="adm-inq-message">{q.message}</p>
                <div className="adm-inq-foot">
                  <a className="adm-btn adm-btn-ghost" href={`mailto:${q.email}?subject=${encodeURIComponent('Re: your WIMs inquiry')}`}><Reply aria-hidden="true" />Reply</a>
                  <InquiryActions id={String(q._id)} read={Boolean(q.read)} />
                </div>
              </li>
            ))}
          </ul>
        )}
    </>
  )
}
