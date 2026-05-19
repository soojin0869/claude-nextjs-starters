/**
 * 어드민 대시보드 페이지 (F004, F005, F010)
 *
 * 발행된 전체 견적서 목록을 조회하고 공유 URL을 복사하는 관리 페이지입니다.
 * 미들웨어에 의해 어드민 인증이 강제됩니다.
 */

import type { Metadata } from 'next'
import { getInvoices } from '@/lib/notion/get-invoices'
import { InvoiceListTable } from '@/components/admin/invoice-list-table'
import { adminLogoutAction } from '@/actions/admin-auth-actions'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '어드민 대시보드',
  description: '견적서 목록 조회 및 관리',
}

export default async function AdminPage() {
  const invoices = await getInvoices()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">견적서 관리</h1>
          <form action={adminLogoutAction}>
            <Button type="submit" variant="outline" size="sm">
              로그아웃
            </Button>
          </form>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            총 {invoices.length}건의 견적서가 있습니다.
          </p>
        </div>
        <InvoiceListTable invoices={invoices} />
      </main>
    </div>
  )
}
