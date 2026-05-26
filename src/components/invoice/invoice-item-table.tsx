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
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="text-muted-foreground px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase">
              항목명
            </th>
            <th className="text-muted-foreground px-6 py-4 text-right text-xs font-semibold tracking-wider uppercase">
              수량
            </th>
            <th className="text-muted-foreground px-6 py-4 text-right text-xs font-semibold tracking-wider uppercase">
              단가
            </th>
            <th className="text-muted-foreground px-6 py-4 text-right text-xs font-semibold tracking-wider uppercase">
              금액
            </th>
          </tr>
        </thead>
        <tbody className="divide-y bg-white">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4 text-gray-900">{item.name}</td>
              <td className="px-6 py-4 text-right text-gray-600">
                {formatNumber(item.quantity)}
              </td>
              <td className="px-6 py-4 text-right text-gray-600">
                {formatNumber(item.unitPrice)}
              </td>
              <td className="px-6 py-4 text-right font-semibold text-gray-900">
                {formatNumber(item.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
