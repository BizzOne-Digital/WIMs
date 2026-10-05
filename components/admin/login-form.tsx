'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const d = new FormData(e.currentTarget)
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: d.get('email'), password: d.get('password') }) })
    const data = await res.json().catch(() => ({}))
    if (res.ok) return router.replace('/admin')
    setError(data.error ?? 'Sign-in failed.')
    setBusy(false)
  }

  return (
    <form className="adm-login-form" onSubmit={submit}>
      <label className="adm-field"><span className="adm-label">Email</span><input name="email" type="email" autoComplete="username" required autoFocus /></label>
      <label className="adm-field"><span className="adm-label">Password</span><input name="password" type="password" autoComplete="current-password" required /></label>
      {error && <p className="adm-error" role="alert">{error}</p>}
      <button className="adm-btn adm-btn-wide" type="submit" disabled={busy}><LogIn aria-hidden="true" />{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  )
}
