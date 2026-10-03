import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { ContactForm } from '@/components/site/contact-form'
import { PageHero } from '@/components/site/ui'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact WIMs about the community or AI lead generation services. Email ${site.email} or join the community at nas.com/wims.`,
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return (
    <>
      <PageHero crumb="Contact" image="network" title="Let’s talk about what you’re building." deck="Whether you’re exploring the WIMs community or AI lead generation services, send an inquiry or reach out directly." />
      <section className="sec contact" aria-label="Contact details and inquiry form">
        <div className="frame contact-grid">
          <aside className="contact-info" data-reveal="fade">
            <div className="contact-block">
              <h2>Email</h2>
              <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="contact-block">
              <h2>Community</h2>
              <a href={site.nas} target="_blank" rel="noreferrer">{site.nas}<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
            <div className="contact-block">
              <h2>Social</h2>
              <span>{site.social.handle}</span>
              <a href={site.social.youtube} target="_blank" rel="noreferrer">youtube.com/@chiefsaqif<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </aside>
          <div className="contact-form" data-reveal="fade"><ContactForm /></div>
        </div>
      </section>
    </>
  )
}
