import { faqs } from '@/lib/site'
import { vars } from './ui'

export function Faq({ limit }: { limit?: number }) {
  return (
    <div className="faq">
      {faqs.slice(0, limit).map(({ q, a }, i) => (
        <details key={q} name="faq" open={i === 0} data-reveal="fade" style={vars({ i })}>
          <summary><span className="faq-q">{q}</span><span className="faq-icon" aria-hidden="true" /></summary>
          <div className="faq-a"><p>{a}</p></div>
        </details>
      ))}
    </div>
  )
}

export function faqJsonLd() {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
}
