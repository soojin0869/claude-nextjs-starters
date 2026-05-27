import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getInvoices } from '@/lib/notion/get-invoices'
import { InvoiceListWithFilter } from '@/components/admin/invoice-list-with-filter'
import { TableLoadingSkeleton } from '@/components/common/loading'

export const metadata: Metadata = {
  title: '어드민 대시보드',
  description: '견적서 목록 조회 및 관리',
}

async function InvoiceList() {
  const invoices = await getInvoices()
  return <InvoiceListWithFilter invoices={invoices} />
}

export default async function AdminPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <InvoiceList />
    </Suspense>
  )
}
