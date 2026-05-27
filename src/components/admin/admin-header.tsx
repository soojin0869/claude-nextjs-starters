import { adminLogoutAction } from '@/actions/admin-auth-actions'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/common/theme-toggle'

export function AdminHeader() {
  return (
    <header className="bg-background border-b shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-lg font-bold tracking-tight">견적서 관리</span>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <form action={adminLogoutAction}>
            <Button type="submit" variant="outline" size="sm">
              로그아웃
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
