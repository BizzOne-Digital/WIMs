import { getContent } from '@/lib/content'
import { routes, siteUrl } from '@/lib/site'
import { Ambient } from './ambient'
import { Footer } from './footer'
import { Header } from './header'
import { Loader } from './loader'
import { Motion } from './motion'

// Public site chrome: splash, animated background, header, footer, reveal system.
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const content = await getContent()
  const { settings, navigation } = content
  const nav = routes.map((r) => ({ href: r.href, label: navigation[r.key] }))
  const orgJsonLd = { '@context': 'https://schema.org', '@type': 'Organization', name: settings.name, alternateName: settings.legalName, url: siteUrl, logo: `${siteUrl}/brand/wims-logo.png`, email: settings.email, description: settings.description, sameAs: [settings.nasUrl, settings.youtubeUrl].filter(Boolean) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, '\\u003c') }} />
      <a className="skip-link" href="#main">Skip to content</a>
      <Loader legalName={settings.legalName} />
      <Ambient />
      <Header nav={nav} nasUrl={settings.nasUrl} nasLabel={navigation.nasLink} joinCta={navigation.joinCta} email={settings.email} />
      <main id="main">{children}</main>
      <Footer content={content} nav={nav} />
      <Motion />
    </>
  )
}
