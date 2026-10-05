import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteShell } from '@/components/site/shell'
import { Cta } from '@/components/site/ui'
import { getContent } from '@/lib/content'
import { routes } from '@/lib/site'

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } }

// Global 404: renders inside the public site chrome.
export default async function NotFound() {
  const { notFound, navigation } = await getContent()
  return (
    <SiteShell>
      <section className="lost" aria-labelledby="lost-title">
        <div className="frame lost-inner">
          <svg className="lost-net" viewBox="0 0 640 200" aria-hidden="true">
            <path className="lost-a" d="M20 140 L120 60 L230 120 L300 80" pathLength="1" />
            <path className="lost-b" d="M360 110 L440 50 L540 130 L620 70" pathLength="1" />
            {[[20, 140], [120, 60], [230, 120], [300, 80], [360, 110], [440, 50], [540, 130], [620, 70]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.5" />)}
            <circle className="lost-gap" cx="330" cy="95" r="14" />
          </svg>
          <p className="lost-code">{notFound.code}</p>
          <h1 id="lost-title" className="lost-title">{notFound.title}</h1>
          <p className="lede">{notFound.text}</p>
          <div className="lost-ctas">
            <Cta href="/">{notFound.homeCta}</Cta>
            <Cta href="/contact" variant="ghost">{navigation.contactCta}</Cta>
          </div>
          <nav className="lost-links" aria-label="Pages">{routes.slice(1).map((r) => <Link key={r.href} href={r.href}>{navigation[r.key]}</Link>)}</nav>
        </div>
      </section>
    </SiteShell>
  )
}
