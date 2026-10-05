'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, MailOpen, Trash2 } from 'lucide-react'
import { useToast } from './toast'

export function InquiryActions({ id, read }: { id: string; read: boolean }) {
  const router = useRouter()
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  async function call(method: 'PATCH' | 'DELETE', body?: object) {
    setBusy(true)
    const res = await fetch(`/api/admin/inquiries/${id}`, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
    setBusy(false)
    if (!res.ok) return toast('error', (await res.json().catch(() => ({}))).error ?? 'Could not update the inquiry.')
    if (method === 'DELETE') toast('success', 'Inquiry deleted.')
    router.refresh()
  }

  return (
    <div className="adm-inq-actions">
      <button type="button" className="adm-btn adm-btn-quiet" disabled={busy} onClick={() => call('PATCH', { read: !read })}>
        {read ? <Mail aria-hidden="true" /> : <MailOpen aria-hidden="true" />}{read ? 'Mark unread' : 'Mark read'}
      </button>
      <button type="button" className="adm-btn adm-btn-quiet adm-danger" disabled={busy} onClick={() => confirm('Delete this inquiry permanently?') && call('DELETE')}>
        <Trash2 aria-hidden="true" />Delete
      </button>
    </div>
  )
}
