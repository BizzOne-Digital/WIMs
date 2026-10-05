import type { Content } from '@/lib/content'
import { Cta, Words, vars } from './ui'

// WIMs AI Club: the member advantage, the membership card and the full benefits list.
export function Club({ club, nasUrl }: { club: Content['club']; nasUrl: string }) {
  return (
    <section className="sec advantage" aria-labelledby="advantage-title">
      <div className="frame advantage-grid">
        <div>
          <h2 id="advantage-title" className="margin-note" data-reveal="fade">{club.label}</h2>
          <p className="advantage-text" data-reveal="words"><Words text={club.offer} /></p>
          <div data-reveal="fade" style={vars({ d: '300ms' })}><Cta href={nasUrl} variant="line">{club.cta}</Cta></div>
        </div>
        <div className="credential" data-reveal="fade">
          <div className="credential-core">
            <div className="credential-top"><span className="credential-name">{club.cardName}</span><span className="credential-chip" aria-hidden="true" /></div>
            <p className="credential-line">{club.cardLine}</p>
            <p className="credential-perk">{club.cardPerk}</p>
          </div>
        </div>
      </div>
      {club.benefits.length > 0 && (
        <div className="frame club-benefits">
          <h3 className="margin-note" data-reveal="fade">{club.benefitsTitle}</h3>
          <ul className="benefit-grid">
            {club.benefits.map((b, i) => <li key={`${b}-${i}`} data-reveal="rule" style={vars({ i })}><span>{b}</span></li>)}
          </ul>
        </div>
      )}
    </section>
  )
}
