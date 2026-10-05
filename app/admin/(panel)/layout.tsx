import { Sidebar } from '@/components/admin/sidebar'
import { requireAdmin } from '@/lib/auth'
import { sections } from '@/lib/content/schema'
import { connectDb, dbConfigured, Inquiry } from '@/lib/db'

// Every page in this group requires an admin session.
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  const groups = [...new Set(sections.map((s) => s.group))].map((name) => ({ name, items: sections.filter((s) => s.group === name).map(({ id, title }) => ({ id, title })) }))
  const unread = dbConfigured() ? await connectDb().then(() => Inquiry.countDocuments({ read: false })).catch(() => 0) : 0
  return (
    <div className="adm">
      <Sidebar groups={groups} unread={unread} />
      <main className="adm-main" id="main">{children}</main>
    </div>
  )
}
