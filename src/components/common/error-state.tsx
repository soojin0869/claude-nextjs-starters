/**
 * 에러 상태 표시 컴포넌트
 *
 * 데이터 로딩 실패 또는 오류 발생 시 사용자에게 에러 메시지를 표시하고
 * 선택적으로 재시도 버튼을 제공합니다.
 */

import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  /** 사용자에게 표시할 에러 메시지 */
  message?: string
  /** 재시도 버튼 클릭 핸들러 (없으면 버튼 미표시) */
  onRetry?: () => void
}

/**
 * 에러 상태 컴포넌트
 * 에러 아이콘, 메시지, 선택적 재시도 버튼을 포함합니다.
 */
export function ErrorState({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center rounded-lg border px-6 py-12 text-center">
      {/* 에러 아이콘 */}
      <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
        <svg
          className="text-destructive h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.072 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      {/* 에러 메시지 */}
      <p className="text-destructive text-sm font-medium">{message}</p>
      <p className="text-muted-foreground mt-1 text-xs">
        잠시 후 다시 시도해 주세요.
      </p>

      {/* 재시도 버튼 (onRetry가 있을 때만 표시) */}
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  )
}
