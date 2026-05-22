/**
 * 견적 항목 테이블 컴포넌트 (F002)
 *
 * 견적서의 항목 목록을 테이블 형식으로 표시합니다.
 */

import type { InvoiceItem } from '@/lib/types/invoice'
import { formatNumber } from '@/lib/utils/format'

interface InvoiceItemTableProps {
  items: InvoiceItem[]
}

export function InvoiceItemTable({ items }: InvoiceItemTableProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400">견적 항목이 없습니다.</p>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">
              항목명
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">
              수량
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">
              단가
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">
              금액
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map(item => (
            <tr key={item.id} className="bg-white">
              <td className="px-4 py-3 text-gray-900">{item.name}</td>
              <td className="px-4 py-3 text-right text-gray-700">
                {formatNumber(item.quantity)}
              </td>
              <td className="px-4 py-3 text-right text-gray-700">
                {formatNumber(item.unitPrice)}
              </td>
              <td className="px-4 py-3 text-right font-medium text-gray-900">
                {formatNumber(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
