// One schema drives both the admin editor UI and server-side validation of every save.
export const uploadFolders = ['products', 'gallery', 'pages', 'misc'] as const
export type UploadFolder = (typeof uploadFolders)[number]

type Base = { key: string; label: string; help?: string; required?: boolean }
export type Field =
  | (Base & { type: 'text'; max?: number })
  | (Base & { type: 'textarea'; max?: number })
  | (Base & { type: 'url' })
  | (Base & { type: 'email' })
  | (Base & { type: 'image'; folder: UploadFolder })
  | (Base & { type: 'strings'; max?: number; maxItems?: number; itemLabel?: string })
  | (Base & { type: 'items'; fields: Field[]; itemLabel: string; maxItems?: number })

export type Section = { id: string; group: string; title: string; description: string; path: string; preview?: string; fields: Field[] }

const t = (key: string, label: string, extra: Partial<Base & { max: number }> = {}): Field => ({ type: 'text', key, label, ...extra })
const ta = (key: string, label: string, extra: Partial<Base & { max: number }> = {}): Field => ({ type: 'textarea', key, label, ...extra })
const img = (key: string, label: string, help?: string): Field => ({ type: 'image', key, label, folder: 'pages', help })
const seo = (page: string, label: string): Field[] => [t(`pages.${page}.title`, `${label}: page title`, { required: true, max: 70 }), ta(`pages.${page}.description`, `${label}: meta description`, { max: 200, help: 'Shown in Google results. Aim for 120–160 characters.' })]

export const sections: Section[] = [
  {
    id: 'general', group: 'Site', title: 'General settings', path: 'settings', preview: '/',
    description: 'Brand name, contact details and community links used across every page.',
    fields: [
      t('name', 'Brand name', { required: true }), t('legalName', 'Full institute name', { required: true }),
      { type: 'email', key: 'email', label: 'Contact email', required: true },
      { type: 'url', key: 'nasUrl', label: 'NAS community URL', required: true }, t('nasLabel', 'NAS link text'),
      t('socialHandle', 'Social handle'), { type: 'url', key: 'youtubeUrl', label: 'YouTube URL' }, t('youtubeLabel', 'YouTube link text'),
      ta('description', 'Site description', { max: 300, help: 'Default meta description and footer tagline.' }),
    ],
  },
  {
    id: 'navigation', group: 'Site', title: 'Navigation & buttons', path: 'navigation', preview: '/',
    description: 'Menu labels and the shared call-to-action buttons.',
    fields: [t('home', 'Home link', { required: true }), t('services', 'Services link', { required: true }), t('testimonials', 'Testimonials link', { required: true }), t('faq', 'FAQ link', { required: true }), t('contact', 'Contact link', { required: true }), t('nasLink', 'NAS header link'), t('joinCta', 'Join button label', { required: true }), t('contactCta', 'Contact button label', { required: true })],
  },
  {
    id: 'seo', group: 'Site', title: 'SEO', path: 'seo',
    description: 'Search keywords and the title and description of each inner page.',
    fields: [{ type: 'strings', key: 'keywords', label: 'Keywords', itemLabel: 'Keyword', maxItems: 30, max: 60 }, ...seo('services', 'Services'), ...seo('testimonials', 'Testimonials'), ...seo('faq', 'FAQ'), ...seo('contact', 'Contact'), ...seo('privacy', 'Privacy'), ...seo('terms', 'Terms')],
  },
  {
    id: 'home-hero', group: 'Home', title: 'Hero', path: 'home', preview: '/',
    description: 'The first screen: headline, supporting line, buttons and the two crossfading background images.',
    fields: [
      { type: 'strings', key: 'heroLines', label: 'Headline lines', itemLabel: 'Line', maxItems: 3, max: 40, required: true, help: 'Each line is set on its own row.' },
      ta('heroDeck', 'Supporting line', { required: true, max: 220 }),
      img('heroImage', 'Main background image'), t('heroImageAlt', 'Main image description (alt text)', { max: 160 }),
      img('heroAltImage', 'Second background image', 'Crossfades with the main image.'),
      t('heroSecondaryCta', 'Secondary button label'), t('heroAside', 'Small link under the buttons'),
    ],
  },
  {
    id: 'home-story', group: 'Home', title: 'About, members & community', path: 'home', preview: '/#about',
    description: 'What WIMs is, the three-step path, member companies and the NAS community section.',
    fields: [
      t('introLabel', 'About label'), ta('intro', 'About statement', { required: true }),
      { type: 'strings', key: 'pillars', label: 'Path steps', itemLabel: 'Step', maxItems: 6, max: 60 },
      t('membersLabel', 'Members label'), ta('members', 'Members statement'),
      { type: 'strings', key: 'companies', label: 'Member companies (large list)', itemLabel: 'Company', maxItems: 20, max: 60 },
      t('nasTitle', 'Community headline'), ta('benefits', 'Community paragraph 1'), ta('guidance', 'Community paragraph 2'),
      t('nasCta', 'Community button label'), t('portalCta', 'Community panel link text'),
    ],
  },
  {
    id: 'home-more', group: 'Home', title: 'Services banner, trust & closing', path: 'home', preview: '/',
    description: 'The services banner, the testimonials teaser and the closing headline.',
    fields: [t('serviceLabel', 'Services label'), t('servicePricingLine', 'Services banner line'), t('serviceCta', 'Services button label'), t('serviceLink', 'Services link label'), t('trustLabel', 'Testimonials label'), ta('trusted', 'Trusted-by statement'), t('trustCta', 'Testimonials link label'), t('closingTitle', 'Closing headline', { required: true })],
  },
  {
    id: 'club', group: 'Offers', title: 'WIMs AI Club', path: 'club', preview: '/services',
    description: 'The member advantage, the membership card and the list of AI Club benefits (shown on Home and Services).',
    fields: [
      t('label', 'Section label'), ta('offer', 'Offer statement', { required: true }), t('cta', 'Button label'),
      t('cardName', 'Card title'), t('cardLine', 'Card label'), t('cardPerk', 'Card highlight'),
      t('benefitsTitle', 'Benefits heading'), { type: 'strings', key: 'benefits', label: 'Benefits', itemLabel: 'Benefit', maxItems: 24, max: 60 },
    ],
  },
  {
    id: 'services', group: 'Pages', title: 'Services page', path: 'services', preview: '/services',
    description: 'Service name, hero, pricing note and the how-it-works steps.',
    fields: [
      t('name', 'Service name', { required: true }), ta('heroDeck', 'Hero supporting line'), img('heroImage', 'Hero background image'), t('cta', 'Button label'),
      t('pricingTitle', 'Pricing headline'), ta('pricingText', 'Pricing text'), t('stepsLabel', 'Steps label'),
      { type: 'items', key: 'steps', label: 'Steps', itemLabel: 'Step', maxItems: 8, fields: [t('title', 'Title', { required: true }), ta('text', 'Description')] },
      t('closingTitle', 'Closing headline'), t('closingSecondaryCta', 'Closing secondary button'),
    ],
  },
  {
    id: 'testimonials', group: 'Pages', title: 'Testimonials page', path: 'testimonialsPage', preview: '/testimonials',
    description: 'Page text and hero image. Testimonial videos are set in the code and are not managed here.',
    fields: [t('heroTitle', 'Hero headline', { required: true }), ta('heroDeck', 'Hero supporting line'), img('heroImage', 'Hero background image'), t('logosLabel', 'Logo row label'), t('closingTitle', 'Closing headline')],
  },
  {
    id: 'logos', group: 'Pages', title: 'Member logos', path: '', preview: '/testimonials',
    description: 'Company logos shown in the trust rows on Home and Testimonials. Use transparent PNGs on white.',
    fields: [{ type: 'items', key: 'logos', label: 'Logos', itemLabel: 'Logo', maxItems: 12, fields: [t('name', 'Company name', { required: true }), { type: 'image', key: 'image', label: 'Logo image', folder: 'misc' }] }],
  },
  {
    id: 'faq', group: 'Pages', title: 'FAQ', path: 'faq', preview: '/faq',
    description: 'Questions and answers. These also appear in Google as structured FAQ data.',
    fields: [t('heroTitle', 'Hero headline', { required: true }), ta('heroDeck', 'Hero supporting line'), img('heroImage', 'Hero background image'), t('asideText', 'Side prompt'), { type: 'items', key: 'items', label: 'Questions', itemLabel: 'Question', maxItems: 40, fields: [t('q', 'Question', { required: true, max: 200 }), ta('a', 'Answer', { required: true })] }],
  },
  {
    id: 'contact', group: 'Pages', title: 'Contact page & form', path: 'contact', preview: '/contact',
    description: 'Hero, contact block labels and every label on the inquiry form.',
    fields: [
      t('heroTitle', 'Hero headline', { required: true }), ta('heroDeck', 'Hero supporting line'), img('heroImage', 'Hero background image'),
      t('emailLabel', 'Email block label'), t('communityLabel', 'Community block label'), t('socialLabel', 'Social block label'),
      t('interestLabel', 'Interest question'), { type: 'strings', key: 'interests', label: 'Interest options', itemLabel: 'Option', maxItems: 6, max: 60, required: true },
      t('nameField', 'Name field label'), t('emailField', 'Email field label'), t('organizationField', 'Organization field label'), t('messageField', 'Message field label'),
      t('submitLabel', 'Submit button label'), t('successTitle', 'Success heading'), ta('successText', 'Success message'),
    ],
  },
  {
    id: 'footer', group: 'Pages', title: 'Footer & 404', path: '', preview: '/',
    description: 'Footer headings and the page-not-found screen.',
    fields: [t('footer.exploreLabel', 'Footer: explore heading'), t('footer.communityLabel', 'Footer: community heading'), t('footer.contactLabel', 'Footer: contact heading'), t('footer.inquiryLink', 'Footer: inquiry link'), t('footer.rights', 'Footer: rights line'), t('notFound.code', '404: code label'), t('notFound.title', '404: headline'), ta('notFound.text', '404: text'), t('notFound.homeCta', '404: button label')],
  },
  ...(['privacy', 'terms'] as const).map((page): Section => ({
    id: page, group: 'Legal', title: page === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions', path: `legal.${page}`, preview: `/${page}`,
    description: 'Write paragraphs separated by a blank line. Start a line with "- " for a bullet, wrap text in **double asterisks** for bold. Emails and https links become clickable.',
    fields: [t('title', 'Page title', { required: true }), ta('deck', 'Intro line'), t('updated', 'Last updated date'), { type: 'items', key: 'sections', label: 'Sections', itemLabel: 'Section', maxItems: 40, fields: [t('title', 'Heading', { required: true }), ta('body', 'Text', { max: 8000 })] }],
  })),
]

// ---- dotted-path helpers (shared by editor and server) ----
export function getAt(obj: unknown, path: string): any {
  return path ? path.split('.').reduce((o: any, k) => (o == null ? undefined : o[k]), obj) : obj
}
export function setAt<T extends object>(obj: T, path: string, value: unknown): T {
  if (!path) return value as T
  const keys = path.split('.')
  let o: any = obj
  keys.slice(0, -1).forEach((k) => { o[k] = typeof o[k] === 'object' && o[k] ? o[k] : {}; o = o[k] })
  o[keys.at(-1)!] = value
  return obj
}

// ---- validation ----
const isLocalPath = (v: string) => v.startsWith('/') && !v.startsWith('//') && !v.includes('..') && !/[\s"'<>\\]/.test(v)
const isUrl = (v: string) => /^https?:\/\/[^\s"'<>]+$/i.test(v) || /^mailto:[^\s"'<>]+$/i.test(v) || isLocalPath(v)
const isEmail = (v: string) => /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(v)

export type FieldError = { key: string; message: string }

// Returns a clean copy containing only schema fields, plus any validation errors.
export function sanitize(fields: Field[], input: unknown, prefix = ''): { value: Record<string, unknown>; errors: FieldError[] } {
  const value: Record<string, unknown> = {}
  const errors: FieldError[] = []
  const src = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  for (const f of fields) {
    const raw = getAt(src, f.key)
    const where = prefix + f.key
    const fail = (message: string) => errors.push({ key: where, message })
    let out: unknown
    if (f.type === 'text' || f.type === 'textarea') {
      const s = typeof raw === 'string' ? raw : ''
      out = (f.type === 'text' ? s.trim() : s.replace(/\r\n/g, '\n').trim()).slice(0, f.max ?? (f.type === 'text' ? 300 : 6000))
      if (f.required && !out) fail(`${f.label} is required.`)
    } else if (f.type === 'url' || f.type === 'email') {
      out = typeof raw === 'string' ? raw.trim().slice(0, 500) : ''
      if (!out) { if (f.required) fail(`${f.label} is required.`) }
      else if (f.type === 'url' ? !isUrl(out as string) : !isEmail(out as string)) fail(`${f.label} must be a valid ${f.type === 'url' ? 'https:// link' : 'email address'}.`)
    } else if (f.type === 'image') {
      out = typeof raw === 'string' ? raw.trim() : ''
      if (out && !isLocalPath(out as string)) fail(`${f.label} must be an uploaded image.`)
    } else if (f.type === 'strings') {
      out = (Array.isArray(raw) ? raw : []).filter((s): s is string => typeof s === 'string').map((s) => s.trim().slice(0, f.max ?? 200)).filter(Boolean).slice(0, f.maxItems ?? 50)
      if (f.required && !(out as string[]).length) fail(`${f.label} needs at least one item.`)
    } else if (f.type === 'items') {
      const items = (Array.isArray(raw) ? raw : []).slice(0, f.maxItems ?? 60)
      out = items.map((item, i) => { const r = sanitize(f.fields, item, `${where}.${i}.`); errors.push(...r.errors); return r.value })
    }
    setAt(value, f.key, out)
  }
  return { value, errors }
}

// Every image URL referenced by these fields (used to clean up replaced uploads).
export function imagesIn(fields: Field[], data: unknown): string[] {
  return fields.flatMap((f) => {
    const v = getAt(data, f.key)
    if (f.type === 'image') return typeof v === 'string' && v ? [v] : []
    if (f.type === 'items' && Array.isArray(v)) return v.flatMap((item) => imagesIn(f.fields, item))
    return []
  })
}
