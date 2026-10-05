'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, RotateCcw, Save } from 'lucide-react'
import { getAt, setAt, type Section } from '@/lib/content/schema'
import { FieldInput } from './fields'
import { useToast } from './toast'

export function SectionEditor({ section, initial, dbReady }: { section: Section; initial: Record<string, unknown>; dbReady: boolean }) {
  const [saved, setSaved] = useState(initial)
  const [value, setValue] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const toast = useToast()
  const dirty = useMemo(() => JSON.stringify(value) !== JSON.stringify(saved), [value, saved])

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  async function save() {
    setSaving(true)
    setErrors({})
    try {
      const res = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: section.id, data: value }) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (Array.isArray(data.errors)) setErrors(Object.fromEntries(data.errors.map((e: { key: string; message: string }) => [e.key, e.message])))
        throw new Error(data.error ?? 'Could not save.')
      }
      setSaved(value)
      toast('success', 'Saved. Your changes are live.')
    } catch (e) {
      toast('error', (e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="adm-editor" onSubmit={(e) => { e.preventDefault(); save() }}>
      {!dbReady && <p className="adm-notice">The database isn’t connected yet, so changes can’t be saved. Add <code>MONGODB_URI</code> to <code>.env.local</code> and restart.</p>}
      <div className="adm-card adm-fields">
        {section.fields.map((f) => (
          <FieldInput key={f.key} field={f} path={f.key} errors={errors} value={getAt(value, f.key)}
            onChange={(v) => setValue((prev) => setAt(structuredClone(prev), f.key, v))} />
        ))}
      </div>
      <div className="adm-savebar">
        <span className="adm-hint">{dirty ? 'You have unsaved changes.' : 'All changes saved.'}</span>
        <div className="adm-savebar-actions">
          {section.preview && <Link className="adm-btn adm-btn-quiet" href={section.preview} target="_blank"><ExternalLink aria-hidden="true" />View page</Link>}
          <button type="button" className="adm-btn adm-btn-ghost" disabled={!dirty || saving} onClick={() => { setValue(saved); setErrors({}) }}><RotateCcw aria-hidden="true" />Discard</button>
          <button type="submit" className="adm-btn" disabled={!dirty || saving || !dbReady}><Save aria-hidden="true" />{saving ? 'Saving…' : 'Save changes'}</button>
        </div>
      </div>
    </form>
  )
}
