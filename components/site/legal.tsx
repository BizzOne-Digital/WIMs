import { PageHero } from './ui'

type LegalPage = { title: string; deck: string; updated: string; sections: { title: string; body: string }[] }

const slug = (s: string, i: number) => `${s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'}-${i + 1}`

// Inline formatting for admin-written text: **bold**, emails and https links. Rendered as React nodes, never raw HTML.
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[^\s@()]+@[^\s@()]+\.[a-z]{2,})/gi).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (/^https?:\/\//i.test(part)) return <a key={i} href={part}>{part.replace(/^https?:\/\//, '')}</a>
    if (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(part)) return <a key={i} href={`mailto:${part}`}>{part}</a>
    return part
  })
}

// Paragraphs are separated by blank lines; lines starting with "- " become a bullet list.
function RichText({ text }: { text: string }) {
  return text.split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length && lines.every((l) => l.startsWith('- '))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>
    return <p key={i}>{inline(lines.join(' '))}</p>
  })
}

// Shared layout for Privacy Policy and Terms & Conditions: sticky contents list + numbered sections.
export function Legal({ page }: { page: LegalPage }) {
  const sections = page.sections.map((s, i) => ({ ...s, id: slug(s.title, i) }))
  return (
    <>
      <PageHero crumb={page.title} title={page.title} deck={page.deck} />
      <section className="sec sec-light legal" aria-label={page.title}>
        <div className="frame legal-grid">
          <nav className="legal-toc" aria-label="On this page">
            {page.updated && <p>Last updated {page.updated}</p>}
            <ol>{sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}</ol>
          </nav>
          <div className="legal-body">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>
                <RichText text={s.body} />
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
