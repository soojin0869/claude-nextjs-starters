/**
 * 어드민 견적서 목록 테이블 컴포넌트 (F004, F005)
 *
 * 어드민 대시보드에서 전체 견적서 목록을 표시합니다.
 * 각 행에 URL 복사 버튼을 제공합니다.
 */

import type { InvoiceSummary } from '@/lib/types/invoice'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { CopyUrlButton } from './copy-url-button'

interface InvoiceListTableProps {
  invoices: InvoiceSummary[]
}

export function InvoiceListTable({ invoices }: InvoiceListTableProps) {
  if (invoices.length === 0) {
    return (
      <div className="rounded-lg border bg-white px-6 py-12 text-center">
        <p className="text-gray-500">등록된 견적서가 없습니다.</p>
        <p className="mt-1 text-sm text-gray-400">
          Notion 데이터베이스에 견적서를 추가해 주세요.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              견적서명
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              클라이언트
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              발행일
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">
              금액
            </th>
            <th className="px-4 py-3 text-center font-medium text-gray-600">
              상태
            </th>
            <th className="px-4 py-3 text-center font-medium text-gray-600">
              공유 URL
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {invoices.map(invoice => (
            <tr key={invoice.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">
                {invoice.title}
              </td>
              <td className="px-4 py-3 text-gray-700">{invoice.clientName}</td>
              <td className="px-4 py-3 text-gray-500">
                {formatDate(invoice.issueDate)}
              </td>
              <td className="px-4 py-3 text-right text-gray-900">
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </td>
              <td className="px-4 py-3 text-center">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                  {invoice.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <CopyUrlButton invoiceId={invoice.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
