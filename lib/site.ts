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
// Add { title, name, role, src: '/videos/x.mp4', poster: '/videos/x.jpg' } or { title, youtube: '<video id>' }.
export type Testimonial = { title: string; name?: string; role?: string; src?: string; poster?: string; youtube?: string }
export const testimonials: Testimonial[] = [
  { title: 'Building a business of my own', role: 'Entrepreneur story', src: '/vids/WIMS%20Entrepreneur%20testimonial%20video.mp4', poster: '/vids/WIMS%20Entrepreneur%20testimonial%20video.jpg' },
  { title: 'Taking control of my own money', role: 'Member story', src: '/vids/Wims%202nd%20testimonial.mp4', poster: '/vids/Wims%202nd%20testimonial.jpg' },
  { title: 'Member story', youtube: 'cVfSWCpf6Nw' },
]
