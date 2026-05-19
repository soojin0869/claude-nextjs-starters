'use client'

/**
 * URL 복사 버튼 컴포넌트 (F004)
 *
 * 클라이언트 컴포넌트입니다.
 * 견적서 공유 URL을 클립보드에 복사하고 토스트 알림을 표시합니다.
 */

import { useState } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface CopyUrlButtonProps {
  /** 견적서 Notion 페이지 ID */
  invoiceId: string
}

export function CopyUrlButton({ invoiceId }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? window.location.origin
    const url = `${baseUrl}/invoice/${invoiceId}`

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('URL이 클립보드에 복사되었습니다.')

      // 2초 후 복사 완료 상태 초기화
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('URL 복사에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <Button onClick={handleCopy} variant="outline" size="sm" disabled={copied}>
      {copied ? (
        <>
          <CheckIcon className="mr-1.5 h-3.5 w-3.5 text-green-600" />
          복사됨
        </>
      ) : (
        <>
          <CopyIcon className="mr-1.5 h-3.5 w-3.5" />
          URL 복사
        </>
      )}
    </Button>
  )
}
