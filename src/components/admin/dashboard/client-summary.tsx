/**
 * 어드민 대시보드 클라이언트 요약 컴포넌트
 *
 * 클라이언트별 견적서 수, 최근 발행일, 총 금액을 카드형 목록으로 표시합니다.
 * 다크모드를 지원하며 CSS 변수 기반 시맨틱 색상을 사용합니다.
 */
import { Building2Icon, FileTextIcon, UsersIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils/format'

/** 클라이언트별 집계 데이터 타입 */
export interface ClientInfo {
  /** 클라이언트명 */
  name: string
  /** 클라이언트 이메일 (없을 수 있음) */
  email?: string | null
  /** 해당 클라이언트의 견적서 건수 */
  invoiceCount: number
  /** 가장 최근 견적서 발행일 (ISO date 문자열) */
  lastInvoiceDate: string
  /** 모든 견적서 합계 금액 (KRW 기준) */
  totalAmount: number
}

interface ClientSummaryProps {
  /** 클라이언트 집계 목록 */
  clients: ClientInfo[]
}

export function ClientSummary({ clients }: ClientSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">클라이언트 현황</CardTitle>
      </CardHeader>

      <CardContent>
        {/* 빈 상태 */}
        {clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <UsersIcon
              className="text-muted-foreground/40 mb-3 h-8 w-8"
              aria-hidden="true"
            />
            <p className="text-muted-foreground text-sm">
              등록된 클라이언트가 없습니다.
            </p>
          </div>
        ) : (
          /* 클라이언트 목록 */
          <ul role="list" className="divide-border divide-y">
            {clients.map(client => (
              <li
                key={client.name}
                role="listitem"
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                {/* 회사 아이콘 */}
                <div
                  className="bg-muted text-muted-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  aria-hidden="true"
                >
                  <Building2Icon className="h-4 w-4" />
                </div>

                {/* 중앙: 이름 및 이메일 */}
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">
                    {client.name}
                  </p>
                  {client.email ? (
                    <p className="text-muted-foreground truncate text-xs">
                      {client.email}
                    </p>
                  ) : (
                    <p className="text-muted-foreground/60 text-xs">
                      이메일 없음
                    </p>
                  )}
                </div>

                {/* 우측: 견적서 수 및 총 금액 */}
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {/* 견적서 건수 */}
                  <div className="text-muted-foreground flex items-center gap-1 text-xs">
                    <FileTextIcon className="h-3 w-3" aria-hidden="true" />
                    <span>{client.invoiceCount}건</span>
                  </div>

                  {/* 총 금액 - KRW 기본값으로 표시 */}
                  <span className="text-foreground text-xs font-semibold">
                    {formatCurrency(client.totalAmount, 'KRW')}
                  </span>

                  {/* 최근 발행일 */}
                  <span className="text-muted-foreground text-xs">
                    {formatDate(client.lastInvoiceDate)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
