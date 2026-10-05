'use client'

import { ArrowDown, ArrowUp, Plus, X } from 'lucide-react'
import { getAt, setAt, type Field } from '@/lib/content/schema'
import { ImageField } from './image-field'

type Errors = Record<string, string>
const clone = <T,>(v: T): T => structuredClone(v)
const move = <T,>(list: T[], from: number, to: number) => { const next = [...list]; const [x] = next.splice(from, 1); next.splice(to, 0, x); return next }
const emptyItem = (fields: Field[]) => fields.reduce((o, f) => setAt(o, f.key, f.type === 'strings' || f.type === 'items' ? [] : ''), {} as Record<string, unknown>)

function ListControls({ index, count, onMove, onRemove, label }: { index: number; count: number; onMove: (to: number) => void; onRemove: () => void; label: string }) {
  return (
    <div className="adm-list-controls">
      <button type="button" className="adm-icon-btn" disabled={index === 0} onClick={() => onMove(index - 1)} aria-label={`Move ${label} up`}><ArrowUp /></button>
      <button type="button" className="adm-icon-btn" disabled={index === count - 1} onClick={() => onMove(index + 1)} aria-label={`Move ${label} down`}><ArrowDown /></button>
      <button type="button" className="adm-icon-btn adm-icon-danger" onClick={onRemove} aria-label={`Remove ${label}`}><X /></button>
    </div>
  )
}

// Renders the editor for one schema field. `path` is the field's location in the section value (for error lookup).
export function FieldInput({ field, value, onChange, path, errors }: { field: Field; value: unknown; onChange: (v: unknown) => void; path: string; errors: Errors }) {
  const id = `f-${path.replace(/\W/g, '-')}`
  const error = errors[path]
  const label = <label className="adm-label" htmlFor={id}>{field.label}{field.required && <span aria-hidden="true"> *</span>}</label>

  if (field.type === 'image') return <ImageField id={id} label={field.label} help={field.help} folder={field.folder} value={(value as string) ?? ''} onChange={onChange} error={error} />

  if (field.type === 'text' || field.type === 'textarea' || field.type === 'url' || field.type === 'email') {
    const max = 'max' in field ? field.max : undefined
    const v = (value as string) ?? ''
    const common = { id, value: v, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value), 'aria-invalid': !!error, maxLength: max }
    return (
      <div className="adm-field">
        {label}
        {field.type === 'textarea' ? <textarea {...common} rows={Math.min(14, Math.max(3, Math.ceil(v.length / 90)))} /> : <input {...common} type={field.type === 'text' ? 'text' : field.type} />}
        <div className="adm-meta">{field.help && <span className="adm-hint">{field.help}</span>}{max && <span className="adm-count">{v.length}/{max}</span>}</div>
        {error && <span className="adm-error">{error}</span>}
      </div>
    )
  }

  if (field.type === 'strings') {
    const list = (value as string[]) ?? []
    const noun = field.itemLabel ?? 'item'
    return (
      <fieldset className="adm-field adm-group">
        <legend className="adm-label">{field.label}{field.required && <span aria-hidden="true"> *</span>}</legend>
        {field.help && <span className="adm-hint">{field.help}</span>}
        <ol className="adm-strings">
          {list.map((item, i) => (
            <li key={i}>
              <input value={item} maxLength={field.max} aria-label={`${noun} ${i + 1}`} onChange={(e) => { const next = [...list]; next[i] = e.target.value; onChange(next) }} />
              <ListControls index={i} count={list.length} label={`${noun} ${i + 1}`} onMove={(to) => onChange(move(list, i, to))} onRemove={() => onChange(list.filter((_, j) => j !== i))} />
            </li>
          ))}
        </ol>
        {(!field.maxItems || list.length < field.maxItems) && <button type="button" className="adm-btn adm-btn-quiet" onClick={() => onChange([...list, ''])}><Plus aria-hidden="true" />Add {noun.toLowerCase()}</button>}
        {error && <span className="adm-error">{error}</span>}
      </fieldset>
    )
  }

  const items = (value as Record<string, unknown>[]) ?? []
  return (
    <fieldset className="adm-field adm-group">
      <legend className="adm-label">{field.label}</legend>
      <div className="adm-items">
        {items.map((item, i) => (
          <div key={i} className="adm-item">
            <div className="adm-item-head">
              <span>{field.itemLabel} {i + 1}{typeof (item as Record<string, unknown>)[field.fields[0].key] === 'string' && (item as Record<string, string>)[field.fields[0].key] ? ` · ${(item as Record<string, string>)[field.fields[0].key].slice(0, 60)}` : ''}</span>
              <ListControls index={i} count={items.length} label={`${field.itemLabel} ${i + 1}`} onMove={(to) => onChange(move(items, i, to))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
            </div>
            {field.fields.map((sub) => (
              <FieldInput key={sub.key} field={sub} path={`${path}.${i}.${sub.key}`} errors={errors} value={getAt(item, sub.key)}
                onChange={(v) => { const next = clone(items); setAt(next[i], sub.key, v); onChange(next) }} />
            ))}
          </div>
        ))}
      </div>
      {(!field.maxItems || items.length < field.maxItems) && <button type="button" className="adm-btn adm-btn-quiet" onClick={() => onChange([...items, emptyItem(field.fields)])}><Plus aria-hidden="true" />Add {field.itemLabel.toLowerCase()}</button>}
    </fieldset>
  )
}
