/**
 * 어드민 대시보드 최근 활동 목록 컴포넌트
 *
 * 최근 견적서 활동 목록을 상태 뱃지, 금액, 날짜와 함께 표시합니다.
 * 다크모드를 지원하며 CSS 변수 기반 시맨틱 색상을 사용합니다.
 */
import { FileTextIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils/format'

/** 최근 활동 항목 타입 */
interface ActivityItem {
  /** 고유 식별자 */
  id: string
  /** 견적서 제목 */
  title: string
  /** 클라이언트명 */
  clientName: string
  /** 견적서 상태 */
  status: '초안' | '발송됨' | '확정됨' | '대기'
  /** 발행일 (ISO date 문자열) */
  issueDate: string
  /** 합계 금액 */
  totalAmount: number
  /** 통화 단위 */
  currency: 'KRW' | 'USD'
}

interface RecentActivityListProps {
  /** 최근 활동 항목 목록 */
  items: ActivityItem[]
}

function getStatusVariant(
  status: ActivityItem['status']
): 'outline' | 'secondary' | 'default' {
  switch (status) {
    case '확정됨':
      return 'default'
    case '발송됨':
      return 'secondary'
    default:
      return 'outline'
  }
}

export function RecentActivityList({ items }: RecentActivityListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">최근 견적 활동</CardTitle>
      </CardHeader>

      <CardContent>
        {/* 빈 상태 */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileTextIcon
              className="text-muted-foreground/40 mb-3 h-8 w-8"
              aria-hidden="true"
            />
            <p className="text-muted-foreground text-sm">
              최근 견적 활동이 없습니다.
            </p>
          </div>
        ) : (
          /* 활동 목록 */
          <ul role="list" className="divide-border divide-y">
            {items.map(item => (
              <li
                key={item.id}
                role="listitem"
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                {/* 좌측: 제목 및 클라이언트 정보 */}
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-medium">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {item.clientName} &middot; {formatDate(item.issueDate)}
                  </p>
                </div>

                {/* 우측: 상태 뱃지 및 금액 */}
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Badge variant={getStatusVariant(item.status)}>
                    {item.status}
                  </Badge>
                  <span className="text-foreground text-xs font-semibold">
                    {formatCurrency(item.totalAmount, item.currency)}
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
