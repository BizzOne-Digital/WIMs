import type { Metadata } from 'next'
import { Cta, PageHero, Words, vars } from '@/components/site/ui'
import { copy, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'AI Lead Generation Services',
  description: 'WIMs offers AI lead generation services for organizations looking to explore AI-powered business opportunities. Pricing is custom — contact WIMs for pricing.',
  alternates: { canonical: '/services' },
}

const steps = [
  { t: 'Tell us about your organization', d: 'Send an inquiry with a short description of your business and what you want to achieve.' },
  { t: 'Discuss your needs with WIMs', d: 'WIMs reviews your inquiry and talks through how AI lead generation could fit your organization.' },
  { t: 'Receive custom pricing', d: 'Pricing is custom, so you receive a quote for your organization rather than a fixed package.' },
]

export default function Services() {
  return (
    <>
      <PageHero crumb="Services" image="studio" title={copy.service} deck="WIMs offers AI lead generation services for organizations looking to explore AI-powered business opportunities.">
        <div className="page-hero-ctas" data-reveal="fade" style={vars({ d: '440ms' })}>
          <Cta href="/contact?interest=lead-generation">Contact WIMs for pricing</Cta>
        </div>
      </PageHero>

      <section className="sec" aria-labelledby="pricing-title">
        <div className="frame split">
          <h2 id="pricing-title" className="display" data-reveal="words"><Words text="Pricing is custom." /></h2>
          <div className="split-aside">
            <p className="lede" data-reveal="fade">Every organization starts from a different place, so WIMs does not publish a fixed price. Contact WIMs to discuss your needs and receive pricing for your organization.</p>
            <div data-reveal="fade" style={vars({ d: '200ms' })}><Cta href="/contact?interest=lead-generation" variant="line">Contact WIMs for pricing</Cta></div>
          </div>
        </div>
      </section>

      <section className="sec sec-light" aria-labelledby="process-title">
        <div className="frame">
          <h2 id="process-title" className="margin-note" data-reveal="fade">How it works</h2>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.t} className="step" data-reveal="rule" style={vars({ i })}>
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
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

      <section className="sec closing" aria-labelledby="closing-title">
        <div className="frame closing-inner">
          <h2 id="closing-title" className="closing-title" data-reveal="words"><Words text="Make your next move more intelligent." /></h2>
          <div className="closing-ctas" data-reveal="fade" style={vars({ d: '360ms' })}>
            <Cta href="/contact?interest=lead-generation">Contact WIMs for pricing</Cta>
            <Cta href="/faq" variant="ghost">Read the FAQ</Cta>
          </div>
        </div>
      </section>
    </>
  )
}
