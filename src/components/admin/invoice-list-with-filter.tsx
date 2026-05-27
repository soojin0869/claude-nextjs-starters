'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  SearchIcon,
  LayoutListIcon,
  LayoutGridIcon,
  CalendarIcon,
  UserIcon,
  ExternalLinkIcon,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { InvoiceListTable } from './invoice-list-table'
import { InvoiceListCard } from './invoice-list-card'
import { CopyUrlButton } from './copy-url-button'
import type { InvoiceSummary } from '@/lib/types/invoice'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { getStatusBadgeClass } from '@/lib/utils/status'

const STATUS_TABS = ['전체', '대기', '발송됨', '확정됨'] as const
type ViewMode = 'table' | 'card'

interface InvoiceListWithFilterProps {
  invoices: InvoiceSummary[]
}

export function InvoiceListWithFilter({
  invoices,
}: InvoiceListWithFilterProps) {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<ViewMode>('table')
  const [activeTab, setActiveTab] = useState<string>('전체')
  const [selected, setSelected] = useState<InvoiceSummary | null>(null)

  // localStorage에서 저장된 뷰 모드 복원
  useEffect(() => {
    const saved = localStorage.getItem('admin-view')
    if (saved === 'card' || saved === 'table') setView(saved)
  }, [])

  const handleViewChange = (next: ViewMode) => {
    setView(next)
    localStorage.setItem('admin-view', next)
  }

  const filtered = invoices
    .filter(inv => activeTab === '전체' || inv.status === activeTab)
    .filter(
      inv =>
        !query.trim() ||
        inv.title.includes(query) ||
        inv.clientName.includes(query)
    )

  return (
    <div className="flex flex-col gap-4">
      {/* 검색 + 뷰 전환 */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="견적서명 또는 클라이언트명으로 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center rounded-md border p-0.5">
          <Button
            variant={view === 'table' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleViewChange('table')}
            aria-label="테이블 뷰"
          >
            <LayoutListIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'card' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleViewChange('card')}
            aria-label="카드 뷰"
          >
            <LayoutGridIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 상태 필터 탭 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {STATUS_TABS.map(tab => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* 목록 */}
      {view === 'table' ? (
        <InvoiceListTable invoices={filtered} onSelect={setSelected} />
      ) : (
        <InvoiceListCard invoices={filtered} onSelect={setSelected} />
      )}

      {/* 미리보기 Sheet */}
      <Sheet
        open={!!selected}
        onOpenChange={open => !open && setSelected(null)}
      >
        <SheetContent className="w-full px-4 pb-6 sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="pr-4 text-base leading-snug">
                  {selected.title}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-5">
                {/* 상태 배지 */}
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusBadgeClass(selected.status)}`}
                >
                  {selected.status}
                </span>

                {/* 메타 정보 */}
                <div className="text-muted-foreground space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-4 w-4 shrink-0" />
                    <span>{selected.clientName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-4 w-4 shrink-0" />
                    <span>{formatDate(selected.issueDate)}</span>
                  </div>
                </div>

                {/* 총액 */}
                <div className="rounded-lg border p-4">
                  <p className="text-muted-foreground mb-1 text-xs font-medium tracking-wider uppercase">
                    총 금액
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(selected.totalAmount, selected.currency)}
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col gap-2">
                  <CopyUrlButton invoiceId={selected.id} />
                  <Button variant="outline" asChild>
                    <Link
                      href={`/invoice/${selected.id}`}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                      견적서 열기
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
