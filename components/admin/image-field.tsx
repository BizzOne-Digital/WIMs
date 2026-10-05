'use client'

import { useRef, useState } from 'react'
import { ImagePlus, RefreshCw, Trash2 } from 'lucide-react'
import type { UploadFolder } from '@/lib/content/schema'
import { useToast } from './toast'

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif'
const MAX = 8 * 1024 * 1024

// Uploads to /api/upload (stored in MongoDB) and returns the public URL through onChange.
// Removing or replacing only takes effect on save; the server deletes the old file then.
export function ImageField({ id, label, help, value, onChange, folder, error }: { id: string; label: string; help?: string; value: string; onChange: (url: string) => void; folder: UploadFolder; error?: string }) {
  const input = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const toast = useToast()

  async function upload(file: File) {
    if (!ACCEPT.split(',').includes(file.type)) return toast('error', 'Choose a JPEG, PNG, WebP or GIF image.')
    if (file.size > MAX) return toast('error', 'Images must be 8 MB or smaller.')
    setUploading(true)
    try {
      const body = new FormData()
      body.append('file', file)
      body.append('folder', folder)
      const res = await fetch('/api/upload', { method: 'POST', body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Upload failed.')
      onChange(data.url)
      toast('success', 'Image uploaded. Save to publish it.')
    } catch (e) {
      toast('error', (e as Error).message)
    } finally {
      setUploading(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="adm-field">
      <span className="adm-label" id={`${id}-label`}>{label}</span>
      <div className="adm-image" data-empty={!value} aria-labelledby={`${id}-label`}>
        <div className="adm-image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {value ? <img src={value} alt="" /> : <ImagePlus aria-hidden="true" />}
          {uploading && <span className="adm-image-busy">Uploading…</span>}
        </div>
        <div className="adm-image-actions">
          <input ref={input} id={id} type="file" accept={ACCEPT} hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          <button type="button" className="adm-btn adm-btn-ghost" disabled={uploading} onClick={() => input.current?.click()}>
            {value ? <RefreshCw aria-hidden="true" /> : <ImagePlus aria-hidden="true" />}{value ? 'Replace' : 'Upload image'}
          </button>
          {value && <button type="button" className="adm-btn adm-btn-quiet" disabled={uploading} onClick={() => onChange('')}><Trash2 aria-hidden="true" />Remove</button>}
          <span className="adm-hint">{value ? 'Removing restores the default image.' : 'JPEG, PNG, WebP or GIF, up to 8 MB.'}</span>
        </div>
      </div>
      {help && <span className="adm-hint">{help}</span>}
      {error && <span className="adm-error">{error}</span>}
    </div>
  )
}
