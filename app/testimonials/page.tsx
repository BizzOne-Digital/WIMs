import type { Metadata } from 'next'
import { VideoCard } from '@/components/site/video-card'
import { Cta, PageHero, Words, vars } from '@/components/site/ui'
import { copy, site, testimonials } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: `${copy.trusted}. Watch video stories from the WIMs community.`,
  alternates: { canonical: '/testimonials' },
}

export default function Testimonials() {
  return (
    <>
      <PageHero crumb="Testimonials" image="architecture" title="Member stories, in their own words." deck={copy.trusted} />

      <section className="sec sec-light" aria-label="Testimonial videos">
        <div className="frame">
          <div className="reels reels-wall">
            {testimonials.map((t, i) => <VideoCard key={i} item={t} index={i} large={i === 0} />)}
          </div>
        </div>
      </section>

      <section className="sec closing" aria-labelledby="closing-title">
        <div className="frame closing-inner">
          <h2 id="closing-title" className="closing-title" data-reveal="words"><Words text="Your story starts in the community." /></h2>
          <div className="closing-ctas" data-reveal="fade" style={vars({ d: '360ms' })}>
            <Cta href={site.nas}>Join the community</Cta>
            <Cta href="/contact" variant="ghost">Contact WIMs</Cta>
          </div>
        </div>
      </section>
    </>
  )
}
