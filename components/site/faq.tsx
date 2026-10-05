import { vars } from './ui'

type FaqItem = { q: string; a: string }

export function Faq({ items, limit }: { items: FaqItem[]; limit?: number }) {
  return (
    <div className="faq">
      {items.slice(0, limit).map(({ q, a }, i) => (
        <details key={`${q}-${i}`} name="faq" open={i === 0} data-reveal="fade" style={vars({ i })}>
          <summary><span className="faq-q">{q}</span><span className="faq-icon" aria-hidden="true" /></summary>
          <div className="faq-a"><p>{a}</p></div>
        </details>
      ))}
    </div>
  )
}

// Escaped so admin-entered text can never close the surrounding <script> tag.
export function faqJsonLd(items: FaqItem[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }).replace(/</g, '\\u003c')
}
