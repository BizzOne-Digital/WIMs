// Re-mounts on every route change, so each page enters with the same transition.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>
}
