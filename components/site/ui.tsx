import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { images, type SectionImageName } from '@/lib/site'

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>
export const vars = (v: Record<string, string | number>) => Object.fromEntries(Object.entries(v).map(([k, val]) => [`--${k}`, val])) as CSSVars

// Splits text into masked words so headlines can reveal word by word (see .w in globals.css).
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(' ')
  return words.map((word, i) => (
    <span key={i}>
      <span className="w" style={vars({ i: i + start })}><span>{word}</span></span>
      {i < words.length - 1 ? ' ' : null}
    </span>
  ))
}

type CtaProps = { href: string; children: React.ReactNode; variant?: 'solid' | 'ghost' | 'line'; size?: 'sm'; className?: string }

export function Cta({ href, children, variant = 'solid', size, className = '' }: CtaProps) {
  const external = href.startsWith('http')
  const Icon = external ? ArrowUpRight : ArrowRight
  const cls = `cta cta-${variant} ${size ? `cta-${size}` : ''} ${className}`
  const inner = <><span className="cta-label">{children}</span><span className="cta-icon" aria-hidden="true"><Icon /></span></>
  return external
    ? <a className={cls} href={href} target="_blank" rel="noreferrer">{inner}<span className="sr-only"> (opens in a new tab)</span></a>
    : <Link className={cls} href={href}>{inner}</Link>
}

// Client logo (public/logo.png), reversed for dark backgrounds: see public/brand/.
// Decorative here because every usage sits inside a link labelled "WIMs home".
export function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  return (
    <span className={`logo logo-${size}`}>
      <Image className="logo-globe" src="/brand/wims-globe.png" alt="" width={512} height={512} sizes={size === 'lg' ? '56px' : '34px'} priority={size === 'sm'} />
      <Image className="logo-word" src="/brand/wims-wordmark.png" alt="" width={298} height={84} sizes={size === 'lg' ? '120px' : '84px'} priority={size === 'sm'} />
    </span>
  )
}

// Page hero background photo: graded, shaded, drifting slower than the page. Photos appear only in heroes.
function HeroImage({ name }: { name: SectionImageName }) {
  return (
    <div className="hero-image" aria-hidden="true">
      <div className="hero-image-inner"><Image src={images[name].src} alt="" fill sizes="100vw" priority /></div>
    </div>
  )
}

export function PageHero({ crumb, title, deck, image, children }: { crumb: string; title: string; deck?: string; image?: SectionImageName; children?: React.ReactNode }) {
  return (
    <section className="page-hero">
      {image && <HeroImage name={image} />}
      <div className="frame page-hero-inner">
        <nav className="crumb" aria-label="Breadcrumb" data-reveal="fade"><Link href="/">WIMs</Link><span aria-hidden="true" /> <span aria-current="page">{crumb}</span></nav>
        <h1 className="page-title" data-reveal="words"><Words text={title} /></h1>
        {deck && <p className="page-deck" data-reveal="fade" style={vars({ d: '320ms' })}>{deck}</p>}
        {children}
      </div>
      <div className="frame"><span className="rule" data-reveal="rule" /></div>
    </section>
  )
}
