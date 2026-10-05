import Link from 'next/link'
import type { Content } from '@/lib/content'
import type { NavItem } from './header'
import { Logo } from './ui'

export function Footer({ content, nav }: { content: Content; nav: NavItem[] }) {
  const { settings, footer, legal } = content
  return (
    <footer className="ftr">
      <div className="frame ftr-top">
        <div className="ftr-brand">
          <Link href="/" className="brand" aria-label={`${settings.name} home`}><Logo size="lg" /></Link>
          <p>{settings.legalName}</p>
          <p className="ftr-deck">{settings.description}</p>
        </div>
        <nav className="ftr-col" aria-label="Footer">
          <h2>{footer.exploreLabel}</h2>
          {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="ftr-col">
          <h2>{footer.communityLabel}</h2>
          <a href={settings.nasUrl} target="_blank" rel="noreferrer">{settings.nasLabel}<span className="sr-only"> (opens in a new tab)</span></a>
          {settings.youtubeUrl && <a href={settings.youtubeUrl} target="_blank" rel="noreferrer">YouTube<span className="sr-only"> (opens in a new tab)</span></a>}
          {settings.socialHandle && <span>{settings.socialHandle}</span>}
        </div>
        <div className="ftr-col">
          <h2>{footer.contactLabel}</h2>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <Link href="/contact">{footer.inquiryLink}</Link>
        </div>
      </div>
      <div className="frame ftr-bottom">
        <span>© {new Date().getFullYear()} {settings.name}. {footer.rights}</span>
        <div><Link href="/privacy">{legal.privacy.title}</Link><Link href="/terms">{legal.terms.title}</Link></div>
      </div>
    </footer>
  )
}
