import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import { loaderScript } from '@/components/site/loader'
import { getContent } from '@/lib/content'
import { siteUrl } from '@/lib/site'
import './globals.css'

// Display: DM Serif Display (high-contrast editorial serif). Interface and body: Manrope.
const display = DM_Serif_Display({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-display', display: 'swap' })
const sans = Manrope({ subsets: ['latin'], variable: '--font-ui', display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  const { settings, home, seo } = await getContent()
  const title = `${settings.name} — ${home.heroLines.join(' ')}`
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${settings.name}` },
    description: settings.description,
    applicationName: settings.name,
    keywords: seo.keywords,
    alternates: { canonical: '/' },
    openGraph: { type: 'website', siteName: settings.name, title, description: settings.description, url: '/' },
    twitter: { card: 'summary_large_image', title, description: settings.description },
    icons: {
      icon: [{ url: '/brand/icon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' }],
      apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
    },
  }
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#000000', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
