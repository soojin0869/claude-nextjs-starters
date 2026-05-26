/**
 * 견적서 렌더링 컴포넌트 (F002)
 *
 * 견적서 데이터를 받아 시각적으로 읽기 좋은 레이아웃으로 표시합니다.
 * 인쇄용(`@media print`) 스타일을 포함합니다.
 */

import type { Invoice } from '@/lib/types/invoice'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { getStatusBadgeClass } from '@/lib/utils/status'
import { InvoiceItemTable } from './invoice-item-table'

interface InvoiceViewProps {
  invoice: Invoice
}

export function InvoiceView({ invoice }: InvoiceViewProps) {
  const vat = Math.round(invoice.totalAmount * 0.1)
  const grandTotal = invoice.totalAmount + vat

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md print:shadow-none">
      {/* 상단 강조선 */}
      <div className="bg-foreground h-1 print:hidden" data-pdf-hide />

      <div className="p-10">
        {/* 견적서 헤더 */}
        <div className="mb-10 border-b pb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {invoice.title}
              </h1>
              <div className="mt-2 space-y-0.5">
                <p className="text-sm text-gray-500">
                  발행일: {formatDate(invoice.issueDate)}
                </p>
                {invoice.dueDate && (
                  <p className="text-sm text-gray-500">
                    유효기간: {formatDate(invoice.dueDate)}
                  </p>
                )}
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${getStatusBadgeClass(invoice.status)}`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        {/* 수신자 정보 */}
        <div className="mb-10">
          <p className="text-muted-foreground mb-1 text-xs font-medium">
            수신자
          </p>
          <p className="text-xl font-semibold text-gray-900">
            {invoice.clientName}
          </p>
          {invoice.clientEmail && (
            <p className="mt-0.5 text-sm text-gray-500">
              {invoice.clientEmail}
            </p>
          )}
        </div>

        {/* 견적 항목 테이블 */}
        <div className="mb-10">
          <InvoiceItemTable items={invoice.items} />
        </div>

        {/* 합계 — 소계 / 부가세(10%) / 총액 */}
        <div className="flex justify-end border-t pt-6">
          <table className="min-w-[260px] text-sm">
            <tbody>
              <tr>
                <td className="py-1.5 pr-10 text-gray-500">소계</td>
                <td className="py-1.5 text-right text-gray-900">
                  {formatCurrency(invoice.totalAmount, invoice.currency)}
                </td>
              </tr>
              <tr>
                <td className="py-1.5 pr-10 text-gray-500">부가세 (10%)</td>
                <td className="py-1.5 text-right text-gray-900">
                  {formatCurrency(vat, invoice.currency)}
                </td>
              </tr>
              <tr className="border-t">
                <td className="pt-3 pr-10 font-bold text-gray-900">총액</td>
                <td className="pt-3 text-right text-2xl font-bold text-gray-900">
                  {formatCurrency(grandTotal, invoice.currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 메모 */}
        {invoice.note && (
          <div className="mt-10 rounded-lg bg-gray-50 p-5">
            <p className="text-muted-foreground mb-1 text-xs font-medium">
              메모
            </p>
            <p className="text-sm whitespace-pre-wrap text-gray-700">
              {invoice.note}
            </p>
          </div>
        )}

        {/* 발행자 정보 */}
        <div className="mt-10 rounded-lg bg-gray-50 px-6 py-5 text-sm text-gray-500">
          <p className="font-semibold text-gray-700">
            {process.env.ADMIN_NAME ?? '발행자'}
          </p>
          {process.env.ADMIN_EMAIL && (
            <p className="mt-0.5">{process.env.ADMIN_EMAIL}</p>
          )}
          {process.env.ADMIN_PHONE && <p>{process.env.ADMIN_PHONE}</p>}
        </div>
      </div>
    </div>
  )
}
