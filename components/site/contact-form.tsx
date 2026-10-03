'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { site } from '@/lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'handoff' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const interests = ['WIMs community', 'AI lead generation services', 'Both']

function validate(d: FormData): Errors {
  const e: Errors = {}
  if (!String(d.get('name')).trim()) e.name = 'Enter your name.'
  const email = String(d.get('email')).trim()
  if (!email) e.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter an email address like name@company.com.'
  if (String(d.get('message')).trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).'
  return e
}

// Connect a backend by setting NEXT_PUBLIC_INQUIRY_ENDPOINT (JSON POST). Without one, the inquiry
// is handed to the visitor's email app so it still reaches WIMs.
async function submitInquiry(data: Record<string, string>): Promise<'sent' | 'handoff'> {
  if (site.inquiryEndpoint) {
    const res = await fetch(site.inquiryEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) throw new Error(String(res.status))
    return 'sent'
  }
  const body = `${data.message}\n\n${data.name}${data.organization ? `, ${data.organization}` : ''}\n${data.email}\nInterested in: ${data.interest}`
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`WIMs inquiry: ${data.interest}`)}&body=${encodeURIComponent(body)}`
  return 'handoff'
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [interest, setInterest] = useState(interests[0])
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('interest') === 'lead-generation') setInterest(interests[1])
  }, [])

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
      setStatus(await submitInquiry(Object.fromEntries([...d.entries()].map(([k, v]) => [k, String(v).trim()]))))
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent' || status === 'handoff') {
    return (
      <div className="form-done" role="status">
        <span className="form-done-icon"><Check aria-hidden="true" /></span>
        <h2>{status === 'sent' ? 'Inquiry sent.' : 'Your email app is open.'}</h2>
        <p>{status === 'sent' ? 'Thank you. The WIMs team will reply to the email address you provided.' : `Your inquiry is written and addressed to ${site.email}. Send it from your email app to reach the WIMs team.`}</p>
        <button className="link-btn" type="button" onClick={() => setStatus('idle')}>Write another inquiry</button>
      </div>
    )
  }

  const field = (name: keyof Errors) => ({ name, 'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined, onBlur: checkField })
  const error = (name: keyof Errors) => <span className="field-error" id={`${name}-error`} aria-live="polite">{errors[name]}</span>

  return (
    <form ref={form} className="inquiry" onSubmit={onSubmit} noValidate data-status={status}>
      <fieldset className="choice">
        <legend>I’m interested in</legend>
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
        <label className="field"><span>Name</span><input {...field('name')} autoComplete="name" />{error('name')}</label>
        <label className="field"><span>Email</span><input {...field('email')} type="email" autoComplete="email" inputMode="email" />{error('email')}</label>
      </div>
      <label className="field"><span>Organization <em>(optional)</em></span><input name="organization" autoComplete="organization" /></label>
      <label className="field"><span>What are you building?</span><textarea {...field('message')} rows={5} />{error('message')}</label>
      {status === 'error' && <p className="form-error" role="alert">The inquiry didn’t send. Try again, or email <a href={`mailto:${site.email}`}>{site.email}</a> directly.</p>}
      <button className="cta cta-solid form-submit" type="submit" disabled={status === 'sending'}>
        <span className="cta-label">{status === 'sending' ? 'Sending inquiry…' : 'Send inquiry'}</span>
        <span className="cta-icon" aria-hidden="true"><ArrowRight /></span>
      </button>
    </form>
  )
}
