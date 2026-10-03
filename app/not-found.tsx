import type { Metadata } from 'next'
import Link from 'next/link'
import { Cta } from '@/components/site/ui'
import { nav } from '@/lib/site'

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <section className="lost" aria-labelledby="lost-title">
      <div className="frame lost-inner">
        <svg className="lost-net" viewBox="0 0 640 200" aria-hidden="true">
          <path className="lost-a" d="M20 140 L120 60 L230 120 L300 80" pathLength="1" />
          <path className="lost-b" d="M360 110 L440 50 L540 130 L620 70" pathLength="1" />
          {[[20, 140], [120, 60], [230, 120], [300, 80], [360, 110], [440, 50], [540, 130], [620, 70]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.5" />)}
          <circle className="lost-gap" cx="330" cy="95" r="14" />
        </svg>
        <p className="lost-code">404</p>
        <h1 id="lost-title" className="lost-title">This page isn’t part of the network.</h1>
        <p className="lede">The link may be broken, or the page may have moved. Everything else is one step away.</p>
        <div className="lost-ctas">
          <Cta href="/">Return to WIMs</Cta>
          <Cta href="/contact" variant="ghost">Contact WIMs</Cta>
        </div>
        <nav className="lost-links" aria-label="Pages">{nav.slice(1).map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}</nav>
      </div>
    </section>
  )
}
