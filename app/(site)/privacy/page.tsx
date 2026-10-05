import type { Metadata } from 'next'
import { Legal } from '@/components/site/legal'
import { getContent } from '@/lib/content'

// Review with legal counsel before launch. Edit the text in /admin → Privacy Policy.
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent()
  return { title: seo.pages.privacy.title, description: seo.pages.privacy.description, alternates: { canonical: '/privacy' } }
}

export default async function Privacy() {
  const { legal } = await getContent()
  return <Legal page={legal.privacy} />
}
