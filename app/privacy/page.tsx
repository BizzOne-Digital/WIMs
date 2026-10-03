import type { Metadata } from 'next'
import { Legal } from '@/components/site/legal'
import { site } from '@/lib/site'

// Review with legal counsel before launch. No jurisdiction, registration details or retention periods
// were supplied, so none are stated here.
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How WIMs collects, uses, and protects information shared through this website.',
  alternates: { canonical: '/privacy' },
}

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>

const sections = [
  { id: 'overview', title: 'Overview', body: <p>This Privacy Policy explains how WIMs (Waterloo Institute of Management Solutions, “WIMs”, “we”, “us”) handles information when you visit this website or contact us through it. By using this website, you agree to the practices described here.</p> },
  { id: 'collect', title: 'Information we collect', body: <><p><strong>Information you give us.</strong> When you send an inquiry, we receive the details you choose to share, such as your name, email address, organization, area of interest, and message.</p><p><strong>Information collected automatically.</strong> We use privacy-focused website analytics to understand how the site is used, such as which pages are visited. This information is aggregated and is not used to identify you personally.</p></> },
  { id: 'use', title: 'How we use information', body: <ul><li>To respond to your inquiry about the WIMs community or AI lead generation services.</li><li>To provide information you request, including pricing for services.</li><li>To understand and improve how this website works.</li><li>To meet legal obligations where they apply.</li></ul> },
  { id: 'share', title: 'How information is shared', body: <p>We do not sell your personal information. We may share information with service providers who help us operate this website and respond to inquiries, only as needed for those purposes, or where required by law.</p> },
  { id: 'third-party', title: 'Third-party platforms', body: <p>This website links to services operated by others, including the WIMs community on NAS (<a href={site.nas}>{site.nasLabel}</a>) and YouTube. When you use those services, their own terms and privacy policies apply. We are not responsible for their practices.</p> },
  { id: 'retention', title: 'Retention and security', body: <p>We keep inquiry information only for as long as it is needed for the purposes described in this policy, and we take reasonable measures to protect it. No method of transmission or storage is completely secure.</p> },
  { id: 'choices', title: 'Your choices', body: <p>You can ask us to access, correct, or delete the personal information you have shared with us by emailing {mail}. You can also choose not to send an inquiry and still browse this website.</p> },
  { id: 'children', title: 'Children', body: <p>This website is intended for professionals, entrepreneurs, students, and business owners. It is not directed at children, and we do not knowingly collect information from children.</p> },
  { id: 'changes', title: 'Changes to this policy', body: <p>We may update this Privacy Policy from time to time. The “last updated” date at the top of this page shows when it was last changed.</p> },
  { id: 'contact', title: 'Contact', body: <p>Questions about this Privacy Policy can be sent to {mail}.</p> },
]

export default function Privacy() {
  return <Legal crumb="Privacy Policy" title="Privacy Policy" deck="How WIMs handles the information you share through this website." updated="October 3, 2026" sections={sections} />
}
