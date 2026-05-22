/**
 * 견적서 렌더링 컴포넌트 (F002)
 *
 * 견적서 데이터를 받아 시각적으로 읽기 좋은 레이아웃으로 표시합니다.
 * 인쇄용(`@media print`) 스타일을 포함합니다.
 */

import type { Invoice } from '@/lib/types/invoice'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { InvoiceItemTable } from './invoice-item-table'

interface InvoiceViewProps {
  invoice: Invoice
}

export function InvoiceView({ invoice }: InvoiceViewProps) {
  return (
    <div className="rounded-lg bg-white p-8 shadow-sm print:shadow-none">
      {/* 견적서 헤더 */}
      <div className="mb-8 border-b pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {invoice.title}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              발행일: {formatDate(invoice.issueDate)}
            </p>
            {invoice.dueDate && (
              <p className="text-sm text-gray-500">
                유효기간: {formatDate(invoice.dueDate)}
              </p>
            )}
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {invoice.status}
          </span>
        </div>
      </div>

      {/* 수신자 정보 */}
      <div className="mb-8">
        <h2 className="mb-2 text-sm font-semibold tracking-wide text-gray-500 uppercase">
          수신자
        </h2>
        <p className="text-lg font-medium text-gray-900">
          {invoice.clientName}
        </p>
        {invoice.clientEmail && (
          <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
        )}
      </div>

      {/* 견적 항목 테이블 */}
      <div className="mb-8">
        <InvoiceItemTable items={invoice.items} />
      </div>

      {/* 합계 - 소계 / 부가세(10%) / 총액 3단 표시 */}
      <div className="flex justify-end border-t pt-4">
        <table className="text-sm">
          <tbody>
            {/* 소계 행 */}
            <tr>
              <td className="py-1 pr-8 text-gray-500">소계</td>
              <td className="py-1 text-right text-gray-900">
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </td>
            </tr>
            {/* 부가세(10%) 행 */}
            <tr>
              <td className="py-1 pr-8 text-gray-500">부가세 (10%)</td>
              <td className="py-1 text-right text-gray-900">
                {formatCurrency(
                  Math.round(invoice.totalAmount * 0.1),
                  invoice.currency
                )}
              </td>
            </tr>
            {/* 총액 행 - 굵게 강조 */}
            <tr className="border-t">
              <td className="pt-2 pr-8 font-bold text-gray-900">총액</td>
              <td className="pt-2 text-right text-xl font-bold text-gray-900">
                {formatCurrency(
                  invoice.totalAmount + Math.round(invoice.totalAmount * 0.1),
                  invoice.currency
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 메모 */}
      {invoice.note && (
        <div className="mt-8 rounded-md bg-gray-50 p-4">
          <h2 className="mb-1 text-sm font-semibold text-gray-500">메모</h2>
          <p className="text-sm whitespace-pre-wrap text-gray-700">
            {invoice.note}
          </p>
        </div>
      )}

      {/* 발행자 정보 */}
      <div className="mt-8 border-t pt-6 text-sm text-gray-500">
        <p className="font-medium text-gray-700">
          {process.env.ADMIN_NAME ?? '발행자'}
        </p>
        {process.env.ADMIN_EMAIL && <p>{process.env.ADMIN_EMAIL}</p>}
        {process.env.ADMIN_PHONE && <p>{process.env.ADMIN_PHONE}</p>}
      </div>
    </div>
  )
}
