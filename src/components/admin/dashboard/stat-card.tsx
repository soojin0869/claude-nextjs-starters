/**
 * 어드민 대시보드 통계 카드 컴포넌트
 *
 * 아이콘, 제목, 숫자 값, 설명, 트렌드 정보를 표시하는 통계 카드입니다.
 * 다크모드를 지원하며 CSS 변수 기반 시맨틱 색상을 사용합니다.
 */
import type { ReactNode } from 'react'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface StatCardProps {
  /** 카드 제목 */
  title: string
  /** 주요 숫자 값 */
  value: string | number
  /** 보조 설명 텍스트 */
  description?: string
  /** 우상단에 표시할 아이콘 */
  icon: ReactNode
  /** 트렌드 정보 (값은 퍼센트, 레이블은 기간 설명) */
  trend?: { value: number; label: string }
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: StatCardProps) {
  /* 트렌드 방향 판별 */
  const isTrendPositive = trend !== undefined && trend.value > 0
  const isTrendNegative = trend !== undefined && trend.value < 0

  return (
    <Card>
      <CardHeader>
        {/* 카드 제목 */}
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        {/* 우측 상단 아이콘 */}
        <CardAction>
          <span
            className="bg-muted text-muted-foreground flex h-9 w-9 items-center justify-center rounded-lg"
            aria-hidden="true"
          >
            {icon}
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-1.5">
        {/* 주요 숫자 값 - 크고 굵게 */}
        <p className="text-foreground text-3xl font-bold tracking-tight">
          {value}
        </p>

        {/* 보조 설명 */}
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}

        {/* 트렌드 정보 */}
        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              isTrendPositive && 'text-emerald-600 dark:text-emerald-500',
              isTrendNegative && 'text-destructive',
              !isTrendPositive && !isTrendNegative && 'text-muted-foreground'
            )}
          >
            {/* 트렌드 방향 아이콘 */}
            {isTrendPositive && (
              <TrendingUpIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            {isTrendNegative && (
              <TrendingDownIcon
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              />
            )}

            {/* 스크린 리더용 방향 텍스트 */}
            <span className="sr-only">
              {isTrendPositive
                ? '증가'
                : isTrendNegative
                  ? '감소'
                  : '변동 없음'}
            </span>

            {/* 트렌드 수치 */}
            <span>
              {trend.value > 0 ? '+' : ''}
              {trend.value}%
            </span>

            {/* 기간 레이블 */}
            <span className="text-muted-foreground font-normal">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
