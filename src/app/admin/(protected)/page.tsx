/**
 * 어드민 대시보드 페이지
 *
 * 통계 카드, 최근 활동, 클라이언트 현황, 견적서 전체 목록을 통합 표시합니다.
 * 서버 컴포넌트로 데이터를 페칭하고 각 클라이언트 컴포넌트에 props로 전달합니다.
 */

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { FileText, CheckCircle, Send, FileEdit } from 'lucide-react'

import { getInvoices } from '@/lib/notion/get-invoices'
import { TableLoadingSkeleton } from '@/components/common/loading'
import { InvoiceListWithFilter } from '@/components/admin/invoice-list-with-filter'
import { StatCard } from '@/components/admin/dashboard/stat-card'
import { RecentActivityList } from '@/components/admin/dashboard/recent-activity-list'
import {
  ClientSummary,
  type ClientInfo,
} from '@/components/admin/dashboard/client-summary'

export const metadata: Metadata = {
  title: '대시보드 | 견적서 관리 시스템',
  description: '견적서 통계 및 목록 조회',
}

/**
 * 견적서 목록을 받아 대시보드 전체를 렌더링하는 내부 컴포넌트
 * Suspense 스트리밍 대상이므로 async로 선언합니다.
 */
async function DashboardContent() {
  const invoices = await getInvoices()

  // ── 통계 계산 (서버에서 처리) ──────────────────────────────────────────────
  const totalCount = invoices.length
  const confirmedCount = invoices.filter(inv => inv.status === '확정됨').length
  const sentCount = invoices.filter(inv => inv.status === '발송됨').length
  const draftCount = invoices.filter(inv => inv.status === '초안').length

  // ── 최근 활동: issueDate 내림차순 상위 5개 ────────────────────────────────
  type KnownStatus = '초안' | '발송됨' | '확정됨' | '대기'
  const knownStatuses: KnownStatus[] = ['초안', '발송됨', '확정됨', '대기']
  const recentInvoices = [...invoices]
    .sort((a, b) => (a.issueDate < b.issueDate ? 1 : -1))
    .filter((inv): inv is typeof inv & { status: KnownStatus } =>
      knownStatuses.includes(inv.status as KnownStatus)
    )
    .slice(0, 5)

  // ── 클라이언트 현황: clientName으로 그룹화 ───────────────────────────────
  const clients: ClientInfo[] = Object.values(
    invoices.reduce(
      (acc, inv) => {
        const name = inv.clientName
        if (!acc[name]) {
          acc[name] = {
            name,
            email: inv.clientEmail, // InvoiceSummary.clientEmail: string | null
            invoiceCount: 0,
            lastInvoiceDate: inv.issueDate,
            totalAmount: 0,
          }
        }
        acc[name].invoiceCount++
        acc[name].totalAmount += inv.totalAmount
        if (inv.issueDate > acc[name].lastInvoiceDate) {
          acc[name].lastInvoiceDate = inv.issueDate
        }
        return acc
      },
      {} as Record<string, ClientInfo>
    )
  )

  return (
    <div className="flex flex-col gap-8">
      {/* ── A. 통계 섹션 ──────────────────────────────────────────────────── */}
      <section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            icon={<FileText className="h-5 w-5" />}
            title="전체 견적서"
            value={totalCount}
          />
          <StatCard
            icon={<CheckCircle className="h-5 w-5" />}
            title="확정됨"
            value={confirmedCount}
          />
          <StatCard
            icon={<Send className="h-5 w-5" />}
            title="발송됨"
            value={sentCount}
          />
          <StatCard
            icon={<FileEdit className="h-5 w-5" />}
            title="초안"
            value={draftCount}
          />
        </div>
      </section>

      {/* ── B. 하단 2컬럼 그리드 ─────────────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* 왼쪽: 최근 활동 */}
        <RecentActivityList items={recentInvoices} />

        {/* 오른쪽: 클라이언트 현황 */}
        <ClientSummary clients={clients} />
      </section>

      {/* ── C. 견적서 전체 목록 ───────────────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">견적서 목록</h2>
        <InvoiceListWithFilter invoices={invoices} />
      </section>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={<TableLoadingSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}
