import type { Metadata } from 'next'
import { Legal } from '@/components/site/legal'
import { getContent } from '@/lib/content'

// Review with legal counsel before launch. Edit the text in /admin → Terms & Conditions.
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContent()
  return { title: seo.pages.terms.title, description: seo.pages.terms.description, alternates: { canonical: '/terms' } }
}

export default async function Terms() {
  const { legal } = await getContent()
  return <Legal page={legal.terms} />
}
