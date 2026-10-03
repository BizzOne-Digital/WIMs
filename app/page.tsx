import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { VideoCard } from '@/components/site/video-card'
import { Cta, LogoStrip, Words, vars } from '@/components/site/ui'
import { companies, copy, heroAlt, images, site, testimonials } from '@/lib/site'

export default function Home() {
  return (
    <>
      {/* Act 1: the hook */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <Image className="hero-slide" src={images.hero.src} alt={images.hero.alt} fill priority sizes="100vw" />
          <Image className="hero-slide hero-slide-alt" src={heroAlt.src} alt={heroAlt.alt} fill loading="eager" sizes="100vw" />
        </div>
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-sweep" aria-hidden="true" />
        <div className="frame hero-inner">
          <p className="hero-kicker"><span className="kicker-line" aria-hidden="true" />{site.legalName}</p>
          <h1 id="hero-title" className="hero-title" aria-label={copy.heroTitle}>
            {copy.heroLines.map((line, i) => <span key={line} className="hero-line" aria-hidden="true"><Words text={line} start={i * 2} /></span>)}
          </h1>
          <div className="hero-ledger">
            <p className="hero-deck">{copy.heroDeck}</p>
            <div className="hero-ctas">
              <Cta href={site.nas}>Join the community</Cta>
              <Cta href="#about" variant="ghost">Discover WIMs</Cta>
            </div>
          </div>
          <div className="hero-foot">
            <Link className="hero-aside" href="/services">Contact WIMs about AI lead generation services<ArrowUpRight aria-hidden="true" /></Link>
            <span className="hero-scroll" aria-hidden="true"><span /></span>
          </div>
        </div>
      </section>

      {/* Act 2: what WIMs is */}
      <section id="about" className="sec intro" aria-labelledby="about-title">
        <div className="frame intro-grid">
          <h2 id="about-title" className="margin-note" data-reveal="fade">What WIMs is</h2>
          <p className="intro-text scrub"><Words text={copy.intro} /></p>
        </div>
        <ol className="frame pillars" aria-label="The WIMs path">
          {copy.pillars.map((p, i) => (
            <li key={p} className="pillar" data-reveal="clip" style={vars({ i })}>
              <span className="pillar-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="pillar-t">{p}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Act 3: proof */}
      <section className="sec sec-light members" aria-labelledby="members-title">
        <div className="frame members-grid">
          <div>
            <h2 id="members-title" className="margin-note" data-reveal="fade">Our members</h2>
            <p className="members-lede" data-reveal="words"><Words text={copy.members} /></p>
          </div>
          <ul className="ledger" aria-label="Companies where members work or have worked">
            {companies.map((c, i) => <li key={c} data-reveal="rule" style={vars({ i })}><span>{c}</span></li>)}
          </ul>
        </div>
      </section>

      {/* Act 4: the community, on NAS */}
      <section className="sec nas" aria-labelledby="nas-title">
        <div className="frame nas-grid">
          <div className="nas-copy">
            <h2 id="nas-title" className="display" data-reveal="words"><Words text="The WIMs community lives on NAS." /></h2>
            <p className="lede" data-reveal="fade" style={vars({ d: '200ms' })}>{copy.benefits}</p>
            <p className="lede" data-reveal="fade" style={vars({ d: '320ms' })}>{copy.guidance}</p>
            <div className="nas-ctas" data-reveal="fade" style={vars({ d: '440ms' })}><Cta href={site.nas}>Join the community on NAS</Cta></div>
          </div>
          <a className="portal" href={site.nas} target="_blank" rel="noreferrer" data-reveal="clip">
            <span className="portal-border" aria-hidden="true" />
            <svg className="portal-net" viewBox="0 0 300 380" aria-hidden="true">
              <path d="M40 80 L130 40 L220 110 L260 60 M130 40 L150 180 L220 110 M150 180 L60 230 L40 80 M150 180 L240 260 L220 110 M60 230 L120 320 L240 260 M120 320 L150 180" pathLength="1" />
              {[[40, 80], [130, 40], [220, 110], [260, 60], [150, 180], [60, 230], [240, 260], [120, 320]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" />)}
            </svg>
            <span className="portal-meta">
              <span className="portal-host">{site.nasLabel}</span>
              <span className="portal-go">Open the WIMs community<ArrowUpRight aria-hidden="true" /></span>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      {/* Act 5: the service */}
      <section className="banner" aria-labelledby="service-title">
        <div className="banner-art" aria-hidden="true"><span className="scan" /></div>
        <div className="frame banner-inner">
          <h2 className="margin-note" data-reveal="fade">Services</h2>
          <p id="service-title" className="banner-title" data-reveal="words"><Words text={copy.service} /></p>
          <div className="banner-foot" data-reveal="fade" style={vars({ d: '300ms' })}>
            <p>Pricing is custom. Contact WIMs for pricing.</p>
            <div className="banner-ctas">
              <Cta href="/contact?interest=lead-generation">Contact WIMs for pricing</Cta>
              <Cta href="/services" variant="line">Explore the service</Cta>
            </div>
          </div>
        </div>
      </section>

      <section className="sec advantage" aria-labelledby="advantage-title">
        <div className="frame advantage-grid">
          <div>
            <h2 id="advantage-title" className="margin-note" data-reveal="fade">Member advantage</h2>
            <p className="advantage-text" data-reveal="words"><Words text="Customers who join the WIMs AI Club receive a discount on the AI lead generation services." /></p>
            <div data-reveal="fade" style={vars({ d: '300ms' })}><Cta href={site.nas} variant="line">Join the WIMs AI Club</Cta></div>
          </div>
          <div className="credential" data-reveal="fade">
            <div className="credential-core">
              <div className="credential-top"><span className="credential-name">WIMs AI Club</span><span className="credential-chip" aria-hidden="true" /></div>
              <p className="credential-line">Exclusive member benefit</p>
              <p className="credential-perk">Discount on AI lead generation services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Act 6: trust */}
      <section className="sec sec-light trust" aria-labelledby="trust-title">
        <div className="frame">
          <div className="trust-head">
            <h2 id="trust-title" className="margin-note" data-reveal="fade">Testimonials</h2>
            <p className="trust-line" data-reveal="words"><Words text={copy.trusted} /></p>
          </div>
          {/* Empty video slots only appear on /testimonials; home shows reels once real footage exists. */}
          {testimonials.some((t) => t.src) && (
            <div className="reels">
              {testimonials.filter((t) => t.src).slice(0, 3).map((t, i) => <VideoCard key={i} item={t} index={i} large={i === 0} />)}
            </div>
          )}
          <LogoStrip />
          <div className="trust-cta" data-reveal="fade"><Cta href="/testimonials" variant="line">View member stories</Cta></div>
        </div>
      </section>

      {/* Act 7: the ask */}
      <section className="sec closing" aria-labelledby="closing-title">
        <div className="frame closing-inner">
          <h2 id="closing-title" className="closing-title" data-reveal="words"><Words text={copy.heroTitle} /></h2>
          <div className="closing-ctas" data-reveal="fade" style={vars({ d: '360ms' })}>
            <Cta href={site.nas}>Join the community</Cta>
            <Cta href="/contact" variant="ghost">Contact WIMs</Cta>
          </div>
        </div>
      </section>
    </>
  )
}
