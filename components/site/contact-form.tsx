'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import type { Content } from '@/lib/content'

type Status = 'idle' | 'sending' | 'sent' | 'handoff' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

function validate(d: FormData): Errors {
  const e: Errors = {}
  if (!String(d.get('name')).trim()) e.name = 'Enter your name.'
  const email = String(d.get('email')).trim()
  if (!email) e.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter an email address like name@company.com.'
  if (String(d.get('message')).trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).'
  return e
}

// Inquiries are saved to the database (see /admin/inquiries). If the database isn't configured yet,
// the inquiry is handed to the visitor's email app instead, so it still reaches WIMs.
async function submitInquiry(data: Record<string, string>, email: string): Promise<'sent' | 'handoff'> {
  const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (res.ok) return 'sent'
  if (res.status !== 503) throw new Error(String(res.status))
  const body = `${data.message}\n\n${data.name}${data.organization ? `, ${data.organization}` : ''}\n${data.email}\nInterested in: ${data.interest}`
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(`WIMs inquiry: ${data.interest}`)}&body=${encodeURIComponent(body)}`
  return 'handoff'
}

export function ContactForm({ email, copy }: { email: string; copy: Content['contact'] }) {
  const interests = copy.interests
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [interest, setInterest] = useState(interests[0])
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('interest') !== 'lead-generation') return
    setInterest(interests.find((o) => /lead/i.test(o)) ?? interests[0])
  }, [interests])

  function checkField(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!form.current) return
    const name = e.target.name as keyof Errors
    const next = validate(new FormData(form.current))[name]
    setErrors((prev) => ({ ...prev, [name]: next }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const found = validate(d)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) return e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
    setStatus('sending')
    try {
      setStatus(await submitInquiry(Object.fromEntries([...d.entries()].map(([k, v]) => [k, String(v).trim()])), email))
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent' || status === 'handoff') {
    return (
      <div className="form-done" role="status">
        <span className="form-done-icon"><Check aria-hidden="true" /></span>
        <h2>{status === 'sent' ? copy.successTitle : 'Your email app is open.'}</h2>
        <p>{status === 'sent' ? copy.successText : `Your inquiry is written and addressed to ${email}. Send it from your email app to reach the WIMs team.`}</p>
        <button className="link-btn" type="button" onClick={() => setStatus('idle')}>Write another inquiry</button>
      </div>
    )
  }

  const field = (name: keyof Errors) => ({ name, 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined, onBlur: checkField })
  const error = (name: keyof Errors) => <span className="field-error" id={`${name}-error`} aria-live="polite">{errors[name]}</span>

  return (
    <form ref={form} className="inquiry" onSubmit={onSubmit} noValidate data-status={status}>
      <fieldset className="choice">
        <legend>{copy.interestLabel}</legend>
        <div className="choice-row">
          {interests.map((option) => (
            <label key={option} className="choice-opt">
              <input type="radio" name="interest" value={option} checked={interest === option} onChange={() => setInterest(option)} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field-pair">
        <label className="field"><span>{copy.nameField}</span><input {...field('name')} autoComplete="name" />{error('name')}</label>
        <label className="field"><span>{copy.emailField}</span><input {...field('email')} type="email" autoComplete="email" inputMode="email" />{error('email')}</label>
      </div>
      <label className="field"><span>{copy.organizationField} <em>(optional)</em></span><input name="organization" autoComplete="organization" /></label>
      {/* Honeypot: invisible to people, filled in by bots. */}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="field"><span>{copy.messageField}</span><textarea {...field('message')} rows={5} />{error('message')}</label>
      {status === 'error' && <p className="form-error" role="alert">The inquiry didn’t send. Try again, or email <a href={`mailto:${email}`}>{email}</a> directly.</p>}
      <button className="cta cta-solid form-submit" type="submit" disabled={status === 'sending'}>
        <span className="cta-label">{status === 'sending' ? `${copy.submitLabel}…` : copy.submitLabel}</span>
        <span className="cta-icon" aria-hidden="true"><ArrowRight /></span>
      </button>
    </form>
  )
}
