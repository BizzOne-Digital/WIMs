import type { Metadata } from 'next'
import { Faq, faqJsonLd } from '@/components/site/faq'
import { Cta, PageHero } from '@/components/site/ui'
import { getContent } from '@/lib/content'
import { defaultContent } from '@/lib/content/defaults'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent()
  return { title: seo.pages.faq.title, description: seo.pages.faq.description, alternates: { canonical: '/faq' } }
}

export default async function FaqPage() {
  const { faq, navigation } = await getContent()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faq.items) }} />
      <PageHero crumb={navigation.faq} image={faq.heroImage} fallbackImage={defaultContent.faq.heroImage} title={faq.heroTitle} deck={faq.heroDeck} />
      <section className="sec sec-light" aria-label="Frequently asked questions">
        <div className="frame split">
          <div className="faq-aside" data-reveal="fade">
            <p className="lede">{faq.asideText}</p>
            <Cta href="/contact" variant="line">{navigation.contactCta}</Cta>
          </div>
          <div><Faq items={faq.items} /></div>
        </div>
      </section>
    </>
  )
}
