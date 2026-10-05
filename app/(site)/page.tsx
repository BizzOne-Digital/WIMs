import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { VideoCard } from '@/components/site/video-card'
import { Club } from '@/components/site/club'
import { Cta, LogoStrip, Words, vars } from '@/components/site/ui'
import { getContent } from '@/lib/content'
import { defaultContent } from '@/lib/content/defaults'
import { resolveImage } from '@/lib/content/resolve'
import { testimonials } from '@/lib/site'

export default async function Home() {
  const { home, settings, navigation, services, club, logos } = await getContent()
  const heroTitle = home.heroLines.join(' ')
  return (
    <>
      {/* Act 1: the hook */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-media">
          <Image className="hero-slide" src={resolveImage(home.heroImage, defaultContent.home.heroImage)} alt={home.heroImageAlt} fill priority sizes="100vw" />
          {home.heroAltImage && <Image className="hero-slide hero-slide-alt" src={resolveImage(home.heroAltImage, defaultContent.home.heroAltImage)} alt="" fill loading="eager" sizes="100vw" />}
        </div>
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-sweep" aria-hidden="true" />
        <div className="frame hero-inner">
          <p className="hero-kicker"><span className="kicker-line" aria-hidden="true" />{settings.legalName}</p>
          <h1 id="hero-title" className="hero-title" aria-label={heroTitle}>
            {home.heroLines.map((line, i) => <span key={`${line}-${i}`} className="hero-line" aria-hidden="true"><Words text={line} start={i * 2} /></span>)}
          </h1>
          <div className="hero-ledger">
            <p className="hero-deck">{home.heroDeck}</p>
            <div className="hero-ctas">
              <Cta href={settings.nasUrl}>{navigation.joinCta}</Cta>
              <Cta href="#about" variant="ghost">{home.heroSecondaryCta}</Cta>
            </div>
          </div>
          <div className="hero-foot">
            <Link className="hero-aside" href="/services">{home.heroAside}<ArrowUpRight aria-hidden="true" /></Link>
            <span className="hero-scroll" aria-hidden="true"><span /></span>
          </div>
        </div>
      </section>

      {/* Act 2: what WIMs is */}
      <section id="about" className="sec intro" aria-labelledby="about-title">
        <div className="frame intro-grid">
          <h2 id="about-title" className="margin-note" data-reveal="fade">{home.introLabel}</h2>
          <p className="intro-text scrub"><Words text={home.intro} /></p>
        </div>
        <ol className="frame pillars" aria-label="The WIMs path">
          {home.pillars.map((p, i) => (
            <li key={`${p}-${i}`} className="pillar" data-reveal="clip" style={vars({ i })}>
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
            <h2 id="members-title" className="margin-note" data-reveal="fade">{home.membersLabel}</h2>
            <p className="members-lede" data-reveal="words"><Words text={home.members} /></p>
          </div>
          <ul className="ledger" aria-label="Companies where members work or have worked">
            {home.companies.map((c, i) => <li key={`${c}-${i}`} data-reveal="rule" style={vars({ i })}><span>{c}</span></li>)}
          </ul>
        </div>
      </section>

      {/* Act 4: the community, on NAS */}
      <section className="sec nas" aria-labelledby="nas-title">
        <div className="frame nas-grid">
          <div className="nas-copy">
            <h2 id="nas-title" className="display" data-reveal="words"><Words text={home.nasTitle} /></h2>
            <p className="lede" data-reveal="fade" style={vars({ d: '200ms' })}>{home.benefits}</p>
            <p className="lede" data-reveal="fade" style={vars({ d: '320ms' })}>{home.guidance}</p>
            <div className="nas-ctas" data-reveal="fade" style={vars({ d: '440ms' })}><Cta href={settings.nasUrl}>{home.nasCta}</Cta></div>
          </div>
          <a className="portal" href={settings.nasUrl} target="_blank" rel="noreferrer" data-reveal="clip">
            <span className="portal-border" aria-hidden="true" />
            <svg className="portal-net" viewBox="0 0 300 380" aria-hidden="true">
              <path d="M40 80 L130 40 L220 110 L260 60 M130 40 L150 180 L220 110 M150 180 L60 230 L40 80 M150 180 L240 260 L220 110 M60 230 L120 320 L240 260 M120 320 L150 180" pathLength="1" />
              {[[40, 80], [130, 40], [220, 110], [260, 60], [150, 180], [60, 230], [240, 260], [120, 320]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" />)}
            </svg>
            <span className="portal-meta">
              <span className="portal-host">{settings.nasLabel}</span>
              <span className="portal-go">{home.portalCta}<ArrowUpRight aria-hidden="true" /></span>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      {/* Act 5: the service */}
      <section className="banner" aria-labelledby="service-title">
        <div className="banner-art" aria-hidden="true"><span className="scan" /></div>
        <div className="frame banner-inner">
          <h2 className="margin-note" data-reveal="fade">{home.serviceLabel}</h2>
          <p id="service-title" className="banner-title" data-reveal="words"><Words text={services.name} /></p>
          <div className="banner-foot" data-reveal="fade" style={vars({ d: '300ms' })}>
            <p>{home.servicePricingLine}</p>
            <div className="banner-ctas">
              <Cta href="/contact?interest=lead-generation">{home.serviceCta}</Cta>
              <Cta href="/services" variant="line">{home.serviceLink}</Cta>
            </div>
          </div>
        </div>
      </section>

      <Club club={club} nasUrl={settings.nasUrl} />

      {/* Act 6: trust */}
      <section className="sec sec-light trust" aria-labelledby="trust-title">
        <div className="frame">
          <div className="trust-head">
            <h2 id="trust-title" className="margin-note" data-reveal="fade">{home.trustLabel}</h2>
            <p className="trust-line" data-reveal="words"><Words text={home.trusted} /></p>
          </div>
          {/* Empty video slots only appear on /testimonials; home shows reels once real footage exists. */}
          {testimonials.some((t) => t.src) && (
            <div className="reels">
              {testimonials.filter((t) => t.src).slice(0, 3).map((t, i) => <VideoCard key={i} item={t} index={i} large={i === 0} />)}
            </div>
          )}
          <LogoStrip logos={logos} />
          <div className="trust-cta" data-reveal="fade"><Cta href="/testimonials" variant="line">{home.trustCta}</Cta></div>
        </div>
      </section>

      {/* Act 7: the ask */}
      <section className="sec closing" aria-labelledby="closing-title">
        <div className="frame closing-inner">
          <h2 id="closing-title" className="closing-title" data-reveal="words"><Words text={home.closingTitle} /></h2>
          <div className="closing-ctas" data-reveal="fade" style={vars({ d: '360ms' })}>
            <Cta href={settings.nasUrl}>{navigation.joinCta}</Cta>
            <Cta href="/contact" variant="ghost">{navigation.contactCta}</Cta>
          </div>
        </div>
      </section>
    </>
  )
}
