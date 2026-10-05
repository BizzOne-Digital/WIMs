import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { ContactForm } from '@/components/site/contact-form'
import { PageHero } from '@/components/site/ui'
import { getContent } from '@/lib/content'
import { defaultContent } from '@/lib/content/defaults'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent()
  return { title: seo.pages.contact.title, description: seo.pages.contact.description, alternates: { canonical: '/contact' } }
}

export default async function Contact() {
  const { contact, settings, navigation } = await getContent()
  return (
    <>
      <PageHero crumb={navigation.contact} image={contact.heroImage} fallbackImage={defaultContent.contact.heroImage} title={contact.heroTitle} deck={contact.heroDeck} />
      <section className="sec contact" aria-label="Contact details and inquiry form">
        <div className="frame contact-grid">
          <aside className="contact-info" data-reveal="fade">
            <div className="contact-block">
              <h2>{contact.emailLabel}</h2>
              <a className="contact-email" href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
            <div className="contact-block">
              <h2>{contact.communityLabel}</h2>
              <a href={settings.nasUrl} target="_blank" rel="noreferrer">{settings.nasUrl}<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
            {(settings.socialHandle || settings.youtubeUrl) && (
              <div className="contact-block">
                <h2>{contact.socialLabel}</h2>
                {settings.socialHandle && <span>{settings.socialHandle}</span>}
                {settings.youtubeUrl && <a href={settings.youtubeUrl} target="_blank" rel="noreferrer">{settings.youtubeLabel || settings.youtubeUrl}<span className="sr-only"> (opens in a new tab)</span></a>}
              </div>
            )}
          </aside>
          <div className="contact-form" data-reveal="fade"><ContactForm email={settings.email} copy={contact} /></div>
        </div>
      </section>
    </>
  )
}
