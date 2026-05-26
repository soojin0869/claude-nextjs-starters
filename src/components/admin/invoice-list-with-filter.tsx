'use client'

import { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { InvoiceListTable } from './invoice-list-table'
import type { InvoiceSummary } from '@/lib/types/invoice'

interface InvoiceListWithFilterProps {
  invoices: InvoiceSummary[]
}

export function InvoiceListWithFilter({
  invoices,
}: InvoiceListWithFilterProps) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? invoices.filter(
        inv => inv.title.includes(query) || inv.clientName.includes(query)
      )
    : invoices

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pl-9"
          placeholder="견적서명 또는 클라이언트명으로 검색"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <InvoiceListTable invoices={filtered} />
    </div>
  )
}
