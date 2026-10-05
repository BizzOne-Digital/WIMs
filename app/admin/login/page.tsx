import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/login-form'
import { authConfigured, isAdmin } from '@/lib/auth'

export const metadata: Metadata = { title: 'Sign in' }

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin')
  return (
    <main className="adm-login">
      <div className="adm-login-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/wims-globe.png" alt="" width={56} height={56} />
        <h1>WIMs Admin</h1>
        <p>Sign in to manage the website.</p>
        {authConfigured() ? <LoginForm /> : (
          <div className="adm-notice">
            Admin sign-in isn’t configured yet. Add <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> (32+ characters) to <code>.env.local</code>, then restart the server.
          </div>
        )}
      </div>
    </main>
  )
}
