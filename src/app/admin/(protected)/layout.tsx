import { AdminHeader } from '@/components/admin/admin-header'

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-muted/30 min-h-screen">
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  )
}
