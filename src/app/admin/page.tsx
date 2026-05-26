/**
 * 어드민 대시보드 페이지 (F004, F005, F010)
 *
 * 발행된 전체 견적서 목록을 조회하고 공유 URL을 복사하는 관리 페이지입니다.
 * 미들웨어에 의해 어드민 인증이 강제됩니다.
 * Suspense를 활용하여 데이터 로딩 중 스켈레톤 UI를 표시합니다.
 */

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getInvoices } from '@/lib/notion/get-invoices'
import { InvoiceListWithFilter } from '@/components/admin/invoice-list-with-filter'
import { TableLoadingSkeleton } from '@/components/common/loading'
import { adminLogoutAction } from '@/actions/admin-auth-actions'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '어드민 대시보드',
  description: '견적서 목록 조회 및 관리',
}

/**
 * 견적서 목록 데이터 페칭 서버 컴포넌트
 * AdminPage에서 분리하여 Suspense와 함께 사용합니다.
 */
async function InvoiceList() {
  const invoices = await getInvoices()
  return <InvoiceListWithFilter invoices={invoices} />
}

export default async function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            견적서 관리
          </h1>
          <form action={adminLogoutAction}>
            <Button type="submit" variant="outline" size="sm">
              로그아웃
            </Button>
          </form>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* 데이터 로딩 중에는 TableLoadingSkeleton을 표시하고, 완료 시 InvoiceList 렌더링 */}
        <Suspense fallback={<TableLoadingSkeleton />}>
          <InvoiceList />
        </Suspense>
      </main>
    </div>
  )
}
