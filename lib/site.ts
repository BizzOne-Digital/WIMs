// Static, code-level site configuration. All editable copy lives in lib/content (managed from /admin).

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

// Routes are fixed; their labels come from content.navigation.
export const routes = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'testimonials', href: '/testimonials' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
] as const

// Testimonial videos are hard-coded by design (not managed in the admin).
// Add { title, name, role, src: '/videos/x.mp4', poster: '/videos/x.jpg' }.
export type Testimonial = { title: string; name?: string; role?: string; src?: string; poster?: string }
export const testimonials: Testimonial[] = [
  { title: 'Member story' },
  { title: 'Member story' },
  { title: 'Member story' },
]
