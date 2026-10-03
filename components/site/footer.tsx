import Link from 'next/link'
import { copy, nav, site } from '@/lib/site'
import { Logo } from './ui'

export function Footer() {
  return (
    <footer className="ftr">
      <div className="frame ftr-top">
        <div className="ftr-brand">
          <Link href="/" className="brand" aria-label="WIMs home"><Logo size="lg" /></Link>
          <p>{site.legalName}</p>
          <p className="ftr-deck">{copy.heroDeck}</p>
        </div>
        <nav className="ftr-col" aria-label="Footer">
          <h2>Explore</h2>
          {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="ftr-col">
          <h2>Community</h2>
          <a href={site.nas} target="_blank" rel="noreferrer">{site.nasLabel}<span className="sr-only"> (opens in a new tab)</span></a>
          <a href={site.social.youtube} target="_blank" rel="noreferrer">YouTube<span className="sr-only"> (opens in a new tab)</span></a>
          <span>{site.social.handle}</span>
        </div>
        <div className="ftr-col">
          <h2>Contact</h2>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/contact">Send an inquiry</Link>
        </div>
      </div>
      <div className="frame ftr-bottom">
        <span>© {new Date().getFullYear()} WIMs. All rights reserved.</span>
        <div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link></div>
      </div>
    </footer>
  )
}
