import type { Metadata } from 'next'
import { Club } from '@/components/site/club'
import { Cta, PageHero, Words, vars } from '@/components/site/ui'
import { getContent } from '@/lib/content'
import { defaultContent } from '@/lib/content/defaults'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent()
  return { title: seo.pages.services.title, description: seo.pages.services.description, alternates: { canonical: '/services' } }
}

export default async function Services() {
  const { services, club, settings, navigation } = await getContent()
  return (
    <>
      <PageHero crumb={navigation.services} image={services.heroImage} fallbackImage={defaultContent.services.heroImage} title={services.name} deck={services.heroDeck}>
        <div className="page-hero-ctas" data-reveal="fade" style={vars({ d: '440ms' })}>
          <Cta href="/contact?interest=lead-generation">{services.cta}</Cta>
        </div>
      </PageHero>

      <section className="sec" aria-labelledby="pricing-title">
        <div className="frame split">
          <h2 id="pricing-title" className="display" data-reveal="words"><Words text={services.pricingTitle} /></h2>
          <div className="split-aside">
            <p className="lede" data-reveal="fade">{services.pricingText}</p>
            <div data-reveal="fade" style={vars({ d: '200ms' })}><Cta href="/contact?interest=lead-generation" variant="line">{services.cta}</Cta></div>
          </div>
        </div>
      </section>

      {services.steps.length > 0 && (
        <section className="sec sec-light" aria-labelledby="process-title">
          <div className="frame">
            <h2 id="process-title" className="margin-note" data-reveal="fade">{services.stepsLabel}</h2>
            <ol className="steps">
              {services.steps.map((s, i) => (
                <li key={`${s.title}-${i}`} className="step" data-reveal="rule" style={vars({ i })}>
                  <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <Club club={club} nasUrl={settings.nasUrl} />

      <section className="sec closing" aria-labelledby="closing-title">
        <div className="frame closing-inner">
          <h2 id="closing-title" className="closing-title" data-reveal="words"><Words text={services.closingTitle} /></h2>
          <div className="closing-ctas" data-reveal="fade" style={vars({ d: '360ms' })}>
            <Cta href="/contact?interest=lead-generation">{services.cta}</Cta>
            <Cta href="/faq" variant="ghost">{services.closingSecondaryCta}</Cta>
          </div>
        </div>
      </section>
    </>
  )
}
