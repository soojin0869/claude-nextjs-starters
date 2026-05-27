import { FileTextIcon, CalendarIcon, UserIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { InvoiceSummary } from '@/lib/types/invoice'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { getStatusBadgeClass } from '@/lib/utils/status'
import { CopyUrlButton } from './copy-url-button'

interface InvoiceListCardProps {
  invoices: InvoiceSummary[]
  onSelect: (invoice: InvoiceSummary) => void
}

export function InvoiceListCard({ invoices, onSelect }: InvoiceListCardProps) {
  if (invoices.length === 0) {
    return (
      <div className="bg-card rounded-xl border px-6 py-16 text-center">
        <FileTextIcon className="text-muted-foreground/40 mx-auto mb-4 h-10 w-10" />
        <p className="text-muted-foreground font-medium">
          등록된 견적서가 없습니다.
        </p>
        <p className="text-muted-foreground/70 mt-1 text-sm">
          Notion 데이터베이스에 견적서를 추가해 주세요.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {invoices.map(invoice => (
        <Card
          key={invoice.id}
          className="cursor-pointer transition-shadow hover:shadow-md"
          onClick={() => onSelect(invoice)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm leading-tight font-semibold">
                {invoice.title}
              </h3>
              <span
                className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}
              >
                {invoice.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-muted-foreground space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <UserIcon className="h-3.5 w-3.5 shrink-0" />
                {invoice.clientName}
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                {formatDate(invoice.issueDate)}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold">
                {formatCurrency(invoice.totalAmount, invoice.currency)}
              </span>
              {/* 카드 클릭 이벤트가 버블링되지 않도록 처리 */}
              <div onClick={e => e.stopPropagation()}>
                <CopyUrlButton invoiceId={invoice.id} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
