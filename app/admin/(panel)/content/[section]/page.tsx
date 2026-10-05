import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SectionEditor } from '@/components/admin/section-editor'
import { loadContentFresh } from '@/lib/content'
import { defaultContent } from '@/lib/content/defaults'
import { getAt, sections, setAt } from '@/lib/content/schema'
import { dbConfigured } from '@/lib/db'

type Props = { params: Promise<{ section: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: id } = await params
  const section = sections.find((s) => s.id === id)
  return { title: section ? `Edit ${section.title}` : 'Edit' }
}

export default async function EditSection({ params }: Props) {
  const { section: id } = await params
  const section = sections.find((s) => s.id === id)
  if (!section) notFound()
  const { content } = await loadContentFresh().catch(() => ({ content: defaultContent }))
  const target = section.path ? getAt(content, section.path) : content
  // Only the section's own fields go to the browser.
  const initial = section.fields.reduce((o, f) => setAt(o, f.key, getAt(target, f.key)), {} as Record<string, unknown>)
  return (
    <>
      <header className="adm-head">
        <p className="adm-eyebrow">{section.group}</p>
        <h1>{section.title}</h1>
        <p>{section.description}</p>
      </header>
      <SectionEditor key={section.id} section={section} initial={initial} dbReady={dbConfigured()} />
    </>
  )
}
