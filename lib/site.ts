// Single source for all client content. Copy marked "verbatim" is client-supplied and must not be reworded.
// To add client assets: drop files in /public and fill the `images` / `testimonials` entries below.

export const site = {
  name: 'WIMs',
  legalName: 'Waterloo Institute of Management Solutions',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  email: 'waterlooinstitute.ms@gmail.com',
  nas: 'https://nas.com/wims',
  nasLabel: 'nas.com/wims',
  social: { handle: '@chiefsaqifwims', youtube: 'https://youtube.com/@chiefsaqif?si=YcI0_g7gDAh3ZjxT' },
  // Optional: set NEXT_PUBLIC_INQUIRY_ENDPOINT to a URL that accepts a JSON POST. Without it, the form hands off to email.
  inquiryEndpoint: process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT,
  description: 'The next generation of AI-powered education, business tools, and opportunities — all in one platform',
}

export const copy = {
  // verbatim
  heroTitle: 'Learn. Build. Grow. With AI.',
  heroLines: ['Learn. Build.', 'Grow. With AI.'],
  heroDeck: 'The next generation of AI-powered education, business tools, and opportunities — all in one platform',
  intro: 'WIMs is an ed tech startup and a private community for professionals and entrepreneurs looking to use AI to grow their income, careers, and businesses.',
  pillars: ['Learn AI.', 'Build Skills.', 'Create Income Streams.'],
  members: 'Our members include professionals who work at, or have gone on to join, leading companies such as Nasdaq, Amazon, Marriott International, Leadpoet, and Aramark.',
  benefits: 'Members also receive access to discounts, credits, and benefits for state-of-the-art AI tools and models through WIM’s partnerships with leading technology companies.',
  guidance: 'In addition, they gain practical strategies, peer support, and ongoing guidance to confidently apply AI across areas such as marketing and sales.',
  service: 'AI lead generation services',
  trusted: 'Trusted by professionals from organizations including Marriott International, Leadpoet, Aramark, and Amazon',
}

export const companies = ['Nasdaq', 'Amazon', 'Marriott International', 'Leadpoet', 'Aramark']

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const faqs = [
  { q: 'What is WIMs?', a: 'WIMs is an ed tech startup and a private community for professionals and entrepreneurs looking to use AI to grow their income, careers, and businesses.' },
  { q: 'Who is the community for?', a: 'WIMs is for entrepreneurs, university students, and small business owners who want to learn AI, build skills, and create income streams.' },
  { q: 'What do members receive?', a: 'Members receive access to discounts, credits, and benefits for state-of-the-art AI tools and models through WIM’s partnerships with leading technology companies. In addition, they gain practical strategies, peer support, and ongoing guidance to confidently apply AI across areas such as marketing and sales.' },
  { q: 'What are the AI lead generation services?', a: 'WIMs offers AI lead generation services for organizations looking to explore AI-powered business opportunities. Contact WIMs to discuss your needs.' },
  { q: 'How much do the AI lead generation services cost?', a: 'Pricing is custom. Contact WIMs for pricing.' },
  { q: 'Is there a discount for WIMs AI Club members?', a: 'Yes. Customers who join the WIMs AI Club receive a discount on the AI lead generation services.' },
  { q: 'How do I access the WIMs community on NAS?', a: 'Visit the WIMs community on NAS at https://nas.com/wims.' },
]

// Art-directed image slots. `src: null` renders the designed fallback instead of a stock photo.
export const images = {
  hero: { src: '/wims-hero.png', alt: 'A WIMs professional standing in a dark glass studio crossed by lines of golden light', width: 1376, height: 768 },
  // Inner-page hero backgrounds: art-directed crops of the hero photo (public/images/). Replace src with client photos as they arrive.
  architecture: { src: '/images/wims-architecture.jpg', alt: '' },
  network: { src: '/images/wims-network.jpg', alt: '' },
  studio: { src: '/images/wims-studio.jpg', alt: '' },
  stair: { src: '/images/wims-stair.jpg', alt: '' },
}
export type SectionImageName = 'architecture' | 'network' | 'studio' | 'stair'

// Client testimonial videos. Add { title, name, role, src: '/videos/x.mp4', poster: '/videos/x.jpg' }.
export type Testimonial = { title: string; name?: string; role?: string; src?: string; poster?: string }
export const testimonials: Testimonial[] = [
  { title: 'Member story' },
  { title: 'Member story' },
  { title: 'Member story' },
]
