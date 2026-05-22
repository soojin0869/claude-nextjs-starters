/**
 * 로딩 스켈레톤 컴포넌트
 *
 * 페이지 및 테이블 데이터 로딩 중 표시할 스켈레톤 UI를 제공합니다.
 * shadcn/ui의 Skeleton 컴포넌트를 활용합니다.
 */

import { Skeleton } from '@/components/ui/skeleton'

/**
 * 견적서 상세 페이지용 로딩 스켈레톤
 * 헤더, 수신자 정보, 항목 테이블, 합계 영역을 모의합니다.
 */
export function InvoiceLoadingSkeleton() {
  return (
    <div className="rounded-lg bg-white p-8 shadow-sm">
      {/* 견적서 헤더 스켈레톤 */}
      <div className="mb-8 border-b pb-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      {/* 수신자 정보 스켈레톤 */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* 항목 테이블 스켈레톤 */}
      <div className="mb-8 overflow-hidden rounded-md border">
        {/* 테이블 헤더 */}
        <div className="flex gap-4 bg-gray-50 px-4 py-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="ml-auto h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        {/* 테이블 행 3개 */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-4 border-t px-4 py-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="ml-auto h-4 w-8" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* 합계 스켈레톤 */}
      <div className="flex justify-end border-t pt-4">
        <div className="space-y-2 text-right">
          <Skeleton className="ml-auto h-4 w-32" />
          <Skeleton className="ml-auto h-4 w-28" />
          <Skeleton className="ml-auto h-8 w-40" />
        </div>
      </div>
    </div>
  )
}

/**
 * 어드민 테이블용 로딩 스켈레톤 (5행)
 * 헤더와 5개의 데이터 행을 모의합니다.
 */
export function TableLoadingSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      {/* 테이블 헤더 스켈레톤 */}
      <div className="border-b bg-gray-50 px-4 py-3">
        <div className="flex gap-8">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="ml-auto h-4 w-16" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* 테이블 데이터 행 5개 */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="border-t px-4 py-3">
          <div className="flex items-center gap-8">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="ml-auto h-4 w-24" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}
