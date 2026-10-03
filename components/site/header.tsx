'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { nav, site } from '@/lib/site'
import { Cta, Logo, vars } from './ui'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    document.querySelectorAll('main, footer').forEach((el) => ((el as HTMLElement).inert = open))
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const current = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <header className="hdr" data-scrolled={scrolled || open} data-open={open}>
        <div className="frame hdr-bar">
          <Link href="/" className="brand" aria-label="WIMs home"><Logo /></Link>
          <nav className="hdr-nav" aria-label="Main">
            {nav.map((item) => <Link key={item.href} href={item.href} aria-current={current(item.href) ? 'page' : undefined}>{item.label}</Link>)}
          </nav>
          <div className="hdr-actions">
            <a className="hdr-nas" href={site.nas} target="_blank" rel="noreferrer">NAS<ArrowUpRight aria-hidden="true" /><span className="sr-only"> community (opens in a new tab)</span></a>
            <Cta href={site.nas} size="sm">Join the community</Cta>
          </div>
          <button className="burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu">
            <span className="burger-label">{open ? 'Close' : 'Menu'}</span>
            <span className="burger-lines" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
      </header>

      <div id="menu" className="menu" data-open={open} inert={!open}>
        <nav className="frame menu-nav" aria-label="Mobile">
          {nav.map((item, i) => <Link key={item.href} href={item.href} style={vars({ i })} aria-current={current(item.href) ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        <div className="frame menu-foot">
          <Cta href={site.nas}>Join the community</Cta>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </>
  )
}
