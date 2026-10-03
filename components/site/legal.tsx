import { PageHero } from './ui'

export type LegalSection = { id: string; title: string; body: React.ReactNode }

// Shared layout for Privacy Policy and Terms & Conditions: sticky contents list + numbered sections.
export function Legal({ crumb, title, deck, updated, sections }: { crumb: string; title: string; deck: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero crumb={crumb} title={title} deck={deck} />
      <section className="sec sec-light legal" aria-label={title}>
        <div className="frame legal-grid">
          <nav className="legal-toc" aria-label="On this page">
            <p>Last updated {updated}</p>
            <ol>{sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}</ol>
          </nav>
          <div className="legal-body">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
