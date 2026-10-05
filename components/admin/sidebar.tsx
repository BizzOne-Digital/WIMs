'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ExternalLink, Inbox, LayoutDashboard, LogOut } from 'lucide-react'

type Group = { name: string; items: { id: string; title: string }[] }

export function Sidebar({ groups, unread }: { groups: Group[]; unread: number }) {
  const pathname = usePathname()
  const router = useRouter()
  const link = (href: string, children: React.ReactNode) => <Link href={href} aria-current={pathname === href ? 'page' : undefined}>{children}</Link>

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <aside className="adm-side">
      <Link href="/admin" className="adm-brand" aria-label="WIMs admin home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/wims-globe.png" alt="" width={30} height={30} />
        <span>WIMs <em>Admin</em></span>
      </Link>
      <nav className="adm-nav" aria-label="Admin">
        <div className="adm-nav-group">
          {link('/admin', <><LayoutDashboard aria-hidden="true" />Dashboard</>)}
          {link('/admin/inquiries', <><Inbox aria-hidden="true" />Inquiries{unread > 0 && <span className="adm-badge" aria-label={`${unread} unread`}>{unread}</span>}</>)}
        </div>
        {groups.map((g) => (
          <div key={g.name} className="adm-nav-group">
            <p>{g.name}</p>
            {g.items.map((s) => <span key={s.id}>{link(`/admin/content/${s.id}`, s.title)}</span>)}
          </div>
        ))}
      </nav>
      <div className="adm-side-foot">
        <a href="/" target="_blank" rel="noreferrer"><ExternalLink aria-hidden="true" />View website</a>
        <button type="button" onClick={logout}><LogOut aria-hidden="true" />Sign out</button>
      </div>
    </aside>
  )
}
