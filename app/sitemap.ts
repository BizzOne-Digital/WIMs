import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/services', '/testimonials', '/faq', '/contact', '/privacy', '/terms']
  return pages.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), priority: path === '' ? 1 : path.startsWith('/privacy') || path.startsWith('/terms') ? 0.3 : 0.8 }))
}
