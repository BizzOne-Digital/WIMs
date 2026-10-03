import type { Metadata } from 'next'
import { Legal } from '@/components/site/legal'
import { site } from '@/lib/site'

// Review with legal counsel before launch. Governing law, company registration and refund terms
// were not supplied, so none are stated here.
export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply when you use the WIMs website.',
  alternates: { canonical: '/terms' },
}

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>

const sections = [
  { id: 'acceptance', title: 'Acceptance of these terms', body: <p>These Terms &amp; Conditions apply to your use of this website, operated by WIMs (Waterloo Institute of Management Solutions, “WIMs”, “we”, “us”). By using the website, you agree to these terms. If you do not agree, please do not use the website.</p> },
  { id: 'use', title: 'Use of the website', body: <><p>You may use this website for lawful purposes to learn about WIMs, the WIMs community, and WIMs services. You agree not to:</p><ul><li>use the website in a way that breaks any applicable law;</li><li>attempt to interfere with the website’s security or operation;</li><li>submit false, misleading, or harmful information through the inquiry form.</li></ul></> },
  { id: 'community', title: 'The WIMs community on NAS', body: <p>The WIMs community is hosted on NAS at <a href={site.nas}>{site.nasLabel}</a>. Membership and participation in the community are subject to the terms and policies of that platform in addition to any community guidelines WIMs provides there.</p> },
  { id: 'services', title: 'AI lead generation services', body: <p>Information about AI lead generation services on this website is general and does not form an offer. Pricing is custom and is provided on request. Any engagement is governed by the specific terms agreed between you and WIMs at that time. Customers who join the WIMs AI Club receive a discount on the AI lead generation services, as confirmed in those agreed terms.</p> },
  { id: 'ip', title: 'Intellectual property', body: <p>The content of this website, including text, design, graphics, and the WIMs name, belongs to WIMs or its licensors. You may not copy, reproduce, or reuse it for commercial purposes without our written permission.</p> },
  { id: 'links', title: 'External links', body: <p>This website links to third-party websites and platforms, such as NAS and YouTube. We do not control those websites and are not responsible for their content, availability, or practices.</p> },
  { id: 'disclaimer', title: 'No guarantees', body: <p>This website and its content are provided “as is” for general information. We work to keep it accurate and available, but we do not guarantee that it is complete, error-free, or uninterrupted, and we do not promise any particular business, career, or income outcome.</p> },
  { id: 'liability', title: 'Limitation of liability', body: <p>To the extent permitted by applicable law, WIMs is not liable for any indirect or consequential loss arising from your use of this website or reliance on its content.</p> },
  { id: 'changes', title: 'Changes to these terms', body: <p>We may update these Terms &amp; Conditions from time to time. The “last updated” date at the top of this page shows when they were last changed. Continued use of the website means you accept the updated terms.</p> },
  { id: 'contact', title: 'Contact', body: <p>Questions about these Terms &amp; Conditions can be sent to {mail}.</p> },
]

export default function Terms() {
  return <Legal crumb="Terms & Conditions" title="Terms & Conditions" deck="The terms that apply when you use the WIMs website." updated="October 3, 2026" sections={sections} />
}
