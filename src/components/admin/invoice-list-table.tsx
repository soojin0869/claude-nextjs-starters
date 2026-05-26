/**
 * 어드민 견적서 목록 테이블 컴포넌트 (F004, F005)
 *
 * 어드민 대시보드에서 전체 견적서 목록을 표시합니다.
 * 각 행에 URL 복사 버튼과 견적서 바로 보기 링크를 제공합니다.
 */

import Link from 'next/link'
import { FileTextIcon } from 'lucide-react'
import type { InvoiceSummary } from '@/lib/types/invoice'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { getStatusBadgeClass } from '@/lib/utils/status'
import { CopyUrlButton } from './copy-url-button'

interface InvoiceListTableProps {
  invoices: InvoiceSummary[]
}

export function InvoiceListTable({ invoices }: InvoiceListTableProps) {
  if (invoices.length === 0) {
    return (
      <div className="rounded-xl border bg-white px-6 py-16 text-center">
        <FileTextIcon className="mx-auto mb-4 h-10 w-10 text-gray-300" />
        <p className="font-medium text-gray-500">등록된 견적서가 없습니다.</p>
        <p className="mt-1 text-sm text-gray-400">
          Notion 데이터베이스에 견적서를 추가해 주세요.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 border-b">
          <tr>
            <th className="text-muted-foreground px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
              견적서명
            </th>
            <th className="text-muted-foreground px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
              클라이언트
            </th>
            <th className="text-muted-foreground px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
              발행일
            </th>
            <th className="text-muted-foreground px-6 py-4 text-right text-xs font-semibold tracking-wider uppercase">
              금액
            </th>
            <th className="text-muted-foreground px-6 py-4 text-center text-xs font-semibold tracking-wider uppercase">
              상태
            </th>
            <th className="text-muted-foreground px-6 py-4 text-center text-xs font-semibold tracking-wider uppercase">
              액션
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {invoices.map(invoice => (
            <tr
              key={invoice.id}
              className="hover:bg-muted/30 transition-colors"
            >
              <td className="px-6 py-4 font-medium">
                <Link
                  href={`/invoice/${invoice.id}`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  {invoice.title}
                </Link>
              </td>
              <td className="px-6 py-4 text-gray-700">{invoice.clientName}</td>
              <td className="px-6 py-4 text-gray-500">
                {formatDate(invoice.issueDate)}
              </td>
              <td className="px-6 py-4 text-right font-medium text-gray-900">
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}
                >
                  {invoice.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <CopyUrlButton invoiceId={invoice.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
