import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import { Ambient } from '@/components/site/ambient'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { Loader, loaderScript } from '@/components/site/loader'
import { Motion } from '@/components/site/motion'
import { copy, site } from '@/lib/site'
import './globals.css'

// Display: DM Serif Display (high-contrast editorial serif). Interface and body: Manrope.
const display = DM_Serif_Display({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-display', display: 'swap' })
const sans = Manrope({ subsets: ['latin'], variable: '--font-ui', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `WIMs — ${copy.heroTitle}`, template: '%s — WIMs' },
  description: site.description,
  applicationName: 'WIMs',
  keywords: ['WIMs', 'Waterloo Institute of Management Solutions', 'AI education', 'AI community', 'AI lead generation', 'NAS community', 'entrepreneurs', 'small business AI'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: 'WIMs', title: `WIMs — ${copy.heroTitle}`, description: site.description, url: '/' },
  twitter: { card: 'summary_large_image', title: `WIMs — ${copy.heroTitle}`, description: site.description },
  icons: {
    icon: [{ url: '/brand/icon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#000000', width: 'device-width', initialScale: 1 }

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'WIMs',
  alternateName: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/wims-logo.png`,
  email: site.email,
  description: site.description,
  sameAs: [site.nas, site.social.youtube],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Loader />
        <Ambient />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Motion />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
