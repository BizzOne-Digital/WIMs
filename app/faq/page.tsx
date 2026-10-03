import type { Metadata } from 'next'
import { Faq, faqJsonLd } from '@/components/site/faq'
import { Cta, PageHero, vars } from '@/components/site/ui'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about WIMs, who the community is for, what members receive, AI lead generation services, pricing, the WIMs AI Club discount, and the NAS community.',
  alternates: { canonical: '/faq' },
}

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <PageHero crumb="FAQ" image="stair" title="Questions worth asking." deck="Straight answers about the community, the service, and how to get started." />
      <section className="sec sec-light" aria-label="Frequently asked questions">
        <div className="frame split">
          <div className="faq-aside" data-reveal="fade">
            <p className="lede">Can’t find your answer?</p>
            <Cta href="/contact" variant="line">Contact WIMs</Cta>
          </div>
          <div style={vars({ d: '0ms' })}><Faq /></div>
        </div>
      </section>
    </>
  )
}
