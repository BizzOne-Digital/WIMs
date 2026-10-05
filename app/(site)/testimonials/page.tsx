import type { Metadata } from 'next'
import { VideoCard } from '@/components/site/video-card'
import { Cta, LogoStrip, PageHero, Words, vars } from '@/components/site/ui'
import { getContent } from '@/lib/content'
import { defaultContent } from '@/lib/content/defaults'
import { testimonials } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent()
  return { title: seo.pages.testimonials.title, description: seo.pages.testimonials.description, alternates: { canonical: '/testimonials' } }
}

export default async function Testimonials() {
  const { testimonialsPage: page, logos, settings, navigation } = await getContent()
  return (
    <>
      <PageHero crumb={navigation.testimonials} image={page.heroImage} fallbackImage={defaultContent.testimonialsPage.heroImage} title={page.heroTitle} deck={page.heroDeck} />

      <section className="sec sec-light" aria-label="Testimonial videos">
        <div className="frame">
          <LogoStrip logos={logos} label={page.logosLabel} />
          {/* Testimonial videos are hard-coded in lib/site.ts by design. */}
          <div className="reels reels-wall">
            {testimonials.map((t, i) => <VideoCard key={i} item={t} index={i} large={i === 0} />)}
          </div>
        </div>
      </section>

      <section className="sec closing" aria-labelledby="closing-title">
        <div className="frame closing-inner">
          <h2 id="closing-title" className="closing-title" data-reveal="words"><Words text={page.closingTitle} /></h2>
          <div className="closing-ctas" data-reveal="fade" style={vars({ d: '360ms' })}>
            <Cta href={settings.nasUrl}>{navigation.joinCta}</Cta>
            <Cta href="/contact" variant="ghost">{navigation.contactCta}</Cta>
          </div>
        </div>
      </section>
    </>
  )
}
